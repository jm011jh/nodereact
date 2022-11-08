import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import './api_post.css'
import { useState, useEffect } from "react"

function PostTeacher(){
    let [ teachName, setTeachName ] = useState("")
    let [ teachSchool, setTeachSchool ] = useState("")
    let [ teachHistory, setTeachHistory ] = useState("")
    let [ teacherCount, setTeacherCount ] = useState("")
    let [ schoolList, setSchoolList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    let [ schoolDone, setSchoolDone ] = useState(false)
    let [ teacherDone, setTeacherDone ] = useState(false)
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
                setSchoolDone(true)
            } catch (err) {
                console.log(err)
            }
        }
        fetchSchoolData();
        const fetchTeacherData = async ()=> {
            try {
                const res = await axios.get("/api/getteacher")
                setTeacherList(res.data)
                setTeacherDone(true)
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
        if( !body.teach_name && !body.teach_school ){
            alert("이름과 소속 학교는 필수 항목입니다.")
            return;
        } else {
            if(!body.teach_name){
                alert("강사의 이름을 입력해주세요.")
                return;
            } else if(!body.teach_school){
                alert("강사의 소속 학교를 선택해주세요.")
                return;
            } else{
                axios.post("/api/teacherpost",body).then((res) => console.log(res));
            }
        }
    }
    return(
        <div className="post--wrap">
            <div className="post--form">
                <div>강사를 등록하세요.</div>
                <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <div className="post--form-label">이름</div>
                    <Form.Control type="text" placeholder="강사의 이름을 입력하세요." name="teach_name" value={teachName} onChange={nameHandler} />
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Form.Label>teacher school</Form.Label>
                    <Form.Control type="number" placeholder="강사의 학교를 입력하세요" name="teach_school" value={teachSchool} onChange={schoolHandler} />
                </Form.Group> */}
                <Form.Group className="mb-3">
                <div className="post--form-label">연혁</div>
                    <Form.Control type="text" placeholder="강사의 연혁을 입력하세요" name="teach_history" value={teachHistory} onChange={historyHandler} />
                </Form.Group>
                <div className="post--form-label">소속 학교</div>
                <Form.Select area-label="default select example" onChange={schoolHandler}>
                    <option>Open this select menu</option>
                    {
                        schoolList.map(function( data, i ){
                            return(<option key={i} value={data.school_id}>{data.school_name}</option>)
                        })
                    }
                </Form.Select>
                <div className="post--submit-btn" onClick={saveHandler}>보내볼까</div>
                </Form>
            </div>
            <div className="post--dataList">
                <div className="post--dataTitle">등록된 선생님 목록</div>
                <div className="post--dataHead">
                    <div className="post--dataItem-text01">선생님 이름</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">선생님 소속</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text03">선생님 이력</div>
                </div>
                <div className="post--dataCnt">
                    {
                        teacherDone && schoolDone 
                        ? <PostDataCnt teacherList={teacherList} schoolList={schoolList}></PostDataCnt> 
                        : <div>자료를 불러오는 중입니다.</div>
                    }
                </div>
            </div>
        </div>
    )
}
function PostDataCnt(props){
    const teacherList = props.teacherList
    const schoolList = props.schoolList
    return(
        teacherList.map(function(data, i){
            return(
                <div key={i} className="post--dataItem">
                    <div className="post--dataItem-text01">{data.teach_name}</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">{schoolList[data.teach_school].school_name}</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text03">{data.teach_history}</div>
                </div>
            )
        })
    )
}

export default PostTeacher