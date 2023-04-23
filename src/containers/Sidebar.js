import React from "react";

import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemIcon,
} from "@mui/material";

import { Auth, API, graphqlOperation } from "aws-amplify";

import { createPost } from "../graphql/mutations";
import { useHistory } from "react-router";

const drawerWidth = 340;
const MAX_POST_CONTENT_LENGTH = 140;

export default function Sidebar({ activeListItem }) {
  const history = useHistory();

  const [value, setValue] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
      setIsError(true);
      setHelperText(MAX_POST_CONTENT_LENGTH - event.target.value.length);
    } else {
      setIsError(false);
      setHelperText("");
    }
  };

  const onPost = async () => {
    const res = await API.graphql(
      graphqlOperation(createPost, {
        input: {
          id: uuidv4(),
          type: "post",
          content: value,
          timestamp: 200,
        },
      })
    );

    console.log(res);
    setValue("");
  };

  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "relative",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box />
      <List>
        <ListItem
          button
          selected={activeListItem === "global-timeline"}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push("/global-timeline");
            });
          }}
          key="global-timeline"
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Global Timeline" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === "profile"}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push("/" + user.username);
            });
          }}
          key="profile"
        >
          <ListItemIcon></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem key="post-input-field">
          <ListItemText
            primary={
              <TextField
                error={isError}
                helperText={helperText}
                id="post-input"
                label="Type your post!"
                multiline
                rowsmax="8"
                variant="filled"
                value={value}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            }
          />
        </ListItem>
        <ListItem key="post-button">
          <ListItemText
            primary={
              <Button
                variant="contained"
                color="primary"
                disabled={isError}
                onClick={onPost}
                fullWidth
              >
                Post
              </Button>
            }
          />
        </ListItem>
        <ListItem key="logout">
          <ListItemText
            primary={
              <Button variant="outlined" onClick={signOut} fullWidth>
                Logout
              </Button>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
}

/* eslint-disable */
// ----------------------------------------------------------------------

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
