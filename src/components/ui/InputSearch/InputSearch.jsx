import styles from './InputSearch.module.scss'

export default function InputSearch(props){

  return (
    <div className={styles.wrap}>
        
        <div className={styles.blockSearch}>
            <span className={styles.iconLupa} default="" tabindex="0" >
                <span className={styles.iconLupaSpan} role="img" aria-label="search" style={{}}>
                    <svg width="" height="" viewBox="0 0 24 24" role="presentation">
                        <path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="currentColor" fill-rule="evenodd"></path>
                    </svg>
                </span>
            </span>
            <input className={styles.inputSearch} type="text" placeholder="Поиск" maxlength="500"/>
        </div>

    </div>
  )
};

