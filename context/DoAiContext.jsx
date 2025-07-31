'use client'
import { useRouter } from "next/navigation";
const { createContext, useContext } = require("react");

export const DoAiContext = createContext()
export const DoAiContextProvider=({children})=>{
    const router = useRouter()
    return <DoAiContext.Provider value={{router}}>
        {children}
    </DoAiContext.Provider>
}

export const useAiContext=()=>useContext(DoAiContext)
