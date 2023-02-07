import {
  type FC,
  type SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from 'react'
import { v4 as uuidv4 } from 'uuid'

import Cross from '@assets/images/crossIcon.svg'
import Circle from '@assets/images/circleIcon.svg'

import Cell from '@components/Cell'

import styles from './board.module.scss'

import {
  BoardContext,
  type BoardData,
  type PlayerSign,
} from '@context/BoardContext'

const defaultSize = 3

interface Props {
  currentValue: 'x' | 'o'
  toggleMove: () => void
}

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
]

const ALL_CELLS_CHECKED_BOARD_LENGTH = 9

const findWinnerCombination = (
  boardData: BoardData,
  currentValue: PlayerSign
): number[] => {
  const filteredCombos = boardData.filter((item) => item.value === currentValue)
  return filteredCombos.map((item) => item.cellIndex)
}

const filteredWinnerCombinations = (array: number[]): number[] => {
  const newArray = winnerCombinations.map((itemArr) =>
    array.filter((item) => itemArr.includes(item))
  )
  return newArray.filter((item) => item.length === 3).flat()
}

const calculateWinner = (
  boardData: BoardData,
  currentValue: PlayerSign
): boolean => {
  const winnerCombination = findWinnerCombination(boardData, currentValue)
  return winnerCombinations.some((winCombo) =>
    winCombo.every((item) => winnerCombination.includes(item))
  )
}

const Board: FC<Props> = ({ currentValue = 'o', toggleMove }) => {
  const [winner, setWinner] = useState<null | PlayerSign>(null)
  const [winPlayerCombination, setWinPlayerCombination] = useState<
    number[] | null
  >(null)
  const [checkBoardData, setCheckBoardData] = useState(false)
  const [showRetryButton, setShowRetryButton] = useState(false)
  const { updateBoardData, boardData, resetBoard } = useContext(BoardContext)
  const isDrawRound =
    boardData.length === ALL_CELLS_CHECKED_BOARD_LENGTH && !winner
  useEffect(() => {
    if (isDrawRound || winner) {
      setShowRetryButton(true)
    }
  }, [isDrawRound, winner])
  useEffect(() => {
    const checkGameWinner = (): void => {
      const isWinner = calculateWinner(boardData, currentValue)
      const winnerCombination = filteredWinnerCombinations(
        findWinnerCombination(boardData, currentValue)
      )
      if (isWinner) {
        setWinner(currentValue)
        setCheckBoardData(false)
        setWinPlayerCombination(winnerCombination)
        return
      }

      setCheckBoardData(false)
      toggleMove()
    }

    if (checkBoardData) checkGameWinner()
  }, [
    boardData,
    currentValue,
    winnerCombinations,
    calculateWinner,
    toggleMove,
    checkBoardData,
  ])

  const onCellClicked = (e: SyntheticEvent<HTMLButtonElement>): void => {
    const cellIndex = +(e?.currentTarget.dataset.order ?? 0)

    if (updateBoardData) {
      updateBoardData({
        player: currentValue,
        cellIndex,
      })
    }

    setCheckBoardData(true)
  }

  const handleResetGame = (): void => {
    if (resetBoard) resetBoard()

    setWinner(null)
    setWinPlayerCombination(null)
  }

  const cellIcon = currentValue === 'x' ? Cross : Circle
  const winnerIcon = winner === 'x' ? Cross : Circle

  return (
    <>
      {isDrawRound ? (
        <p className={styles.title}>Draw. Try a new round!</p>
      ) : (
        <p className={styles.title}>
          {winner ? (
            <>
              Winner is: <img src={winnerIcon} alt='' />
            </>
          ) : (
            <>
              Current move <img src={cellIcon} alt='' />
            </>
          )}
        </p>
      )}
      {showRetryButton && (
        <button className={styles.button} onClick={handleResetGame}>
          Retry
        </button>
      )}
      <div className={styles.container}>
        {new Array(defaultSize * defaultSize).fill(null).map((_, index) => {
          const isItemChecked = boardData.some(
            (item) => item.cellIndex === index
          )
          const itemValue = boardData.find(
            (item) => item.cellIndex === index
          )?.value
          const id = uuidv4()

          return (
            <Cell
              key={id}
              index={index}
              onCellClicked={onCellClicked}
              isChecked={isItemChecked}
              value={itemValue}
              winner={winner}
              stylesForWinner={!!winPlayerCombination?.includes(index)}
            />
          )
        })}
      </div>
    </>
  )
}

export default Board
