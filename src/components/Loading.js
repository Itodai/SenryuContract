import React from "react";
import ReactLoading from "react-loading";

const Loading = ({ type, color, text, height, width }) => {
  
  if(text == null){
    return(
      <ReactLoading type={type} color={color} height={height} width={width}/>
    )
  } else {
    return(
      <>
        <ReactLoading type={type} color={color} height={height} width={width}/>
        <p>{text}</p>
      </>
      )
  }
}

export default Loading;