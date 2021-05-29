import React from 'react'
import Door from './Door'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchFilterDoors } from '../redux/actions/doorsA';
import LoadingBox from '../components/my/LoadingBox';
import MessageBox from '../components/my/MessageBox';


function Doors() {
  const {
    category = 'all',
    min = 0,
    max = 0,
  } = useParams();
  
  const categories = [
    'vchod','ecoshpon','massiv', 'mdf'
  ]

  const prices = [
    {
      name: 'Any',
      min: 0,
      max: 0,
    },
    {
      name: `$1 to $10`,
      min: 1,
      max: 10,
    },
    {
      name: `$10 to $100`,
      min: 10,
      max: 100,
    },
    {
      name: `$100 to $1000`,
      min: 100,
      max: 1000,
    },
  ];

  const dispatch = useDispatch();

  const [isAdm, setIsAdm] = React.useState(false);

  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

  const userS = useSelector(state => state.userSignin)
  const { userInfo } = userS;



  React.useEffect(() => {
    dispatch(
      fetchFilterDoors({
        //тут при all идет пустота и эта пустота в doorRoute  даст весь список
        category: category !== 'all' ? category : '',
        min,
        max,
      })
    )
    if (userInfo) {
      setIsAdm(userInfo.isAdmin)
    }
  },
    [category, min, max,userInfo]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;

    return `/search/category/${filterCategory}/min/${filterMin}/max/${filterMax}`;
  };

  return (
    <div>
      <h2>Doors Page</h2>
      {isAdm ? (
        <div className="back-to-result">
          <Link to="/makedoor/">Редактирование</Link>
        </div>) : ('')

      }

      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) :
            (<>
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
                <ul className="products" >
                  {
                    doors &&
                    doors.map((item) =>
                      <li
                        key={item._id}
                      >
                        <Door door={item} />
                      </li>)
                  }
                </ul>
              </div>
            </>
            )
      }
    </div>
  )
}

export default Doors

