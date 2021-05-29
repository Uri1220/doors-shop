import React from 'react'
import { Link } from 'react-router-dom';

const Door = ({ door }) => {
  // console.log({...door.pictures[0]}.medium)
  //  console.log(door)
  return (

    // <div className="product1">
    < >
      <Link className="product" to={'/doors/' + door._id}>
      <div className="sub-cat-name">
          {door.sub_category}
        </div>
        <div >
          <img src={door.url} alt="11" />
        </div>
        <div className="product-name">
          {door.title}
        </div>
        <div className="product-price">
          {door.price} p.
        </div>
      </Link>
    </>


  )
}
export default Door;