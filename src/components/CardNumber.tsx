import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface CardNumberProps {
  number: number;
}

const CardNumber = ({ number }: PropsWithChildren<CardNumberProps>) => {
  return (
    <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
      <Typography
        key={"cardNumber" + number}
        variant="h6"
        margin={1}
        sx={{
          marginX: 1,
        }}
      >
        {number}
      </Typography>
    </Box>
  );
};

export default CardNumber;
