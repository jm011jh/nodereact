import { Outlet, useNavigate } from "react-router-dom"
import './style.css'
export default function Admin(){
    let navigate = useNavigate()
    function addClassOn(target){
        document.querySelectorAll(".adm--menuItem").forEach(function(el,i){
            el.classList.remove("on")
            target.classList.add("on")
        })
    }
    return(
        <>
            <div className="adm--h1">관리자 페이지입니다</div>
            <div className="adm--menubar">
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/teacher");addClassOn(e.target)}}>강사</div>
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/class");addClassOn(e.target)}}>클래스</div>
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/type");addClassOn(e.target)}}>타입</div>
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/school");addClassOn(e.target)}}>학교</div>
            </div>
            <Outlet></Outlet>
        </>
    )
}