import styles from "./Paging.module.css";

export const Paging = ({
  videogamesPerPages,
  videogames,
  paging,
  next,
  prev,
  currentPage,
}) => {
  const numberPage = [];

  for (let i = 0; i <= Math.floor(videogames / videogamesPerPages); i++) {
    numberPage.push(i + 1);
  }

  return (
    <nav>
      <div className={styles.paging}>
        <button
          onClick={() => {
            prev();
          }}
          className={styles.butt}
        >
          Prev
        </button>
        {numberPage &&
          numberPage.map((number) => (
            <div className={styles.pagingItem} key={number}>
              <button
                onClick={() => paging(number)}
                className={`${styles.prueba} ${
                  currentPage === number ? styles.currentPage : ""
                }`}
              >
                {number}
              </button>
            </div>
          ))}
        <button
          onClick={() => {
            next();
          }}
          className={styles.butt}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Paging;

