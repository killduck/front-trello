import styles from './Card.module.scss';

export default function Card(props) {
    return (
        <div className={styles.Card}>
            <a className={props.className} href="#">
                {props.children}
            </a>
            
        </div>
    )
};
