type Gtag = (
  command: "event",
  eventName: string,
  params?: Record<string, string | number>
) => void;

export const trackEvent = (
  eventName: string,
  params?: Record<string, string | number>
) => {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", eventName, params);
};
