import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../components/my/LoadingBox';

import { fetchColors } from '../redux/actions/colorsA';
import { Formik, Field, Form } from 'formik';


export const ColorsFormik1 = ({col_add, setColAdd}) => {



  // из Formika
    // const [col_add, setColAdd] = React.useState([]);
    // const [col_a, setColA] = React.useState([]);
  const [door_image, setDoorImage] = React.useState('');

  // console.log('col_a', col_a)
  // col_add цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

   

  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors: colors_list } = colorslist;
  const dispatch = useDispatch();
  // color_list - цвета из коллекции возможных цветов
  //  console.log('colors_list', colors_list)

  //загрузка в redux state возможных цветов
  React.useEffect(() => {
    dispatch(fetchColors());
  }, []
  )



  //--------------------------------------------------------
  //   ф-ция ggg() получает  полный массив цветов для добавления
  // по выбранным чекбоксам но еще без картинки двери
  // let col_add_completed = []
  // function ggg() {
  //   for (let index = 0; index < colors_list.length; index++) {

  //     for (let index = 0; index < colors_list.length; index++) {
  //       for (let j = 0; j < col_add.length; j++) {
  //         if (colors_list[index]._id === col_add[j]) {
  //           col_add_completed.push(colors_list[index])
  //           // col_add_completed.push({ ...colors_list[index], cheked: true })
  //         }
  //       }
  //     }
  //     return col_add_completed
      
  //   }

  // }
  // // col_add_completed полный массив для добавления по выбранным
  // //чекбоксам

  // if (col_add.length && colors_list.length) {
  //   ggg()
  // }
  //  console.log('col_add_completed', col_add_completed)

  //---------------------------------------------------------------



  return (
    <div>

     

      {
        loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div style={{ width: '100%' }}>
            <h1>Выбор цвета</h1>
            <Formik
              initialValues={{
                checked: [],
              }}
              onSubmit={async (values) => {
                // await sleep(500);
                setColAdd(values.checked)
              }}
            >

              <Form>
                <div id="checkbox-group"></div>
                <button type="submit">Выбрать</button>

                <div className="colors-list" role="group" aria-labelledby="checkbox-group">


                  {colors_list.map((product) => (
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
    </div>
  )
};
