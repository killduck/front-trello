import styles from './Card.module.scss';

export default function Card(props) {

    let class_name = props.className;

    return (
        <div className={styles.Card}>
            <a className={class_name} href="#">
                {props.children}
            </a>
            
        </div>
    )
};
