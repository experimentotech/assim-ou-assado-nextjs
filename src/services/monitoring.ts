import { sendGTMEvent } from "@next/third-parties/google";

export function track(event: object): void {
  console.log('tracking event', event);
  sendGTMEvent(event);
}
