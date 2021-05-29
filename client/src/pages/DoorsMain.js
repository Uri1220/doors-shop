import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';
import { fetchColors } from '../redux/actions/colorsA';
import { fetchColoredDoors } from '../redux/actions/doorsA';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DoorMain from './DoorMain'
import MessageBox from '../components/my/MessageBox';
import SearchBox from '../components/my/SearchBox'
import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';

import { DOORS_MAIN_LIST_RESET } from '../redux/constants/doorsConstants';

// import '../scss/DoorOne.scss'

///////Tooltip//////////
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.black,
    // color: 'rgba(0, 0, 0, 0.87)',
    color: 'white',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
}))(Tooltip);

//////////////////EndTolltip/////////////

function DoorsMain() {

  const {
    word = ''
  } = useParams();

  const [s, setS] = React.useState(null) //для цвета active

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors } = colorslist;

  
  const doorDetail = useSelector(state => state.doorsMain)
  const { doorsMain,color, isLoading, error } = doorDetail;
  // color - id выбранного из списка цветов цвет для отобр
  // картинок дверей нужного цвета.Храню в redux чтоб при рендере не терялось
  // console.log('color',color)

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchColors())
    //демонтаж компонента
      // return () => {
      //   dispatch({ type: DOORS_MAIN_LIST_RESET })
      // } 

  }, [])

  const onClickColor = (colorId, i) => {
    dispatch(
      fetchColoredDoors({
        colorId
      })
    )
    setS(i)
  }

  return (
    <div className='doors-main'>
     <Container maxWidth="lg">
      <div className = 'doors-main__top'>
        <h1>Входные и межкомнатные двери</h1>
        <div className = 'doors-main__top__search'>
          <Route
            render={({ history }) => (
              <SearchBox history={history}></SearchBox>
            )}
          ></Route>
        </div>
        {
          loading ? (
            <LoadingBox></LoadingBox>
          ) : (

            <ul >
              {colors.map((item, i) => (
                <li
                  className={s === i ? 'active' : ''}

                  key={item._id}
                >
                  <LightTooltip title={item.colorName} placement="top">
                    <Link
                      //  className="product"
                      to={'/door/colorId/' + item._id}>
                      <img
                        src={item.colorUrl}
                        onClick={() => onClickColor(item._id, i)}
                      />
                    </Link>
                  </LightTooltip>
                </li>
              ))}            

            </ul>

          )
        }
      </div>

      <div className="">
        {/* <h2>Doors Page</h2> */}

     {doorsMain.length ? (
       <div>Выбрано: {doorsMain.length} шт.</div>
     ):(
      <div>Результаты поиска отсутствуют...</div>
     )}



        {
          isLoading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) :
            (

              <div>
                {/* <div>Выбрано: {searched_doors.length} шт.</div> */}

                <div className="products">
                  {
                    doorsMain &&
                    doorsMain.map((item) =>
                      <DoorMain key={item._id} door={item} color={color} word={word} />
                    )
                  }
                </div>
              </div>

            )
        }
      </div>
      </Container>
    </div>


  )
}

export default DoorsMain
