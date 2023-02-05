import { FC, useEffect, useState } from "react";

import Cell from "@components/Cell";

import styles from "./board.module.scss";

const defaultSize = 3;

type Props = {
  currentValue: "x" | "o";
  toggleMove: () => void;
};

type BoardData = { x: Array<number>; o: Array<number> };

const winnerCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [3, 6, 9],
  [2, 5, 8],
  [1, 5, 9],
  [3, 5, 7],
];

const calculateWinner = (playerCombos: number[]): boolean => {
  return winnerCombinations.some((winCombo) => {
    return winCombo.every((item) => playerCombos.includes(item));
  });
};

const Board: FC<Props> = ({ currentValue = "o", toggleMove }) => {
  const [boardData, setBoardData] = useState<BoardData>({ x: [], o: [] });
  const [winner, setWinner] = useState<null | "x" | "o">(null);
  const [checkBoardData, setCheckBoardData] = useState(false);

  const onCellClicked = (cellIndex: number) => {
    setBoardData((prevState) => ({
      ...prevState,
      [currentValue]: [...prevState[currentValue], cellIndex],
    }));

    setCheckBoardData(true);
  };

  useEffect(() => {
    const checkGameWinner = () => {
      const isWinner = calculateWinner(boardData[currentValue]);

      if (isWinner) {
        setWinner(currentValue);
        setCheckBoardData(false);

        return;
      }

      setCheckBoardData(false);
      toggleMove();
    };

    if (checkBoardData) checkGameWinner();
  }, [
    boardData,
    currentValue,
    winnerCombinations,
    calculateWinner,
    toggleMove,
    checkBoardData,
  ]);

  return (
    <>
      <p className={styles.title}>
        {" "}
        {winner ? "Winner is" : "Current move"}: {currentValue}
      </p>
      {winner && <button className={styles.button}>Retry</button>}
      <div className={styles.container}>
        {new Array(defaultSize * defaultSize).fill(null).map((_, index) => (
          <Cell
            currentValue={currentValue}
            onCellClicked={() => onCellClicked(index + 1)}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
