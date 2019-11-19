import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import DescriptionIcon from "@material-ui/icons/Description";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const anchor = props.anchor || "left";
  const menuIsOpen = props.open || false;
  const onDrawerClose = props.onDrawerClose;
  const [state] = React.useState({
    drawerItems: [
      { icon: <HomeIcon />, text: "Home", path: "/" },
      { icon: <BookIcon />, text: "Peraturan", path: "/peraturan" }
    ],
    protectedDrawerItems: [
      { icon: <DescriptionIcon />, text: "Buat e-Billing", path: "/rekam-ssp" }
    ]
  });

  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={onDrawerClose}
      onKeyDown={onDrawerClose}
    >
      <List>
        {state.drawerItems.map((item, index) => (
          <ListItem component={Link} button key={item.text} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {state.protectedDrawerItems.map((item, index) => (
          <ListItem component={Link} button key={item.text} to={item.path}>
            <ListItemIcon>
              <ListItemIcon>{item.icon}</ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor={anchor} open={menuIsOpen} onClose={onDrawerClose}>
        {sideList()}
      </Drawer>
    </div>
  );
}
