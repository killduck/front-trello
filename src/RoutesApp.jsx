
import { Route, Routes, useParams } from 'react-router-dom';
import Workspace from './pages/Workspace/Workspace';
import Recent from './pages/Recent/Recent';
import Favourites from './pages/Favourites/Favourites';
import Templates from './pages/Templates/Templates';

import Default from './layouts/default/Default';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Auth from '../dist/auth/Auth';

export default function RoutesApp(props) {


    return (
        <div>

            <Routes>
                {/* <Route path="/" element={<Default />} /> */}
                <Route path='/auth' element={<Auth />} />
                <Route path="/dashboard/:dashboardId" element={<KanbanBoard />} />
                <Route path="/" element={<Workspace />} />
                <Route path='/recent' element={<Recent />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/templates' element={<Templates />} />
            </Routes>
        </div>
    )
};
