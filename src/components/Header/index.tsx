import { type FC } from 'react'

import icon from '@assets/icons/tic-tac-toe.svg'

import styles from './header.module.scss'

const Header: FC = () => (
    <header className={styles.header}>
      <img src={icon} alt="tic-tac-toe game" className={styles.icon} />
      <h1 className={styles.title}>Tic-Tac-Toe</h1>
    </header>
)

export default Header
