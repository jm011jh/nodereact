import Data from './datarequest'
import Layout from './components/Layout';
import Main from './main';
import Admin from './adm';
import { Routes, Route, Link } from 'react-router-dom'
import './static/pretendard.css'
import './public.css'
import useStore from './store/index'
import { useEffect } from 'react';
import AdminList from './adm/list';
import AdmSchool from './adm/list/school';
import AdmTeacher from './adm/list/teacher';
import AdmItem from './adm/list/item';


function App() {

  return (
    <div className="App">
      <div className='cnt'>

      <Routes>
        <Route path="/adm" element={<Admin/>}>
          <Route path="list" element={<AdminList/>}>
            <Route path="school" element={<AdmSchool/>}></Route>
            <Route path="teacher" element={<AdmTeacher/>}></Route>
            <Route path="item" element={<AdmItem/>}></Route>
          </Route>
        </Route>
        <Route path="/" element={<Main/>}/>
      </Routes>
      </div>
      <Layout/>
    </div>
  );
}

export default App;
