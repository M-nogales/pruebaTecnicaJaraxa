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
} from "@mui/material";
import { DrugListItems } from "./DrugListItems";
import { useSearch } from "../hooks/useSearch";
import { useDrugs } from "../hooks/useDrugs";
import {  useEffect, useState } from "react";

export const DrugList = () => {
  const {
    searchData,
    setSearchData,
    isFirstInput,
    error: inputError,
  } = useSearch();

  const { drugs, getDrugs, loading, error } = useDrugs();

  const [submitted,setSubmitted] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    getDrugs(searchData);
    setSearchData({
      substanceName: "",
      genericName: "",
      manufacturer: "",
      OTC: false,
    });
    setSubmitted(true);
    setOpenBackdrop(true);
    isFirstInput.current = {
      substanceName: true,
      genericName: true,
      manufacturer: true,
    };
  };

  useEffect(() => {
    if (error) {
      setOpenSnackbar(true);
      setOpenBackdrop(false);
    }
  }, [error]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenBackdrop(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [openBackdrop]);

  const handleFormChange = (event) => {
    // coment toggle para checked
    const { name, value, checked } = event.target;

    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: name === "OTC" ? checked : value,
    }));

    if (isFirstInput.current[name]) {
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
       {submitted &&  drugs && (
         <DrugListItems drugs={drugs} />

      )} 

    </Container>
  );
};
