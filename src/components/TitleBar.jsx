import React from 'react'

const TitleBar = () => {

  const onButtonClick = (action) => () => {
    window.custom_app.customFrame.sendFrameEvent(action);
  }
  return (
    <div>
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
  )
}

export default TitleBar