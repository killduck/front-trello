
import Header from "../../components/Header/Header";
// import WorkspaceMenu from "../../components/WorkspaceMenu/WorkspaceMenu";

import styles from './Default.module.scss';

// import backgroundImage from '../../../public/img/background_desert.webp';


export default function Default(props) {
  return (
    <div>
      <Header />
      <main className={`${styles.Content} ${styles.bgc}`}>
        <div className={styles.main_wrap}>
          {/* <WorkspaceMenu /> */}
          {props.children}
        </div>
      </main>
    </div>
  )
};
