import React, { useEffect, useState } from "react"
import styles from "./app.module.scss"
import Circle from "./components/circle"

function App() {
  const [mode, setMode] = useState<"manual" | "auto">("manual")
  const [counter, setCount] = useState<number>(0)
  const [green, setGreen] = useState<boolean>(false)
  const triggerMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.id as "manual" | "auto"
    if (mode === "auto") setCount(0)
    setMode(mode)
  }

  window.onmessage = (event: MessageEvent) => {
    if (event.data === "triggerColor") {
      setGreen(!green)
      setCount(counter + 1)
      if (counter === 4) {
        window.parent.postMessage(
          { type: "counter", body: "You clicked 5 times" },
          document.referrer
        )
      }
    }
  }

  useEffect(() => {
    if (mode === "auto") {
      window.parent.postMessage({ type: "disable" }, document.referrer)
      setTimeout(() => {
        setGreen(!green)
      }, 2000)
    } else {
      window.parent.postMessage({ type: "enable" }, document.referrer)
    }
  })

  return (
    <div className={styles.app}>
      <Circle green={green} />
      <div className='radio-group' onChange={triggerMode}>
        <input type='radio' name='mode' id='auto' />
        <label htmlFor='auto'>Auto</label>
        <input type='radio' name='mode' id='manual' defaultChecked />
        <label htmlFor='manual'>Manual</label>
      </div>
    </div>
  )
}

export default App
