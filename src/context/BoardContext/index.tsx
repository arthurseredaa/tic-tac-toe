import {createContext, FC, ReactNode, useCallback, useMemo, useState} from "react";

type Board = {
  x: Array<number>
  o: Array<number>
}

type UpdateBoardData = ({ player, cellIndex }: {player: 'x' | 'o'; cellIndex: number}) => void

type BoardContext = {
  boardData: Board
  updateBoardData?: UpdateBoardData
}

const defaultBoardData: Board = {
  x: [],
  o: []
}

export const BoardContext = createContext<BoardContext>({boardData: defaultBoardData})

export const BoardContextProvider: FC<{ children: ReactNode }> = ({children}) => {
  const [boardData, setBoardData] = useState<Board>(defaultBoardData)

  const updateBoardData = useCallback<UpdateBoardData>(({player, cellIndex}) => {
    setBoardData((prevState) => ({...prevState, [player]: [...prevState[player], cellIndex]}))
  }, [])

  const contextValue = useMemo(() => ({
    boardData,
    updateBoardData
  }), [boardData, updateBoardData])

  return <BoardContext.Provider value={contextValue}>{children}</BoardContext.Provider>
}