import React from "react";
import JsonSource from "../data/JsonSource";

export default (url: string, options: object, asSource: boolean): any => {
    const [response, setResponse] = React.useState(null as any);
    const [error, setError] = React.useState(null as any);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options);
                const json = await res.json();
                setResponse(asSource ? new JsonSource(json) : json);
            } catch (error) {    
                setError(error);
            }
        };

        fetchData();
    }, [url]);
    
    return { response, error };
  };