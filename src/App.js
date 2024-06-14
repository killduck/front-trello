
import './ResetStyle.css'
import './App.css'
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';

import { Route, Routes } from 'react-router-dom';
import Workspace from './pages/Workspace/Workspace';
import Recent from './pages/Recent/Recent';
import Favourites from './pages/Favourites/Favourites';
import Templates from './pages/Templates/Templates';
import Default from './layouts/default/Default';


function App() {
  return (
    <div>

      <KanbanBoard />

      <Routes>
        <Route path="/" element={<Default />} />
        <Route path="workspace" element={<Workspace />} />
        <Route path='recent' element={<Recent />} />
        <Route path='favourites' element={<Favourites />} />
        <Route path='templates' element={<Templates />} />
      </Routes>
      
    </div>
  )
}

export default App
