import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"
import useStore from '../../store/index'

export default function PostItem(){
    const { getTeachers, getSubjects, getItems, getType, getSchools } = useStore(state => state)

    let [ itemType, setItemType ] = useState("")
    let [ itemTitle, setItemTitle ] = useState("")
    let [ itemSubject, setItemSubject ] = useState("")
    let [ itemDate, setItemDate ] = useState("")
    let [ itemTime, setItemTime ] = useState("")
    let [ itemTeacherId, setItemTeacherId ] = useState("")
    let [ itemCount, setItemCount ] = useState("")

    let [ subjectList, setSubjectList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    let [ schoolList, setSchoolList ] = useState([])
    let [ itemList, setItemList ] = useState([])
    let [ typeList, setTypeList ] = useState([])
    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name === "item")
            setItemCount(countFilter[0].count_num)
        });
    },[])
    useEffect(()=>{
        getSchools.then((res) => { setSchoolList(res) })
    },[getSchools])
    useEffect(()=>{
        getSubjects.then((res) => { setSubjectList(res) })
    },[getSubjects])
    useEffect(()=>{
        getTeachers.then((res) => { setTeacherList(res) })
    },[getTeachers])
    useEffect(()=>{
        getItems.then((res) => { setItemList(res) })
    },[getItems])
    useEffect(()=>{
        getType.then((res) => { setTypeList(res) })
    },[getType])
    let typeHandler = (e) => {
        e.preventDefault()
        setItemType(e.target.value)
    }
    let titleHandler = (e) => {
        e.preventDefault()
        setItemTitle(e.target.value)
    }
    let subjectHandler = (e) => {
        e.preventDefault()
        setItemSubject(e.target.value)
    }
    let DateHandler = (e) => {
        e.preventDefault()
        setItemDate(e.target.value)
    }
    let TimeHandler = (e) => {
        e.preventDefault()
        setItemTime(e.target.value)
    }
    let teacherIdHandler = (e) => {
        e.preventDefault()
        setItemTeacherId(e.target.value)
    }
    let saveHandler = (e) => {
        let body = {
            item_id : Number(itemCount + 1),
            item_type :   Number(itemType),
            item_title :  String(itemTitle),
            item_subject :  Number(itemSubject),
            item_date :   itemDate,
            item_time :   itemTime,
            item_teacher_id : Number(itemTeacherId),
            item_count_student : Number(0),
        }
        axios.post("/api/itempost",body).then((res) => console.log(res))
    }
    return(
        <div className="post--wrap">
            <div className="post--form">
                <div className="post--form-title">수업을 등록하세요.</div>
                <Form onSubmit={saveHandler}>
                <Form.Group className="mb-3">
                    <div className="post--form-label">강의 종류</div>
                    <Form.Select area-label="default select example" onChange={typeHandler}>
                    <option>강의종류를 선택해주세요</option>
                    {
                        typeList.map(function( data, i ){
                            return(<option key={i} value={data.index}>{data.title}</option>)
                        })
                    }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="post--form-label">강의제목</div>
                    <Form.Control type="text" placeholder="수업의 제목을 입력하세요." name="item_title" value={itemTitle} onChange={titleHandler} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="post--form-label">강의 과목</div>
                    <Form.Select area-label="default select example" onChange={subjectHandler}>
                    <option>과목을 선택해주세요</option>
                    {
                        subjectList.map(function( data, i ){
                            return(<option key={i} value={data.subject_index}>{data.subject_name}</option>)
                        })
                    }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="post--form-label">강의 날짜</div>
                    <div className="flex post--form-date">
                    <Form.Control type="date" placeholder="YYYY" name="item_date" value={itemDate} onChange={DateHandler}/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="post--form-label">강의 시간</div>
                    <div className="flex post--form-date">
                    <Form.Control type="time" name="item_time" value={itemTime} onChange={TimeHandler}/>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="post--form-label">담당 강사</div>
                    <Form.Select area-label="default select example" onChange={teacherIdHandler}>
                    <option>강사를 선택해주세요</option>
                    {
                        teacherList.map(function( data, i ){
                            return(<option key={i} value={data.teach_id}>{data.teach_name}</option>)
                        })
                    }
                    </Form.Select>
                </Form.Group>
                <div className="post--submit-btn" onClick={saveHandler}>수업등록</div>
                </Form>
            </div>
            <div className="post--dataList">
                <div className="post--dataTitle">등록된 강의 목록</div>
                <div className="post--dataHead">
                    <div className="post--dataItem-text02">강의 종류</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">강의 제목</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">강의 과목</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">강의 날짜</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">강의 시간</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">담당 강사</div>
                </div>
                <div className="post--dataCnt">
                    <PostDataCnt typeList={typeList}></PostDataCnt>
                </div>
            </div>
        </div>
    )
}

