import { createContext, type FC, type ReactNode, useCallback, useMemo, useState } from 'react'

export type PlayerSign = 'x' | 'o'

interface BoardMove {
  cellIndex: number
  value: PlayerSign
}

export type BoardData = BoardMove[]

type UpdateBoardData = ({ player, cellIndex }: { player: PlayerSign, cellIndex: number }) => void

interface IBoardContext {
  boardData: BoardMove[]
  updateBoardData?: UpdateBoardData
  resetBoard?: () => void
}

const defaultBoardData: BoardData = []

export const BoardContext = createContext<IBoardContext>({ boardData: defaultBoardData })

export const BoardContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boardData, setBoardData] = useState<BoardData>(defaultBoardData)

  const updateBoardData = useCallback<UpdateBoardData>(({ player, cellIndex }) => {
    setBoardData(prevState => ([...prevState, { cellIndex, value: player }]))
  }, [])

  const resetBoard = (): void => { setBoardData(defaultBoardData) }

  const contextValue = useMemo(() => ({
    boardData,
    updateBoardData,
    resetBoard
  }), [boardData, updateBoardData, resetBoard])

  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>
}
