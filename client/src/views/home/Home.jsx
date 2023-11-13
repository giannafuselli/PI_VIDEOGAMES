import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../Components/Card/Card';
import { getAllVGames, notReload} from '../../redux/actions';
import style from "./home.module.css";
//import Paginado from '../../Components/Paginado/Paginado'; 



const Home = () => {
    const dispatch = useDispatch();
    const videoGames = useSelector((state)=> state.paginado);
    const coincidences = useSelector((state)=> state.coincidences);
    const not_reload = useSelector((state)=> state.not_reload)

    useEffect(()=>{
      if(!not_reload){
        dispatch(getAllVGames())
        dispatch(notReload(true))
      }
    },[])


  return (
    <>
 
    <div className={style.homeContenedor}>

      {

      videoGames.length ? (videoGames.map((vg)=>{
        return(
          <div >
          <Card 
          key={vg.id}
          id={vg.id}
          name={vg.name}
          image={vg.image}
          platforms={vg.platforms}
          released={vg.released}
          rating={vg.rating}
          description={vg.description}
          genres={vg.genres? vg.genres.map(x => x.name + (" ")): "undefined"}
          />
          </div>
        )
      })) : (coincidences===false
                ?(<div className={style.divLoading}><p className={style.loading}>No coincidences</p></div>)
                :(<div className={style.divLoading}><p className={style.loading}>Loading...</p></div>))
      
      }
    
    </div>
    </>
  )
}

export default Home