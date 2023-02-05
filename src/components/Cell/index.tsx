import {FC, useState} from "react";

import styles from "./cell.module.scss";

type Props = {
  currentValue: 'x' | 'o'
  onCellClicked: () => void
}

const Cell: FC<Props> = ({currentValue, onCellClicked}) => {
  const [cellValue, setCellValue] = useState<'' | 'x' | 'o'>('')

  const handleClick = () => {
    setCellValue(currentValue)

    onCellClicked()
  }

  return (
    <button className={styles.button} disabled={!!cellValue} onClick={handleClick}>{cellValue}</button>
  );
};

export default Cell;