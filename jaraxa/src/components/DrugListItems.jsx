/* eslint-disable react/prop-types */
// to avoid extension warning

import { NavLink } from "react-router-dom";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TaskIcon from "@mui/icons-material/Task";

export const DrugListItems = ({ drugs }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 4, mb: 4 }}>
      {drugs.results.map((drug) => (
        <Grid
          component={"section"}
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          key={drug.set_id}
        >
          <Card
            sx={{
              maxWidth: 345,
              minHeight: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardActionArea
              sx={{ display: "flex", justifyContent: "start", flexGrow: 1 }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {drug.openfda.brand_name}
                </Typography>
                <Typography variant="subtitle1">
                  {drug.openfda.manufacturer_name}
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
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                component={NavLink}
                to={`/drug/${drug.set_id}`}
                variant="outlined"
                size="small"
                color="primary"
              >
                View More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
