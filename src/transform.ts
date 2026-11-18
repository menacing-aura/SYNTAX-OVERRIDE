export function runDemoOverride(source: string, instruction: string): string {
  const command = instruction.trim().toLowerCase();
  let output = source;

  if (!command) {
    return source;
  }

  if (command.includes("console") || command.includes("log")) {
    output = output
      .split("\n")
      .filter((line) => !line.includes("console.log"))
      .join("\n");
  }

  if (command.includes("const")) {
    output = output.replace(
      /\blet\s+([A-Za-z_$][\w$]*)\s*=\s*([^;\n]+);/g,
      "const $1 = $2;"
    );
  }

  if (command.includes("return type") || command.includes("strict return")) {
    output = output.replace(
      "function formatUser(user: User) {",
      "function formatUser(user: User): string {"
    );
  }

  if (output === source) {
    output =
      "// SYNTAX // OVERRIDE\n" +
      "// Preview only: " +
      instruction.trim().replace(/\n/g, " ") +
      "\n\n" +
      source;
  }

  return output;
}
