import { Button, CopyButton, Stack, Text } from "@mantine/core";
import SwipeCard from "./swipeCard.tsx";
import { useSession } from "./useSession.tsx";
import React from "react";
import generateShareableLink from "./lib/generateShareableLink.ts";
import findMatchingOptions from "./lib/findMatchingOptions.ts";
import { SwipeCardProps } from "./types.ts";
function SwipeContainer() {
  const { options, optionsFromURL } = useSession();
  const shareableLink = React.useMemo(() => {
    return generateShareableLink(options);
  }, [options]);

  const allOptionsDecided = React.useMemo(
    () => options.every((option) => option.status !== "undecided"),
    [options]
  );
  function getNextOption(options: SwipeCardProps[]) {
    const nextOption = options.find((option) => option.status === "undecided");
    if (nextOption) {
      return <SwipeCard key={nextOption.id} {...nextOption} />;
    }
  }
  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!allOptionsDecided && getNextOption(options)}
      {allOptionsDecided &&
        options.length !== 0 &&
        optionsFromURL == undefined && (
          <Stack style={{ width: "50%" }}>
            <Text> Copy the link below and send it to a friend</Text>
            <Text truncate="end" style={{ textWrap: "nowrap" }}>
              {shareableLink}
            </Text>
            <CopyButton value={`${shareableLink}`}>
              {({ copied, copy }) => (
                <Button color={copied ? "teal" : "blue"} onClick={copy}>
                  {copied ? "Copied url" : "Copy url"}
                </Button>
              )}
            </CopyButton>
          </Stack>
        )}
      {optionsFromURL && (
        <Text>
          {" "}
          You are viewing a session from a shared link. You cannot modify the
          options.
        </Text>
      )}
      {optionsFromURL && allOptionsDecided && (
        <>
          <Text>
            {" "}
            All options have been decided. You can no longer modify the options.
          </Text>
          {findMatchingOptions(options, optionsFromURL).length !== 0 &&
            findMatchingOptions(options, optionsFromURL).map((option) => {
              return <Text>{option.name}</Text>;
            })}
        </>
      )}
    </Stack>
  );
}

export default SwipeContainer;
