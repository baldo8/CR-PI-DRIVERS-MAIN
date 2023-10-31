
import { Routes, Route, } from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import DriverForm from "./components/Form/Form"

const App = ()=> {
 

  return (
    <>
      <div className='App'>

        <Routes>
          {/* <Route path='/' element={<LandingPage} /> */}
          <Route path="/" element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>} />
          <Route path='/detail/:id' element={<Detail/>} />
          <Route path='/create' element={<DriverForm/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
