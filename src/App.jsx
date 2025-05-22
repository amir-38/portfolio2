import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Main from './pages/Main'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Preloader from './components/Preloader'
import './components/styles/fonts.css'
import './App.css'

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 5000) // длительность показа прелоадера

        return () => clearTimeout(timer)
    }, [])

    if (loading) return <Preloader isVisible={true} />

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </Router>
    )
}

export default App
