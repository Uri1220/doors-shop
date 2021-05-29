import React from 'react';


export default function Descript({ des }) {


  // const door = {
  //   description: 'Особенности=Бескромочная технология производства с использованием PUR-клея необратимой полимеризации, стоевой профиль без пустот и ДСП.+Материал=Композитный мебельный щит на основе высококачественного соснового бруса и MDF.+    Отделка=    Эко Шпон - структурный антивандальный материал с защитным лаком (Германия, Южная Корея).+    Стекло=    White Waltz - белый окрашенный лакобель (lacobel).+    Толщина, мм=    36 '
  // }

  const arr = des.split('+')
  // const arr = String({des}).split('+')

  const ppp = arr.map(el => el.split('='))

  const ppp1 = ppp.map((el) => el.map((x, i) => i % 2 === 0 ? { name: x } : { value: x }))

  const ppp2 = ppp1.map((el) => {
    return {
      ...el[0], ...el[1]
    }
  })

  // console.log(typeof(des))
  // console.log(des)
  // console.log(arr)
  return (

    <div className="details">
      <div className='details-right-description'>
        <div className="">
          <table className="table">
            <thead>
              <tr>
                {/* <th>Title</th> */}
              </tr>
            </thead>
            <tbody>
              {ppp2.map((el, i) => (
                <tr key={`${el}_${i}`}>
                  <td style={{ width: '35%',fontWeight:'500'}}>
                    {el.name}
                  </td>
                  {el.value &&
                  <td>{el.value}</td>}
                </tr>
              )
              )
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}


