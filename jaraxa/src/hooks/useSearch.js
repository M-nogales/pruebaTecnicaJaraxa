/* eslint-disable react/prop-types */
// coment to avoid extension warning

import React, { useRef, useState } from "react";

export const useSearch = () => {
  const [searchData, setSearchData] = useState({
    substanceName: "",
    genericName: "",
    manufacturer: "",
    OTC: false,
  });
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  return { searchData, error, setSearchData };
};
