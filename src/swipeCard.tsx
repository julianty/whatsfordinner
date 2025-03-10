import { Button, Card, Group, Text, Image } from "@mantine/core";
import React from "react";
import { Status, SwipeCardProps } from "./types";
import { useSession } from "./useSession";

function SwipeCard({ id, name, image, description }: SwipeCardProps) {
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
      }}
    >
      {image && (
        <Card.Section>
          <Image src={image} alt={name} />
        </Card.Section>
      )}
      <Text>{name}</Text>
      {description && <Text>{description}</Text>}
      <Group>
        <Button onClick={() => handleClick("yes")}>Yes</Button>
        <Button onClick={() => handleClick("no")}>No</Button>
      </Group>
    </Card>
  );
}

export default SwipeCard;
