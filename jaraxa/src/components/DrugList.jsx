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
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import { useState } from "react";
import { green } from "@mui/material/colors";
import { DrugListItems } from "./DrugListItems";
import { useSearch } from "../hooks/useSearch";

export const DrugList = () => {
  const { searchData, setSearchData, error } = useSearch();
  console.log("searchData"+searchData);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
    setSearchData(prevSearchData => ({ ...prevSearchData, manufacturer: ''  }))
  };

  const handleFormChange = (event) => {
    // coment toggle para checked
    const { name, value, checked } = event.target;
    setSearchData(prevSearchData => ({ ...prevSearchData, [name]: checked? checked : value }));
  };
  return (
    <Container component={"main"}>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h1"
      >
        Drugs
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 1,
            display: "flex",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            mt: 4,
            gap: 2,
          }}
        >
          {/* substance_name */}
          <TextField
            label="Active ingredients"
            type="search"
            variant="outlined"
            margin="normal"
            sx={{ my: 0 }}
            name="substanceName"
            onChange={handleFormChange}
          />
          {/* generic_name */}
          <TextField
            label="Generic Name"
            type="search"
            variant="outlined"
            margin="normal"
            sx={{ my: 0 }}
            name="genericName"
            onChange={handleFormChange}
            value={searchData.genericName}
          />
          {/* manufacturer_name */}
          <TextField
            label="Manufacturer"
            type="search"
            variant="outlined"
            margin="normal"
            sx={{ my: 0 }}
            name="manufacturer"
            onChange={handleFormChange}
            value={searchData.manufacturer}
          />

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

          <Button variant="outlined" color="primary" type="submit">
            Search
          </Button>
        </Box>
      </form>

      {/* legend */}
      <Box>
        <Tooltip title="Human OTC">
          <TaskIcon
            fontSize="large"
            sx={{
              mt: 1,
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
      </Box>
      {/* grid with all the meds */}
      {/* <DrugListItems successResponse={successResponse} /> */}
    </Container>
  );
};
