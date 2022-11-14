import { Link } from "react-router-dom"

export default function Header(){
    return(
        <div id="header" className="header">
            <div><Link to={"/adm"}>ADM</Link></div>
            <div><Link to={"/"}>MEMBER</Link></div>
        </div>
    )
}