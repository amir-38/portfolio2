import { Link } from 'react-router-dom'
import hoverSound from '../assets/click.mp3'
import '../components/styles/navbar.css'

const Navbar = () => {
    const playHover = () => {
        const audio = new Audio(hoverSound)
        audio.volume = 0.5
        audio.play()
    }

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/" onMouseEnter={playHover}>
                        Main
                    </Link>
                </li>
                <li>
                    <Link to="/about" onMouseEnter={playHover}>
                        About
                    </Link>
                </li>
                <li>
                    <Link to="/projects" onMouseEnter={playHover}>
                        Projects
                    </Link>
                </li>
                <li>
                    <Link to="/contact" onMouseEnter={playHover}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
