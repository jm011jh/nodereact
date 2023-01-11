import axios from "axios"
import { useState, useEffect } from "react"
import useStore from '../../../store/index'

export default function AdmItem(){
    const { getTeachers, getSubjects, getItems, getType } = useStore(state => state)

    let [ subjectList, setSubjectList ] = useState([])
    let [ teacherList, setTeacherList ] = useState([])
    let [ itemList, setItemList ] = useState([])
    let [ typeList, setTypeList ] = useState([])

    let [ itemDone, setItemDone ] = useState(false)
    let [ typeDone, setTypeDone ] = useState(false)
    let [ teacherDone, setTeacherDone ] = useState(false)
    let [ subjectDone, setSubjectDone ] = useState(false)
    useEffect(()=>{
        axios.get("/api/getcount")
        .then((res) => {
            var countFilter = res.data.filter(x => x.count_name === "item")
        });
        
        getSubjects.then((res) => { setSubjectList(res); setSubjectDone(true);})
        getTeachers.then((res) => { setTeacherList(res); setTeacherDone(true);})
        getItems.then((res) => { setItemList(res);setItemDone(true);})
        getType.then((res) => { setTypeList(res);setTypeDone(true);})
    },[])
    return(
        <div className="post--wrap">
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
                    {
                        itemDone && typeDone && teacherDone && subjectDone
                        ?<PostDataCnt itemList={itemList} typeList={typeList} teacherList={teacherList} subjectList={subjectList}></PostDataCnt>
                        : <div>자료를 불러오는 중입니다.</div>
                    }
                </div>
            </div>
        </div>
    )
}

function PostDataCnt(props){

    const typeList = props.typeList
    const subjectList = props.subjectList
    const teacherList = props.teacherList
    return(
        props.itemList.map(function(data, i){
            return(
                <div key={i} className="post--dataItem">
                <div className="post--dataItem-contents">
                    <div className="post--dataItem-text">
                                <div className="post--dataItem-text02">{
                                typeList.filter(x => x.index == data.item_type)[0].title
                                }</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{data.item_title}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{
                                subjectList.filter(x => x.subject_index == data.item_subject)[0].subject_name
                            }</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{data.item_date}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{data.item_time}</div>
                                <span className="post--dataItem-line"></span>
                                <div className="post--dataItem-text02">{
                                    teacherList.filter(x => x.teach_id == data.item_teacher_id)[0].teach_name
                                }</div>
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