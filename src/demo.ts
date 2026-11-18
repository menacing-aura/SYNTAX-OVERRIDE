export const starterCode = `type User = {
  name: string;
  role: string;
};

function formatUser(user: User) {
  console.log("Formatting", user.name);
  let label = user.name + " · " + user.role;
  return label;
}

const currentUser = { name: "Nova", role: "developer" };
console.log(formatUser(currentUser));
`;

export const presets = [
  {
    name: "Clean Console",
    command: "Remove console logs",
    description: "Strip console logging from this file."
  },
  {
    name: "Const Sweep",
    command: "Prefer const where possible",
    description: "Replace simple let declarations with const."
  },
  {
    name: "Strict Return",
    command: "Add explicit return types",
    description: "Add a return type to the demo function."
  }
] as const;
