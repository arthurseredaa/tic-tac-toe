import { type FC, type SyntheticEvent } from 'react'

import Cross from '@assets/images/crossIcon.svg'
import Circle from '@assets/images/circleIcon.svg'

import styles from './cell.module.scss'

import { type PlayerSign } from '@context/BoardContext'

interface Props {
  onCellClicked: (e: SyntheticEvent<HTMLButtonElement>) => void
  index: number
  isChecked: boolean
  value?: PlayerSign
  winner: null | PlayerSign
  stylesForWinner: boolean
}

const Cell: FC<Props> = ({
  onCellClicked,
  index,
  isChecked,
  value,
  winner,
  stylesForWinner,
}) => {
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
    onCellClicked(e)
  }

  const isCellDisabled = !!value || !!(winner && !value)

  const cellIcon = isChecked && (value === 'x' ? Cross : Circle)

  return (
    <button
      className={stylesForWinner ? styles.button_winner : styles.button}
      data-order={index}
      disabled={isCellDisabled}
      onClick={handleClick}>
      {cellIcon && <img src={cellIcon} alt='' />}
    </button>
  )
}

export default Cell
