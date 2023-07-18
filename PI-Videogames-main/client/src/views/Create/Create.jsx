import style from "./Create.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGenres, createVideoGame } from "../../redux/actions";

const Create = () => {
  let platforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Nintendo Switch",
    "iOS",
    "Android",
    "Nintendo",
    "PS Vita",
    "PSP",
    "Wii",
    "GameCube",
    "Game Boy",
    "SNES",
    "NES",
    "Commodore",
    "Atari",
    "Genesis",
    "SEGA",
    "Dreamcast",
    "3DO",
    "Jaguar",
    "Game Gear",
    "Neo Geo",
    "PS5",
    "PS4",
    "PS3",
    "PS2",
    "PS1",
  ];

  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    background_image: "",
    description: "",
    rating: 0,
    released: "",
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  const [error, setErrors] = useState({
    name: "",
    background_image: "",
    description: "",
    released: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  // Validaciones

  const validate = (data) => {
    const errors = {};
  
    const isEmpty = (value) => {
      return value.trim() === "";
    };
  
    const errorMessages = {
      name: {
        required: "Name is required",
        maxLength: "Cannot exceed 25 characters",
      },
      background_image: {
        required: "Image URL is required",
      },
      description: {
        required: "Description is required",
        maxLength: "Too many characters",
      },
      rating: {
        required: "Rating up to 0 is required",
      },
      released: {
        required: "Released data is required",
      },
      genres: {
        required: "At least one genre is required",
      },
      platforms: {
        required: "At least one platform is required",
      },
      generic: "Invalid field",
    };
  
    // Validate name
    if (isEmpty(data.name)) {
      errors.name = errorMessages.name.required;
    } else if (data.name.length > 25) {
      errors.name = errorMessages.name.maxLength;
    }
  
    // Validate background_image
    if (isEmpty(data.background_image)) {
      errors.background_image = errorMessages.background_image.required;
    }
  
    // Validate description
    if (isEmpty(data.description)) {
      errors.description = errorMessages.description.required;
    } else if (data.description.length > 280) {
      errors.description = errorMessages.description.maxLength;
    }
  
    // Validate rating
    if (data.rating === 0) {
      errors.rating = errorMessages.rating.required;
    }
  
    // Validate released
    if (isEmpty(data.released)) {
      errors.released = errorMessages.released.required;
    }
  
    // Validate genres
    if (!data.genres.length) {
      errors.genres = errorMessages.genres.required;
    }
  
    // Validate platforms
    if (!data.platforms.length) {
      errors.platforms = errorMessages.platforms.required;
    }
  
    return errors;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      !error.name &&
      !error.background_image &&
      !error.description &&
      !error.rating &&
      !error.released &&
      !error.genres &&
      !error.platforms
    ) {
      console.log(form);
      dispatch(createVideoGame(form));
      alert("Videogame created successfully");

      setForm({
        name: "",
        background_image: "",
        description: "",
        released: "",
        rating: 0,
        genres: [],
        platforms: [],
      });
    }
  };

  //Funcion que modifica el estado
  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setForm({ ...form, [property]: value });
  };

  //Platforms
  const platformsHandler = (event) => {
    event.preventDefault();
    if (
      event.target.value &&
      !form.platforms.includes(event.target.value)
    ) {
      setForm({ ...form, platforms: [...form.platforms, event.target.value] });
    }
  };

  //Click de platforms
  const clickPlatformsHandler = (platformToRemove) => {
    const platformsClick = form.platforms.filter(
      (platform) => platform !== platformToRemove
    );
    setForm({ ...form, platforms: platformsClick });
  };
  

  //Genres
  const genresCheckHandler = (event) => {
    const genreValue = event.target.value;
    if (event.target.checked) {
      setForm({ ...form, genres: [...form.genres, genreValue] });
    } else {
      setForm({
        ...form,
        genres: form.genres.filter((genre) => genre !== genreValue),
      });
    }
  };

  //Rating
  const ratingHandler = (event) => {
    const value = parseFloat(event.target.value);
    setForm({ ...form, rating: value });
  };

  return (
    <div className={style.container}>
      <div className={`${style.create} ${style["full-screen-bg"]}`}>
        <Link to="/home">
          <button className={style.button}>Home</button>
        </Link>
      </div>

      <div className={style.form}>
        <form onSubmit={submitHandler}>
          <h1 className={style.title}>Create your own Videogame</h1>
          <div>
            <label><b>Name: </b></label>
            <input
              type="text"
              className={style.inputs}
              value={form.name}
              onChange={changeHandler}
              name="name"
            />
            {error.name && <span className={style.error}>{error.name}</span>}
          </div>
          <div>
            <label><b>Image URL: </b></label>
            <input
              type="text"
              className={style.inputs}
              value={form.background_image}
              onChange={changeHandler}
              name="background_image"
            />
            {error.background_image && (
              <span className={style.error}>{error.background_image}</span>
            )}
          </div>
          <div>
            <label><b>Description: </b></label>
            <input
              type="text"
              className={style.inputs}
              value={form.description}
              onChange={changeHandler}
              name="description"
            />
            {error.description && (
              <span className={style.error}>{error.description}</span>
            )}
          </div>
          <div>
            <label><b>Rating: </b></label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={ratingHandler}
              name="rating"
            />
            {error.rating && (
              <span className={style.error}>{error.rating}</span>
            )}
          </div>
          <div>
            <label><b>Released Date: </b></label>
            <input
              type="date"
              onChange={changeHandler}
              value={form.released}
              name="released"
            />
            {error.released && (
              <span className={style.error}>{error.released}</span>
            )}
          </div>
          <div>
            <label><b>Genres: </b></label>
            {error.genres && <span className={style.error}>{error.genres}</span>}
            <div className={style.genrescontainer}>
              {genres.map((element) => {
                return (
                  <div key={element}>
                    <input
                      type="checkbox"
                      onChange={genresCheckHandler}
                      value={element}
                      name="genres"
                    />
                    {element}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <select defaultValue="0" onChange={platformsHandler}>
              <option disabled value="0">
                Platforms
              </option>
              {platforms.map((element, index) => {
                return (
                  <option key={index} value={element}>
                    {element}
                  </option>
                );
              })}
            </select>
            {error.platforms && (
              <span className={style.error}>{error.platforms}</span>
            )}
            <div className={style.platforms}>
  {form.platforms.map((element, index) => {
    return (
      <span
        className={style.buttonf}
        key={index}
        onClick={() => clickPlatformsHandler(element)}
      >
        {element}
      </span>
    );
  })}
</div>
          </div>
          <button className={style.createbutton} type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
