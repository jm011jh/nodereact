import useStore from "../../store";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";

export default function AdminList(){
    const {admSidBarMenuItem} = useStore(state => state)
    let [postType, setPostType] = useState(null);
    useEffect(()=>{
        return(
            setPostType(null)
        )
    },[])
    useEffect(()=>{
        return(
            setPostType(admSidBarMenuItem)
        )
    },[admSidBarMenuItem])
    return(
        <div className="adm--list-container">
            <div className="adm--h1">
                {postType === "teacher" ? "강사 데이터를 확인해보세요.": null}
                {postType === "school" ? "학교 데이터를 확인해보세요.": null}
                {postType === "item" ? "수업 데이터를 확인해보세요." : null}
                {postType === null ? <div className='adm--menuItem-empty'>학교, 강사, 수업 데이터를 확인해보세요.</div> : null}
            </div>
            {postType === null ? <div className='adm--menuItem-empty'>원하시는 메뉴를 선택해주세요.</div> : null}
            <Outlet></Outlet>
        </div>
    )
}