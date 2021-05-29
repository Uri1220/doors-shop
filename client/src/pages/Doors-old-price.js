import React from 'react'
import Door from './Door'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchFilterDoors } from '../redux/actions/doorsA';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';
import SelectMU from '../components/MU/SelectMU';



function Doors(props) {
  //получаем пар-ры они пойдут в fetchFilterDoors для запроса 
  //из БД нужных данных
  const {
    category = 'all',
    sub_category = '',
    min = 0,
    max = 0,
  } = useParams();

  // const categories = [
  //   'vchod','ecoshpon','massiv', 'mdf'
  // ]
  //In SelectMU props//////////////////////////////
  const [type, setType] = React.useState(10);//10  20 30
  const [priceType, setPriceType] = React.useState(10);//10  20 30
  const [mi, setMi] = React.useState(0);
  const [ma, setMa] = React.useState(0);
  // const [typeVchod, setTypeVchod] = React.useState(10);//глухие стекло
  const [filteredDoors, setFilteredDoors] = React.useState([]);

  console.log('min', min)
  console.log('max', max)
  // console.log('priceType', priceType)
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
  //===============================================


  const prices = [
    {
      name: 'Any',
      min: 0,
      max: 0,
    },
    // {
    //   name: `$1 to $10`,
    //   min: 1,
    //   max: 10,
    // },
    {
      name: `$10 to $100`,
      min: 10,
      max: 100,
    },
    {
      name: `$100 to $300`,
      min: 100,
      max: 300,
    },
    {
      name: `$300 to $500`,
      min: 300,
      max: 500,
    },
  ];

  const dispatch = useDispatch();

  const [isAdm, setIsAdm] = React.useState(false);

  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

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
  }, [type, doors, category])
//================================================
//=======================Price==============
React.useEffect(() => {
    switch (priceType) {
      case 20:
        setMi(0)
        setMa(99)
        break
      case 30:
        setMi(100)
        setMa(299) 
        break
      case 40:
        setMi(300)
        setMa(500) 
        break
      case 50:
        setMi(500)
        setMa(10000) 
        break
      default:
        setMi(0)
        setMa(0) 
        break
    }
}, [priceType])
//=============================================
  React.useEffect(() => {
    setType(10)
  }, [category,sub_category])
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
    if (userInfo) {
      setIsAdm(userInfo.isAdmin)
    }
  },
    [category, sub_category, min, max, userInfo]);

  // getFilterUrl нужен для фильтрации по цене
  const getFilterUrl = (filter) => {

    //фильтрация по категории
    // const filterCategory = filter.category || category;

    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    // return `/catalog/category/${filterCategory}/min/${filterMin}/max/${filterMax}`;

    //тут формируется запрос , min max идут из перебора в price 
    //потом это в url  а из urla в  fetchFilterDoors
    if (sub_category) {
      return `/doors/category/${category}/sub_category/${sub_category}/min/${filterMin}/max/${filterMax}`;

    } else {
      return `/doors/category/${category}/min/${filterMin}/max/${filterMax}`;

    }

    // return `/doors/category/${category}/sub_category/${sub_category}/min/${filterMin}/max/${filterMax}`;
  };

  // см. ниже:   <Link                    10          100
  //              to={getFilterUrl({ min: p.min, max: p.max })}
  // console.log('CAT', category)
  // console.log('sub', sub_category)

  const handleReduct = () => {
    props.history.push('/makedoor/' + '?cat=' + category + '=sub=' + sub_category);
  };



  return (
    <div className="doors">
      <h2>Doors Page</h2>
      {isAdm ? (
        <div className="back-to-result">
          {/* <Link to="/makedoor/">Редактирование</Link> */}
          <button
            onClick={handleReduct}
            className="btn button primary"
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
            <div style={{ display: 'flex',flexWrap:'wrap'}}>
              <div style={{ marginRight: '10px' }}>
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

            </div>

            {/*  //фильтрация по категории
               <div>
                <ul>
                  <li>
                    <Link
                      className={'all' === category ? 'active' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      Any
               </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'active' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div> 
              */}

            <div>
              <h3>Price</h3>
              <ul>
                {prices.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div>{filteredDoors.length} Results</div>
              <div className="products">
                {/* {
                  result_doors &&
                  result_doors.map((item) =>
                    <Door key={item._id} door={item} />
                  )
                } */}
                {
                  filteredDoors &&
                  filteredDoors.map((item) =>
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

