import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Stack, Autocomplete } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "./useSession";
import { Status } from "./types";
import dinnerOptions from "./data/dinnerOptions.json";
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
    // Check if the option has an image
    const option = dinnerOptions.find((option) => option.name === values.name);
    const newOption = {
      id: values.name + Math.random().toString(),
      name: values.name,
      status: "undecided" as Status,
      image: option?.image,
    };
    setOptions([...options, newOption]);
    form.reset();
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
            <Autocomplete
              label="Add option"
              data={dinnerOptions.map((option) => option.name)}
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <Button type="submit">Add</Button>
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
