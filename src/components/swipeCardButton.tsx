import React from "react";
import { Button, ButtonProps } from "@mantine/core";

type SwipeCardButtonProps = ButtonProps & {
  onClick: () => void;
};

const SwipeCardButton: React.FC<SwipeCardButtonProps> = (props) => {
  return <Button size="lg" {...props} />;
};
export default SwipeCardButton;
