import { SwipeCardProps } from "../types";

export default function findMatchingOptions(
  options: SwipeCardProps[],
  optionsFromURL: SwipeCardProps[] | undefined
) {
  if (!optionsFromURL) {
    return [];
  }
  const matchingOptions = options.filter((option) => {
    const isYes = option.status === "yes";
    if (isYes) {
      const isMatching = optionsFromURL.some((optionFromURL) => {
        return optionFromURL.id === option.id && optionFromURL.status === "yes";
      });
      return isMatching;
    }
    return false;
  });
  return matchingOptions;
}
