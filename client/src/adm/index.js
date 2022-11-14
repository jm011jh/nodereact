import './style.css'
import { useEffect, useState } from 'react'
import PostTeacher from "../api/post/PostTeacher"
import PostSchool from "../api/post/PostSchool"
import PostItem from "../api/post/PostItem"

export default function Admin(){
    let [postType, setPostType] = useState(null);
    useEffect(()=>{
        return(
            setPostType(null)
        )
    },[])
    function addClassOn(target){
        document.querySelectorAll(".adm--menuItem").forEach(function(el){
            el.classList.remove("on")
        })
        target.classList.add("on")
        setPostType(target.innerHTML);
        console.log(postType)
    }
    return(
        <div className='adm--container'>
            <div className='adm--menuBar'>
                <div className="adm--menuBar-wrap">
                    <div className="adm--menuItem" onClick={(e)=>{addClassOn(e.target)}}>강사</div>
                    <div className="adm--menuItem" onClick={(e)=>{addClassOn(e.target)}}>학교</div>
                    <div className="adm--menuItem" onClick={(e)=>{addClassOn(e.target)}}>수업</div>
                </div>
            </div>
            <div className="adm--h1">학교, 강사, 수업 데이터를 입력할 수 있습니다.</div>
            {postType === "강사" ? <PostTeacher/> : null}
            {postType === "학교" ? <PostSchool/> : null}
            {postType === "수업" ? <PostItem/> : null}
            {postType === null ? <div className='adm--menuItem-empty'>수정을 원하시는 메뉴를 클릭해주세요.</div> : null}
        </div>
    )
}