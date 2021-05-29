import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../../components/my/LoadingBox';
import MessageBox from '../../components/my/MessageBox';
import { saveProduct } from '../../redux/actions/doorsA';


import { fetchColors } from '../../redux/actions/colorsA';
import { Formik, Field, Form } from 'formik';


export const ColorsFormik = () => {
  // из Formika
  const [aaa, setAaa] = React.useState([]);
  // aaa цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors } = colorslist;
  // colors - цвета из коллекции возможных цветов


  const dispatch = useDispatch();
  //загрузка в redux state возможных цветов
  React.useEffect(() => {
    dispatch(fetchColors());
  }, []
  )
  //   ф-ция ggg() получает  полный массив цветов для добавления по выбранным чекбоксам
  let arrr = []
  function ggg() {
    for (let index = 0; index < colors.length; index++) {

      for (let index = 0; index < colors.length; index++) {
        for (let j = 0; j < aaa.length; j++) {
          if (colors[index]._id === aaa[j]) {
            arrr.push({ ...colors[index], cheked: true })
          }
        }
      }
      return arrr
    }

  }


  if (aaa.length && colors.length) {
    ggg()
  }
  console.log('arrr', arrr)


  const setColors = () => {

    dispatch(
      saveProduct({
        title: '1111111',
        price: '6666666',
        category: 'ecoshpon',
        sub_category: 'legno',
        colors: arrr

      })
    );
  };

  return (
    <>
      <div className="checked-items">
        <button
          type="button"
          onClick={() => setColors()}
        >
          Сохранить
       </button>
       
        {/* <div>Выбранные цвета:</div> */}
        {arrr.map((product) => (
          <ul className='checked-item ' key={product._id}>
            <li>{<img style={{ height: '50px' }} src={product.colorUrl} alt="11" />}</li>
            <li>

              <span style={{ marginLeft: '3px', fontSize: '10px' }}>
                {product.colorName}
              </span>
            </li>

          </ul>
        ))}
      </div>


      {
        loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div>
            <h1>Выбор цвета</h1>
            <Formik
              initialValues={{
                checked: [],
              }}
              onSubmit={async (values) => {
                // await sleep(500);
                setAaa(values.checked)
              }}
            >

              <Form>
                <div id="checkbox-group"></div>
                <button type="submit">Выбрать</button>

                <div className="colors-list" role="group" aria-labelledby="checkbox-group">


                  {colors.map((product) => (
                    <ul className='colors-item ' key={product._id}>
                      <li>{<img style={{ height: '80px' }} src={product.colorUrl} alt="11" />}</li>
                      <li>
                        <span>
                          <label>
                            <Field
                              type="checkbox"
                              name="checked"
                              value={product._id}
                            />
                          </label>
                        </span>

                        <span style={{ marginLeft: '3px' }}>
                          {product.colorName}
                        </span>
                      </li>

                    </ul>
                  ))}

                </div>

              </Form>
            </Formik>
          </div>
        )
      }
    </>
  )
};
