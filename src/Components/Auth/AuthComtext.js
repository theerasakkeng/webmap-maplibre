import React,{createContext,useState,useEffect} from 'react'
export const AuthContext = createContext();
export const AuthProvider = ({children}) =>{

    const [currentUser,setCurrentuser] = useState();

    useEffect(()=>{
        const logedInUser = localStorage.getItem("Authorization");
        if(logedInUser){
            const foundUser = JSON.parse(logedInUser);
            setCurrentuser(foundUser);
        }
    },[]);
    return(
        <AuthContext.Provider value={{currentUser,setCurrentuser}}>
            {children}
        </AuthContext.Provider>
    )
}