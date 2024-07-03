
import { createContext, useContext, useState } from "react";

const authContext = createContext();

function useAuth() {
    const [authed, setAuthed] = useState(false);
  
    return {
        authed,
        _login() {
            return new Promise((res) => {
                setAuthed(true);
                res();
            });
        },
        _logout() {
            return new Promise((res) => {
                setAuthed(false);
                res();
            });
        }
    };
}

export function AuthProvider({ children }) {
    // console.log( children );
    const auth = useAuth();
    console.log( auth );
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
    return useContext(authContext);
}