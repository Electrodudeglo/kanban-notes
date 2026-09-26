import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  

  return (
    <>

    <div>

    <MyButton/>

    </div>

    </>
  )
}

function MyButton() {

  function HandleClick() {alert("hello")}

  return (<button class="border rounded-2xl p-3 bg-emerald-500 hover:bg-emerald-600 text-white text-2xl mt-3" onClick={HandleClick}>button</button>);
}

export default App
