import { useEffect } from 'react';

import { Route, Routes, useNavigate } from 'react-router-dom';

import Favourites from './pages/Favourites/Favourites';
import InviteUserBoard from './pages/InviteUserBoard/InviteUserBoard';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Login from './pages/Login/Login';
import Recent from './pages/Recent/Recent';
import Signup from './pages/Singup/Signup';
import StatusCodes404 from './pages/StatusCodes404/StatusCodes404';
import Templates from './pages/Templates/Templates';
import Workspace from './pages/Workspace/Workspace';


export default function RoutesApp(props) {

    const navigate = useNavigate();

    let htmlClick = props.htmlClick;


    useEffect(() => {
        if (!localStorage.getItem('trello_auth')) {
            // navigate("/login");
        }
    }, [navigate]);

    return (
        <div>

            <Routes>

                <Route path='/login' element={
                    <Login />
                } />
                <Route path='/signup' element={
                    <Signup/>
                } />
                <Route path="/" element={
                    <Workspace
                        htmlClick={htmlClick}
                    />
                } />
                <Route path="/dashboard/:dashboardId" element={
                    <KanbanBoard
                        htmlClick={htmlClick}
                    />
                } />
                <Route path='/recent' element={
                    <Recent
                        htmlClick={htmlClick}
                    />
                } />
                <Route path='/favourites' element={
                    <Favourites
                        htmlClick={htmlClick}
                    />
                } />
                <Route path='/templates' element={
                    <Templates
                        htmlClick={htmlClick}
                    />
                } />
                <Route path='/404' element={
                    <StatusCodes404 />
                } />
                <Route path='/:alias' element={
                    <StatusCodes404 />
                } />
                <Route path='/invit-board-confirm/:alias' element={
                    <InviteUserBoard/>
                } />

            </Routes>

        </div>
    )
};
