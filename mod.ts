import { startServer, InteractionResponseType } from "./deps.ts";

startServer({
    publicKey: "PUBLIC_KEY_HERE_FROM_YOUR_BOT_DASHBOARD",
    // CHANGE THIS IF YOU DID NOT USE THE DEFAULT 80 AS ngrok said
    port: 80,
    // YOUR CUSTOM HANDLER
    handleApplicationCommand: async function (payload) {
      // Handle the command
      if (payload.data?.name === "ping") {
        return {
          status: 200,
          body: {
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: { content: "Pong! Discordeno best lib!" },
          },
        };
      }

      return {
        status: 200,
        body: {
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content:
              "Whoopsies! Seems the handling for this command is missing. Please contact my developers!",
          },
        },
      };
    }
})