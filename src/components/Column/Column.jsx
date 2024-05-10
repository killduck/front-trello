import Card from '../Card/Card';
import styles from './Column.module.scss';
import { useState } from 'react';



export default function Column(props) {

    let dataColumn = props.dataColumn;

    let сolumnCards = dataColumn.cards;



    return (
        <div className={styles.wrapColumn}>
            <div className={styles.Column}>
                <h2 className={styles.titleColumn}>
                    {dataColumn.name}
                </h2>

                <div className={styles.cardList}>
                    {

                        сolumnCards.map((card, index) =>

                            <Card key={card.id} />

                        )

                    }



                </div>
            </div>
        </div>

    )
};


