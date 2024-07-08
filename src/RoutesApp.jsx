
import { Route, Routes, useNavigate } from 'react-router-dom';
import Workspace from './pages/Workspace/Workspace';
import Recent from './pages/Recent/Recent';
import Favourites from './pages/Favourites/Favourites';
import Templates from './pages/Templates/Templates';

import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Login from './pages/Login/Login';
import { useEffect } from 'react';



export default function RoutesApp(props) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('trello_auth')) {
            navigate("/login");
        }
    });

    return (
        <div>

            <Routes>
                <Route path='/login' element={
                    <Login />
                } />
                <Route path="/" element={
                    <Workspace />
                } />
                <Route path="/dashboard/:dashboardId" element={
                    <KanbanBoard />
                } />
                <Route path='/recent' element={
                    <Recent />
                } />
                <Route path='/favourites' element={
                    <Favourites />
                } />
                <Route path='/templates' element={
                    <Templates />
                } />

            </Routes>

        </div>
    )
};
