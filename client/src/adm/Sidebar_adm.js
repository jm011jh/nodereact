import './style.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useStore from '../store/index'

export default function SidebarAdm(){
    const { setAdmSidBarMenuItem } = useStore(state => state)
    function addClassOn(target) {
        let thisType = target.getAttribute("data-type")
        setAdmSidBarMenuItem(thisType)
        document.querySelectorAll(".adm--sideBar-menuItem").forEach(function(el){
            el.classList.remove("on")
        })
        target.classList.add("on")
    }
    return(
        <div className='adm--sideBar'>
            <div className='adm--sideBar-wrap'>
                <div className='adm--sideBar-menu'>
                    <Link to="/adm/list/teacher" data-type="teacher" className='adm--sideBar-menuItem' onClick={(e) => addClassOn(e.target)}><p>강사</p><span className="material-symbols-outlined">perm_contact_calendar</span></Link>
                    <Link to="/adm/list/school" data-type="school" className='adm--sideBar-menuItem' onClick={(e) => addClassOn(e.target)}><p>학교</p><span className="material-symbols-outlined">school</span></Link>
                    <Link to="/adm/list/item" data-type="item" className='adm--sideBar-menuItem' onClick={(e) => addClassOn(e.target)}><p>수업</p><span className="material-symbols-outlined">note_alt</span></Link>
                </div>
            </div>
        </div>
    )
}