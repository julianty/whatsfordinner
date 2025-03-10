import React from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { useSession } from "./useSession";
import { Status } from "./types";
function NewSessionButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const { options, setOptions } = useSession();

  function handleSubmitOption(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newOption = {
      id: formData.get("name") + Math.random().toString(),
      name: formData.get("name") as string,
      status: "undecided" as Status,
    };
    setOptions([...options, newOption]);
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="New Session">
        <ul>
          {options.map((option) => {
            return <li key={option.id}>{option.name}</li>;
          })}
        </ul>
        <form onSubmit={handleSubmitOption}>
          <input name="name" placeholder="Sushi"></input>
          <Button type="submit">Add</Button>
        </form>
      </Modal>
      <Button onClick={open}>Create new session</Button>
    </>
  );
}

export default NewSessionButton;
