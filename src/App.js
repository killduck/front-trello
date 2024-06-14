import { Route, Routes } from 'react-router'

import Default from './layouts/default/Default'
import KanbanBoard from './pages/KanbanBoard/KanbanBoard'

import './ResetStyle.css'
import './App.css'

function App() {
  return (
    <div>
      {/* <Dashboard /> */}
      <KanbanBoard />

      <Routes>
        <Route path="/" element={<Default />} />
      </Routes>
    </div>
  )
}

export default App
