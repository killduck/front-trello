

import Card from '../Card/Card';
import styles from './Column.module.scss';


export default function Column(props) {

    let dataColumn = props.dataColumn;

    let columnCards = dataColumn.cards;


    return (

        <div className={styles.wrapColumn}>
            <div className={styles.Column}>

                <h2 className={styles.titleColumn}>
                    {dataColumn.name}
                </h2>

                <div className={styles.cardList}>

                    {
                        columnCards.map((card) =>
                            <Card className={styles.tittleCard} key={card.id}>
                                {card.name}
                            </Card>
                        )
                    }

                    {props.children}
                </div>

            </div>
        </div>

    )
};


