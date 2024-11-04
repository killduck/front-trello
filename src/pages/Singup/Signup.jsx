import styles from "./Signup.module.scss";
import Icons from "../../components/ui/Icons/Icons";
import LoginLayout from "../../layouts/login/Login";
import request from "../../api/request";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";

export default function Signup(props) {

  const navigate = useNavigate();

  let [formReg, setFormReg] = useState({});

  let reg_data = {
    first_name: null,
    last_name: null,
    username: null,
    email: null,
    password: null,
    re_password: null,
  }

  let [fieldFirstNameData, setFieldFirstNameData] = useState("");
  let [fieldLastNameData, setFieldLastNameData] = useState("");

  let [fieldNickNameData, setFieldNickNameData] = useState("");
  let [fieldNickNameStatus, setFieldNickNameStatus] = useState({});

  let [fieldEmailData, setFieldEmailData] = useState("");
  let [fieldPasswordData, setFieldPasswordData] = useState("");
  let [fieldRePasswordData, setFieldRePasswordData] = useState("");

  let [hidePass, setHidePass] = useState(true);


  function writeFirstName(evt) {
    setFieldFirstNameData((fieldFirstNameData) => (fieldFirstNameData = evt));
    // console.log('fieldFirstNameData>>>', fieldFirstNameData);
  }

  function writeLastName(evt) {
    setFieldLastNameData((fieldLastNameData) => (fieldLastNameData = evt));
    // console.log('fieldLastNameData>>>', fieldLastNameData);
  }

  function writeNickName(evt) {
    setFieldNickNameData((fieldNickNameData) => (fieldNickNameData = evt));
    // console.log('fieldNickNameData>>>', fieldNickNameData);
  }

  function writeEmail(evt) {
    setFieldEmailData((fieldEmailData) => (fieldEmailData = evt));
    // console.log('fieldEmailData>>>', fieldEmailData);
  }

  function writePassword(evt) {
    setFieldPasswordData((fieldPasswordData) => (fieldPasswordData = evt));
    // console.log('fieldPasswordData>>>', fieldPasswordData);
  }

  function writeRePassword(evt) {
    setFieldRePasswordData((fieldRePasswordData) => (fieldRePasswordData = evt));
    // console.log('fieldRePasswordData>>>', fieldRePasswordData);
  }


  function check_username(user) {
    setFieldNickNameStatus({});


    request({
      method: "POST",
      url: "check-reg-user/check-username/",
      callback: (response) => {
        setFieldNickNameStatus(response.data);


        if (response.data['status']) {
          reg_data.username = response.data['nick_name'][0];
          setFormReg(reg_data);
        }
      },
      data: { fieldNickNameData },
      status: 200
    });



  }

  function singup() {
    // const re_email = /@/;
    // const re_password = /^\S{4,}$/;


    // if (fieldFirstNameData) {
    //   // setFormReg(formReg['first_name'] = fieldFirstNameData);
    //   reg_data.first_name = fieldFirstNameData;
    //   setFormReg(reg_data);
    // }

    // if (fieldLastNameData) {
    //   reg_data.last_name = fieldLastNameData;
    //   setFormReg(reg_data);
    // }


    // if (fieldNickNameData) {
    //   check_username(fieldNickNameData);
    // }



    // if (formReg.first_name &&
    //   formReg.last_name &&
    //   formReg.username

    // ) {
    //   console.log('Запрос ушел');


    //   request({
    //     method: "POST",
    //     url: "auth/users/",
    //     callback: (response) => {

    //       if (response.status === 201) {
    //         navigate("/login");
    //       }

    //     },
    //     data: {
    //       username: 'TestUser',
    //       email: 'test@mail.ru',
    //       first_name: 'Тест',
    //       last_name: 'Тестов',
    //       password: 'pas12345',
    //       re_password: 'pas123451',
    //     },
    //     status: 201
    //   });
    // }

    request({
      method: "POST",
      url: "auth/users/",
      callback: (response) => {

        if (response.status === 201) {
          navigate("/login");
        }

      },
      data: {
        first_name: fieldFirstNameData,
        last_name: fieldFirstNameData,
        username: fieldNickNameData,
        email: fieldEmailData,
        password: fieldPasswordData,
        re_password: fieldRePasswordData,
      },
      status: 201
    });

  }

  return (

    <LoginLayout>
      <div>{formReg['first_name']}</div>
      <section role="main" className={styles._qj62pw} >
        <div data-testid="header" id="ProductHeading" className={styles._146wmq} >
          <span aria-label="Trello" role="img" className={styles._a3l9jr} >
            <Icons
              name={'LogoTrello'}
            />
          </span>
          <div data-testid="header-suffix" id="ProductHeadingSuffix" className={styles._azin1o}>
            <h5>Регистрация пользователя</h5>
          </div>
        </div>

        <div>
          <form id="form-login" data-testid="form-login" className={styles._r44k6v} >
            <div className={styles._env1z2}>

              <div className={styles._cnfgt3} >
                <label htmlFor="first_name">Имя:</label>
                <div className={styles._q5x77e} >
                  <div role="presentation" data-ds--text-field--container="true" data-testid="username-container" className={styles._1s25hsw} >
                    <input aria-describedby="username-uid2-helper"
                      aria-labelledby="username-uid2-label"
                      id="first_name"
                      autoComplete="first_name"
                      type="text"
                      data-ds--text-field--input="true"
                      data-testid="first_name"
                      name="first_name"
                      placeholder="Введите Имя"
                      className={styles._1cab8vv}
                      readOnly=""
                      wfd-id="id0"
                      value={(fieldFirstNameData) ? fieldFirstNameData : ""}
                      onChange={(evt) => writeFirstName(evt.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles._cnfgt3} >
                <label htmlFor="last_name">Фамилия:</label>
                <div className={styles._q5x77e} >
                  <div role="presentation" data-ds--text-field--container="true" data-testid="username-container" className={styles._1s25hsw} >
                    <input aria-describedby="username-uid2-helper"
                      aria-labelledby="username-uid2-label"
                      id="last_name"
                      autoComplete="last_name"
                      type="text"
                      data-ds--text-field--input="true"
                      data-testid="last_name"
                      name="last_name"
                      placeholder="Введите Фамилию"
                      className={styles._1cab8vv}
                      readOnly=""
                      wfd-id="id0"
                      value={(fieldLastNameData) ? fieldLastNameData : ""}
                      onChange={(evt) => writeLastName(evt.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className={styles._cnfgt3} >
                <label htmlFor="username">Ник:</label>
                <div className={styles._q5x77e} >
                  <div role="presentation" data-ds--text-field--container="true" data-testid="username-container" className={styles._1s25hsw} >
                    <input aria-describedby="username-uid2-helper"
                      aria-labelledby="username-uid2-label"
                      id="username"
                      autoComplete="username"
                      type="text"
                      data-ds--text-field--input="true"
                      data-testid="username"
                      name="username"
                      placeholder="Введите Ник"
                      className={styles._1cab8vv}
                      readOnly=""
                      wfd-id="id0"
                      value={(fieldNickNameData) ? fieldNickNameData : ""}
                      onChange={(evt) => writeNickName(evt.target.value)}
                    />
                  </div>
                </div>
                <div>{
                  !fieldNickNameStatus.statu ?
                    fieldNickNameStatus.message
                    :
                    ""
                }</div>
              </div>

              <div className={styles._cnfgt3} >
                <label htmlFor="email">Email:</label>
                <div className={styles._q5x77e} >
                  <div role="presentation" data-ds--text-field--container="true" data-testid="username-container" className={styles._1s25hsw} >
                    <input aria-describedby="username-uid2-helper"
                      aria-labelledby="username-uid2-label"
                      id="email"
                      autoComplete="email"
                      type="email"
                      data-ds--text-field--input="true"
                      data-testid="email"
                      name="email"
                      placeholder="Введите адрес электронной почты"
                      className={styles._1cab8vv}
                      readOnly=""
                      wfd-id="id0"
                      value={(fieldEmailData) ? fieldEmailData : ""}
                      onChange={(evt) => writeEmail(evt.target.value)}
                    />
                  </div>
                </div>
              </div>


              <div className={styles._cnfgt3}>
                <label htmlFor="password">Пароль 8 символов:</label>
                <div className={styles._1xfynbg} >
                  <div className={styles._q5x77e} >
                    <div role="presentation" data-ds--text-field--container="true" data-testid="password-container" className={styles._1s25hsw} >
                      <input
                        aria-describedby="password-uid3-helper"
                        aria-labelledby="password-uid3-label"
                        id="password"
                        autoComplete="current-password"
                        type={hidePass ? "password" : "text"}
                        spellCheck="false"
                        data-ds--text-field--input="true"
                        data-testid="password"
                        name="password"
                        placeholder="Введите пароль"
                        className={styles._1cab8vv}
                        readOnly=""
                        wfd-id="id1"
                        value={(fieldPasswordData) ? fieldPasswordData : ""}
                        onChange={(evt) => writePassword(evt.target.value)}
                      />

                      <div className={styles._lspp5b} >
                        <button
                          type="button" className={styles._o6ruxu}
                          onClick={() => { (hidePass) ? setHidePass(false) : setHidePass(true) }}
                        >
                          {/* {showPassword} */}
                          <span className={styles._1spmf3f} >
                            <span aria-hidden="true" className={styles._snhnyn} >
                              <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
                                {(hidePass) ?
                                  (
                                    <g fill="currentColor" fillRule="evenodd">
                                      <path d="M12 18c-4.536 0-7.999-4.26-7.999-6 0-2.001 3.459-6 8-6 4.376 0 7.998 3.973 7.998 6 0 1.74-3.462 6-7.998 6m0-14C6.48 4 2 8.841 2 12c0 3.086 4.576 8 10 8 5.423 0 10-4.914 10-8 0-3.159-4.48-8-10-8"></path>
                                      <path d="M11.977 13.984c-1.103 0-2-.897-2-2s.897-2 2-2c1.104 0 2 .897 2 2s-.896 2-2 2m0-6c-2.206 0-4 1.794-4 4s1.794 4 4 4c2.207 0 4-1.794 4-4s-1.793-4-4-4"></path>
                                    </g>
                                  )
                                  :
                                  (
                                    <g fill="currentColor" fillRule="evenodd">
                                      <path d="M11.983 15.984a4.005 4.005 0 01-4.002-4c0-2.206 1.795-4 4.002-4a4.005 4.005 0 014.002 4c0 2.206-1.795 4-4.002 4M12 4C6.48 4 2 8.84 2 12c0 3.086 4.577 8 10 8s10-4.914 10-8c0-3.16-4.481-8-10-8"></path>
                                      <circle cx="12" cy="12" r="2"></circle>
                                    </g>
                                  )
                                }
                              </svg>
                            </span>
                            <span className={styles._b5o75w} >Show password</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles._cnfgt3}>
                <label htmlFor="repassword">Повторно пароль:</label>
                <div className={styles._1xfynbg} >
                  <div className={styles._q5x77e} >
                    <div role="presentation" data-ds--text-field--container="true" data-testid="password-container" className={styles._1s25hsw} >
                      <input
                        aria-describedby="password-uid3-helper"
                        aria-labelledby="password-uid3-label"
                        id="repassword"
                        autoComplete="current-password"
                        type={hidePass ? "password" : "text"}
                        spellCheck="false"
                        data-ds--text-field--input="true"
                        data-testid="repassword"
                        name="repassword"
                        placeholder="Введите пароль"
                        className={styles._1cab8vv}
                        readOnly=""
                        wfd-id="id1"
                        value={(fieldRePasswordData) ? fieldRePasswordData : ""}
                        onChange={(evt) => writeRePassword(evt.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <Button
              id="login-submit"
              type="button"
              className={'BtnLogin'}
              clickAction={singup}
            >
              <span className={styles._178ag6o}>
                Создать пользователя
              </span>
            </Button>

          </form>
        </div>

        <div className={styles._1ef928d} >
          <footer data-testid="page-footer" className={styles._1tn479n} >
            <span aria-label="Atlassian" role="img" className={styles._1eu9lrx} >
              <Icons
                name={'LogoAtlassian'}
              />
            </span>
            <div className={styles._ftz4sr} >Один аккаунт для Trello, Jira, Confluence и не только.
            </div>
          </footer>
        </div>
      </section>
    </LoginLayout>

  )
};
