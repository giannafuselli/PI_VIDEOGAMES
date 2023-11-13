import './App.css';
import {Routes, Route, useLocation} from "react-router-dom";
import Home from './views/home/Home';
import Form from './views/Form/Form';
import Detail from './views/detail/Detail';
import LandingPage from './views/landingPage/LandingPage';
import NavBar from './Components/nav/navbar';
import Update from './Components/update/Update'

function App() {
  return (
    <div className="App">
       
      {!((useLocation()).pathname === "/") && <NavBar path="/:"/>}
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/create" element={<Form/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
    </div>
  );
}

export default App;
