import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function ButtonShortcutCreateBilling() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} m={100}>
          <Button
            component={Link}
            variant="contained"
            color="secondary"
            fullWidth
            to="/rekam-ssp"
          >
            Buat e-Billing
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
