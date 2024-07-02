
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Workspace from './pages/Workspace/Workspace';
import Recent from './pages/Recent/Recent';
import Favourites from './pages/Favourites/Favourites';
import Templates from './pages/Templates/Templates';

// import Default from './layouts/default/Default';
import KanbanBoard from './pages/KanbanBoard/KanbanBoard';
import Login from './pages/Login/Login';
// import authed from "./pages/Login/Login";

export default function RoutesApp(props) {
    // console.log(authed);

    function RequireAuth({ children }) {
        const { authed } = Login();
        console.log(authed);

        const location = useLocation();
      
        return authed === true ? ( 
            children ) : (
            <Navigate to="/login" replace state={{ path: location.pathname }} /> 
        );
    }

    return (
        <div>

            <Routes>
                {/* <Route path="/" element={<Default />} /> */}
                {/* <Route path="/" element={
                    <RequireAuth>
                        <Workspace />
                    </RequireAuth>
                } /> */}
                <Route path="/" element={ <Workspace /> } />
                <Route path='/login' element={<Login />} />
                <Route path="/dashboard/:dashboardId" element={<KanbanBoard />} />
                <Route path='/recent' element={<Recent />} />
                <Route path='/favourites' element={<Favourites />} />
                <Route path='/templates' element={<Templates />} />
            </Routes>

        </div>
    )
};
