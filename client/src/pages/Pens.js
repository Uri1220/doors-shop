import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Doorhandle from './Doorhandle'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPens } from '../redux/actions/pensA'

function Pens() {

  const {
    category = 'all',
    sub_category = '',
    // min = 0,
    // max = 0,
  } = useParams();

  // console.log('cat', category)
  // console.log('sub', sub_category)
  const dispatch = useDispatch();



  const penDetail = useSelector(state => state.pens)
  const { pens, isLoading, error } = penDetail;

  React.useEffect(() => {
      dispatch(fetchPens({
        category: category !== 'all' ? category : '',
        sub_category
      }))
  }, [dispatch, category, sub_category])

  return (
    <div>
      <h2>Pens Page</h2>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error} </div>
        ) : (
          <div className="products" >
            {
              pens &&
              pens.map((item) =>
                <Doorhandle key={item._id} pen={item} />
              )}
          </div>
        )
      }
    </div>
  )
}

export default Pens
