

import Card from '../Card/Card';
import styles from './Column.module.scss';


export default function Column(props){

    let dataColumn = props.dataColumn;

    let columnCards = dataColumn.cards;
    // console.log(dataColumn);

  return (
    
    <div className={styles.wrapColumn}>
        <div className={styles.Column}>

            <h2 className={styles.titleColumn}>
                {dataColumn.name}
            </h2>

            <div className={styles.cardList}>

                {
                    columnCards.map((card) => 
                        <Card key={card.id}/>
                    )
                }

            </div>
            
        </div>
    </div>

  )
};


