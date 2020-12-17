import { handleCommandPayload } from "./commandHandler.ts";
import { startServer, InteractionResponseType } from "./deps.ts";

console.log("Beginning Bot Startup Process...");
console.log("Step 1: Loading your commands.");


startServer({
    publicKey: "PUBLIC_KEY_HERE_FROM_YOUR_BOT_DASHBOARD",
    // CHANGE THIS IF YOU DID NOT USE THE DEFAULT 80 AS ngrok said
    port: 8000,
    // YOUR CUSTOM HANDLER
    handleApplicationCommand: handleCommandPayload
})