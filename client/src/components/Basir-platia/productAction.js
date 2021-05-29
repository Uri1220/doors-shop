
import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "./types";

export const fetchProducts = () => (dispatch) => {
  fetch("http://localhost:8000/products")
    .then((res) => res.json())
    .catch((err) =>
      fetch("db.json")
        .then((res) => res.json())
        .then((data) => data.products)
    )
    .then((data) => {
      dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter(
              (x) => x.availableSizes.indexOf(size.toUpperCase()) >= 0
            ),
    },
  });
};
// "products": [
//   {
//     "id": 1,
//     "sku": 18644119330491312,
//     "title": "Sphynx Tie Dye Grey T-Shirt",
//     "description": "Sphynx Tie Dye Grey",
//     "availableSizes": ["X", "L", "XL", "XXL"],
//     "price": 10,
//     "isFreeShipping": true
//   },
// Метод indexOf() возвращает первый индекс, по которому данный элемент может быть найден в массиве 
// или -1, если такого индекса нет.

// var array = [2, 5, 9];
// array.indexOf(2);     // 0
// array.indexOf(7);     // -1
// array.indexOf(9, 2);  // 2
// array.indexOf(2, -1); // -1
// array.indexOf(2, -3); // 0

// fromIndex (второй параметр)
// Индекс, с которого начинать поиск. Если индекс больше или равен длине массива,
//  возвращается -1, что означает, что массив даже не просматривается.
 
//  Если индекс является отрицательным числом, он трактуется как смещение с конца массива.
//   Обратите внимание: если индекс отрицателен, массив всё равно просматривается от начала к концу. 
//   Если рассчитанный индекс оказывается меньше 0, поиск ведётся по всему массиву. 
//   Значение по умолчанию равно 0, что означает, что просматривается весь массив.




export const sortProducts = (items, sort) => (dispatch) => {
  const products = items.slice();
  if (sort !== "") {
    products.sort((a, b) =>
      sort === "lowestprice"
        ? a.price > b.price
          ? 1
          : -1
        : a.price < b.price
        ? 1
        : -1
    );
  } else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: products,
    },
  });
};
// var items = [
//   { name: 'Edward', value: 21 },
//   { name: 'Sharpe', value: 37 },
//   { name: 'And', value: 45 },
//   { name: 'The', value: -12 },
//   { name: 'Magnetic' },
//   { name: 'Zeros', value: 37 }
// ];
// items.sort(function (a, b) {
//   if (a.name > b.name) {
//     return 1;
//   }
//   if (a.name < b.name) {
//     return -1;
//   }
//   // a должно быть равным b
//   return 0;
// });