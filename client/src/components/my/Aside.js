import React from 'react'
import CategoriesList from './Categories-list'

const Aside = ({array}) => {
  
  return (
    <div className="aside">

      <div className="aside-logo">
        {/* <img src="../../../public/img/elporta.jpg" alt="logo"/> */}
        <img src="https://elporta.by/assets/img/logo.svg?ver=2" alt='logo'></img>
      </div>
       
        <CategoriesList array={array}/>
    </div>

  )
}
export default Aside;
