import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostTeacher(){
    let [teachId, setTeachId] = useState("")
    let [teachName, setTeachName] = useState("")
    let [teachSchool, setTeachSchool] = useState("")
    let [teachHistory, setTeachHistory] = useState("")
    let idHandler = (e) => {
        e.preventDefault();
        setTeachId(e.target.value)
    }
    let nameHandler = (e) => {
        e.preventDefault();
        setTeachName(e.target.value)
    }
    let schoolHandler = (e) => {
        e.preventDefault();
        setTeachSchool(e.target.value)
    }
    let saveHandler = (e) => {
        let body = {

        }
        axios.post("/api/teacherpost",body).then((res) => console.log(res))
    }
    return(
        <div>
            <div> let's post the teacher object</div>
            <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>teacher id</Form.Label>
                    <Form.Control type="number" placeholder="test" name="teach_id" value={teachId} onChange={idHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>teacher name</Form.Label>
                    <Form.Control type="text" placeholder="test" name="teach_name" value={teachName} onChange={nameHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>teacher school</Form.Label>
                    <Form.Control type="number" placeholder="test" name="teach_school" value={teachSchool} onChange={schoolHandler} />
                </Form.Group>
            </Form>
        </div>
    )
}