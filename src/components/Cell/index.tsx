import { type FC, type SyntheticEvent, useEffect, useState } from 'react'

import xIcon from '@assets/images/x-regular-24.png'
import circleImage from '@assets/images/radio-circle-regular-24.png'

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
  const [cellValue, setCellValue] = useState<string>('')
  const handleClick = (e: SyntheticEvent<HTMLButtonElement>): void => {
    onCellClicked(e)
  }

  useEffect(() => {
    if (isChecked) setCellValue(value === 'x' ? xIcon : circleImage)
  }, [isChecked])

  const isCellDisabled = !!cellValue || !!(winner && !cellValue)

  return (
    <button className={styles.button} data-order={index} disabled={isCellDisabled}
            onClick={handleClick}><img src={cellValue} alt={cellValue}/></button>
  )
}

export default Cell
