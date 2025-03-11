import { Title } from "@mantine/core";

function Navbar() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <Title order={1}>What's for dinner?</Title>
    </div>
  );
}

export default Navbar;
