import React, { useRef, useState } from "react"
import styles from "./app.module.scss"
import { Message } from "./models/message.model"
function App() {
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const colorTriggerHandler = () => {
    const iframe = iframeRef.current?.contentWindow
    iframe?.postMessage("triggerColor", "http://localhost:3001")
  }

  window.onmessage = (event: MessageEvent) => {
    const message = event.data as Message
    if (message.type === "counter") alert(message.body)
    if (message.type === "disable") setButtonDisabled(true)
    if (message.type === "enable") setButtonDisabled(false)
  }

  return (
    <div className={styles.app}>
      <iframe
        src='http://localhost:3001'
        frameBorder='0'
        title='Circle'
        ref={iframeRef}
      ></iframe>
      <button onClick={colorTriggerHandler} disabled={buttonDisabled}>
        Trigger color
      </button>
    </div>
  )
}

export default App
