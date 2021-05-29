import React from 'react'
import Paper from '@material-ui/core/Paper';



function Delivery() {
   return (
      <div className='delivery-container' >
         <Paper className='delivery' elevation={4}>
            <h2>Доставка межкомнатных и входных дверей  </h2>
            <p> Уважаемые клиенты, в этом разделе вы можете ознакомиться с подробной информацией о доставке .</p>
            
            <p>Наши курьеры заранее связываются с Вами и оговаривают время доставки
            (как правило, доставка осуществляется в вечернее время после 17.00,
            диапазон доставки 2-3 часа). За отдельную плату курьер может осуществить подъем
            товара на этаж.</p>
            <p>Любой этаж - один комплект, при наличии лифта - 3 рубля.</p>
            <p>Один этаж – один комплект, при отсутствии лифта -2 рубля.</p>


            <table border="0" cellpadding="0" cellspacing="0">
               <tbody>
                  <tr>
                     <td style={{ width: 139, height: 55 }}>
                        <p align="center"><strong>Количество дверей</strong></p>
                     </td>
                     <td style={{ width: 255, height: 55 }}>
                        <p align="center"><strong>Минск</strong></p>
                     </td>
                     <td style={{ width: 243, height: 55 }}>
                        <p align="center"><strong>Минский район</strong></p>
                     </td>
                  </tr>
                  <tr>
                     <td style={{ width: 139 }}>
                        <p>1</p>
                     </td>
                     <td style={{ width: 255 }}>
                        <p align="center">25 рублей</p>
                     </td>
                     <td style={{ width: 243 }}>
                        <p align="center">30 рублей</p>
                     </td>
                  </tr>
                  <tr>
                     <td style={{ width: 139 }}>
                        <p>2</p>
                     </td>
                     <td style={{ width: 255 }}>
                        <p align="center">18 рублей</p>
                     </td>
                     <td style={{ width: 243 }}>
                        <p align="center">22,5 рублей</p>
                     </td>
                  </tr>
                  <tr>
                     <td style={{ width: 139 }}>
                        <p>3 и более</p>
                     </td>
                     <td style={{ width: 255 }}>
                        <p align="center">бесплатно</p>
                     </td>
                     <td style={{ width: 243 }}>
                        <p align="center">15 рублей</p>
                     </td>
                  </tr>
                  <tr>
                     <td style={{ width: 139, height: 21 }}>
                        <p>4 и более</p>
                     </td>
                     <td style={{ width: 255, height: 21 }}>
                        <p align="center">бесплатно</p>
                     </td>
                     <td style={{ width: 243, height: 21 }}>
                        <p align="center">бесплатно</p>
                     </td>
                  </tr>
               </tbody>
            </table>
            <div className="delivery_content">
               <p>Во избежание конфликтных ситуаций проверяйте целостность и комплектность заказа при получении, обязательно проверяйте целостность упаковки товара и стекла ,если такое имеется в двери. После ухода курьера, претензии по качеству-комплектности заказа не принимаются.</p>
               <p>Если по каким-то причинам вы не можете принять товар в назначенные дни, предупреждайте нас, либо службу доставки об этом заранее, что бы была возможность перенести даты, либо договоритесь с кем-то о помощи.</p>

            </div>
         </Paper>
      </div>
   )
}

export default Delivery
