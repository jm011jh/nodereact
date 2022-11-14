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
            <div className="adm--h1">학교, 강사, 수업 데이터를 입력할 수 있습니다.</div>
            <div className="adm--menubar">
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/teacher");addClassOn(e.target)}}>강사</div>
                {/* <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/type");addClassOn(e.target)}}>타입</div> */}
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/school");addClassOn(e.target)}}>학교</div>
                <div className="adm--menuItem" onClick={(e)=>{navigate("/adm/post/item");addClassOn(e.target)}}>수업</div>
            </div>
            <Outlet></Outlet>
        </>
    )
}