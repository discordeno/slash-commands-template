import { botCache } from "./util/cache.ts";

console.log(`Loaded ${botCache.commands.size} command(s).`);

// TODO: implement arguments
console.log(`Loaded ${botCache.arguments.size} custom argument(s).`);

// TODO: implement inhibitors
console.log(`Loaded ${botCache.inhibitors.size} inhibitor(s).`);

// This fetch process makes sure we can avoid post/creating dupes on startup
// TODO: Fetch the commands
// TODO: Loop the commands in cache and create any new ones or update modified ones.
