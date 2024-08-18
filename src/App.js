import './ResetStyle.css'
import './App.css'
import RoutesApp from './RoutesApp'

import { useState } from 'react'

function App() {
  console.log('hostname>>>', window.location.hostname) // TODO Удалить. Тест для деплоя
  let [htmlClick, setHtmlClick] = useState('')

  function onClickTargetHTML(event) {
    console
      .log
      // 'Проверка выполения функции =>',
      // onClickTargetHTML.name,
      // event,
      // event.target.className
      ()

    setHtmlClick(event.target.className)
  }

  return (
    <div onClick={(event) => onClickTargetHTML(event)}>
      <RoutesApp htmlClick={htmlClick} />
    </div>
  )
}

export default App
