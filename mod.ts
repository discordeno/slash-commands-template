import { botCache } from "./util/cache.ts";
import { handleCommandPayload } from "./util/commandHandler.ts";
import { startServer } from "./deps.ts";
import { importDirectory } from "./util/helpers.ts";
import { PORT, PUBLIC_KEY } from "./configs.ts";

await importDirectory(Deno.realPathSync("./commands"));
console.log(`Loaded ${botCache.commands.size} command(s).`);

// TODO: implement arguments
// await importDirectory(Deno.realPathSync("./arguments"));
console.log(`Loaded ${botCache.arguments.size} custom argument(s).`);

// TODO: implement inhibitors
// await importDirectory(Deno.realPathSync("./inhibitors"));
console.log(`Loaded ${botCache.inhibitors.size} inhibitor(s).`);

// This fetch process makes sure we can avoid post/creating dupes on startup
// TODO: Fetch the commands
// TODO: Loop the commands in cache and create any new ones or update modified ones.

await startServer({
  publicKey: PUBLIC_KEY,
  port: PORT,
  // YOUR CUSTOM HANDLER
  handleApplicationCommand: handleCommandPayload,
});
console.log(`Successfully listening to port ${PORT}`);
