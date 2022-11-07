import Data from './datarequest'
import Layout from './components/Layout';
import Admin from './adm';
import PostTeacher from './api/post/PostTeacher';
import PostClass from './api/post/PostClass';
import PostType from './api/post/PostType';
import PostSchool from './api/post/PostSchool';
import { Routes, Route, Link } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/adm" element={<Admin/>}>
            <Route path='post/teacher' element={<PostTeacher/>}></Route>
            <Route path='post/class' element={<PostClass/>}></Route>
            <Route path='post/type' element={<PostType/>}></Route>
            <Route path='post/school' element={<PostSchool/>}></Route>
        </Route>
      </Routes>
      {/* <Data/> */}
      <Layout/>
    </div>
  );
}

export default App;
