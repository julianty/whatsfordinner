import Navbar from "./navbar";
import { Group, MantineProvider, Stack } from "@mantine/core";
import SwipeContainer from "./swipeContainer";
import NewSessionButton from "./newSessionButton";
import { SessionProvider } from "./sessionContext";

function App() {
  return (
    <MantineProvider>
      <SessionProvider>
        <Navbar />
        <Stack
          gap="lg"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            padding: "1rem",
          }}
        >
          <NewSessionButton />
          <Group>
            <SwipeContainer />
          </Group>
        </Stack>
      </SessionProvider>
    </MantineProvider>
  );
}

export default App;
