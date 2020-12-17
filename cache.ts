import {
  SlashArgument,
  SlashCommand,
  SlashInhibitor,
} from "./types/commands.ts";

export const botCache = {
  arguments: new Map<string, SlashArgument>(),
  commands: new Map<string, SlashCommand>(),
  inhibitors: new Map<string, SlashInhibitor>(),
};
