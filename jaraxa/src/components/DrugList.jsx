import successResponse from "../data/successResponse.json";
// import errorResponse from "../data/errorResponse.json";

import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Container,
  Tooltip,
  Grid,
  FormHelperText,
  FormControl,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { green } from "@mui/material/colors";
import { DrugListItems } from "./DrugListItems";
import { useSearch } from "../hooks/useSearch";

export const DrugList = () => {
  const { searchData, setSearchData, isFirstInput, error } = useSearch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      manufacturer: "",
    }));
  };

  const handleFormChange = (event) => {
    // coment toggle para checked
    const { name, value, checked } = event.target;

    setSearchData((prevSearchData) => ({
      ...prevSearchData,
      [name]: name === "OTC" ? checked : value,
    }));
    if (isFirstInput.current[name]) {
      console.log("test");
      isFirstInput.current[name] = false;
    }
  };

  return (
    <Container component={"main"}>
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
              error={!!error.substanceName}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Active ingredients"
                type="search"
                variant="outlined"
                name="substanceName"
                onChange={handleFormChange}
              />
              {error.substanceName && (
                <FormHelperText>{error.substanceName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* generic_name */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={!!error.genericName}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Generic Name"
                type="search"
                variant="outlined"
                name="genericName"
                value={searchData.genericName}
                onChange={handleFormChange}
              />
              {error.genericName && (
                <FormHelperText>{error.genericName}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* manufacturer_name */}
          <Grid item xs={12} sm={4}>
            <FormControl
              fullWidth
              error={!!error.manufacturer}
              variant="outlined"
              sx={{ my: 1 }}
            >
              <TextField
                label="Manufacturer"
                type="search"
                variant="outlined"
                name="manufacturer"
                value={searchData.manufacturer}
                onChange={handleFormChange}
              />
              {error.manufacturer && (
                <FormHelperText>{error.manufacturer}</FormHelperText>
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
          {/* legend */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <Tooltip title="Human OTC">
              <TaskIcon
                fontSize="large"
                sx={{
                  mt: 1,
                  mx: 1,
                  bgcolor: green[500],
                  color: "white",
                  borderRadius: "50%",
                  p: 1,
                  ":hover": {
                    bgcolor: green[700],
                  },
                }}
              />
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {/* grid with all the meds */}
      <DrugListItems successResponse={successResponse} />
    </Container>
  );
};
