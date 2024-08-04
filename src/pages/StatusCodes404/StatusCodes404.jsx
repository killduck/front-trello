import SimpleSlider from "../../components/SimpleSlider/SimpleSlider";
import styles from "./StatusCodes404.module.scss";


export default function StatusCodes404(props) {

  let list_slides = [
    "img/404/404_01.png",
    "img/404/404_02.png",
    "img/404/404_03.png",
    "img/404/404_04.png",
    "img/404/404_05.png",
    "img/404/404_06.png",
    "img/404/404_07.png",
    "img/404/404_08.png",
    "img/404/404_09.png",
    "img/404/404_10.png",
    "img/404/404_11.png",
  ];

  return (
    <div className={styles.StatusCodes404}>
      <div className={styles.SimpleSlider}>
        <SimpleSlider
          list_slides={list_slides}
        />
      </div>
    </div>
  )
};
