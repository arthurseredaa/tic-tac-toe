import { type FC, useState } from 'react'

import styles from './cell.module.scss'

interface Props {
  currentValue: 'x' | 'o'
  onCellClicked: () => void
}

const Cell: FC<Props> = ({ currentValue, onCellClicked }) => {
  const [cellValue, setCellValue] = useState<'' | 'x' | 'o'>('')

  const handleClick = (): void => {
    setCellValue(currentValue)

    onCellClicked()
  }

  return (
    <button className={styles.button} disabled={!!cellValue} onClick={handleClick}>{cellValue}</button>
  )
}

export default Cell
