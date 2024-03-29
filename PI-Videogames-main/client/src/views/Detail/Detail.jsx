import style from "./Detail.module.css";
import loader from "../../assets/loader.gif";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllVideogames, getByDetail, removeGame } from "../../redux/actions";
import { useParams, Link } from "react-router-dom";

const Detail = () => {
  const { detailId } = useParams();
  const detail = useSelector((state) => state.detailGames);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getByDetail(detailId));
  }, [dispatch, detailId]);

  const handleDelete = () => {
    dispatch(removeGame(detailId));
    dispatch(getAllVideogames());
  };

  return (
    <div className={style.div}>
      <Link to="/home">
        <button className={style.buttonHome}>Home</button>
      </Link>
      {detail.name ? (
        <div className={style.container}>
          <div className={style.card}>
            <h2 className={style.gameTitle}>{detail.name}</h2>
            <img
              className={style.img}
              src={detail.background_image}
              alt={detail.name}
            />
            <div className={style.text}>
              <p>ID: {detail.id}</p>
              <p>Platforms: {detail.platforms.join(", ")}</p>
              <p>Release Date: {detail.released}</p>
              <p>Rating: {detail.rating}</p>
              <p>Genres: {detail.genres ? detail.genres.join(", ") : "No genres available"}</p>
              <p>Description: {detail.description.replace(/<[^>]+>/g, "")}</p>
              {detail.createdVideoGame === true ? (
                <Link to="/home">
                  <button className={style.buttonDelete} onClick={handleDelete}>
                    DELETE
                  </button>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={style.loading}>
          <img src={loader} alt="Loading" />
        </div>
      )}
    </div>
  );
};

export default Detail;
