import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

function BoardNotFound() {
  return (
    <Box py={6} sx={{ textAlign: "center" }}>
      <Box sx={{ position: "relative", height: 210 }} mb={3}>
        <Image src="//page_not_found.svg" layout="fill" objectFit="contain" />
      </Box>
      <Typography variant="h1" mb={2}>
        Not Found
      </Typography>
      <Typography variant="h3">페이지를 찾을 수 없습니다.</Typography>
    </Box>
  );
}

export default BoardNotFound;
