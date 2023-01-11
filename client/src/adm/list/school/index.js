import axios from "axios"
import { Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import useStore from '../../../store/index'

export default function AdmSchool(){
    const { getSchools } = useStore(state => state)

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
        getSchools.then(res => {
            setSchoolList(res)
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
            <div className="post--dataList">
                <div className="post--dataTitle">등록된 학교 목록</div>
                <div className="post--dataHead">
                    <div className="post--dataItem-text02">학교이름</div>
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
    const schoolList = props.schoolList
    return(
        schoolList.map(function(data, i){
            return(
                <div key={i} className="post--dataItem">
                    <div className="post--dataItem-contents">
                        <div className="post--dataItem-text">
                            <div className="post--dataItem-text02">{data.school_name}</div>
                            <span className="post--dataItem-line"></span>
                            <div className="post--dataItem-text02">{data.school_id}</div>
                        </div>
                        <div className="post--dataItem-fix-btn">
                            <span className="material-symbols-outlined">edit</span>
                            <span className="material-symbols-outlined">close</span>
                        </div>
                    </div>
                </div>
            )
        })
    )
}