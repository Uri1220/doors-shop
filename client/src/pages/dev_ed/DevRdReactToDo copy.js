import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCategory, setSubCategory, setSub2Cat } from '../../redux/actions/penFiltersA'




function DevRdReactToDo() {

  const categories = [
     { name: 'Главная', url: '/' },
    { name: 'Двери', url: '/doors' },
    { name: 'Фурнитура', url: '/pens' },
    { name: 'Плинтус', url: '/plintus' },

  ];
  ///Doors
  const doorsCat = [
    { name: 'Входные' },
    { name: 'Межкомнатные' },
    { name: 'Стеклянные' },
  ];
  const mezDoors = [
    { name: 'Массив' },
    { name: 'Шпон' },
    { name: 'МДФ' },
  ];
  const vhodDoors = [
    { name: 'Сталь' },
    { name: 'Броня' },
  ];
  const glassDoors = [
    { name: 'Хрусталь' },
    { name: 'Стекло' },
  ];
  //Furnitura
  const furnCat = [
    { name: 'Круг' },
    { name: 'Квадрат' },
  ];
  const krugFurn = [
    { name: 'Круг1' },
    { name: 'Круг22' },
  ];
  const kvadrFurn = [
    { name: 'Квадрат11' },
    { name: 'Квадрат22' },
  ];





  const cat = useSelector(state => state.penFilters);
  const { category, subCat, subSubCat } = cat;
  // console.log('cat', category)
  // console.log('sub', subCat)

  const dispatch = useDispatch();
  /////////////Category/////////////////////
  const [catArray, setCatArray] = React.useState([])
// console.log(...catArray)

  const onClickCat = (ind) => {


    dispatch(setCategory(ind))

    switch (ind) {
      case 1:
        setCatArray(doorsCat)
        break
      case 2:
        setCatArray(furnCat)
        break
      // case 3:
      //   setCatArray(PLINTUS)
      //   break
      default:
        setCatArray([])
        break
    }
  }
  ////////////SUB-Category///////////////////////////

  const [subCatArray, setSubCatArray] = React.useState([])
  // console.log(...subCatArray)

  const onClickSubCat = (ind) => {
    dispatch(setSubCategory(ind))
  }

  React.useEffect(() => {
    if (category === 2) {
      switch (subCat) {
        case 1:
          setSubCatArray(krugFurn)
          break
        case 2:
          setSubCatArray(kvadrFurn)
          break
        default:
          setSubCatArray([])
          break
      }
    } else if (category === 1) {
      switch (subCat) {
        case 1:
          setSubCatArray(vhodDoors)
          break
        case 2:
          setSubCatArray(mezDoors)
          break
        case 3:
          setSubCatArray(glassDoors)
          break
        default:
          setSubCatArray([])
          break
      }
    } else {
      setSubCatArray([])
    }
  }, [category, subCat])

   //при переходе на друг категорию
  React.useEffect(() => {
    dispatch(setSubCategory(0))
  },[category])

  React.useEffect(() => {
    dispatch(setSub2Cat(0))
  },[subCat])
 
  ////////////End-SUB-Category//////////////////////

  const onClickInit = (ind) => {
    dispatch(setSub2Cat(ind))
  }


  return (
    <div>
      <h1>Menu</h1>
      <div className='menu'>
        {/* /////////111111//////// */}
        <ul className='menu__list' >
          {
            categories &&
            categories.map((obj, index) => (
              <li key={`${obj.name}_${index}`}>

                <Link className='menu__link'
                  //  to={obj.url}
                  onClick={() => (onClickCat(index))}
                >
                  {obj.name}
                </Link>
                {/* /////////222222222 ////////*/}
                <ul
                  //  className="sub-menu__list"
                  className={category === index ? 'sub-menu__list open' : 'sub-menu__list'}

                >
                  {
                    //Входные межкомн или круг квадрат
                    catArray &&
                    catArray.map((obj, index) => (
                      <li key={`${obj.name}_${index}`}>

                        <Link className="sub-menu__link"
                          // to={obj.url}
                          onClick={() => onClickSubCat(index+1)}
                        >
                          {obj.name}
                        </Link>
                        {/* /////////333333//////// */}
                        <ul
                          //  className="sub-sub-menu__list"
                          className={subCat === index+1 ? 'sub-sub-menu__list open' : 'sub-sub-menu__list'}

                        >
                          {
                            subCatArray &&
                            subCatArray.map((obj, index) => (
                              <li
                                key={`${obj.name}_${index}`}
                              >
                                <Link
                                //  className="sub-sub-menu__link"
                                className={subSubCat === index +1 ? 'active' : 'sub-sub-menu__link'}
                                  // to={obj.url}
                                  onClick={() => onClickInit(index+1)}
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

    // Фрилансер
    //   <div>
    //   <h1>Menu</h1>
    //   <div className='menu'>
    //     <ul className='menu__list' >        
    //       <li>
    //         <Link className='menu__link' to="#">
    //           первый уровень
    //            {/* <i className="fa fa-caret-down"></i> */}
    //         </Link>
    //       </li>

    //       <li>
    //         <Link className='menu__link' to="#">
    //           первый уровень
    //            {/* <i className="fa fa-caret-down"></i> */}
    //         </Link>
    //         <ul className="sub-menu__list">
    //           <li>
    //             <Link className="sub-menu__link" to="#">второй уровень</Link>
    //           </li>
    //           <li >
    //             <Link className="sub-menu__link" to="#">второй уровень</Link>
    //             <ul className="sub-sub-menu__list">
    //               <li>
    //                 <Link className="sub-sub-menu__link" to="#">третий уровень</Link>
    //               </li>
    //               <li>
    //                 <Link className="sub-sub-menu__link" to="#">третий уровень</Link>
    //               </li>
    //               <li>
    //                 <Link to="#">третий уровень</Link>
    //               </li>
    //             </ul>
    //           </li>
    //           <li>
    //             <Link className="sub-menu__link" to="#">второй уровень</Link>
    //           </li>
    //           <li >
    //             <Link className="sub-menu__link" to="#">второй уровень</Link>
    //           </li>
    //         </ul>
    //       </li>

    //       <li >
    //         <Link className='menu__link' to="#">
    //           первый уровень   <i className="fa fa-caret-up"></i>
    //         </Link>
    //       </li>


    //     </ul>

    //   </div>
    // </div>
  )
}


export default DevRdReactToDo
