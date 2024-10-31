
export default function openCloseFrameFunction(params={
  variable: null, 
  ifVariableTrue: false, 
  ifVariableFalse: true, 
  method: null, 
  dispatch: null}
){
  if(params.variable){
    params.dispatch(params.method(params.ifVariableTrue));
  }
  else{
    params.dispatch(params.method(params.ifVariableFalse));
  }
}
