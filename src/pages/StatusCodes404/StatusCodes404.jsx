import { useNavigate } from "react-router-dom";

import SimpleSlider from "../../components/ui/SimpleSlider/SimpleSlider";
import Button from "../../components/ui/Button/Button";
import Icons from "../../components/ui/Icons/Icons";

import styles from "./StatusCodes404.module.scss";


export default function StatusCodes404(props) {

  const navigate = useNavigate();

  let list_slides = [
    "404_01.png",
    "404_02.png",
    "404_03.png",
    "404_04.png",
    "404_05.png",
    "404_06.png",
    "404_07.png",
    "404_08.png",
    "404_09.png",
    "404_10.png",
    "404_11.png",
  ];

  function onRedirectWorkspace() {
    console.log('Проверка выполения функции =>', onRedirectWorkspace.name);
    navigate("/");
  }


  return (
    <div className={styles.StatusCodes404}>
      <div className={styles.StatusCodes404_Wrap}>

        <div className={styles.StatusCodes404__Title}>
          <div>
            <div>Oops!...You Did It Again!</div>
          </div>
          <div>
            <span>404 Page not found</span>
          </div>
        </div>

        <div className={styles.StatusCodes404__BntRedirect}>
          <Button
            className={"BtnRedirectWorkspace"}
            clickAction={onRedirectWorkspace}

          >
            <Icons
              name={'ArrowsDoubleLeft'}
              class_name={'IconRedirectWorkspace'}
            />
            <span>Вернуться на рабочее пространство</span>
          </Button>
        </div>

        <div className={styles.StatusCodes404__Slider}>
          <SimpleSlider
            list_slides={list_slides}
            baseUrl={'/img/404/'}
          />
        </div>

      </div>
    </div>
  )
};
