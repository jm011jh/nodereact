import Data from './datarequest'
import Layout from './components/Layout';
import Main from './main';
import Admin from './adm';
import PostTeacher from './api/post/PostTeacher';
import PostItem from './api/post/PostItem';
import PostType from './api/post/PostType';
import PostSchool from './api/post/PostSchool';
import { Routes, Route, Link } from 'react-router-dom'
import './static/pretendard.css'
import './public.css'
import useStore from './store/index'
import { useEffect } from 'react';


function App() {

  return (
    <div className="App">
      <div className='cnt'>

      <Routes>
        <Route path="/adm" element={<Admin/>}>
            <Route path="post/teacher" element={<PostTeacher/>}></Route>
            <Route path="post/item" element={<PostItem/>}></Route>
            <Route path="post/type" element={<PostType/>}></Route>
            <Route path="post/school" element={<PostSchool/>}></Route>
        </Route>
          <Route path="/" element={<Main/>}/>
      </Routes>
      </div>
      <Layout/>
    </div>
  );
}

export default App;
