import React from 'react'
import styles from './title_bar.module.css'
const TitleBar = () => {

  const onButtonClick = (action) => () => {
    window.custom_app.customFrame.sendFrameEvent(action);
  }
  return (
    <div className={styles.main}>
      <div className={styles.buttonContainer}>
      <button onClick={onButtonClick("minimize")}>
        _
      </button>
      <button onClick={onButtonClick("maximize")} >
        []
      </button>
      <button onClick={onButtonClick("close")}>
        X
      </button>
      </div>
    </div>
  )
}

export default TitleBar