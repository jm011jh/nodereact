import './style.css'
import { useEffect, useState } from 'react'
import SidebarAdm from './Sidebar_adm'
import useStore from '../store'
import { Outlet } from 'react-router'

export default function Admin(){
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
        <div className='adm--container'>
            <SidebarAdm></SidebarAdm>
            <Outlet></Outlet>
        </div>
    )
}