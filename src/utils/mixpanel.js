export const mixpanel = (eventName, properties) => {
  const MIXPANEL = window.mixpanel;
  MIXPANEL.track(eventName, properties);
};
