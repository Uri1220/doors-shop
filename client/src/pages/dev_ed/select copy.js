import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { array } from '../../data.js'




function Myselect() {
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [sub_categories, setSubCategories] = useState([]);
  const [filteredDoors, setFilteredDoors] = useState([]);
   const [colors, setColors] = useState([]);

  const doorslist = useSelector((state) => state.doors);
  const { isLoading, doors, error } = doorslist;

  const doorsCat = array.doorsCat.map(el => {
    return el.db
  })
  //["vchod", "massiv", "ecoshpon", "mdf"]
  doorsCat.unshift('')
  //  console.log('cat',doorsCat)
  //пробелы чтоб в <select/> первая поз была пустая
  // const doorsCat = ["", "vchod", "massiv", "ecoshpon", "mdf"]

  const vhod_door = array.vhod_door.map(el => {
    return el.db
  })
  //["econom", "porta-r2"]
  vhod_door.unshift('')   //["", "econom", "porta-r2"]

  const massDoors = array.massDoors.map(el => {
    return el.db
  })
  massDoors.unshift('')//["", "classico", "postavy", "oka"]

  const ecoDoors = array.ecoDoors.map(el => {
    return el.db
  })
  ecoDoors.unshift('') //["", "porta-x", "legno", "vetro"]

  const mdfDoors = array.mdfDoors.map(el => {
    return el.db
  })
  mdfDoors.unshift('')//["", "mdf-yurkas"]

  //   doorsCat: [
  //     { name: 'Входные', db:'vchod' },
  //     { name: 'Массив', db:'massiv'},
  //     { name: 'Эко Шпон', db:'ecoshpon'},
  //     { name: 'МДФ', db:'mdf'},
  //  ],

  //  console.log('category',category)
  //  console.log('e',ecoDoors)
  //  console.log('sub_categories',sub_categories)
  // console.log('filteredDoors',filteredDoors)


  const submitHandler = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    // const doorsCat = ["", "vchod", "massiv", "ecoshpon", "mdf"]
    if (category === doorsCat[1]) {
      setSubCategories([...vhod_door])
      setFilteredDoors(doors.filter(door => door.category === doorsCat[1]))

    } else if (category === doorsCat[2]) {
      setSubCategories([...massDoors])
      setFilteredDoors(doors.filter(door => door.category === doorsCat[2]))

    } else if (category === doorsCat[3]) {
      setSubCategories([...ecoDoors])
      setFilteredDoors(doors.filter(door => door.category === doorsCat[3]))

    } else if (category === doorsCat[4]) {
      setSubCategories([...mdfDoors])
      setFilteredDoors(doors.filter(door => door.category === doorsCat[4]))

    }
    // чистим инпут Sub-Category
    setSubCategory('')

  }, [category])  
/////////////////////////////////////////////////
  const addColor = () => {
    setColors  ([...colors,{
      item:category,
       columnType:sub_category
    }])
  }
  // console.log('m', colors)

  return (
    <div>
      <span>{`Cat: ${category}  Sub-Cat: ${sub_category}`}</span>
      <h2>Array:</h2>
      <ul>
          {colors.map((el,i)=>(
            <li key = {i}>
              {`${i+1}:  cut: ${el.item} sub: ${el.columnType}`}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => addColor()}
          className="small"
        >
          Сохранить
        </button>

      <div className="form">
        <form onSubmit={submitHandler}>
          <ul className="form-container">
            {/* ////////CATEGORY//////////////////// */}
            <li style={{ display: 'flex', marginLeft: '10' }}>
              <div>
                Category:
                  <select
                  value={category || ''}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  {doorsCat.map((x, index) => (
                    <option value={x} key={`${x}_${index}`}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: '10' }}>
                <label htmlFor="category"> : </label>
                <input
                  type="text"
                  readOnly
                  name="category"
                  value={category || ''}
                ></input>
              </div>
            </li>
            {/* ///////////SUB__CATEGORY///////////////// */}
            <li style={{ display: 'flex', marginLeft: '10' }}>
              <div>
                Sub-Category:
                  <select
                  value={sub_category || ''}
                  onChange={(e) => {
                    setSubCategory(e.target.value);
                  }}
                >
                  {sub_categories.map((x, index) => (
                    <option value={x} key={`${x}_${index}`}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginLeft: '10' }}>
                <label htmlFor="category"> : </label>
                <input
                  type="text"
                  readOnly
                  name="sub_category"
                  value={sub_category || ''}
                ></input>
              </div>
            </li>
            {/* ////////////////////////////////// */}
          </ul>
        </form>
       
      </div>
    </div>
  )
}

export default Myselect
