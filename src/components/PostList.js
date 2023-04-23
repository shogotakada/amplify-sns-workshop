import React from "react";

import {
  Box,
  styled,
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from "@mui/material";

import { useHistory } from "react-router";
import moment from "moment";

const ListRoot = styled(Box)({
  width: "100%",
  wordBreak: "break-all",
  overflow: "scroll",
  borderRight: "1px solid #37444C",
});

const Loader = styled(Box)({
  textAlign: "center",
  paddingTop: 20,
});

export default function PostList({
  isLoading,
  posts,
  getAdditionalPosts,
  listHeaderTitle,
  listHeaderTitleButton,
}) {
  return (
    <ListRoot>
      {isLoading ? (
        <Loader>
          <CircularProgress size={25} />
        </Loader>
      ) : (
        <List disablePadding>
          <ListItem
            alignItems="flex-start"
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 1200,
              borderBottom: "1px solid #37444C",
            }}
          >
            <Typography variant="h5" fontWeight="fontWeightBold" maxWidth>
              {listHeaderTitle}
              {listHeaderTitleButton && listHeaderTitleButton}
            </Typography>
          </ListItem>
          {posts.map((post) => (
            <span>
              <PostItem post={post} />
              <Divider component="li" />
            </span>
          ))}
          <ListItem
            alignItems="flex-start"
            key="loadmore"
            sx={{
              textAlign: "center",
            }}
          >
            <ListItemText
              primary={
                <Button
                  variant="outlined"
                  onClick={() => getAdditionalPosts()}
                  sx={{ width: "100%" }}
                >
                  {" "}
                  Read More{" "}
                </Button>
              }
            />
          </ListItem>
        </List>
      )}
    </ListRoot>
  );
}

function PostItem({ post }) {
  const history = useHistory();
  const now = moment();
  console.log(now);

  const calcTimestampDiff = (timestamp) => {
    const scales = [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
    ];

    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i];
      const diff = moment(now).diff(timestamp * 1000, scale);
      if (diff > 0) return diff + scale.charAt(0);
    }

    return 0 + scales[scales.length - 1].charAt(0);
  };

  return (
    <ListItem alignItems="flex-start" key={post.id}>
      <ListItemAvatar>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() => history.push("/" + post.owner)}
        >
          <Avatar alt={post.owner} src="/" />
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            {post.owner}
            <Typography color="textSecondary" display="inline">
              {" " +
                String.fromCharCode(183) +
                " " +
                calcTimestampDiff(post.timestamp)}
            </Typography>
          </React.Fragment>
        }
        secondary={<Typography color="textPrimary">{post.content}</Typography>}
      />
    </ListItem>
  );
}
