
import { useNavigate } from 'react-router-dom';
import styles from './MemberMenu.module.scss';
import request from '../../api/request';
import Button from '../ui/Button/Button';

export default function MemberMenu(props) {

    let authorized_user = props.authorized_user;


    let swowMenu = props.swowMenu;

    const navigate = useNavigate();

    const handleLogout = () => {

        request({ method: 'GET', url: "logout/" });
        localStorage.removeItem("trello_auth");
        navigate("/login");
    };

    return (
        <div style={{ zIndex: 1 }}>
            <section className={styles.rX4pAv5sWHFNjp} data-testid="header-member-menu-popover" data-elevation="1" style={{ display: swowMenu ? "" : "none", position: "absolute", right: "3px", top: "50px", width: "304px" }} >
                {/* position: "fixed", inset: "51px auto auto 1124px", width: "304px" */}
                <span data-focus-scope-start="" hidden=""></span>
                <div tabIndex="-1" className={styles.q2PzD_Dkq1FVX3} style={{ maxHeight: "90vh" }}>
                    <div className={styles.JaxGrNSZxJ4ghJ} data-testid="account-menu">
                        <div data-testid="account-menu-account-section">
                            <h2>Учетная запись</h2>
                            <div className={styles.TyNFo3ay3iQKOz}>
                                <div className={styles.fG5A960F7Q3GJJ}>
                                    <div className={styles.B1uWdim9Jd0dJ9} title="Leo (killduck)">
                                        <span aria-label={`${authorized_user.last_name} ${authorized_user.last_name} (${authorized_user.username})`} role="img" title={`${authorized_user.last_name} ${authorized_user.last_name} (${authorized_user.username})`} className={`${styles.DweEFaF5owOe02} ${styles.S7RWiPL9Qgl9P9} ${styles.kFZ3hS99jGmKWk}`} style={{ backgroundImage: "url(&quot;https://trello-members.s3.amazonaws.com/662bd7222422de983bbab209/68699ec7e84b2530faa3447a45c09236/170.png&quot;)", height: "40px", width: "40px", lineHeight: "40px" }}></span>
                                    </div>
                                </div>
                                <div className={styles.vqeVFoaA8KQnX4} >
                                    <div className={styles.lzFtVDCea8Z9jO}>{authorized_user.last_name} {authorized_user.first_name}</div>
                                    <div className={styles.Ej7WGzTnvdxL7I}>{authorized_user.email}</div>
                                </div>
                            </div>
                            <nav className={styles.IfckxJ5PbpJuxT}>
                                <ul>
                                    <li>
                                        <a className={styles.gJDsPins_eYkBM} href="https://id.atlassian.com/login?prompt=select_account&amp;continue=https%3A%2F%2Ftrello.com%2Fauth%2Fatlassian%2Fcallback&amp;application=trello" data-testid="switch-accounts-link">
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Переключение аккаунтов</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <a className={styles.gJDsPins_eYkBM} href="https://id.atlassian.com/login?prompt=none&amp;login_hint=kildushev%40gmail.com&amp;continue=https%3A%2F%2Fid.atlassian.com%2Fmanage-profile&amp;application=trello" target="_blank" rel="noreferrer" data-testid="manage-account-link">
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Управление аккаунтом</span>
                                                <span className={styles.rnYaSURE60hdsz}>
                                                    <span className={styles.css_1wits42}
                                                    // style={{--icon-primary-color: "currentColor" , --icon-secondary-color: "var(--ds-surface, #FFFFFF);"}}
                                                    >
                                                        <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                                            <g fill="currentColor">
                                                                <path d="M19.005 19c-.003 0-.005.002-.005.002l.005-.002zM5 19.006c0-.004-.002-.006-.005-.006H5v.006zM5 4.994V5v-.006zM19 19v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2H5v14h14zM5 4.994V5v-.006zm0 14.012c0-.004-.002-.006-.005-.006H5v.006zM11 5H5v14h14v-6h2v6.002A1.996 1.996 0 0119.005 21H4.995A1.996 1.996 0 013 19.006V4.994C3 3.893 3.896 3 4.997 3H11v2zm8 0v3a1 1 0 002 0V4a1 1 0 00-1-1h-4a1 1 0 000 2h3z"></path>
                                                                <path d="M12.707 12.707l8-8a1 1 0 10-1.414-1.414l-8 8a1 1 0 001.414 1.414z"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </span>
                                        </a>
                                    </li>
                                    <li className={styles.hDigGK0jR2_0pl}></li>
                                </ul>
                            </nav>
                        </div>
                        <h2>Trello</h2>
                        <nav className={styles.IfckxJ5PbpJuxT}>
                            <ul data-testid="account-menu-trello-section">
                                <li>
                                    <a className={styles.gJDsPins_eYkBM} href="/u/killduck/profile" data-testid="account-menu-profile">
                                        <span className={styles.LCeoUSr_PkZrP2}>
                                            <span className={styles.BmRHtH7FIX0jcL}>Профиль и доступ</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.gJDsPins_eYkBM} href="/u/killduck/activity" data-testid="account-menu-activity">
                                        <span className={styles.LCeoUSr_PkZrP2}>
                                            <span className={styles.BmRHtH7FIX0jcL}>Действия</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.gJDsPins_eYkBM} href="/u/killduck/cards" data-testid="account-menu-cards">
                                        <span className={styles.LCeoUSr_PkZrP2}>
                                            <span className={styles.BmRHtH7FIX0jcL}>Карточки</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className={styles.gJDsPins_eYkBM} href="/u/killduck/account" data-testid="account-menu-settings">
                                        <span className={styles.LCeoUSr_PkZrP2}>
                                            <span className={styles.BmRHtH7FIX0jcL}>Настройки</span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <button className={`${styles.gJDsPins_eYkBM} ${styles.z07_VMyx9kmLq0}`} data-testid="account-theme-switcher-button">
                                        <span className={styles.LCeoUSr_PkZrP2}>
                                            <span className={styles.BmRHtH7FIX0jcL}>Выбор темы</span>
                                            <span className={styles.rnYaSURE60hdsz}>
                                                <span className={`${styles.A3PtEe1rGIm_yL} ${styles.neoUEAwI0GETBQ}`} >
                                                    <span data-testid="ForwardIcon" className={styles.css_snhnyn}
                                                    // style="--icon-primary-color: var(--ds-icon, #42526E); --icon-secondary-color: inherit;"
                                                    >
                                                        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M16.7071 12.7071L9.63606 19.7781C9.24554 20.1687 8.61237 20.1687 8.22185 19.7781C7.83132 19.3876 7.83132 18.7544 8.22185 18.3639L14.5858 12L8.22185 5.636C7.83132 5.24548 7.83132 4.61231 8.22185 4.22179C8.61237 3.83126 9.24554 3.83126 9.63606 4.22179L16.7071 11.2929C17.0977 11.6834 17.0977 12.3165 16.7071 12.7071Z" fill="currentColor"></path>
                                                        </svg>
                                                    </span>
                                                </span>
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <div className={styles.uzXECJrSLNu_bU}>
                            <nav className={styles.IfckxJ5PbpJuxT}>
                                <ul data-testid="account-menu-workspace-creation-section">
                                    <li className={styles.hDigGK0jR2_0pl}></li>
                                    <li>
                                        <button className={styles.gJDsPins_eYkBM} data-testid="account-menu-workspace-creation-button">
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>
                                                    <span className={styles.REGdK7LUxpdgvv}>
                                                        <span className={`${styles.A3PtEe1rGIm_yL} ${styles.neoUEAwI0GETBQ}`} >
                                                            <span data-testid="OrganizationIcon" className="css-snhnyn"
                                                            // style="--icon-primary-color: var(--ds-icon, #42526E); --icon-secondary-color: inherit;"
                                                            >
                                                                <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5048 5.67168C11.9099 5.32669 11.2374 5.10082 10.5198 5.0267C11.2076 3.81639 12.5085 3 14 3C16.2092 3 18 4.79086 18 7C18 7.99184 17.639 8.89936 17.0413 9.59835C19.9512 10.7953 22 13.6584 22 17C22 17.5523 21.5523 18 21 18H18.777C18.6179 17.2987 18.3768 16.6285 18.0645 16H19.917C19.4892 13.4497 17.4525 11.445 14.8863 11.065C14.9608 10.7218 15 10.3655 15 10C15 9.58908 14.9504 9.18974 14.857 8.80763C15.5328 8.48668 16 7.79791 16 7C16 5.89543 15.1046 5 14 5C13.4053 5 12.8711 5.25961 12.5048 5.67168ZM10 12C11.1046 12 12 11.1046 12 10C12 8.89543 11.1046 8 10 8C8.89543 8 8 8.89543 8 10C8 11.1046 8.89543 12 10 12ZM14 10C14 10.9918 13.639 11.8994 13.0412 12.5984C15.9512 13.7953 18 16.6584 18 20C18 20.5523 17.5523 21 17 21H3C2.44772 21 2 20.5523 2 20C2 16.6584 4.04879 13.7953 6.95875 12.5984C6.36099 11.8994 6 10.9918 6 10C6 7.79086 7.79086 6 10 6C12.2091 6 14 7.79086 14 10ZM9.99999 14C12.973 14 15.441 16.1623 15.917 19H4.08295C4.55902 16.1623 7.02699 14 9.99999 14Z" fill="currentColor"></path>
                                                                </svg>
                                                            </span>
                                                        </span>
                                                    </span>
                                                    Создать рабочее пространство
                                                </span>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div data-testid="account-menu-help-section">
                            <nav className={styles.IfckxJ5PbpJuxT}>
                                <ul>
                                    <li className={styles.hDigGK0jR2_0pl}></li>
                                    <li>
                                        <a className={styles.gJDsPins_eYkBM} href="/contact?url=https%3A%2F%2Ftrello.com%2Fb%2FiluzYkw9%2F%25D0%25B4%25D0%25B8%25D0%25BF%25D0%25BB%25D0%25BE%25D0%25BC-31" target="_blank" data-testid="account-menu-help">
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Помощь</span>
                                            </span>
                                        </a>
                                    </li>
                                    <li>
                                        <button className={styles.gJDsPins_eYkBM} data-testid="account-menu-shortcuts">
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Горячие клавиши</span>
                                            </span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div data-testid="account-menu-logout-section">
                            <form method="post" action="/logout" style={{ display: "none" }}>
                                <input name="dsc" defaultValue="803c403e543c2f5b6b6c192b3fefdaeca0809390b371735d076794c535db6e60" />
                            </form>
                            <nav className={styles.IfckxJ5PbpJuxT}>
                                <ul>
                                    <li className={styles.hDigGK0jR2_0pl}></li>
                                    <li>
                                        <Button
                                            className={styles.gJDsPins_eYkBM}
                                            data-testid="account-menu-logout"
                                            clickAction={handleLogout}
                                        >
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Выйти</span>
                                            </span>
                                        </Button>
                                        {/* <button
                                            className={styles.gJDsPins_eYkBM}
                                            data-testid="account-menu-logout"
                                            onClick={handleLogout}
                                        >
                                            <span className={styles.LCeoUSr_PkZrP2}>
                                                <span className={styles.BmRHtH7FIX0jcL}>Выйти</span>
                                            </span>
                                        </button> */}
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <span data-focus-scope-end="" hidden=""></span>
            </section>
        </div>

    )
};
