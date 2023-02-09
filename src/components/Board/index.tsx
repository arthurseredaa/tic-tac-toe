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

const calculateWinner = (
  boardData: BoardData,
  currentValue: PlayerSign
): { isPlayerWin: boolean; winnerCombo?: number[] } => {
  const filteredCombos = boardData.filter((item) => item.value === currentValue)
  const playerCombos = filteredCombos.map((item) => item.cellIndex)

  const winnerCombo = winnerCombinations.find((item) =>
    item.every((item) => playerCombos.includes(item))
  )

  const isPlayerWin = !!winnerCombo && winnerCombo.length === 3

  return {
    isPlayerWin,
    winnerCombo,
  }
}

const Board: FC<Props> = ({ currentValue = 'o', toggleMove }) => {
  const [winner, setWinner] = useState<null | PlayerSign>(null)
  const [winnerCombo, setWinnerCombo] = useState<number[]>([])
  const [checkBoardData, setCheckBoardData] = useState(false)
  const [showRetryButton, setShowRetryButton] = useState(false)
  const { updateBoardData, boardData, resetBoard } = useContext(BoardContext)
  const isDrawRound =
    boardData.length === ALL_CELLS_CHECKED_BOARD_LENGTH && !winner

  useEffect(() => {
    const isNewRound = boardData.length === 0

    if (isDrawRound || winner) {
      setShowRetryButton(true)
    } else if (isNewRound) {
      setShowRetryButton(false)
    }
  }, [isDrawRound, winner])

  useEffect(() => {
    const checkGameWinner = (): void => {
      const { isPlayerWin, winnerCombo } = calculateWinner(
        boardData,
        currentValue
      )

      if (isPlayerWin && winnerCombo) {
        setWinner(currentValue)
        setWinnerCombo(winnerCombo)
        setCheckBoardData(false)

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
      updateBoardData({ player: currentValue, cellIndex })
    }

    setCheckBoardData(true)
  }

  const handleResetGame = (): void => {
    if (resetBoard) resetBoard()

    setWinnerCombo([])
    setWinner(null)
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
              isHighlighted={winnerCombo.includes(index)}
            />
          )
        })}
      </div>
    </>
  )
}

export default Board
