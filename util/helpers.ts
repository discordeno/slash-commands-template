import { botCache } from "./cache.ts";
import {
  SlashArgument,
  SlashCommand,
  SlashInhibitor,
} from "../types/commands.ts";

/** Use this helper function to easily create a command in ur cache. */
export function createCommand(command: SlashCommand) {
  // USE SPREAD BECAUSE JS LENGTH CHECKS IS NOT THE SAME AS PYTHON(DISCORD API)
  if ([...command.name].length < 3) {
    throw new Error(
      `Command ${command.name} has an invalid name. Must be more than 3 characters.`,
    );
  }
  if ([...command.name].length > 32) {
    throw new Error(
      `Command ${command.name} has an invalid name. Must be less than 32 characters.`,
    );
  }

  botCache.commands.set(command.name, command);
}

/** Use this helper function to easily create an argument in your cache. */
export function createArgument(argument: SlashArgument) {
  botCache.arguments.set(argument.name, argument);
}

/** Use this helper function to easily create an inhibitor in your cache */
export function createInhibitor(inhibitor: SlashInhibitor) {
  botCache.inhibitors.set(inhibitor.name, inhibitor);
}

// Very important to make sure files are reloaded properly
let uniqueFilePathCounter = 0;
/** This function allows reading all files in a folder. Useful for loading/reloading commands, inhibitors etc */
export async function importDirectory(path: string) {
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    if (file.isFile) {
      await import(`file:///${currentPath}#${uniqueFilePathCounter}`);
      continue;
    }

    importDirectory(currentPath);
  }
  uniqueFilePathCounter++;
}

export function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minute = now.getMinutes();

  let hour = hours;
  let amOrPm = `AM`;
  if (hour > 12) {
    amOrPm = `PM`;
    hour = hour - 12;
  }

  return `${hour >= 10 ? hour : `0${hour}`}:${
    minute >= 10 ? minute : `0${minute}`
  } ${amOrPm}`;
}
