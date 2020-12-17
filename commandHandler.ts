import { getTime } from "../utils/helpers.ts";
import {
  bgBlack,
  bgBlue,
  bgGreen,
  bgMagenta,
  bgYellow,
  black,
  green,
  Interaction,
  InteractionResponseType,
  red,
  white,
} from "./deps.ts";
import { botCache } from "./cache.ts";
import { SlashCommand } from "./types/commands.ts";

export const logCommand = (
  type: "Failure" | "Success" | "Trigger" | "Slowmode" | "Missing" | "Invalid",
  payload: Interaction
) => {
  const command = `[COMMAND: ${bgYellow(black(payload.data!.name))} - ${
    bgBlack(
      ["Failure", "Slowmode", "Missing", "Invalid"].includes(type)
        ? red(type)
        : type === "Success"
        ? green(type)
        : white(type),
    )
  }]`;

  const user = bgGreen(
    black(
      `${payload.member.user.username}#${payload.member.user.discriminator}(${payload.member.user.id})`,
    ),
  );
  const guild = bgMagenta(
    black(`GUILDID: ${payload.guild_id}`),
  );

  console.log(
    `${bgBlue(`[${getTime()}]`)} => ${command} by ${user} in ${guild}`,
  );
};

/** Parses all the arguments for the command based on the message sent by the user. */
async function parseArguments(command: SlashCommand, payload: Interaction) {
  const args: { [key: string]: any } = {};
  if (!command.arguments) return args;

  let missingRequiredArg = false;

  // Clone the parameters so we can modify it without editing original array
  const params = [...payload.data!.options];

  // Loop over each argument and validate
  for (const argument of command.arguments) {
    const resolver = botCache.arguments.get(argument.type || "string");
    if (!resolver) continue;

    const result = await resolver.execute(argument, params, command);
    if (result !== undefined) {
      // Assign the valid argument
      args[argument.name] = result;
      // This will use up all args so immediately exist the loop.
      if (argument.type && ["...string", "...roles"].includes(argument.type)) {
        break;
      }
      // Remove a param for the next argument
      params.shift();
      continue;
    }

    // Invalid arg provided.
    if (Object.prototype.hasOwnProperty.call(argument, "defaultValue")) {
      args[argument.name] = argument.defaultValue;
    } else if (command.subcommands?.has(payload.data?.options[0])) {
      continue;
    } else if (argument.required !== false) {
      missingRequiredArg = true;
      argument.missing?.(payload);
      break;
    }
  }

  // If an arg was missing then return false so we can error out as an object {} will always be truthy
  return missingRequiredArg ? false : args;
}

/** Runs the inhibitors to see if a command is allowed to run. */
async function commandAllowed(
  command: SlashCommand,
  payload: Interaction,
) {
  const inhibitorResults = await Promise.all(
    [...botCache.inhibitors.values()].map((inhibitor) =>
      inhibitor(command, payload)
    ),
  );

  if (inhibitorResults.includes(true)) {
    logCommand("Failure", payload);
    return false;
  }

  return true;
}

async function executeCommand(command: SlashCommand, payload: Interaction) {
  try {
    const args = {};
    // // Parsed args and validated
    // const args = await parseArguments(command, payload) as {
      // [key: string]: any;
    // } | false;
    // // Some arg that was required was missing and handled already
    // if (!args) {
    //   return logCommand("Missing", payload);
    // }

    // // If no subcommand execute the command
    // const [argument] = command.arguments || [];
    // let subcommand = argument ? args[argument.name] as SlashCommand : undefined;

    // if (!argument || argument.type !== "subcommand" || !subcommand) {
      // Check subcommand permissions and options
      // if (!(await commandAllowed(command, payload))) return;

      const response = await command.execute?.(payload, args);
      logCommand("Success", payload);
      return response;
    // }
  } catch (error) {
    logCommand("Failure", payload);
    console.error(error);
  }
}


/** The main code that will be run when this monitor is triggered. */
export async function handleCommandPayload(payload: Interaction) {
    // The data should always be present for slash commands
    const command = botCache.commands.get(payload.data!.name);
    if (!command) {
        // Logs for the dev
        logCommand("Invalid", payload);
        console.error("MISSING COMMAND IN BOTCACHE:", payload);
        // Response to the user
        return {
            status: 200,
            body: {
                // In case user can take a screenshot and show you what they typed exactly.
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content:
                "Whoopsies! Seems the handling for this command is missing. Please contact my developers!",
            },
        },
      };
    }

    logCommand("Trigger", payload);

    return executeCommand(command, payload);
};