export const mixpanel = (eventName, properties) => {
  const MIXPANEL = window.mixpanel;
  MIXPANEL.track(eventName, properties);
};
export const mixpanelSetUser = (
  Name,
  userId,
  telegramUsername,
  walletAddress
) => {
  window.mixpanel.identify(walletAddress);
  window.mixpanel.people.set({
    userId,
    telegramUsername,
    walletAddress,
    $Name: Name,
    Name,
  });
};
