import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser} from "../helpers/api-communicator";


type User = {
    name: string
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null> (null);

export const AuthProvider = ({children}: {children: ReactNode }) => {
    const [user, setUser] = useState<User | null >(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // fetch if the user's cookies are valid then skip login

        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({ email: data.email, name: data.name});
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    // function for login
    const login = async(email: string, password: string) => {
        const data = await loginUser(email, password);
        if(data) {
            setUser({ email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
        // const verifyResponse = await verifyTokenFrontend();
        // console.log("Verify response:", verifyResponse);
     };

    // function to signup
    const signup = async(name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password);
        if(data) {
            setUser({ email: data.email, name: data.name});
            setIsLoggedIn(true);
        }
    };

    // function to logout
    const logout = async() => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    }


    //  
    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>

};

// creating a context that should be used by the children
export const useAuth = () => useContext(AuthContext);