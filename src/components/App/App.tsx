import { useState } from 'react';

import Header from '@components/Header';
import Board from '@components/Board';

function App() {
  const [currentValue, setCurrentValue] = useState<'x' | 'o'>('o');

  const toggleMove = () => {
    setCurrentValue((prevState) => (prevState === 'o' ? 'x' : 'o'));
  };

  return (
    <>
      <Header />
      <Board toggleMove={toggleMove} currentValue={currentValue} />
    </>
  );
}

export default App;
