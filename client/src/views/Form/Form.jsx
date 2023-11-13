import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Validation from './validation';
import { getGenres, postVgame, clearErrors, getAllVGames, setNewErrors} from '../../redux/actions';
import {useNavigate} from 'react-router-dom';
import style from "./form.module.css";


const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state)=> state.genres);
  const navigate = useNavigate()
  const gErrors = useSelector((state)=> state.errors)

  const [errors, setErrors] = useState({});

  const [input, setInput]= useState({
    name: "",
    description: "",
    platforms: [],
    released:"",
    rating:0,
    genres: [],
    image: ""
  });

  useEffect(()=>{
    dispatch(getGenres())
    return()=>dispatch(clearErrors())
  },[dispatch])


  const handleChange =(event)=>{
   setInput({
    ...input,
    [event.target.name]: event.target.value
   })
   setErrors(Validation({
    ...input,
    [event.target.name]: event.target.value
   }))
  };


  const validateInput = (inputData) =>{
    const errors = Validation(inputData)
    setErrors(errors)
  }

  const handleGenres =(event)=>{
    event.preventDefault();
    const rep = input.genres.find(genre => genre=== event.target.value)
    if(event.target.value !== "default" && !rep){//Si el valor no es la primer option y no está repetido
      setInput({
        ...input, genres: [...input.genres, event.target.value]
      })
      event.target.value= "default"
      validateInput({
      ...input, genres: [...input.genres, event.target.value]
      })
    } event.target.value = "defualt"
  };

  
    const handlePlatforms =(event)=>{
      event.preventDefault();
      const rep = input.platforms.find(plat => plat=== event.target.value)
  
      if(event.target.value !== "default" && !rep){//Si el valor no es la primer option y no está repetido
        setInput({
          ...input, platforms: [...input.platforms, event.target.value]
        })
        event.target.value= "default"
  
        validateInput({
          ...input, platforms: [...input.platforms, event.target.value]
        })
      } 
     };

  const handleDeleteGen = (event)=>{
    const filteredGen = input.genres.filter(genre => genre !== event.target.value)
    setInput({
      ...input,
      genres: filteredGen
     })
    validateInput({...input, genres: filteredGen})
  }

  const handleDeletePlat = (event)=>{
    const filteredPlat = input.platforms.filter(plat => plat !== event.target.value)
    setInput({
      ...input,
      platforms: filteredPlat
    })
    validateInput({...input, platforms: filteredPlat})
  }

  const isSubmitDisabled = Object.keys(errors).length > 0;

  const handleSubmit = (event)=>{
   event.preventDefault();
  
   dispatch(postVgame(input)).then((postError)=>{

     if(!postError){
        setInput({
          name: "",
          description: "",
          platforms: [],
          released:"",
          rating:0,
          genres: [],
          image: ""
          })
         dispatch(getAllVGames())
         alert("created with success")
         navigate("/home")
         dispatch(clearErrors())
        }else{
          dispatch(setNewErrors({type:"postVideogame", error: postError.response.data}))
        }
   })
  };

  return (
    <div className={style.globalCont}>

      <div className={style.formContenedor}>

      <h3 className={style.formTitle}>Create your own Videogame</h3>

        <form onSubmit={(event)=>handleSubmit(event)} className={style.labelsInputs}>

        <div className={style.name}>
          <label>Name</label>
          <input
          type= "text"
          placeholder="introduce a name"
          name="name"
          onChange={handleChange}
          />
          <p className={style.errores} style={{ visibility: errors.name ? 'visible' : 'hidden' }}>{errors.name}</p>
        </div>

        <div className={style.desc}>
          <label>Description</label>
          <br/>
          <textarea
          placeholder="add a description"
          name="description"
          onChange={handleChange}
          />
          <p className={style.errores} style={{ visibility: errors.description ? 'visible' : 'hidden' }}>{errors.description}</p>
          </div>

        <div className={style.relRat}>

          <div className={style.rel}>
          <label>Released</label>
          <input
          type= "date"
          name="released"
          onChange={handleChange}
          />
          <p className={style.errores} style={{ visibility: errors.released ? 'visible' : 'hidden' }}>{errors.released}</p>
         </div>

         <div className={style.rat}>
          <label>Rating</label>
          <input
          type= "number"
          name="rating"
          min={0}
          max={5}
          onChange={handleChange}
          />
          <p className={style.errores} style={{ visibility: errors.rating ? 'visible' : 'hidden' }}>{errors.rating}</p>
          </div>
        </div>

        <div className={style.platGen}>

         <div className={style.plat}>    
          <label>Platforms</label>
          <select onChange={(event)=>handlePlatforms(event)}>
             <option value="default">choose platforms</option>
                  <option value={"Microsoft Windows"}>Microsoft Windows</option>
                  <option value={"Linux"}>Linux</option>
                  <option value={"macOS"}>macOS</option>
                  <option value={"PlayStation 5"}>PlayStation 5</option>
                  <option value={"PlayStation 4"}>PlayStation 4</option>
                  <option value={"PlayStation 3"}>PlayStation 3</option>
                  <option value={"PlayStation 2"}>PlayStation 2</option>
                  <option value={"Xbox 360"}>Xbox 360</option>
                  <option value={"Xbox Series S/X"}>Xbox Series S/X</option>
                  <option value={"Xbox One"}>Xbox One</option>
                  <option value={"Nintendo Switch"}>Nintendo Switch</option>
                  <option value={"Android"}>Android</option>
                  <option value={"iOS"}>iOS</option>
                  <option value={"SteamOS"}>SteamOS</option>
                </select>
                <p className={style.errores} style={{ visibility: errors.platforms ? 'visible' : 'hidden' }}>{errors.platforms}</p>
          </div>

          <div className={style.gen}>
           <label>Genres</label>
            <select onClick={(event)=> handleGenres(event)}>
            <option value="default">choose genres</option>
              {genres.map((g)=>{
                return <option value={g.name}>{g.name}</option>
              })}
            </select>
           <p className={style.errores} style={{ visibility: errors.genres ? 'visible' : 'hidden' }}>{errors.genres}</p>
          </div>

        </div>

        <div className={style.imageInput}>
          <label>Image</label>
          <input
          type= "url"
          placeholder="send the URL of the image"
          name="image"
          onChange={handleChange}
          />
        </div>

          <br/>
          <br/>
        <div className={style.buttonDiv}>
          <button className={style.btn} disabled={isSubmitDisabled} style={isSubmitDisabled ? {opacity: "0.6", cursor: "not-allowed"}:null} type="submit">Create</button>
        </div>
          <p className={style.errores} style={{ visibility: gErrors?.postVideogame?.error ? 'visible' : 'hidden' }}>{gErrors?.postVideogame?.error}</p>

        </form>
      </div>

        <div className={style.previewCont}>
            <h5>Selected platforms: </h5>
          <div className={style.previewPlat}>
            {input.platforms.map((plat)=>{
                return <div className={style.platforms} key={plat}> {plat}
                <button className={style.btnDelete} value={plat} onClick={(e) => handleDeletePlat(e)}>x</button> 
                      </div>
                   })}
          </div>

            <h5>Selected Genres:  </h5>
          <div className={style.previewGenres}>
            {input.genres.map((gen) => {
                return <div key={gen} className={style.genres}> {gen}
                <button className={style.btnDelete} value={gen} onClick={(e) => handleDeleteGen(e)}>x</button>
                    </div> 
                  })}
          </div>

          <div className={style.previewImage}>
            <h5>Image preview:</h5>
            <img className={style.img} src={input.image} alt="not found"/>
          </div>

        </div>
    </div>
  )
};

export default Form