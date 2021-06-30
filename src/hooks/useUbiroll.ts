import { useContext } from "react";
import { UbirollContext } from "../contexts/Ubiroll";

const useUbiroll = () => {
  return { ...useContext(UbirollContext) };
};

export default useUbiroll;
