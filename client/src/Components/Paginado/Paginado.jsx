//import React, { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { paginado } from '../../redux/actions';
import style from './paginado.module.css'

const Paginado=()=>{
  const dispatch= useDispatch();
  const pages = useSelector((state)=> state.pages)
  const currentPage = useSelector((state)=> state.currentPage)

  const handleValue =(value)=>{
    dispatch(paginado(value))
  }

  const nextImg = "https://cdn-icons-png.flaticon.com/128/10696/10696041.png"
  const prevImg = "https://cdn-icons-png.flaticon.com/128/10696/10696056.png"
  const startImg = "https://cdn-icons-png.flaticon.com/128/32/32766.png"
  const endImg = "https://cdn-icons-png.flaticon.com/128/32/32738.png"

  return(
    <div className={style.globalCont}>
     <div className={style.divCont}>

      <button className={style.start} onClick={()=> handleValue("start")}>
          <img title="start" src={startImg} alt={"start"} className={style.imgStart}/>
      </button> 
      <button className={style.prev} onClick={()=> handleValue("prev")}>
           <img title="prev" src={prevImg} alt={"prev"} className={style.imgPrev}/>
      </button>
      {
          pages.map((n)=>{
            return ( 
              <button className={style.num} 
                 style={{color: currentPage === n? "white": "black"}}
                 onClick={()=> handleValue(n)}>{n}
              </button> 
            )
          })
      }
      <button className={style.next} onClick={()=> handleValue("next")}>
         <img title="next" src={nextImg} alt={"next"} className={style.imgNext}/>
      </button>
      <button className={style.end} onClick={()=> handleValue("end")}>
         <img title="end" src={endImg} alt={"end"} className={style.imgEnd}/>
      </button> 

     </div>

    </div>
  )


}

export default Paginado


