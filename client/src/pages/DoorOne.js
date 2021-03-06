import React, { useState } from 'react';
import LoadingBox from '../components/my/LoadingBox';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoorDetail } from '../redux/actions/doorsA'
import ListDown from '../components/MU/ListDown'
import Size from '../components/my/Size'
import { addToCart} from '../redux/actions/cartA';

///////Tooltip////////// 
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    // color: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);

//////////////////EndTolltip/////////////


function DoorOne(props) {

  const [qty, setQty] = useState(1)
  const [sz, setSz] = useState('')
  const [cl, setCl] = useState('')//выбранный colorName идет в корзину
  const [s, setS] = React.useState(0) //для цвета active

  const productId = props.match.params.id;
 
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(fetchDoorDetail(productId))
  }, [dispatch, productId])

  const doorDetail = useSelector(state => state.door)
  const { door, isLoading, error } = doorDetail;
 
  function imageArr() {
    const image_arr = []
    Object.keys(door)
      .filter((x) => Array.isArray(door[x]))
      .map((key) => (
        door[key].map((item) => (
          // console.log('image',item.image)
          image_arr.push(item.image)
        ))
      )
      )
    return image_arr
  }
  
  function titleArr() {
    const title_arr = []
    Object.keys(door)
      .filter((x) => Array.isArray(door[x]))
      .map((key) => (
        door[key].map((item) => (
          // console.log('image',item.image)
          title_arr.push(item.colorName)
        ))
      ))
    return title_arr
    // ["Snow Veralinga ", "Bianco Veralinga"]

  }

  const ima = imageArr()
  const tit = titleArr()
  //  console.log('image', ima)

  function first() {
    if (door.colors && door.colors.length !== 0) {
      const firstColor = Object.keys(door)
        .filter((x) => Array.isArray(door[x]))
        .map((key) => (((door[key][0]).colorName)))
      // .map((key) => (((door[key][0])._id)))
      return firstColor[0]
      //Snow Veralinga 
    } else {
      return 'no-color'
    }
  }

  const firstColorName = first()
  //End Обработка COLORS

  React.useEffect(() => {
    setCl(firstColorName)
  }, [firstColorName])

  const onClickColor = (colorN, i) => {
    setCl(colorN)
    setS(i)
  }

  const handleAddToCart = () => {
    const ur = 'doors/'
    dispatch(addToCart(productId, qty, ur , sz ,cl))

    props.history.push('/cart/' + '?sz=' + sz + '=cl=' + cl);
  }

  return (
    <div className='details-wrapper'>
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <div>{error} </div>
        ) : (
          <>
            <button className='button' onClick={props.history.goBack}>Вернуться назад</button>
            <div className='details__title'>
              <h1>{door.title} {tit[s]}</h1>
            </div>

            <div className="details">

              <div className='details__left'>
                <div className="details__left_image">
                  <img src={ima.length ? ima[s] : door.url} alt="11" />
                </div>
              </div>


              <div className="details__right">

                {/* Color */}
                <div className='details__right_colors'>
                  <div className='details__right_title'>
                    Цвета
                  </div>

                    {
                      Object.keys(door)
                        .filter((x) => Array.isArray(door[x]))//["colors"]
                        .map((key) => (
                          // key === colors                           
                          <ul key={door._id} >
                            {door[key].map((item, i) => (
                              <li
                                className={s === i ? 'active' : ''}

                                key={item._id}
                              >
                                <LightTooltip title={item.colorName} placement="top">
                                  <img
                                    src={item.colorUrl}
                                    onClick={() => onClickColor(item.colorName, i)}
                                  />
                                </LightTooltip>


                              </li>
                            ))}
                          </ul>
                        ))
                    }
                </div>
                {/* EndColor */}
                
                <div className='details__right_price'>
                  <span className='details__right_title'>
                    Цена
                      </span> <b>{door.price} р.</b>
                </div>
                <div className='details__right_size'>
                  <span className='details__right_title'>
                    Размер
                      </span>
                  {door.size &&
                    <Size size={door.size} setSz={setSz} />}
                </div>

                <div className='details__right_description'>
                  <div >
                    {door.description &&
                      <ListDown des={door.description} poz={1} />
                    }
                  </div>
                  <div >
                    {door.complect &&
                      <ListDown des={door.complect} poz={0}
                      />
                    }
                  </div>

                </div>

                {/* ACTION */}
                <div className="details__right_action">
                  <ul>
                    <li>
                      Наличие:{' '}
                      {door.countInStock > 0 ? 'Имеется на складе' : 'Под заказ'}
                    </li>

                    <li>
                      Количество:{' '}
                      <select
                        value={qty}
                        onChange={(e) => {
                          setQty(e.target.value);
                        }}
                      >
                        {[...Array(door.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>

                    <li>
                      {door.countInStock > 0 && (
                        <button
                          onClick={handleAddToCart}
                          className="btn button primary"
                        >
                          В корзину
                        </button>
                      )}
                    </li>
                  </ul>
                </div>
                
              </div>

            </div>
          </>
        )
      }

    </div>
  )
}

export default DoorOne
