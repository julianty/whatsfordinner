import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Text, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "./useSession";
import { Status } from "./types";
function NewSessionButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const { options, setOptions } = useSession();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
  });

  function handleSubmitOption(values: { name: string }) {
    const newOption = {
      id: values.name + Math.random().toString(),
      name: values.name,
      status: "undecided" as Status,
    };
    setOptions([...options, newOption]);
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="New Session">
        {options.length === 0 && (
          <Text>Use the form below to add options to your session</Text>
        )}
        <Stack>
          <ul>
            {options.map((option) => {
              return <li key={option.id}>{option.name}</li>;
            })}
          </ul>
          <form onSubmit={form.onSubmit(handleSubmitOption)}>
            <TextInput
              label="Add option"
              placeholder="Enter an option.."
              key={form.key("name")}
              rightSection={<Button type="submit">Add</Button>}
              rightSectionWidth={65}
              {...form.getInputProps("name")}
            />
          </form>
          <Button
            disabled={options.length === 0 ? true : false}
            onClick={close}
            variant="outline"
          >
            Start
          </Button>
        </Stack>
      </Modal>
      <Button onClick={open}>Create new session</Button>
    </>
  );
}

export default NewSessionButton;
