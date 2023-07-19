import style from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { searchByName } from "../../redux/actions";

const SearchBar = () => {
  const [game, setGame] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setGame(inputValue);
    setShowAlert(/[!#"$%&/()=?¡]/.test(inputValue));
  };

  const dispatchGame = (event) => {
    event.preventDefault();
    if (!showAlert) {
      dispatch(searchByName(game));
      setGame("");
    }
  };

  return (
    <div className={style.container}>
      <form>
        <input
          type="text"
          placeholder="Name videogame"
          onChange={handleChange}
          value={game}
          className={showAlert ? `${style.input} ${style.alert}` : style.input}
        />
        <button
          className={style.button}
          onClick={dispatchGame}
          disabled={showAlert}
        >
          {showAlert ? "🔎" : "🔎"}
        </button>
        {showAlert && <p className={style.errorMessage}>Invalid character</p>}
      </form>
    </div>
  );
};

export default SearchBar;
