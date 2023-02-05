import { type FC, type SyntheticEvent } from 'react'

import Cross from '@assets/images/crossIcon.png'
import Circle from '@assets/images/circleIcon.png'

import styles from './cell.module.scss'

import { type PlayerSign } from '@context/BoardContext'

interface Props {
  onCellClicked: (e: SyntheticEvent<HTMLButtonElement>) => void
  index: number
  isChecked: boolean
  value?: PlayerSign
  winner: null | PlayerSign
}

const Cell: FC<Props> = ({
  onCellClicked,
  index,
  isChecked,
  value,
  winner
}) => {
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
    onCellClicked(e)
  }

  const isCellDisabled = !!value || !!(winner && !value)

  const cellIcon = isChecked && (value === 'x' ? Cross : Circle)

  return (
    <button className={styles.button} data-order={index} disabled={isCellDisabled}
            onClick={handleClick}>{cellIcon && <img src={cellIcon} alt=''/>}</button>
  )
}

export default Cell
