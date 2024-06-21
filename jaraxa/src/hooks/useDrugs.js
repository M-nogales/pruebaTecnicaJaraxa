import { useCallback, useRef, useState } from "react";
import { fetchDrugs } from "../services/fetchDrugs";
// created to fetch and use searchData easily
export const useDrugs = () => {
  const [drugs, setDrugs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // save of last input to stop useless fetch of data
  const prevInput = useRef(null);

  const getDrugs = useCallback(async (searchData) => {
    if (!searchData) return;

    //check para evitar fetch de lo mismo
    if (JSON.stringify(searchData) === JSON.stringify(prevInput.current)) {
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      const drugs = await fetchDrugs(searchData);
      setDrugs(drugs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      prevInput.current = searchData;
    }
  }, []);
  
  return { drugs, getDrugs, loading, error };
};
