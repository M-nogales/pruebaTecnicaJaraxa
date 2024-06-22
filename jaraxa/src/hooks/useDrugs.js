import { useCallback, useRef, useState } from "react";
import { fetchDrugs } from "../services/fetchDrugs";
// created to fetch and use searchData easily
export const useDrugs = () => {
  const [drugs, setDrugs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // save of last input to stop useless fetch of data
  const prevInput = useRef(null);

  const getDrugs = useCallback(async (searchData, limit = 12, skip = 0) => {
    if (!searchData) return;

    const currentSearch = { ...searchData, limit, skip };
    console.log("searchData " +JSON.stringify(searchData) + " limit " +limit +" skip "+ skip);
    //check para evitar fetch de lo mismo
    if (JSON.stringify(currentSearch) === JSON.stringify(prevInput.current)) {
      return null;
    }
    console.log("llega");
    try {
      setLoading(true);
      setError(null);
      const drugs = await fetchDrugs(searchData, limit, skip);
      setDrugs(drugs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      prevInput.current = currentSearch;
    }
  }, []);
  
  return { drugs, getDrugs, loading, error };
};
