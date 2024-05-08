
export default function InputTeg(props){
  return (
        <input 
            className={props.className} 
            type={props.type} 
            placeholder={props.placeholder} 
            maxLength={props.maxlength} 
        />
  )
};

