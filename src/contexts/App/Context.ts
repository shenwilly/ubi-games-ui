import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
    data: "",
    handler: () => {},
});

export default Context;
