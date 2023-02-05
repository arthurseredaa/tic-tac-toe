import { createContext, type FC, type ReactNode, useCallback, useMemo, useState } from 'react'

interface Board {
  x: number[]
  o: number[]
}

type UpdateBoardData = ({ player, cellIndex }: { player: 'x' | 'o', cellIndex: number }) => void

interface BoardContext {
  boardData: Board
  updateBoardData?: UpdateBoardData
}

const defaultBoardData: Board = {
  x: [],
  o: []
}

export const Context = createContext<BoardContext>({ boardData: defaultBoardData })

export const BoardContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [boardData, setBoardData] = useState<Board>(defaultBoardData)

  const updateBoardData = useCallback<UpdateBoardData>(({ player, cellIndex }) => {
    setBoardData((prevState) => ({ ...prevState, [player]: [...prevState[player], cellIndex] }))
  }, [])

  const contextValue = useMemo(() => ({
    boardData,
    updateBoardData
  }), [boardData, updateBoardData])

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
