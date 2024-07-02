
import styles from './Login.module.scss'

export default function LoginLayout(props) {
    return (
        <div id="root_auth">
            <div className={styles._4b375e} >
                <div className={styles._q0b2qn} >
                    <div className={styles._xxwux} >
                        <div className={styles._tw4vmx} ></div>
                        <div className={styles._auqgo3} >
                            {/* <div className={styles._d69kqk} > */}
                            <div className={styles._11jwunr} >
                                <div id="WhiteboxContainer" className={styles._1iefl20} >

                                    {props.children}

                                </div >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    )
};
