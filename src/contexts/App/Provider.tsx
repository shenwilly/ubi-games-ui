import React, { useCallback, useState, useEffect } from "react";
import Context from "./Context";

const Provider: React.FC = ({ children }) => {
    const [data, setData] = useState<any>("");

    const fetchData = useCallback(() => {
        setData("1");
    }, []);

    return (
        <Context.Provider
            value={{
                data,
                handler: fetchData
            }}>
            {children}
        </Context.Provider>
    );
};

export default Provider;