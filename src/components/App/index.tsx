import { type FC, useState } from 'react'

import Header from '@components/Header'
import Board from '@components/Board'

const App: FC = () => {
  const [currentValue, setCurrentValue] = useState<'x' | 'o'>('o')

  const toggleMove = (): void => {
    setCurrentValue(prevState => prevState === 'o' ? 'x' : 'o')
  }

  return (
    <>
      <Header/>
      <Board toggleMove={toggleMove} currentValue={currentValue} />
    </>
  )
}

export default App
