import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LoadingBox from '../components/my/LoadingBox'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';

import { makeStyles } from '@material-ui/core/styles'
import { fetchColors } from '../redux/actions/colorsA'
import { Formik, Field, Form } from 'formik'

const useStyles = makeStyles((theme) => ({


  input: {
    width: '60ch',
    padding: ' 5px 0px',
    marginLeft: 20,
    '& .MuiInputBase-input': {
      fontSize: 16,
    },
    '& .MuiInputBase-root ': {
      fontSize: 16,
    },
    '& .MuiInputLabel-root ': {
      fontSize: 16,
    },

  },



  button: {
    height: 28,
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    padding: '3px',
    borderColor: '#a4a4a4',

  },
  button1: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '5px',


  },
}));



export const ColorsFormikMakeDoor = ({ colors, visible, setVisible }) => {
  const classes = useStyles();



  // из Formika
  const [col_add, setColAdd] = React.useState([]);

  const [door_image, setDoorImage] = React.useState('');
  const [prom, setProm] = React.useState([]);

  //  console.log('col_add',col_add)
  //    console.log('prom',prom)

  // col_add цвета для добавления типа
  //["60505827e8a42c15a25e2de8", "60505988f338d7174aefb40e"]
  // только id

  // из Formika
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const colorslist = useSelector((state) => state.colors);
  const { loading, colors: colors_list } = colorslist;
  const dispatch = useDispatch();
  // color_list - цвета из коллекции возможных цветов
  // console.log('colors_list', colors_list)
  // console.log('colors', colors)

  //загрузка в redux state возможных цветов
  React.useEffect(() => {
    dispatch(fetchColors());
  }, [])

  //////////////////////////////////////////////

  React.useEffect(() => {
    setVisible(colors)
  }, [colors])

  React.useEffect(() => {
    setProm(ggg())

  }, [col_add])

  React.useEffect(() => {
    if (prom) {
      setVisible([...colors, ...prom])
    }

  }, [prom, colors])
  ////////////////////////////////////////////////////

  const deleteHandler = (id) => {
    setVisible(visible.filter(c => c._id !== id))
  }
  //тут добавляем картинку двери
  const updateHandler = (id) => {
    setVisible(visible.map((el) => (el._id === id ? { ...el, image: door_image } : el)))
    setDoorImage('')
  }

  //--------------------------------------------------------
  //   ф-ция ggg() получает  полный массив цветов для добавления
  // по выбранным чекбоксам но еще без картинки двери
  // let col_add_completed = []
  function ggg() {
    let col_add_completed = []

    for (let index = 0; index < colors_list.length; index++) {

      for (let index = 0; index < colors_list.length; index++) {
        for (let j = 0; j < col_add.length; j++) {
          if (colors_list[index]._id === col_add[j]) {
            col_add_completed.push({ ...colors_list[index], image: '' })
          }
        }
      }
      return col_add_completed
    }

  }

  // получить массив без повторения id
  // const a = [
  //   {id: 123, randomvalue: 'hello'}
  //   ]; 

  //   const b = [
  //   {id: 123, randomvalue: 'hello', othervalue: 'sup'},
  //   {id: 125, randomvalue: 'sup', othervalue: 'hello'}
  //   ];

  //  console.log( b.filter(o => !a.find(o2 => o.id === o2.id)))

  return (
    <>
                <h2 style={{marginLeft:20,fontSize:25}}>Создание изображений</h2>

    <div className="order-to-make">
              <LooksTwoIcon
                color="primary"
                fontSize="large"

              />
              <p >(Шаг второй:)выберите Url изображения двери под нужный цвет...</p>

            </div>
      <TextField
        label="Url изображения"
        type="url"
        // error='true'
        // defaultValue={door_image || ''}
        value={door_image || ''}
        required
        onChange={(e) => setDoorImage(e.target.value)}
        className={classes.input}
      />
       <Divider />
            <div className="order-to-make">
              <Looks3Icon
                color="primary"
                fontSize="large"

              />
              <p>(Шаг третий:)прикрепите изображение в нужный блок,
              сохранить все изменения, нажав кнопку "Обновить"</p>

            </div>


      <div className='colors-image'>
        {visible.map((item) => (
          <Paper className='colors-image_item' elevation={4} key={item._id}>

            <div >{item.colorName}</div>
            <div >
              <img src={item.colorUrl} alt='no image' />
              <img src={item.image} alt='no image' />

              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={() => updateHandler(item._id)}
              >
                Прикрепить картинку
              </Button>

              <IconButton
                aria-label="delete"
                className={classes.button}
                color="secondary"
                onClick={() => deleteHandler(item._id)}
              >
                <DeleteOutlinedIcon fontSize="small" />
              </IconButton>


            </div>

          </Paper>
        ))}
      </div>




      {
        loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div style={{ width: '100%' }}>
            <Divider />
            <div className="order-to-make">
              <LooksOneIcon
                color="primary"
                fontSize="large"

              />
              <p >если хотите добавить изображение:(Шаг первый:)выберите нужный цвет...</p>

            </div>
            {/* <h1 style={{marginLeft:20}}>Выбор цвета</h1> */}
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
                <div style={{ marginBottom: 10, padding: 5, display: 'flex', justifyContent: 'center' }} elevation={1}>

                  <Button
                    style={{ marginRight: 20 }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    className={classes.button1}
                  >
                    Присоединить выбранные цвета
                  </Button>
                </div>


                <div className="colors-list" role="group" aria-labelledby="checkbox-group">

                  {/* без повторения */}
                  {
                    (colors_list.filter(o => !colors.find(o2 => o._id === o2._id))).map((product) => (
                      <ul style={{ display: 'block' }} className='colors-item ' key={product._id}>
                        <li>{<img style={{ height: '65px' }} src={product.colorUrl} alt="11" />}</li>
                        <li
                        //  style={{ display:'flex',flexDirection:'column',justifyContent:'space-between' }}
                        >
                          <p>
                            {/* <label> */}
                            <Field
                              type="checkbox"
                              name="checked"
                              value={product._id}
                            />
                            {/* </label> */}
                          </p>

                          <p style={{ fontSize: 13 }}>
                            {product.colorName}
                          </p>
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
