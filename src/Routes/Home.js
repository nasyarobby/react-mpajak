import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import ButtonShortcutCreateBilling from "./../Components/ButtonShortcutCreateBilling";

export default function HomeRoute() {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2)
    }
  }));
  const classes = useStyles();
  return (
    <Paper mt="100" className={classes.root}>
      <ButtonShortcutCreateBilling />
    </Paper>
  );
}
