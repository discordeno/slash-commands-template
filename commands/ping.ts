import { InteractionResponseType } from "../deps.ts";
import { createCommand } from "../util/helpers.ts";

createCommand({
  name: "ping",
  description: "Mason, Mason on the wall, whose the finest lib, of them all?",
  type: "global",
  execute: function (payload) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content:
          `<@!${payload.member.user.id}> Ping! It's ........ Discordeno! Best lib!`,
      },
    };
  },
});
