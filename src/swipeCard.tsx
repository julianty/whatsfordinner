import { Card, Group, Image, Box, Title } from "@mantine/core";
import React from "react";
import { Status, SwipeCardProps } from "./types";
import { useSession } from "./useSession";
import SwipeCardButton from "./components/swipeCardButton";

function SwipeCard({ id, name, image }: SwipeCardProps) {
  const { setOptions } = useSession();
  const [status, setStatus] = React.useState<Status>("undecided");

  const getBorderColor = () => {
    switch (status) {
      case "yes":
        return "var(--color-yes)";
      case "no":
        return "var(--color-no)";
      default:
        return "var(--color-undecided)";
    }
  };
  function handleClick(status: Status) {
    setOptions((options) => {
      return options.map((option) => {
        if (option.id === id) {
          return {
            ...option,
            status,
          };
        }
        return option;
      });
    });
    setStatus(status);
  }
  return (
    <Card
      style={{
        border: `1px solid ${getBorderColor()}`,
        height: "70vh",
        width: "90vw",
        display: "flex",
        position: "relative",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {image && (
        <Card.Section style={{ maxHeight: "90%" }}>
          <Image style={{ height: "100%" }} src={image} alt={name} />
        </Card.Section>
      )}
      <Box
        bg="rgba(0,0,0,0.7)"
        style={{
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          minHeight: "10%",
          display: "flex",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <Title order={3}>{name}</Title>
      </Box>
      {/* {description && <Text>{description}</Text>} */}
      <Group justify="space-between" grow>
        <SwipeCardButton color="green" onClick={() => handleClick("yes")}>
          Yes
        </SwipeCardButton>
        <SwipeCardButton color="red" onClick={() => handleClick("no")}>
          No
        </SwipeCardButton>
      </Group>
    </Card>
  );
}

export default SwipeCard;
