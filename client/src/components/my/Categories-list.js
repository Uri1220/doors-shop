import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCategory, setSubCategory, setSub2Cat } from '../../redux/actions/penFiltersA'




const CategoriesList = ({ array }) => {

  const cat = useSelector(state => state.penFilters);
  const { category, subCat, subSubCat } = cat;

  const dispatch = useDispatch();
  /////////////Category/////////////////////
  const [catArray, setCatArray] = React.useState([])
    // console.log('catArray',...catArray)
    // {name: "Входные", db: "vchod", url: "/doors/category/vchod"}
    //  {name: "Массив", db: "massiv", url: "/doors/category/massiv"} 
    //  {name: "Эко Шпон", db: "ecoshpon", url: "/doors/category/ecoshpon"}

  const onClickCat = (ind) => {

    dispatch(setCategory(ind))

    ///////copy-------------------
    
    switch (ind) {
      case 1:// двери'
        setCatArray(array.doorsCat)
        break     
      case 2:// 'Фурнитура',
        setCatArray(array.furnCat)
        break
      case 3:// 'Плинтус'
        // setCatArray(PLINTUS)
        break
      default:
        setCatArray([])
        break
    }
  }
  ////////////SUB-Category///////////////////////////
  const [subCatArray, setSubCatArray] = React.useState([])
    //  console.log('subCatArray',subCatArray)
  //    vhod_door: [
  //     { name: 'Econom', db:'econom', url: '/doors/category/vchod/sub_category/econom' },
  //     { name: 'Porta R-2',db:'porta-r2', url: '/doors/category/vchod/sub_category/porta-r2' },
  //  ],
  //  massDoors: [
  //     { name: 'Classico', db:'classico', url: '/doors/category/massiv/sub_category/classico' },
  //     { name: 'Porta X', db:'postavy', url: '/doors/category/massiv/sub_category/postavy' },
  //     // { name: 'Ока', db:'oka', url: '/doors/category/massiv/sub_category/oka' },
  //  ],
  //  ecoDoors: [
  //     { name: 'Porta X', db:'porta-x',  url: '/doors/category/ecoshpon/sub_category/porta-x' },
  //     { name: 'Legno',  db:'legno',url: '/doors/category/ecoshpon/sub_category/legno' },
  //     { name: 'Vetro', db:'vetro', url: '/doors/category/ecoshpon/sub_category/vetro' },
  //  ],


  React.useEffect(() => {
    if (category === 2)//Фурн
    {
      switch (subCat) {
        case 1:
          setSubCatArray(array.ruchFurn)
          break
        case 2:
          setSubCatArray(array.petFurn)
          break
        default:
          setSubCatArray([])
          break
      }
    }
    else if (category === 1) //Двери
    {
      switch (subCat) {
        case 1:
          setSubCatArray(array.vhod_door)
          break
        case 2:
          setSubCatArray(array.massDoors)
          break
        case 3:
          setSubCatArray(array.ecoDoors)
          break
        case 4:
          setSubCatArray(array.mdfDoors)
          break
        default:
          setSubCatArray([])
          break
      }
    }
    else {
      setSubCatArray([])
    }
  }, [category, subCat])

  ////////////end copy//////////////////////

//входные, массив, экошпон
  const onClickSubCat = (ind) => { 
    dispatch(setSubCategory(ind))
  }


  //при переходе на друг категорию
  React.useEffect(() => {
    dispatch(setSubCategory(0))
  }, [category])

  React.useEffect(() => {
    dispatch(setSub2Cat(0))
  }, [subCat])


  const onClickInit = (ind) => {
    dispatch(setSub2Cat(ind))
  }

  return (
    <div >
      {/* <h1>Menu</h1> */}

      <div className='menu'>
        {/* /////////111111//////// */}
        <ul className='menu__list' >
          {
          //   categories: [
          //     { name: 'Распродажа', url: '/' },
          //     { name: 'Двери', },
          //     { name: 'Фурнитура', },
          //     { name: 'Плинтус', url: '/plintus' },
          //  ],
            array.categories &&
            array.categories.map((obj, index) => (
              <li
                key={`${obj.name}_${index}`}
              // style={{backgroundColor :'red'}} 
              >

                <Link
                  // className='menu__link'
                  className={category === index ? 'menu__link active-cat' : 'menu__link'}
                    // to={''}
                   to={obj.url}
                  onClick={() => (onClickCat(index))}
                >
                  {obj.name}

                  {!!index &&
                    <svg
                      className={category === index ? 'rotated' : ''}

                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                      />
                    </svg>}

                </Link>
                {/* /////////222222222 ////////*/}
                <ul
                  className="sub-menu__list"
                  className={category === index ? 'sub-menu__list open ' : 'sub-menu__list'}

                >
                  {
                // {name: "Входные", db: "vchod", url: "/doors/category/vchod"}
                //  {name: "Массив", db: "massiv", url: "/doors/category/massiv"} 
                //  {name: "Эко Шпон", db: "ecoshpon", url: "/doors/category/ecoshpon"}
                    catArray &&
                    catArray.map((obj, index) => (
                      <li
                        // style={{backgroundColor :'red'}} 
                        key={`${obj.name}_${index}`}
                      >

                        <Link
                          //  className="sub-menu__link"
                          className={subCat === index + 1 ? 'sub-menu__link active-sub-cat' : 'sub-menu__link'}
                            // to={''}
                           to={obj.url}
                          onClick={() => onClickSubCat(index + 1)}
                        >
                          {obj.name}
                        </Link>
                        {/* /////////333333//////// */}
                        <ul
                          className="sub-sub-menu__list"
                          className={subCat === index + 1 ? 'sub-sub-menu__list open' : 'sub-sub-menu__list'}

                        >
                          {
                            subCatArray &&
                            subCatArray.map((obj, index) => (
                              <li
                                key={`${obj.name}_${index}`}

                              >
                                <Link
                                  className="sub-sub-menu__link"
                                  className={subSubCat === index + 1 ? 'active-item' : 'sub-sub-menu__link'}
                                  to={obj.url ? obj.url : '' }
                                  onClick={() => onClickInit(index + 1)}
                                >
                                  {obj.name}
                                </Link>

                              </li>
                            )
                            )
                          }
                        </ul>
                        {/* /////////333333//////// */}
                      </li>
                    )
                    )
                  }
                </ul>
                {/* ///////22222222222222///////////// */}

              </li>
            )
            )
          }

        </ul>
        {/* ////////1111111/////// */}

      </div>
    </div>


  )
}


export default CategoriesList

