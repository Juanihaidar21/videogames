import { Link } from "react-router-dom";
import style from "./Landing.module.css";
import gifImage from "../../assets/SuperMarioLandingPage.gif";

const Landing = () => {
  return (
    <div className={`${style.landing} ${style["full-screen-bg"]}`}>
      <div className={style.contentWrapper}>
        <div className={style.gifWrapper}>
          <img src={gifImage} alt="GIF" className={style.gif} />
        </div>
        <div className={style.buttonWrapper}>
          <Link to="/home">
            <button className={style["button-landing"]}>
              PRESS START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;