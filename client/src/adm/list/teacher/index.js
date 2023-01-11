import axios from "axios"
import { useState, useEffect } from "react"
import useStore from '../../../store/index'

export default function AdmTeacher(){
    const { getTeachers, getSchools } = useStore(state => state)
    let [ schoolList, setSchoolList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    let [ schoolDone, setSchoolDone ] = useState(false)
    let [ teacherDone, setTeacherDone ] = useState(false)
    useEffect(() => {
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name === "teacher")
            
        });
        getTeachers.then(res => {
            setTeacherList(res)
            setTeacherDone(true)
        })
        getSchools.then(res => {
            setSchoolList(res)
            setSchoolDone(true)
        })

    },[])
    return(
        <div className="post--wrap">
            <div className="post--dataList">
                <div className="post--dataTitle">등록된 선생님 목록</div>
                <div className="post--dataHead">
                    <div className="post--dataItem-text02">선생님 이름</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">선생님 소속</div>
                    <span className="post--dataItem-line"></span>
                    <div className="post--dataItem-text02">선생님 이력</div>
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
    const fixThisItem = (event) => {
        const thisBtn = event.currentTarget
        if(thisBtn.classList.contains("open")){
            thisBtn.classList.remove("open")
        } else {
            thisBtn.classList.add("open")
        }
    }
    return(
        teacherList.map(function(data, i){
            return(
                <div key={i} className="post--dataItem">
                    <div className="post--dataItem-contents">
                        <div className="post--dataItem-text">
                            <div className="post--dataItem-text02">{data.teach_name}</div>
                            <span className="post--dataItem-line"></span>
                            <div className="post--dataItem-text02">{schoolList[data.teach_school].school_name}</div>
                            <span className="post--dataItem-line"></span>
                            <div className="post--dataItem-text02">{data.teach_history}</div>
                            <span className="post--dataItem-line"></span>
                        </div>
                        <div className="post--dataItem-fix-btn" onClick={fixThisItem}>
                            <span className="material-symbols-outlined">edit</span>
                            <span className="material-symbols-outlined">close</span>
                        </div>
                    </div>
                </div>
            )
        })
    )
}