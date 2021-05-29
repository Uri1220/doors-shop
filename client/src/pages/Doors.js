import React from 'react'
import Door from './Door'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchFilterDoors } from '../redux/actions/doorsA';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import SelectMU from '../components/MU/SelectMU';
import SearchBox from '../components/MU/SearchBox';


//  ПЕРВОЕ: получаем URL из data.js--->CategoriesList
// там без min max , далее в поле default стр.147 к URL
//прикручивается min=0 max=0

function Doors(props) {
  //  ВТОРОЕ: - получаем пар-ры они пойдут в fetchFilterDoors для запроса 
  //из БД нужных данных
  const {
    category = 'all',
    sub_category = '',
    min = '',
    max = '',
  } = useParams();

  // const categories = [
  //   'vchod','ecoshpon','massiv', 'mdf'
  // ]
  //In SelectMU props//////////////////////////////
  const [type, setType] = React.useState(10);//10  20 30
  const [priceType, setPriceType] = React.useState(10) // 100-299,300-500
  const [fn, setFn] = React.useState(20)
  const [mi, setMin] = React.useState(0)
  const [ma, setMax] = React.useState(0)
  const [pageTitle, setPageTitle] = React.useState('')

  // const [typeVchod, setTypeVchod] = React.useState(10);//глухие стекло
  const [filteredDoors, setFilteredDoors] = React.useState([])

  const [searchText, setSearchText] = React.useState('');

  const searched_doors = filteredDoors.filter(el => {
    return el.title.toLowerCase().includes(searchText.toLowerCase())
  })

  React.useEffect(() => {
    switch (category) {
      case 'vchod':
       setPageTitle('Входные двери')
        break
      case 'ecoshpon':
       setPageTitle('Двери с отделкой Эко Шпоном')
        break
      case 'massiv':
       setPageTitle('Двери из массива')
        break
      case 'mdf':
       setPageTitle('Двери из МДФ')
        break
      
    }
  }, [category])



   // console.log('cat',category)
  //  console.log('sub',sub_category)
  //  console.log('priceType', priceType)
  //  console.log('min', min)
  //  console.log('max', max)
  // console.log(' rendrer')   


  const arr = [
    { id: 1, name: 'Все', ag: 10 },
    { id: 2, name: 'Глухие', ag: 20 },
    { id: 3, name: 'Остекленные', ag: 30 },
  ]

  const arr_vchod = [
    { id: 1, name: 'Все', ag: 10 },
    { id: 2, name: 'Металл/металл', ag: 20 },
    { id: 3, name: 'Металл/панель', ag: 30 },
    { id: 4, name: 'Панель/панель', ag: 40 },
  ]
  const pr = [
    { id: 1, name: 'Все', ag: 10 },
    { id: 2, name: 'до 100руб.', ag: 20 },
    { id: 3, name: '100-299руб.', ag: 30 },
    { id: 4, name: '300-500руб.', ag: 40 },
    { id: 5, name: 'свыше 500руб.', ag: 50 },
  ]
  const pr1 = [
    { id: 1, name: 'Сначала дешевле', ag: 10 },
    { id: 2, name: 'Сначала дороже', ag: 20 }
  ]
  //==============================================

  const dispatch = useDispatch();

  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;
  //=======================Сначала дешевле==============
  React.useEffect(() => {
    switch (fn) {
      case 10:
        doors.sort(function (a, b) {
          return a.price - b.price
        })
        break
      case 20:
        doors.sort(function (a, b) {
          return b.price - a.price
        })
        break
    }
  }, [fn, doors])
  //=====================================

  const userS = useSelector(state => state.userSignin)
  const { userInfo } = userS;

  //===============type ==============
  React.useEffect(() => {
    if (category === 'ecoshpon' || category === 'massiv') {
      switch (type) {
        case 20:
          setFilteredDoors(doors.filter(el => el.typ === 'mg'))
          break
        case 30:
          setFilteredDoors(doors.filter(el => el.typ === 'ms'))
          break
        default:
          setFilteredDoors(doors)
          break
      }
    } else if (category === 'vchod') {
      switch (type) {
        case 20:
          setFilteredDoors(doors.filter(el => el.typ === 'vmm'))
          break
        case 30:
          setFilteredDoors(doors.filter(el => el.typ === 'vmp'))
          break
        case 40:
          setFilteredDoors(doors.filter(el => el.typ === 'vpp'))
          break
        default:
          setFilteredDoors(doors)
          break
      }
    }
  }, [type, doors, category, fn])
  //================================================

  //=======================Price==============
  //ТРЕТЬЕ: тут меняем цену и URL соответственно
  React.useEffect(() => {
    switch (priceType) {
      case 20:
        setMin(1)
        setMax(99)
        if (sub_category) {
          props.history.push(`/doors/category/${category}/sub_category/${sub_category}/min/${mi}/max/${ma}`)

        } else {
          props.history.push(`/doors/category/${category}/min/${mi}/max/${ma}`)
        }
        // debugger
        break
      case 30:
        setMin(100)
        setMax(299)
        if (sub_category) {
          props.history.push(`/doors/category/${category}/sub_category/${sub_category}/min/${mi}/max/${ma}`)

        } else {
          props.history.push(`/doors/category/${category}/min/${mi}/max/${ma}`)
        }

        break
      case 40:
        setMin(300)
        setMax(500)
        if (sub_category) {
          props.history.push(`/doors/category/${category}/sub_category/${sub_category}/min/${mi}/max/${ma}`)

        } else {
          props.history.push(`/doors/category/${category}/min/${mi}/max/${ma}`)
        }

        break
      case 50:
        setMin(500)
        setMax(100000)
        if (sub_category) {
          props.history.push(`/doors/category/${category}/sub_category/${sub_category}/min/${mi}/max/${ma}`)

        } else {
          props.history.push(`/doors/category/${category}/min/${mi}/max/${ma}`)
        }

        break
      default:
        setMin(0)
        setMax(0)
        if (sub_category) {
          props.history.push(`/doors/category/${category}/sub_category/${sub_category}/min/${mi}/max/${ma}`)

        } else {
          props.history.push(`/doors/category/${category}/min/${mi}/max/${ma}`)
        }

        break
    }
  }, [priceType, category, sub_category, mi, ma, fn])
  //=============================================
  React.useEffect(() => {
    setType(10)
    setPriceType(10)
  }, [category, sub_category])

  const resetFilter = () => {
    setType(10)
    setPriceType(10)
  }
  //=====================================================

  React.useEffect(() => {
    dispatch(
      fetchFilterDoors({
        //тут при all идет пустота и эта пустота в doorRoute  даст весь список
        category: category !== 'all' ? category : '',
        sub_category,
        min,
        max,
      })
    )

    setSearchText('')
  },
    [category, sub_category, min, max, userInfo]);


  const handleReduct = () => {
    props.history.push('/makedoor/' + '?cat=' + category + '=sub=' + sub_category);
  };


  return (
    <div className="doors">
      <div className="doors__title">
        <h1><p>{pageTitle}</p>{'\u00A0'} <p>{sub_category}</p></h1>
      </div>
      <div className="doors__search">
        <SearchBox
          text={searchText} setText={setSearchText}
          place_holder_text='Найти название модели...' />
      </div>


      {userInfo && userInfo.isAdmin && sub_category ? (
        <div className="doors__reduct-button">
          {/* <Link to="/makedoor/">Редактирование</Link> */}
          <button
            onClick={handleReduct}
          >
            Редактировать
                        </button>
        </div>) : ('')

      }

      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) :
          (<>
            <div className='doors__filter-list'>
              <div className='doors__filter-list__left'>
                <div style={{marginRight:15}}>
                  <SelectMU age={priceType} setAge={setPriceType} arr={pr} title='Цена:' />
                </div>
                <div>
                  {
                    (category === 'ecoshpon' || category === 'massiv') &&
                    <SelectMU age={type} setAge={setType} arr={arr} title='Тип:' />
                  }
                  {category === 'vchod' &&
                    <SelectMU age={type} setAge={setType} arr={arr_vchod} title='Тип:' />
                  }
                </div>
                <div style={{margin:'0px 0px 12px 12px'}} className='doors__regrupp-button'>
                  <button
                    onClick={resetFilter}
                  >
                    Разгруппировать </button>
                </div>
              </div>
              <div className='doors__filter-list__right'>

                <div >
                  <SelectMU age={fn} setAge={setFn} arr={pr1} title='' />
                </div>
              </div>

            </div>
            <div className='doors__searched'>
              Выбрано: {searched_doors.length} шт.
            </div>



            <div className='doors__products'>

              <div className="products">
                {
                  searched_doors &&
                  searched_doors.map((item) =>
                    <Door key={item._id} door={item} />
                  )
                }
              </div>
            </div>
          </>
          )
      }
    </div>
  )
}

export default Doors

