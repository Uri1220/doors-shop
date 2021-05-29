import Axios from "axios";
import {
  CAT_REQUEST,
  CAT_SUCCESS,
  CAT_FAIL,
  CAT_LIST_REQUEST,
  CAT_LIST_SUCCESS, 
  CAT_LIST_FAIL,
} from "../constants/categoryConstans";



const createCat = (cat) => async (dispatch, getState) => {
  dispatch({ type: CAT_REQUEST, payload:  {cat}  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post("/api/cat/create",  {cat},
    {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    );
    dispatch({ type: CAT_SUCCESS, payload: data });    
  } catch (error) {
    dispatch({ type: CAT_FAIL, 
      payload:
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    
    });
  }
}
//LIST
 const listCats = () => async (dispatch) => {
  dispatch({ type: CAT_LIST_REQUEST });
 
  try {
    const { data } = await Axios.get(`/api/cat/list`, {
    });
    // console.log(data);
    dispatch({ type: CAT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CAT_LIST_FAIL, payload: message });
  }
};

export {createCat,listCats};