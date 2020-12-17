import { botCache } from "./cache.ts";
import { handleCommandPayload } from "./commandHandler.ts";
import { startServer } from "./deps.ts";
import { importDirectory } from "./utils/helpers.ts";

console.log("Beginning Startup Process...");

console.log("Step 1: Loading your commands.");
await importDirectory(Deno.realPathSync("./commands"));
console.log(`Loaded ${botCache.commands.size} commands.`);

// console.log("Step 2: Loading your arguments handlers.")
// await importDirectory(Deno.realPathSync("./arguments"));
// console.log(`Loaded ${botCache.commands.size} commands.`);

// console.log("Step 3: Loading your inhibitors");
// await importDirectory(Deno.realPathSync("./inhibitors"));
// console.log(`Loaded ${botCache.commands.size} commands.`);

// This fetch process makes sure we can avoid post/creating dupes on startup
console.log("Step 4: Fetching your applications existing commands.");
// TODO: Fetch the commands
// TODO: Loop the commands in cache and create any new ones or update modified ones.

console.log("Final Step: Starting server...");

startServer({
  publicKey: "PUBLIC_KEY_HERE_FROM_YOUR_BOT_DASHBOARD",
  // CHANGE THIS IF YOU DID NOT USE THE DEFAULT 80 AS ngrok said
  port: 8000,
  // YOUR CUSTOM HANDLER
  handleApplicationCommand: handleCommandPayload,
});
