import Navbar from "./navbar";
import { Group, MantineProvider, Stack } from "@mantine/core";
import SwipeContainer from "./swipeContainer";
import NewSessionButton from "./newSessionButton";
import { SessionProvider } from "./sessionContext";

function App() {
  return (
    <MantineProvider>
      <SessionProvider>
        <Stack
          gap="lg"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Navbar />
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
