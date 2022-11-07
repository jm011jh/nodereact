import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostClass(){
    let [ className, setClassName ] = useState("")
    let [ classCount, setClassCount ] = useState("")
    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            res.data.forEach((el)=>{
                console.log(el.count_name + "is" + el.count_num)
            })
        })
        axios.get("/api/getclass")
        .then((res) => {
            console.log(res.data)
        })
    },[])

    return(
        <div> let's post the Class object</div>
    )
}