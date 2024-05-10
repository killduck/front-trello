

import styles from "./Loupe.module.scss";


export default function Loupe(props){

    return (
    
        <svg 
            className={props.className ? props.className : styles.Loupe} 
            width='24' 
            height='24'
            viewBox={props.viewBox ? props.viewBox : '0 0 24 24' } 
            role={props.role}>
            <path d="M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z" fill="currentColor" fillRule="evenodd"></path>
        </svg>
      
     )
};
