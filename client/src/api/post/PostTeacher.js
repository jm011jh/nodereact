import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostTeacher(){
    let [teachName, setTeachName] = useState("")
    let [teachSchool, setTeachSchool] = useState("")
    let [teachHistory, setTeachHistory] = useState("")
    let [teacherCount, setTeacherCount] = useState("")
    useEffect(() => {
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name == "teacher")
            setTeacherCount(countFilter[0].count_num)
        });

        axios.get("/api/getteacher")
        .then((res) => {
            console.log(res.data)
        })
    },[])
    let testFunction = (e) => {
        console.log(teacherCount)
    }
    let nameHandler = (e) => {
        e.preventDefault();
        setTeachName(e.target.value)
    }
    let schoolHandler = (e) => {
        e.preventDefault();
        setTeachSchool(e.target.value)
    }
    let historyHandler = (e) => {
        e.preventDefault();
        setTeachHistory(e.target.value)
    }
    let saveHandler = (e) => {
        let body = {
            teach_id : Number(teacherCount + 1),
            teach_name : teachName,
            teach_school : Number(teachSchool),
            teach_history : teachHistory
        }
        axios.post("/api/teacherpost",body).then((res) => console.log(res));
    }
    return(
        <div>
            <div> let's post the teacher object</div>
            <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>teacher name</Form.Label>
                    <Form.Control type="text" placeholder="강사의 이름을 입력하세요." name="teach_name" value={teachName} onChange={nameHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>teacher school</Form.Label>
                    <Form.Control type="number" placeholder="강사의 학교를 입력하세요" name="teach_school" value={teachSchool} onChange={schoolHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>teacher history</Form.Label>
                    <Form.Control type="text" placeholder="강사의 연혁을 입력하세요" name="teach_history" value={teachHistory} onChange={historyHandler} />
                </Form.Group>
            </Form>
            <button onClick={saveHandler}>보내볼까</button>
        </div>
    )
}