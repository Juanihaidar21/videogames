import { Link } from "react-router-dom";
import style from "./About.module.css";
import Juani from "../../assets/yo.jpeg";

const About = () => {
  return (
    <div className={style.about}>
      <Link to="/home">
        <button className={style.button}>Home</button>
      </Link>
      <div className={style.card}>
        <h1 className={style.title}>About the Creator:</h1>
        <h2 className={style.subtitle}>Full Stack Developer in progress</h2>
        <div className={style.imagenContainer}>
          <a
            className="icon"
            href="https://www.linkedin.com/in/juan-ignacio-haidar-799320265/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className={style.img}
              src={Juani}
              alt="imagen de Juan Haidar"
            />
          </a>
        </div>
        <div className={style.links}>
          
          
        </div>
      </div>
    </div>
  );
};

export default About;

