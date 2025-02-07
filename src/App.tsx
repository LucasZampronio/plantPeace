import './App.css'
import { AboutUs } from './components/AboutUs'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
// import { Home } from './components/Home'

function App() {

  return (
    <>
    <Header />
    <div className='h-[89px]'></div>
    <AboutUs />
    <Footer />
    </>
  )
}

export default App