import React from 'react';
import Reload from './Reload';
import SearchBar from '../searchBar/SearchBar';
import { NavLink, useLocation } from 'react-router-dom';
import style from './Nav.module.css';
import Filters from '../filters/Filters';
import Paginado from '../Paginado/Paginado';

const NavBar = () => { 
  
  const {pathname} = useLocation();

  
  const imgLogo = "https://cdn-icons-png.flaticon.com/128/2992/2992282.png"
  const imgHome = "https://cdn-icons-png.flaticon.com/128/5948/5948524.png"
  const imgCreate = " https://cdn-icons-png.flaticon.com/128/5719/5719509.png"
  const imgBye = "https://cdn-icons-png.flaticon.com/128/8336/8336213.png"

//RENDER
  return (
  <>
    <div className={style.navContenedor1}>
      
        <img className={style.imgLogo} src={imgLogo} alt="logo"/>  
        
        { !(pathname === "/create" || pathname.includes("/detail") || pathname.includes("/update")) && <Filters path="/:"/>}
        { !(pathname === "/create" || pathname.includes("/detail") || pathname.includes("/update") ) && <Reload path="/:"/>}
        { !(pathname === "/create" || pathname.includes("/detail") || pathname.includes("/update") ) && <SearchBar path="/:"/>}
        <NavLink to="/home"><button className={style.btnHome} title="home"><img src={imgHome} className={style.imgHome} alt="home"/></button></NavLink>
        <NavLink to="/create"><button className={style.btnCreate} title="create"><img src={imgCreate} className={style.imgCreate} alt="create"/></button></NavLink>
        <NavLink to="/"><button className={style.btnLogOut} title="log out"><img src={imgBye} className={style.imgBye} alt="log out"/></button></NavLink>    
      </div>
    <div> 
      { 
      !(pathname === "/create" || pathname.includes("/detail") || pathname.includes("/update")) && <Paginado path="/:"/>
      }
    </div>
  </>
  )
}

export default NavBar