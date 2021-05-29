import React from 'react'
import { Link } from 'react-router-dom';

const Doorhandle = ({ pen }) => {
  // console.log({...pen.pictures[0]}.medium)
  //  console.log(pen)
  return (

    < >
      <Link className="product" to={'/pens/' + pen._id}>
        <div  style={{height:15}} className="product-name">
          {pen.title}
        </div>
        <div style={{ maxWidth: 170, width: 170 }} >
          <img style={{ maxWidth: 170, height: 'auto' }} src={pen.url} alt="11" />
        </div>

        {/* <img className="product-image" src={{ ...pen.pictures[0] }.medium} alt="11" /> */}


        <div className="product-price">{pen.price} p.</div>
      </Link>
    </>


  )
}
export default Doorhandle;