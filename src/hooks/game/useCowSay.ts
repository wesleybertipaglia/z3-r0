import { CommandResult } from "../../types/command";

export function useCowsay(...args: string[]): CommandResult {
    const message = args.join(" ") || "Moo!";
    const maxLineLength = 80;
    const words = message.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
        if ((currentLine + word).length > maxLineLength) {
            lines.push(currentLine.trim());
            currentLine = "";
        }
        currentLine += word + " ";
    }
    if (currentLine) lines.push(currentLine.trim());

    const longestLine = Math.max(...lines.map(l => l.length));
    const horizontalLine = "_".repeat(longestLine + 4);
    const bottomLine = "-".repeat(longestLine + 4);

    const bubble = [
        ` ${horizontalLine} `,
        ...lines.map(line => `|  ${line.padEnd(longestLine, " ")}  |`),
        ` ${bottomLine} `,
    ].join("\n");

    const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;

    return {
        content: `${bubble}\n${cow}`,
        type: "code",
        style: "pre",
    };
}
