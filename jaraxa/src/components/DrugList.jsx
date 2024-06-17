import { Link } from "react-router-dom";

import successResponse from "../data/successResponse.json";
// import errorResponse from "../data/errorResponse.json";

import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";

export const DrugList = () => {
  const [checked, setChecked] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submited");
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <Typography
        sx={{ display: "flex", justifyContent: "center" }}
        variant="h1"
        color="initial"
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
          />
          {/* generic_name */}
          <TextField
            label="Generic Name"
            type="search"
            variant="outlined"
            margin="normal"
            sx={{ my: 0 }}
          />
          {/* manufacturer_name */}
          <TextField
            label="Manufacturer"
            type="search"
            variant="outlined"
            margin="normal"
            sx={{ my: 0 }}
          />

          {/* openfda.product_type (HUMAN OTC DRUG) */}
          <FormControlLabel
            label="OTC"
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheck}
                color="primary"
              />
            }
          />

          <Button variant="outlined" color="primary" type="submit">
            Search
          </Button>
        </Box>
      </form>
      <ul>
        {successResponse.results.map((drug) => (
          <li key={drug.set_id}>
            <Link to={`/drug/${drug.set_id}`}>{drug.openfda.brand_name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
