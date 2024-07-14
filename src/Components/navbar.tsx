import { Link } from 'react-router-dom'
import styles from './navbarStyle.module.css'

export function Navbar() {
    return (
        <nav className={styles.navbar}>
            <Link to={'/'}>Home</Link>
            <Link to={'/users'}>Users</Link>
            <Link to={'/virtualDress'}>virtualDressup</Link>
        </nav>
    )
}