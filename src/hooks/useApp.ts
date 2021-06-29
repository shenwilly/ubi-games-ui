import { useContext } from "react";
import { AppContext } from "../contexts/App";

const useApp = () => {
  return { ...useContext(AppContext) };
};

export default useApp;
