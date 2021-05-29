import React, { useEffect } from 'react';
import Door from './Door'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchFilterDoors } from '../redux/actions/doorsA';
// import { listProducts } from '../actions/productActions';
// import LoadingBox from '../components/LoadingBox';
// import MessageBox from '../components/MessageBox';
// import Product from '../components/Product';
// import Rating from '../components/Rating';
// import { prices, ratings } from '../utils';

export default function MySearch(props) {
  const {
    category = 'all',
    // category = ' ',
    min = 0,
    max = 0,
  } = useParams();
// console.log(category)
  const dispatch = useDispatch();

      // console.log('min',min)
      //  console.log('max',max)


  const doorDetail = useSelector(state => state.doors)
  const { doors, isLoading, error } = doorDetail;

  const categories = [
    'massiv', 'mdf'
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

  useEffect(() => {
    dispatch(
      fetchFilterDoors({
        category: category !== 'all' ? category : '',
        min,
        max,
      })
    );
  },
    [category, min, max]);

  const getFilterUrl = (filter) => {
    const filterCategory = filter.category || category;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;  

    return `/catalog/category/${filterCategory}/min/${filterMin}/max/${filterMax}`;
  };
    
  
  return (
    <div>
      <h1>Search Screen</h1>
      <div>
        <ul>
          <li>
            <Link
              className={'all' === category ? 'active' : ''}
              //сделал { category: ' ' } т.е. пробел- заработало. было { category: 'all' }
              // Any давало пустой массив это можно проверить в Postman
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
        {
          isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error} </div>
          ) : (
                <>
                  <div>{doors.length} Results</div>
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
                </>
              )
        }
      </div>

    </div>
  );
}