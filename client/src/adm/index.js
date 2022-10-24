import { Outlet } from "react-router-dom"

export default function Admin(){
    return(
        <>
            <div>admin index</div>
            <Outlet></Outlet>
        </>
    )
}