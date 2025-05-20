import PropTypes from 'prop-types'
import './styles/preloader.css'

const Preloader = ({ isVisible }) => {
    return (
        <div className={`preloader ${!isVisible ? 'fade-out' : ''}`}>
            <div className="container">
                <div className="card">
                    <div className="loader">
                        <p>Welcome</p>
                        <div className="words">
                            <span className="word">to</span>
                            <span className="word">my</span>
                            <span className="word">portfolio</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Preloader.propTypes = {
    isVisible: PropTypes.bool.isRequired,
}

export default Preloader
