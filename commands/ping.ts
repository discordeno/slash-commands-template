import { InteractionResponseType } from "../deps.ts";
import { createCommand } from "../utils/helpers.ts";

createCommand({
  name: "ping",
  description: "Mason, Mason on the wall, whose the finest lib, of them all?",
  type: "global",
  execute: async function (payload) {
    return {
      status: 200,
      body: {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content:
            `<@!${payload.member.user.id}> Ping! It's ........ Discordeno! Best lib!`,
        },
      },
    };
  },
});
