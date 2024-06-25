import Default from "../../layouts/default/Default";
import request from "../../api/request";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Workspace.module.scss";
import Button from "../../components/ui/Button/Button";
import Icons from "../../components/ui/Icons/Icons";



export default function Workspace(props) {
  // console.log(`props => ${props.cardName}`);
  // console.log(props);

  let [dashboards, setDashboards] = useState([]);

  let [ShowForm, setShowForm] = useState(false);

  useEffect(() => {
    request({
      method:'GET', 
      url:'dashboards/', 
      callback:(response) => { requestDashboards(response) }, 
      data: null,
      status:200,
    });
  }, []);

  function requestDashboards(response) {
    setDashboards(response);
  }

  function onInvite_users_workspace() {
    console.log('Проверка выполения функции =>', onInvite_users_workspace.name);
  }


  function onEdite_name_workspace() {
    console.log('Проверка выполения функции =>', onEdite_name_workspace.name);
  }

  function onChangeLogo() {
    console.log('Проверка выполения функции =>', onChangeLogo.name);
    ShowForm ?
      setShowForm(false)
      :
      setShowForm(true)
  }

  function onCreate_new_dashboard() {
    console.log('Проверка выполения функции =>', onCreate_new_dashboard.name);
  }


  return (
    <>
      <Default>
        <div className={styles.Workspace}>
          <div className={styles.WorkspaceWrap}>

            <div className={styles.WorkspaceTitle}>
              <div className={styles.WorkspaceTitleContent}>
                <div
                  className={
                    ShowForm ?
                      `${styles.WorkspaceTitleIconLetter} ${styles.ActiveFrame}`
                      :
                      styles.WorkspaceTitleIconLetter
                  }
                >
                  <Button
                    clickAction={onChangeLogo}
                    className={'BtnWorkspaceTitleIconLetter'}
                  >
                    {"Ilya Poletuev's workspace".substring(0, 1).toUpperCase()} {/* потом вместо  Ilya Poletuev.... подставить реальный props */}
                  </Button>
                  <div className={
                    ShowForm ?
                      styles.ShowBlock
                      :
                      styles.HideBlock
                  }>
                    <form className={styles.ChangeLogo}>
                      Заготовка - сменить логотип
                    </form>
                  </div>
                </div>

                <div className={styles.WorkspaceTitleName}>
                  <div className={styles.Name}>
                    {"Ilya Poletuev's workspace"} {/* потом вместо  Ilya Poletuev.... подставить реальный props */}
                    <Button
                      clickAction={onEdite_name_workspace}
                      className={'BtnWorkspaceTitleNamePencil'}
                    >
                      <Icons
                        name={'Pencil'}
                        class_name={'WorkspaceTitleNamePencilIcon'}
                      />
                    </Button>
                  </div>
                  <div className={styles.VisibilityStatus}>
                    <Icons
                      name={'Castle'}
                      class_name={'WorkspaceTitleVisibilityStatusIcon'}
                    />
                    {"Приватная"} {/* потом вместо  Приватная подставить реальный props */}
                  </div>
                </div>
              </div>
              <div className={styles.WorkspaceTitleButton}>
                <Button
                  clickAction={onInvite_users_workspace}
                  className={'BtnWorkspaceTitleButton'}
                >
                  <div className={styles.TitleButtonIcons}>
                    <Icons
                      name={'People'}
                      class_name={'WorkspaceTitleButtonPeopleIcon'}
                    />
                  </div>
                  Пригласите пользователей в рабочее пространство
                </Button>
              </div>
            </div>

            <div className={styles.WorkspaceLine}></div>

            <div className={styles.WorkspaceContent}>
              <div className={styles.WorkspaceContentTitle}>
                Доски
              </div>

              <div className={styles.WorkspaceContentSortFilterSearch}>
                <div className={styles.SortFilter}>
                  <div>Сортировать по</div>
                  <div>Фильтр:</div>
                </div>
                <div className={styles.Search}>Поиск</div>
              </div>

              <div className={styles.WorkspaceContentDashboards}>
                <ul className={styles.ListDashboards}>

                  <li>
                    <div className={styles.DashboardWrap}>
                      <div className={styles.CreateNewDashboard}>
                        <Button
                          clickAction={onCreate_new_dashboard}
                          className={'BtnCreateNewDashboard'}>
                          <div>Создать доску</div>
                          <div>Осталось: {"7"}</div>
                          <div className={styles.HelpCreateNewDashboard}>
                            <Icons
                              name={'QuestionMark'}
                              class_name={'HelpCreateNewDashboardIcon'}
                            />
                            <div className={styles.HelpMessage}>
                              <p>В бесплатной версии в рабочих пространствах может быть не больше 10 открытых досок. Чтобы снять ограничение, оформите подписку.</p>
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </li>

                  {
                    dashboards.map((dashboard) =>
                      <li key={dashboard.id}>
                        <Link
                          to={"dashboard/" + dashboard.id}
                          className={styles.DashboardWrap}
                        >
                          <h3>{dashboard.name}</h3>
                        </Link>
                      </li>
                    )
                  }

                </ul>
              </div>
            </div>

          </div>
        </div>
      </Default >
    </>
  )
};
