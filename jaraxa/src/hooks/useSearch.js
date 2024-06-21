import { useEffect, useRef, useState } from "react";

// created to controll searchs
export const useSearch = () => {
  // useState that is going to save the searchData with a default obj
  const [searchData, setSearchData] = useState({
    id: "",
    substanceName: "",
    genericName: "",
    manufacturer: "",
    OTC: false,
  });
  const [error, setError] = useState({});
  // use the use ref to save between renders, only changes
  // if i write over an input
  const isFirstInput = useRef({
    substanceName: true,
    genericName: true,
    manufacturer: true,
  });
  // validation of a few cases for the inputs
  const validate = (data) => {
    const newErrors = {};

    if (!isFirstInput.current.substanceName && data.substanceName.length < 3) {
      newErrors.substanceName = 'Debe contener al menos 3 letras';
    } else if (data.substanceName.length > 20) {
      newErrors.substanceName = 'Debe contener un máximo de 20 letras';
    }

    if (!isFirstInput.current.genericName && data.genericName.length < 3) {
      newErrors.genericName = 'Debe contener al menos 3 letras';
    } else if (data.genericName.length > 20) {
      newErrors.genericName = 'Debe contener un máximo de 20 letras';
    }

    if (!isFirstInput.current.manufacturer && data.manufacturer.length < 3) {
      newErrors.manufacturer = 'Debe contener al menos 3 letras';
    } else if (data.manufacturer.length > 20) {
      newErrors.manufacturer = 'Debe contener un máximo de 20 letras';
    }

    return newErrors;
  };
  useEffect(() => {
     const newErrors = validate(searchData);
    setError(newErrors);
  }, [searchData]);

  return { searchData, setSearchData, isFirstInput, error };
};
