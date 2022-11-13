import axios from "axios"
import { Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react"

export default function PostSchool(){
    let [ schoolName, setSchoolName ] = useState("")
    let [ schoolCount, setSchoolCount ] = useState("")
    let [ schoolDone, setSchoolDone ] = useState(false)
    let [ schoolList, setSchoolList ] = useState([])

    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name === "school")
            setSchoolCount(countFilter[0].count_num)
        })
        axios.get("/api/getschool")
        .then((res) => {
            console.log(res.data)
            setSchoolList(res.data)
            setSchoolDone(true)
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
        <div className="post--wrap">
            <div className="post--form">
                <div className="post--form-title">학교를 등록하세요.</div>
                <Form>
                <Form.Group className="mb-3">
                    <div className="post--form-label">학교명</div>
                    <Form.Control type="text" placeholder="학교의 이름을 입력하세요." name="school_name" value={schoolName} onChange={nameHandler} />
                </Form.Group>
                <div className="post--submit-btn" onClick={saveHandler}>보내볼까</div>
                </Form>
            </div>
            <div className="post--dataList">
                <div className="post--dataTitle">등록된 학교 목록</div>
                <div className="post--dataHead">
                    <div className="post--dataItem-text01">학교이름</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">학교번호</div>
                </div>
                <div className="post--dataCnt">
                    {
                        schoolDone 
                        ? <PostDataCnt schoolList={schoolList}></PostDataCnt> 
                        : <div>자료를 불러오는 중입니다.</div>
                    }
                </div>
            </div>
        </div>

        


        
    )
}

function PostDataCnt(props){    
    let [ opendFixNumber, setOpendFixNumber ] = useState(null)
    const schoolList = props.schoolList
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
    return(
        schoolList.map(function(data, i){
            return(
                <div key={i} className="post--dataItem">
                    <div className="post--dataItem-contents">
                        <div className="post--dataItem-text">
                            <div className="post--dataItem-text01">{data.school_name}</div>
                            <span className="post--dataItem-line"></span>
                            <div className="post--dataItem-text01">{data.school_id}</div>
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
        })
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