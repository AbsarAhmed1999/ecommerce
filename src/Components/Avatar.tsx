import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

export default function ImageAvatars() {
  return (
    <Stack direction="row">
      <Avatar alt="Remy Sharp" src="/Avata.png" sx={{ width: 56 }} />
    </Stack>
  );
}
