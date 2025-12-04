// import { Toaster } from 'react-hot-toast'
import './App.css'
import AppRouter from './AppRouter'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <AppRouter/>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default App
