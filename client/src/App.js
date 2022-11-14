import Data from './datarequest'
import Layout from './components/Layout';
import Main from './main';
import Admin from './adm';
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
        <Route path="/adm" element={<Admin/>}/>
        <Route path="/" element={<Main/>}/>
      </Routes>
      </div>
      <Layout/>
    </div>
  );
}

export default App;
