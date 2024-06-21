/* eslint-disable react/prop-types */
// coment to avoid extension warning

import { useEffect, useRef, useState } from "react";

export const useSearch = () => {
  const [searchData, setSearchData] = useState({
    id: "",
    substanceName: "",
    genericName: "",
    manufacturer: "",
    OTC: false,
  });
  const [error, setError] = useState({});
  const isFirstInput = useRef({
    substanceName: true,
    genericName: true,
    manufacturer: true,
  });
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
