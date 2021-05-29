export const array = {
   //category 0-
   // categories : cat_arr,
   categories: [
        { name: 'Распродажа', url: '/' },
      { name: 'Двери', url: '/door/colorId/' },
      { name: 'Фурнитура', },
      // { name: 'Плинтус', url: '/plintus' },
   ],
   //Doors subCat+1
   // ' двери'
   doorsCat: [
      { name: 'Входные', db:'vchod', url: '/doors/category/vchod',image:'/img/vchod.png' },
      { name: 'Массив', db:'massiv',url: '/doors/category/massiv',image:'/img/mass.png' },
      { name: 'Эко Шпон', db:'ecoshpon',url: '/doors/category/ecoshpon',image:'/img/yurkas-eco.png' },
      // { name: 'МДФ', db:'mdf'},
   ],
   // subSusbCat+1 url: '/-------' 
   vhod_door: [
      { name: 'Econom', db:'econom', url: '/doors/category/vchod/sub_category/econom' },
      { name: 'Porta R-2',db:'porta-r2', url: '/doors/category/vchod/sub_category/porta-r2' },
   ],
   massDoors: [
      { name: 'Classico', db:'classico', url: '/doors/category/massiv/sub_category/classico' },
      { name: 'Porta X', db:'porta-x', url: '/doors/category/massiv/sub_category/porta-x' },
      // { name: 'Ока', db:'oka', url: '/doors/category/massiv/sub_category/oka' },
   ],
   ecoDoors: [
      { name: 'Porta X', db:'porta-x',  url: '/doors/category/ecoshpon/sub_category/porta-x' },
      { name: 'Legno',  db:'legno',url: '/doors/category/ecoshpon/sub_category/legno' },
      { name: 'Vetro', db:'vetro', url: '/doors/category/ecoshpon/sub_category/vetro' },
   ],
   mdfDoors: [
      { name: 'МДФ Юркас',  db:'mdf-yurkas',url: '/doors/category/mdf/sub_category/mdf-yurkas' },
   ],
   //Входные двери подкатегории нет!



   //Furnitua
   furnCat: [
      { name: 'Ручки', db:'pens' ,url: '/implements/category/pens'},
      // { name: 'Петли', db:'petly' },
   ],
   ruchFurn: [
      { name: 'На квадратной розетке', db:'kvadr', url: '/implements/category/pens/sub_category/kvadr' },
      { name: 'На круглой розетке', db:'krug', url: '/implements/category/pens/sub_category/krug' },
      // { name: 'Ручки-защелки', db:'zaschelk', url: '/implements/category/pens/sub_category/zaschelk' },
   ],
   petFurn: [
      { name: 'Врезные' },
      { name: 'Без врезки' },
      { name: 'Скрытые' },
   ],

}