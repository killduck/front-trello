
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Workspace from './pages/Workspace/Workspace';
import Recent from './pages/Recent/Recent';
import Favourites from './pages/Favourites/Favourites';
import Templates from './pages/Templates/Templates';

// import Default from './layouts/default/Default';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Login from './pages/Login/Login';
// import { useState } from 'react';
import useAuth from "./Auth";

export default function RoutesApp(props) {

    function RequireAuth({ children }) {

        const { authed } = useAuth();
        const location = useLocation();

        return authed === true ? ( 
            children 
            ) : (
            <Navigate to="/login" replace state={{ path: location.pathname }} /> 
        );
    }

    return (
        <div>

            <Routes>

                <Route path='/login' element={
                    <Login /> 
                } />
                <Route path="/" element={
                    <RequireAuth>
                        <Workspace />
                    </RequireAuth>
                } />
                <Route path="/dashboard/:dashboardId" element={
                    <RequireAuth>
                        <KanbanBoard />
                    </RequireAuth>
                } />
                <Route path='/recent' element={
                    <RequireAuth>
                        <Recent />
                    </RequireAuth>
                } />
                <Route path='/favourites' element={
                    <RequireAuth>
                        <Favourites />
                    </RequireAuth>
                } />
                <Route path='/templates' element={
                    <RequireAuth>
                        <Templates />
                    </RequireAuth>
                } />

            </Routes>

        </div>
    )
};
