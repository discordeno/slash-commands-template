import { Interaction, InteractionResponse } from "../deps.ts";

export interface SlashArgument {
    /** The name of the argument. This MUST be unique. */
    name: string;
}

export interface SlashCommand {
    /** The name of the command. This MUST be unique and LOWERCASE. 3-32 charcters. */
    name: string;
    /** The description of the command for your users to understand what it does. 1-100 characters. */
    description: string;
    /** The type of command. Either global or guild. By default this will be global. */
    type?: "global" | "guild";
    /** The function that will be executed when this command is ran */
    execute(payload: Interaction, args: any): Promise<{
        status?: number | undefined;
        body: InteractionResponse;
    }>;
    /** The subcommands */
    subcommands?: SlashCommand[];
}

export interface SlashInhibitor {
    /** The name of the inhibitor. This MUST be unique. */
    name: string;
}