import React from 'react'
import "./SingleTextFooter.css"
import useState from "react";
const SingleTextFooter = ({Text}) => {

  return (
    <>
        <div className="languageFooterr">
          
         <p className='lang'>{Text}</p>
       
        </div>
    </>
  )
}

export default SingleTextFooter
