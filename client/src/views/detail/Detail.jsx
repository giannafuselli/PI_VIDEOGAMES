import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink,useNavigate, useParams } from 'react-router-dom';
import { getDetail, deleteVgame, getAllVGames, clearDetail } from '../../redux/actions';
import style from './detail.module.css';
//cartas
const Detail = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  const videoGame = useSelector((state)=>state.detail);
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getDetail(id))
    return ()=>dispatch(clearDetail())
  },[]);

  const removeHTMLtags =(string) => {
    const regex = /<[^>]*>/g;
    return string.replace(regex, '');
  }

 const deleteHandler=(event)=>{
  event.preventDefault();
  dispatch(deleteVgame(id))
  alert("Videogame deleted")
  setTimeout(()=>{
    dispatch(getAllVGames())
    navigate("/home")
  }, 1000);
 }

 const editHandler=(event)=>{
  navigate("/update/" + id)
 }


 const goBack=(event)=>{
   event.preventDefault();
   navigate("/home")
   return ()=>dispatch(clearDetail())
 }

  return (
    <div >
      {videoGame?.image ? (
      <div className={style.cont} >
        <div className={style.divsCont}>

          <div className={style.nameCont}>
            <h1 className={style.name}>{videoGame?.name}</h1>

          </div>

          <div className={style.descCont}>
            <p className={style.description}>{videoGame?.createdInDb? videoGame?.description : removeHTMLtags(videoGame?.description)}</p>
          </div>
        
        <div className={style.contRRPG}>

          <div className={style.relRatCont}>
            <h4 className={style.released}>Released: <br/> {videoGame?.released}</h4>
            <h4 className={style.rating}>Rating: <br/> {videoGame?.rating}</h4>
          </div>
       
          <div className={style.platGenCont}>
            <h4 className={style.platforms}>Platforms: <br/> {videoGame?.platforms?.join(", ")}</h4>
            <h4 className={style.genres}>Genres:<br/> {videoGame?.genres?.map((x)=>x.name).join(", ")}</h4>
          </div>


        </div>
      
        <div className={style.imgCont}>
          <img className={style.image} src={videoGame?.image} alt={`image of ${videoGame.name}`} />
        </div>

          <div className={style.buttons}>
            <div>
              <button className={style.backBtn} onClick={(e)=>goBack(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/9678/9678540.png" alt="back"/></button>
            </div>
          {videoGame?.createdInDb ? (
          <div>
            <button className={style.editBtn} onClick={(e)=>editHandler(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/650/650143.png" alt="edit"/></button> 
          <button className={style.delBtn} onClick={(e)=>deleteHandler(e)}><img className={style.imgBtn} src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png" alt="delete"/></button></div>) : null }
          </div>
        </div>

      </div>
      ) : 
      <div className={style.divLoading}>
        <p className={style.loading}>Loading...</p>
      </div>
     }
    </div>
  )
}

export default Detail