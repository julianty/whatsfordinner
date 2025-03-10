import { SwipeCardProps } from "../types";
export default function generateShareableLink(options: SwipeCardProps[]) {
  const encoded = btoa(JSON.stringify(options));
  return `${window.location.origin}/?options=${encoded}`;
}
