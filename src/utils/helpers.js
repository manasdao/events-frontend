const icons = ["💯", "🤝", "🔥", "⚡️", "🤖", "🦾", "🧠", "🍕", "🏀", "🚀"];
export const giveRandomIcon = () => {
  return icons[Math.floor(Math.random() * 10)] || "💻";
};

export const linkGenerator = (type, id) => {
  switch (type) {
    case "EVENT":
      return `/event/${id}`;
    case "SIDE_EVENT":
      return `/event/${id}`;
    case "SPEAKER":
      return `/speaker/${id}`;
    case "SPONSOR":
      return `/sponsor/${id}`;
    case "HOTELS":
      return `/explore`;
    case "GENERAL":
      return `/schedule`;

    default:
      return `/schedule`;
  }
};
