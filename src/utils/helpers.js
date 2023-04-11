const icons = ["💯", "🤝", "🔥", "⚡️", "🤖", "🦾", "🧠", "🍕", "🏀", "🚀"];
export const giveRandomIcon = () => {
  return icons[Math.floor(Math.random() * 10)] || "💻";
};
