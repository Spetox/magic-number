import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import CardNumber from "./CardNumber";

interface NumberListProps {
  listIndex: number;
  numbers: number[];
}

const NumberList = ({
  numbers,
  listIndex,
}: PropsWithChildren<NumberListProps>) => {
  return (
    <Box>
      <Typography>Grupo {listIndex + 1}</Typography>
      <Box
        key={"numberList" + listIndex}
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        {numbers.map((num, index) => (
          <CardNumber number={num}></CardNumber>
        ))}
      </Box>
    </Box>
  );
};

export default NumberList;