function PostDataCnt(props){
    const { getTeachers, getSubjects, getItems, getType, getSchools } = useStore(state => state)

    let [ opendFixNumber, setOpendFixNumber ] = useState(null)
    const fixThisItem = (event, i) => {
        const thisBtn = event.currentTarget
        setOpendFixNumber(null)
        if(thisBtn.classList.contains("open")){
            thisBtn.classList.remove("open")
        } else {
            document.querySelectorAll(".post--dataItem-fix-btn").forEach(function(el){
                el.classList.remove("open")
            })
            thisBtn.classList.add("open")
            setOpendFixNumber(i)
        }
    }

    let [ subjectList, setSubjectList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    let [ schoolList, setSchoolList ] = useState([])
    let [ itemList, setItemList ] = useState([])
    let [ typeList, setTypeList ] = useState([])

    getSchools.then((res) => { setSchoolList(res) })
    getSubjects.then((res) => { setSubjectList(res) })
    getTeachers.then((res) => { setTeacherList(res) })
    getType.then((res) => { setTypeList(res) })
    getItems.then((res) => { setItemList(res) })
    function test(){
    }
    console.log(typeList[0])
    return(
        <>
        <button onClick={()=>test()}>click</button>
        {itemList.map(function(data, i){
                    return(
                        <div key={i} className="post--dataItem">
                        <div className="post--dataItem-contents">
                            <div className="post--dataItem-text">
                                {/* <div className="post--dataItem-text01">{typeList[0].title}</div> */}
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text01">{data.item_title}</div>
                                <span className="post--dataItem-line"></span>
                                {/* <div className="post--dataItem-text01">{subjectList[0].subject_name}</div> */}
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text01">{data.item_date}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text01">{data.item_time}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text01">{data.item_teacher_id}</div>
                            </div>
                            <div className="post--dataItem-fix-btn" onClick={(e)=>fixThisItem(e,i)}>
                                <span className="material-symbols-outlined">edit</span>
                                <span className="material-symbols-outlined">close</span>
                            </div>
                        </div>
                        {
                            opendFixNumber === i ? <PostDataCntFixForm data={data} opendFixNumber={opendFixNumber} /> : null
                        }
                    </div>
                    )
        })}
        </>
    )
}
function PostDataCntFixForm(props){
    let [fixedSchoolName, setFixedSchoolName] = useState("")
    let fixHandler = (e) => {
        // let body = {
        //     school_name : fixedSchoolName,
        // }
        // axios.post("/api/schoolpost",body).then((res) => console.log(res));
    }
    return(
        <div className="post--dataItem-fixInput">
        <Form>
            <div className="post--form-fixRow">
                <div className="post--form-label">수정할 학교명</div>
                <Form.Control type="text" placeholder={props.data.school_name} name="school_name" value={fixedSchoolName} onChange={setFixedSchoolName} />
            </div>
            <div className="post--submit-btn" onClick={fixHandler}>수정하기</div>
        </Form>
    </div>
    )
}