import { createContext } from "react";
import React from "react";
import { SwipeCardProps } from "./types";

// const defaultOptions = [
//   {
//     id: "1",
//     name: "Pizza",
//     description: "A classic choice",
//     status: "undecided" as Status,
//   },
//   {
//     id: "2",
//     name: "Sushi",
//     description: "Raw fish",
//     status: "undecided" as Status,
//   },
//   {
//     id: "3",
//     name: "Burgers",
//     description: "Juicy beef",
//     status: "undecided" as Status,
//   },
// ];

type SessionContextType = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  options: SwipeCardProps[];
  setOptions: React.Dispatch<React.SetStateAction<SwipeCardProps[]>>;
  optionsFromURL?: SwipeCardProps[];
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [options, setOptions] = React.useState<SwipeCardProps[]>([]);
  const [optionsFromURL, setOptionsFromURL] = React.useState<
    SwipeCardProps[] | undefined
  >(undefined);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedOptions = urlParams.get("options");
    if (!encodedOptions) {
      return;
    }
    try {
      setOptionsFromURL(JSON.parse(atob(encodedOptions || "")));
    } catch (e) {
      console.error("Error parsing options from URL", e);
    }
  }, []);

  if (optionsFromURL && options.length === 0) {
    // Copy the options but set all status to undecided
    setOptions(
      optionsFromURL.map((option) => ({ ...option, status: "undecided" }))
    );
  }
  return (
    <SessionContext.Provider
      value={{ active, setActive, options, setOptions, optionsFromURL }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContext;
