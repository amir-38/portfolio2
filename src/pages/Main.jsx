import '../components/styles/main.css'
import backVideo from '../assets/videoplayback.webm'
import { useRef, useState, useEffect } from 'react'
import music from '../assets/main.mp3'
import Lottie from 'lottie-react'
import equalizerAnim from '../assets/Ani.json'
import Preloader from '../components/Preloader'

const Main = () => {
    const audioRef = useRef(null)
    const videoRef = useRef(null)
    const [isLoaded, setIsLoaded] = useState(false)

    const [activePage, setActivePage] = useState(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const checkBuffer = () => {
            if (!video.buffered.length) return

            const buffered = video.buffered.end(0)
            const duration = video.duration
            const percent = (buffered / duration) * 100

            if (percent >= 50 || video.readyState >= 3) {
                setIsLoaded(true)
                video.play().catch(() => {})
                audioRef.current?.play().catch(() => {})
            }
        }

        video.addEventListener('progress', checkBuffer)
        video.addEventListener('loadeddata', checkBuffer)

        return () => {
            video.removeEventListener('progress', checkBuffer)
            video.removeEventListener('loadeddata', checkBuffer)
        }
    }, [])

    useEffect(() => {
        let currentX = 0
        let currentY = 0
        let targetX = 0
        let targetY = 0
        let animationFrameId

        const updatePosition = () => {
            const ease = 0.1
            currentX += (targetX - currentX) * ease
            currentY += (targetY - currentY) * ease

            document.documentElement.style.setProperty(
                '--move-x',
                `${currentX}px`
            )
            document.documentElement.style.setProperty(
                '--move-y',
                `${currentY}px`
            )

            animationFrameId = requestAnimationFrame(updatePosition)
        }

        const handleMouseMove = (e) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 30
            targetY = (e.clientY / window.innerHeight - 0.5) * 30
        }

        window.addEventListener('mousemove', handleMouseMove)
        updatePosition()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    // Пауза/плей видео при открытии/закрытии модалки
    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        if (activePage) {
            video.pause()
        } else {
            video.play().catch(() => {})
        }
    }, [activePage])

    return (
        <div className="main-container">
            <Preloader isVisible={!isLoaded} />

            <video
                ref={videoRef}
                className={`bg-video ${isLoaded ? 'show' : 'hide'} ${
                    activePage ? 'blurred' : ''
                }`}
                loop
                muted
                playsInline
            >
                <source src={backVideo} type="video/webm" />
            </video>

            {/* <nav className="navigation">
                <button onClick={() => setActivePage('about')}>About</button>
                <button onClick={() => setActivePage('projects')}>
                    Projects
                </button>
                <button onClick={() => setActivePage('contact')}>
                    Contact
                </button>
            </nav> */}

            <button
                onClick={() => audioRef.current?.play()}
                className="music-button"
            >
                <Lottie
                    className="lotti"
                    animationData={equalizerAnim}
                    loop
                    style={{ width: 40, height: 30 }}
                />
            </button>

            <audio ref={audioRef} src={music} loop />

            {isLoaded && !activePage && (
                <div className="overlay-content">
                    <h1>WELCOME TO MY PORTFOLIO</h1>
                    <p>Frontend Developer | React | CSS</p>
                </div>
            )}

            {/* {activePage && (
                <div className="modal">
                    <div className="modal-content">
                        <button
                            className="modal-close"
                            onClick={() => setActivePage(null)}
                        >
                            ✕
                        </button>
                        {activePage === 'about' && (
                            <>
                                <h2>About Me</h2>
                                <p>Some information about me...</p>
                            </>
                        )}
                        {activePage === 'projects' && (
                            <>
                                <h2>Projects</h2>
                                <p>Details about projects...</p>
                            </>
                        )}
                        {activePage === 'contact' && (
                            <>
                                <h2>Contact Me</h2>
                                <p>Contact information here...</p>
                            </>
                        )}
                    </div>
                </div>
            )} */}
        </div>
    )
}

export default Main
