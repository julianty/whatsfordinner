import { Group, Stack, Text } from "@mantine/core";
import SwipeCard from "./swipeCard.tsx";
import { useSession } from "./useSession.tsx";
import React from "react";
import generateShareableLink from "./lib/generateShareableLink.ts";
import findMatchingOptions from "./lib/findMatchingOptions.ts";
function SwipeContainer() {
  const { options, optionsFromURL } = useSession();
  const shareableLink = React.useMemo(() => {
    return generateShareableLink(options);
  }, [options]);

  const allOptionsDecided = React.useMemo(
    () => options.every((option) => option.status !== "undecided"),
    [options]
  );

  return (
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Group>
        {options.map((option) => {
          return <SwipeCard key={option.id} {...option} />;
        })}
      </Group>
      {allOptionsDecided &&
        options.length !== 0 &&
        optionsFromURL == undefined && (
          <div>
            <Text> Copy the link below and send it to a friend</Text>
            <pre>{shareableLink}</pre>
          </div>
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
