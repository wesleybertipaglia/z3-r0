import { CommandResult } from "../../types/command";

export function useCowsay(...args: string[]): CommandResult {
    const message = args.join(" ") || "Moo!";
    const top = ` ${"_".repeat(message.length + 2)} `;
    const middle = `| ${message} |`;
    const bottom = ` ${"-".repeat(message.length + 2)} `;

    const cow = `
        ${top}
        ${middle}
        ${bottom}
                \\   ^__^
                \\  (oo)\\_______
                    (__)\\       )\\/\\
                        ||----w |
                        ||     ||
        `;

    return { content: cow, type: "code", style: "pre", };
}
