import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Form } from './components/Form'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    <Form></Form>
      
    </>
  )
}

export default App
