import axios from 'axios';
import {useEffect, useState} from 'react';

function DataRequest(){
    let [datas, setDatas] = useState(() => ["100","101"])
    useEffect(() => {
        axios.get("/api/teacherget")
            .then((res) => {
                let thisData = [...res.data]
                setDatas(thisData)
            })
            .catch((err) => {
                console.log(err)
            })
    },[])
    return(
        <div className='test'>
            {
                datas.map((teacher,i) => {
                    return(
                        <div key={i}>{teacher.teach_name}</div>
                    )
                })
            }
        </div>
    )
}

export default DataRequest;