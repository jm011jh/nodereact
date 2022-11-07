import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostType(){
    let [ typeName, setTypeName ] = useState("")
    let [ typeCount, setTypecount ] = useState("")
    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            res.data.forEach((el)=>{
                console.log(el.count_name + "is" + el.count_num)
            })
            // console.log(res.data)
            // setTypecount(countFilter[0].count_num)
        })

        axios.get("/api/gettype")
        .then((res) => {
            // console.log(res.data)
        })
    },[])
    return(
        <div> let's post the PostType object</div>
    )
}