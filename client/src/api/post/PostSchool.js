import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostSchool(){
    let [ schoolName, setSchoolName ] = useState("")
    let [ schoolCount, setSchoolCount ] = useState("")
    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name == "school")
            setSchoolCount(countFilter[0].count_num)
        })
        axios.get("/api/getschool")
        .then((res) => {
            console.log(res.data)
        })
    },[])

    let nameHandler = (e) => {
        e.preventDefault();
        setSchoolName(e.target.value)
    }
    let saveHandler = (e) => {
        let body = {
            school_id : Number(schoolCount + 1),
            school_name : schoolName,
        }
        axios.post("/api/schoolpost",body).then((res) => console.log(res));
    }
    return(
        <div>
        <div> let's post the school object</div>
        <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>school name</Form.Label>
                    <Form.Control type="text" placeholder="학교의 이름을 입력하세요." name="teach_name" value={schoolName} onChange={nameHandler} />
                </Form.Group>
            </Form>
            <button onClick={saveHandler}>보내볼까</button>
        </div>
        
    )
}