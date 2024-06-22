import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Container,
  Grid,
  FormHelperText,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Pagination,
} from "@mui/material";

import {  useEffect, useState } from "react";

import { useSearch } from "../hooks/useSearch";
import { useDrugs } from "../hooks/useDrugs";
import { DrugListItems } from "./DrugListItems";

export const DrugList = () => {
  const {
    searchData,
    setSearchData,
    isFirstInput,
    error: inputError,
  } = useSearch();

  const { drugs, getDrugs, loading, error } = useDrugs();

  // control and visual hooks
  const [submitted,setSubmitted] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // page control
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // on page change if an error appears set searchData empty and not add pages
  // event needed for MaterialUI pagination, else value will get an object
  const handlePageChange = (event,value) => {
    if (error) {
      setSearchData({
        substanceName: "",
        genericName: "",
        manufacturer: "",
        OTC: false,
      });
    }else{
      setCurrentPage(value);
      getDrugs(searchData, itemsPerPage, (value - 1) * itemsPerPage);
    }
  };
  // on Submit, pass searchData and inicial page to 0
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputError.substanceName || inputError.genericName || inputError.manufacturer) {
      return;
    }
    getDrugs(searchData, itemsPerPage, 0);
    setCurrentPage(1);
    setSubmitted(true);
    setOpenBackdrop(true);
    isFirstInput.current = {
      substanceName: true,
      genericName: true,
      manufacturer: true,
    };
  };
  // useEffects to check if there´s new errors, spawn backdrop
  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
      setOpenBackdrop(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenBackdrop(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [openBackdrop]);

  const handleFormChange = (event) => {
    // save of input name and his value in search hook, in case of checkbox guardamos checked no value
    const { name, value, checked } = event.target;

    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: name === "OTC" ? checked : value,
    }));
    // update useRef, if the value is empty and is not the firstInput,change it
    // if the value is not empty and is the firstInput,change it
    if (value === "" && isFirstInput.current[name] === false) {
      isFirstInput.current[name] = true;
    } else if (value !== "" && isFirstInput.current[name] === true) {
      isFirstInput.current[name] = false;
    }
  };

  return (
    <Container component={"main"} sx={{minHeight:"90vh"}}>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h1"
      >
        Drugs
      </Typography>
      <Box
        sx={{
          width: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          mt: 4,
          px: 4,
          gap: 2,
        }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          {/* substance_name */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={!!inputError.substanceName}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Active ingredients"
                type="search"
                variant="outlined"
                name="substanceName"
                error={!!inputError.substanceName}
                value={searchData.substanceName}
                onChange={handleFormChange}
              />
              {inputError.substanceName && (
                <FormHelperText>{inputError.substanceName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* generic_name */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={!!inputError.genericName}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Generic Name"
                type="search"
                variant="outlined"
                name="genericName"
                error={!!inputError.genericName}
                value={searchData.genericName}
                onChange={handleFormChange}
              />
              {inputError.genericName && (
                <FormHelperText>{inputError.genericName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* manufacturer_name */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={!!inputError.manufacturer}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Manufacturer"
                type="search"
                variant="outlined"
                name="manufacturer"
                value={searchData.manufacturer}
                error={!!inputError.manufacturer}
                onChange={handleFormChange}
              />
              {inputError.manufacturer && (
                <FormHelperText>{inputError.manufacturer}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ textAlign: "center" }}>
            {/* openfda.product_type (HUMAN OTC DRUG) */}
            <FormControlLabel
              label="OTC"
              control={
                <Checkbox
                  checked={searchData.OTC}
                  onChange={handleFormChange}
                  color="primary"
                  name="OTC"
                />
              }
            />

            {/* Button */}
            <Button variant="outlined" color="primary" type="submit">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      {/* Snackbar for Error Message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="error">
          Error: {error}
        </Alert>
      </Snackbar>
      {/* grid with all the drugs */}
      {submitted  && loading && (
        <Box sx={{w:1,display:"flex",justifyContent:"center",my:4}}>
        <CircularProgress size={80}></CircularProgress>
        </Box>
      )}
      {/*DrugItems, only visible if you submitted, u get a results an there´s no errors on search */}
       {submitted &&  drugs && !error &&(
        <>
         <DrugListItems drugs={drugs} />
         {/* only if there´s more than 1 page, */}
         {drugs.meta.results.total > itemsPerPage && (
          <Pagination
            count={Math.ceil(drugs.meta.results.total / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{ mt: 4, display: "flex", justifyContent: "center" }}
          />
        )}
        </>
      )} 

    </Container>
  );
};
