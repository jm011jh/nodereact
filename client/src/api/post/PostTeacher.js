import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './api_post.css'
import { useState, useEffect } from "react"

export default function PostTeacher(){
    let [teachName, setTeachName] = useState("")
    let [teachSchool, setTeachSchool] = useState("")
    let [teachHistory, setTeachHistory] = useState("")
    let [teacherCount, setTeacherCount] = useState("")
    let [ schoolList, setSchoolList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    useEffect(() => {
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name == "teacher")
            setTeacherCount(countFilter[0].count_num)
        });
        const fetchSchoolData = async ()=> {
            try {
                const res = await axios.get("/api/getschool")
                setSchoolList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSchoolData();
        const fetchTeacherData = async ()=> {
            try {
                const res = await axios.get("/api/getteacher")
                setTeacherList(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchTeacherData()
    },[])
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
        <div className="post--wrap">
            <div> let's post the teacher object</div>
            <div className="post--form">
                <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>teacher name</Form.Label>
                    <Form.Control type="text" placeholder="강사의 이름을 입력하세요." name="teach_name" value={teachName} onChange={nameHandler} />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>teacher school</Form.Label>
                    <Form.Control type="number" placeholder="강사의 학교를 입력하세요" name="teach_school" value={teachSchool} onChange={schoolHandler} />
                </Form.Group> */}
                <Form.Group className="mb-3">
                    <Form.Label>teacher history</Form.Label>
                    <Form.Control type="text" placeholder="강사의 연혁을 입력하세요" name="teach_history" value={teachHistory} onChange={historyHandler} />
                </Form.Group>
                <Form.Select area-label="default select example" onChange={schoolHandler}>
                    <option>Open this select menu</option>
                    {
                        schoolList.map(function( data, i ){
                            return(<option key={i} value={data.school_id}>{data.school_name}</option>)
                        })
                    }
                </Form.Select>
                </Form>
                <button onClick={saveHandler}>보내볼까</button>
            </div>
            <div className="post--dataList">
                <div className="post--dataHead">
                <div className="post--dataItem-text01">선생님 이름</div>
                <span className="post--dataItem-line"></span>
                <div className="post--dataItem-text02">선생님 소속</div>
                <span className="post--dataItem-line"></span>
                <div className="post--dataItem-text03">선생님 이력</div>
                </div>
                {

                    teacherList.map(function(data, i){
                        return(
                            <div key={i} className="post--dataItem">
                                <div className="post--dataItem-text01">{data.teach_name}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{schoolList[data.teach_school].school_name}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text03">{data.teach_history}</div>
                                {/* <div className="post--dataItem-text02">{thisSchool.school_name}</div> */}
                                <div className="post--dataItem-text03"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}