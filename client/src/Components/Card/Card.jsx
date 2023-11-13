import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => { //REND
  return (
    <div className={style.cardContenedor}>
     <img className={style.image} src={props.image} alt={`image of ${props.name}`} />
     <h3 className={style.name}>{props.name}</h3>
     <h6 className={style.genres}>{props.genres}</h6>
     <NavLink to={`/detail/${props.id}`}>
      <button className={style.btn}>About</button>
      </NavLink>

    </div>
  )
}

export default Card