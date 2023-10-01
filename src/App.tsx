import React, { PropsWithChildren, useState } from "react";
import { CssBaseline, Container, Box, Button, Typography } from "@mui/material";
import NumberList from "./components/NumberList";
import _ from "lodash";

function createList(): number[][] {
  const allNumbers = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  ];

  const randomList = _.shuffle(allNumbers);

  const slicedList = sliceList(randomList);

  return slicedList;
}

function sliceList(completeList: number[]): number[][] {
  const firstList = completeList.slice(0, 7);
  const secondList = completeList.slice(7, 14);
  const thirdList = completeList.slice(14);

  return [firstList, secondList, thirdList];
}

function rearrangeLists(lists: number[][], listIndex: number): number[][] {
  const firstList: number[] = [];
  const secondList: number[] = [];
  const thirdList: number[] = [];

  if (listIndex === 0) {
    const concatLists: number[] = lists[1].concat(lists[0]).concat(lists[2]);

    for (let i = 0; i < concatLists.length; i++) {
      if (i % 3 === 0) {
        firstList.push(concatLists[i]);
      } else if (i % 3 === 1) {
        secondList.push(concatLists[i]);
      } else {
        thirdList.push(concatLists[i]);
      }
    }
  }

  if (listIndex === 1) {
    const concatLists = lists[0].concat(lists[1]).concat(lists[2]);

    for (let i = 0; i < concatLists.length; i++) {
      if (i % 3 === 0) {
        firstList.push(concatLists[i]);
      } else if (i % 3 === 1) {
        secondList.push(concatLists[i]);
      } else {
        thirdList.push(concatLists[i]);
      }
    }
  }

  if (listIndex === 2) {
    const concatLists = lists[0].concat(lists[2]).concat(lists[1]);

    for (let i = 0; i < concatLists.length; i++) {
      if (i % 3 === 0) {
        firstList.push(concatLists[i]);
      } else if (i % 3 === 1) {
        secondList.push(concatLists[i]);
      } else {
        thirdList.push(concatLists[i]);
      }
    }
  }

  return [firstList, secondList, thirdList];
}

interface MyButtonProps {
  onClick: (buttonId: number) => void;
  buttonId: number; // Identificador único para cada botão
  children: React.ReactNode;
}

const MyButton = ({
  onClick,
  buttonId,
  children,
}: PropsWithChildren<MyButtonProps>) => {
  const handleClick = () => {
    onClick(buttonId);
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      {children}
    </Button>
  );
};

const App: React.FC = () => {
  const [turn, setTurn] = useState<number>(0);
  const [lists, setLists] = useState<number[][]>(createList());
  const [guessNumber, setGuessNumber] = useState<number>();

  const handleButtonClick = (buttonId: number) => {
    const rearrangedLists = rearrangeLists(lists, buttonId);

    setLists(rearrangedLists);

    if (turn === 3) {
      setGuessNumber(rearrangedLists[1][3]);
    }

    setTurn(turn + 1);
  };

  const reset = () => {
    setTurn(0);
    setLists(createList());
  };

  return (
    <CssBaseline>
      <Container
        sx={{
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {turn === 0 && (
          <Box>
            <Typography>Pense em um número de 1 a 21.</Typography>
            <Box>
              <MyButton buttonId={0} onClick={handleButtonClick}>
                Continuar
              </MyButton>
            </Box>
          </Box>
        )}
        {[1, 2, 3].includes(turn) && (
          <Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              {lists.map((row, rowIndex) => (
                <NumberList numbers={row} listIndex={rowIndex}></NumberList>
              ))}
            </Box>
            <Box>
              {turn === 1 ? (
                <Typography>Em qual grupo está o seu número?</Typography>
              ) : turn === 2 ? (
                <Typography>E agora?</Typography>
              ) : (
                <Typography>Só mais uma vez...</Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 2,
                }}
              >
                <MyButton buttonId={0} onClick={handleButtonClick}>
                  Grupo 1
                </MyButton>
                <MyButton buttonId={1} onClick={handleButtonClick}>
                  Grupo 2
                </MyButton>
                <MyButton buttonId={2} onClick={handleButtonClick}>
                  Grupo 3
                </MyButton>
              </Box>
            </Box>
          </Box>
        )}
        {turn === 4 && (
          <Box>
            <Typography>O número que você pensou foi: {guessNumber}</Typography>
          </Box>
        )}
        <Box display="flex" flexDirection="column" alignItems="center">
          <MyButton buttonId={0} onClick={reset}>
            Recomeçar
          </MyButton>
        </Box>
      </Container>
    </CssBaseline>
  );
};

export default App;
