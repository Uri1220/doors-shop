import React from 'react'

import { Link } from 'react-router-dom';

const DoorMain = ({ door, color, word }) => {


  return (

    // <div className="product1">
    < >
      <Link className="product" to={'/doors/' + door._id}>
        <div className="sub-cat-name">
          {door.sub_category}
        </div>
        { !word  ? (
          <div >
            {
              Object.keys(door)
                .filter((x) => Array.isArray(door[x]))//["colors"]
                .map((key) => (
                  // key === colors                           
                  <ul key={door._id} >
                    {door[key].filter(el => el._id === color).map((item) => (
                      <li

                        key={item._id}
                      >
                        <img
                          src={item.image}
                        />


                      </li>
                    ))}
                  </ul>
                ))
            }
          </div>
        ) : (
          <div >
            <img src={door.url} alt="11" />
          </div>)
        }
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
export default DoorMain;