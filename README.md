# discordeno-slashbot-boilerplate

As this is currently, not finalized please expect breaking changes. A much better in depth guide will come in the near future.

0. Install Deno https://deno.land
1. Install ngrock https://ngrok.com
2. Follow instructions to get ngrok running https://dashboard.ngrok.com/get-started/setup
3. Go to discord.dev login and open the bot dashboard
4. Get your public keey and paste it below


```ts
import { startServer } from "https://raw.githubusercontent.com/discordeno/discordeno/slash-cmds/src/interactions/mod.ts";
import { InteractionResponseType } from "https://raw.githubusercontent.com/discordeno/discordeno/slash-cmds/src/interactions/types/mod.ts";

startServer({
    publicKey: "PUBLIC_KEY_HERE_FROM_YOUR_BOT_DASHBOARD",
    // CHANGE THIS IF YOU DID NOT USE THE DEFAULT 80 AS ngrok said
    port: 80,
    // YOUR CUSTOM HANDLER
    handleApplicationCommand() {
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
```
