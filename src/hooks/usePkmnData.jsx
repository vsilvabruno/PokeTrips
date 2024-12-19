import { useState, useEffect } from "react";
import getPkmnData from "../services/pkmnService";

function usePkmnData(pkmnNames) {
  const [pkmnData, setPkmnData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pkmnNames && pkmnNames.length > 0) {
      (async function () {
        try {
          const result = await getPkmnData(pkmnNames);
          setPkmnData(result);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [pkmnNames]);

  return { pkmnData, loading, error };
}

export default usePkmnData;