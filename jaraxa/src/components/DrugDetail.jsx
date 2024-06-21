import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDrugs } from "../hooks/useDrugs";
import { useSearch } from "../hooks/useSearch";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { green, red } from "@mui/material/colors";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TaskIcon from "@mui/icons-material/Task";

export const DrugDetail = () => {
  const { drugId } = useParams();
  const navigate = useNavigate();
  const { drugs, getDrugs, loading, error } = useDrugs();
  const { setSearchData } = useSearch();

  useEffect(() => {
    // añadir id a searchData para el fetch
    setSearchData((prev) => ({ ...prev, id: drugId }));
    getDrugs({ id: drugId });
  }, [drugId, setSearchData, getDrugs]);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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
  if (loading) {
    return (
      <Box
        sx={{
          w: 1,
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          my: 4,
        }}
      >
        <CircularProgress size={80}></CircularProgress>
      </Box>
    );
  }

  return drugs.results.map((drug) => (
    <Container
      sx={{ mt: 4, minHeight: "90vh" }}
      component={"main"}
      key={drug.set_id}
    >
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
      ;
      <Box component={"header"}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate(-1)}
          sx={{ mb: 4 }}
        >
          <ArrowBackIcon />
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <Typography variant="h3" component="div" sx={{ mr: 1, mb: 0 }}>
            {drug.openfda.brand_name}
          </Typography>
          {drug.openfda.product_type == "HUMAN OTC DRUG" ? (
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
          ) : (
            <Tooltip title="Human Prescription Drug">
              <RequestPageIcon
                fontSize="large"
                sx={{
                  mt: 1,
                  bgcolor: red[500],
                  color: "white",
                  borderRadius: "50%",
                  p: 1,
                  ":hover": {
                    bgcolor: red[700],
                  },
                }}
              />
            </Tooltip>
          )}
        </Box>
      </Box>
      <Box component={"section"} sx={{ mt: 3 }}>
        <Grid container spacing={2} rowSpacing={4}>
          {drug.openfda.product_type !== "HUMAN OTC DRUG" && (
            <Grid item xs={12} sm={12}>
              <Box component={"article"}>
                <Typography variant="h5">Ingredients</Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {drug.spl_product_data_elements}
                </Typography>
              </Box>
            </Grid>
          )}
          {drug.openfda.product_type == "HUMAN OTC DRUG" && (
            <>
              <Grid item xs={12} sm={6}>
                <Box component={"article"}>
                  <Typography variant="h5">Active Ingredients</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {drug.active_ingredient}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box component={"article"}>
                  <Typography variant="h5">Inactive Ingredients</Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {drug.inactive_ingredient}
                  </Typography>
                </Box>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={2} md={1}>
            <Box component={"article"}>
              <Typography variant="h5">Route</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {drug.openfda.route}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} md={3}>
            <Box component={"article"}>
              <Typography variant="h5">
                Pharmacologic class by mechanism of action.
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {drug.openfda.pharm_class_moa}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={5} md={4}>
            <Box component={"article"}>
              <Typography variant="h5">
                Pharmacologic class by chemical structure
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {drug.openfda.pharm_class_cs}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box component={"article"}>
              <Typography variant="h5">
                Pharmacologic class by established pharmacologic class.
              </Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                {drug.openfda.pharm_class_epc}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  ));
};
