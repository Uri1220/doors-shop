import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MessageBox from '../components/my/MessageBox'
import LoadingBox from '../components/my/LoadingBox'
import { saveProduct, fetchFilterDoors, deleteProdcut, } from '../redux/actions/doorsA';
import { ColorsFormikMakeDoor } from './ColorsFormikMakeDoor'

import DeleteIcon from '@material-ui/icons/Delete';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DirectionsIcon from '@material-ui/icons/Directions';
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveIcon from '@material-ui/icons/Save';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
  root: {

    maxWidth: 1200,
    margin: '0 auto',   
  },

  input: {
    width: '60ch',
    fontSize: 16,
    padding: ' 5px 0px',
    marginLeft: 15,
    '& .MuiInputBase-root ': {
      fontSize: 16,
    },
    '& .MuiFormLabel-root': {
      fontSize: 16,
    },

  },

  button: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px',
    lineHeight: 1.5,
    borderColor: '#eee',
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },
  },
  button1: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 12,
    padding: '5px',
    lineHeight: 1.5,
    '&:hover': {
      border: 'none',
      opacity: 'none',
    },
  },
}));



function MakeDoorScreen(props) {
  const classes = useStyles();


  const [modalVisible, setModalVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(true);

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [typ, setTyp] = useState('');
  const [size, setSize] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSubCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');
  const [complect, setComplect] = useState('');
  const [colors, setColors] = useState([]);
  const [visible, setVisible] = React.useState([]);

  // colors - цвета из БД рабочие
  // visible - новые цвета после редактирования

  // console.log('props.location.search:', props.location.search);
  //  console.log('modalVisible',modalVisible);
  //  console.log('tableVisible',tableVisible);
  //  console.log('visible',visible);
  // props.location.search: ?cat=massiv=sub=classico
  const cat = props.location.search ? String(props.location.search.split("=")[1]) : '';
  const sub = props.location.search ? String(props.location.search.split("=")[3]) : '';
  // console.log('CAT', modalVisible)
  // console.log('sub', sub)

  // React.useEffect(() => {
  //   setColFinish(colors)
  // }, [colors]
  // )


  const doorslist = useSelector((state) => state.doors);
  const { isLoading, doors, error } = doorslist;



  const doorSave = useSelector((state) => state.doorSave);
  const {
    isLoading: isLoadingSave,
    success: successSave,
    error: errorSave,
  } = doorSave;

  const productDelete = useSelector((state) => state.doorDelete);
  const {
    //redux    //так обозвал
    isLoading: isLoadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    //без dispatch отображаемся уже отфильтрованные двери
    //а с dispatch -все

    // dispatch(fetchDoors());
    dispatch(fetchFilterDoors(
      {
        category: cat,
        sub_category: sub,
        min: 0,
        max: 0,
      }
    ));

  }, [successSave, successDelete]);

  const openModal = (product) => {
    setTableVisible(false)
    setModalVisible(true);
    setId(product._id);
    setTitle(product.title);
    setPrice(product.price);
    setDescription(product.description);
    setComplect(product.complect);
    setUrl(product.url);
    setTyp(product.typ);
    setSize(product.size);
    setCategory(product.category);
    setSubCategory(product.sub_category);
    setCountInStock(product.countInStock);
    setColors(product.colors);
  };
  // console.log('colFinish', colFinish)

  //SAVE////
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProduct({
        _id: id,
        title,
        price,
        url,
        typ,
        size,
        category,
        sub_category,
        countInStock,
        description,
        complect,
        colors: visible
      })
    )
    setTableVisible(true)
  };

  const clickBack = () => {
    
      setModalVisible(false)
      setTableVisible(true)
    
  }
  //Delete
  const deleteHandler = (product) => {
    dispatch(deleteProdcut(product._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        {/* <h3>Products</h3> */}
        {!modalVisible &&

          <Button
            style={{ marginBottom: 15 }}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={() => openModal({ category: `${cat}`, sub_category: `${sub}` })}
            className={classes.button}
          // startIcon={<SaveIcon />}
          >
            Создать продукт
          </Button>
        }
      </div>
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {errorSave && <MessageBox variant="danger">{errorSave}</MessageBox>}

      {modalVisible && (

        <div
          // className="form"
          className={classes.root}
        >
          <Paper elevation={4}>
            <form onSubmit={submitHandler}>

              <li>
                {isLoadingSave && <div>isLoading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>

              <Paper style={{ marginBottom: 10, padding: 5, display: 'flex', justifyContent: 'center' }} elevation={1}>

                <Button
                  style={{ marginRight: 20 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  size="large"
                  className={classes.button}
                  startIcon={<SaveIcon />}
                >
                  {id ? 'Обновить' : 'Создать'}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => clickBack()}
                  className={classes.button}
                >
                  Назад
                    </Button>

              </Paper>

              <Paper elevation={4}>
                <h2 style={{ marginLeft: 20, fontSize: 25 }}>
                  {id ? 'Корректировка данных :' : ''}
                </h2>

                <li style={{ padding: 15 }}>
                  Категория: <b>{category}</b>  Подкатегория: <b>{sub_category} </b>
                </li>
                <Divider />


                <li>

                  <TextField
                    label="Название"
                    type="search"
                    defaultValue={title || ''}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    className={classes.input}
                  />
                </li>
                <li>

                  <TextField
                    label="Цена"
                    type="number"
                    defaultValue={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    className={classes.input}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Руб.</InputAdornment>,
                    }}
                  />
                </li>
                <li>

                  <TextField
                    label="Url изображения"
                    type="url"
                    defaultValue={url || ''}
                    required
                    onChange={(e) => setUrl(e.target.value)}
                    className={classes.input}
                  />
                  {/* <input type="file" onChange={uploadFileHandler}></input>
                {upisLoading && <div>UpisLoading...</div>} */}
                </li>
                <li>

                  <TextField
                    label="Тип"
                    type="search"
                    defaultValue={typ || ''}
                    onChange={(e) => setTyp(e.target.value)}
                    className={classes.input}
                  />
                </li>
                <li>


                  <TextField
                    label="Размеры"
                    type="search"
                    defaultValue={size || ''}
                    onChange={(e) => setSize(e.target.value)}
                    className={classes.input}
                  />
                </li>
                <li>

                  <TextField
                    label="Количество на складе"
                    type="number"
                    defaultValue={countInStock}
                    // required
                    onChange={(e) => setCountInStock(e.target.value)}
                    className={classes.input}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">Шт.</InputAdornment>,
                    }}
                  />
                </li>

                <li>

                  <TextField
                    label="Описание"
                    defaultValue={description}
                    onChange={(e) => setDescription(e.target.value)}
                     placeholder="Введите описание в формате: Свойство= Значение+,
                     например: Цвет=белый+"                     
                    className={classes.input}
                    rows={4}
                    multiline
                    variant="outlined"
                  />
                </li>
                <li>

                  <TextField
                    label="Характеристики"
                    defaultValue={complect}
                    onChange={(e) => setComplect(e.target.value)}
                    className={classes.input}
                    placeholder="Введите характеристики в формате: Свойство= Значение+,
                    например: Цвет=белый+"

                    // rows={6}
                    multiline
                    variant="outlined"
                  />
                </li>
              </Paper>

            </form>
          </Paper>

          {/*=================ColorForm ======== */}
          <Paper elevation={4} style={{ marginTop: 20 }}>
            {colors &&
              <ColorsFormikMakeDoor
                setVisible={setVisible}
                visible={visible}
                colors={colors}
              />
            }
          </Paper>
          {/* =================================== */}

        </div>
      )}

      {/* ///////////////////////////////////////////////////////// */}
      {
        isLoading ? (
          <LoadingBox></LoadingBox>
        ) : tableVisible && (
          <div className="product-list">
            <table className="table">
              <thead>
                <tr>

                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Sub-Category</th>
                  <th>Colors</th>
                  <th>Action</th>


                </tr>
              </thead>
              <tbody>
                {doors.map((product) => (


                  <tr key={product._id}>

                    <td>{<img style={{ height: '60px' }} src={product.url} alt="11" />}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.sub_category}</td>
                    <td>
                      {product.colors.length}
                    </td>
                    <td >
                      {/* открываем окно */}

                      <Button
                        style={{ marginRight: 20 }}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => openModal(product)}
                        className={classes.button1}
                      // startIcon={<SaveIcon />}
                      >
                        Редактировать
                    </Button>

                      <IconButton
                        aria-label="delete"
                        className={classes.button}
                        color="secondary"
                        onClick={() => deleteHandler(product)}
                      >
                        <DeleteOutlinedIcon fontSize="large" />
                      </IconButton>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
}
export default MakeDoorScreen
{/* <li>
  <label htmlFor="url">Image</label>
  <input
    type="text"
    name="url"
    value={url || ''}
    id="url"
    onChange={(e) => setUrl(e.target.value)}
  ></input>
  <input type="file" onChange={uploadFileHandler}></input>
  {upisLoading && <div>UpisLoading...</div>}
</li> */}