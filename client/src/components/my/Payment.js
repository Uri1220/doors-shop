import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
   root: {
      width: '100%',
   },
   heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
   },
}));



function Payment() {
   const classes = useStyles();

   return (
      <div className=''>
         <Paper className='payment' elevation={4}>
            <h2>Оплата </h2>
            <div className='payment__top' >
               <img src="https://yurkas.by/images/uslugi/oplata-photo.jpg" alt="PayCard" />
               <p> Оплатить полную стоимость товара или внести предоплату, можно при заключении и подписании договора  или после доставки.</p>

            </div>
            <div className={classes.root}>

               <Accordion>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel1a-content"
                     id="panel1a-header"
                  >
                     <Typography className={classes.heading}>ОПЛАТА НАЛИЧНЫМИ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>
                       Производится в белорусских рублях в салоне продаж или дома по факту доставки на адрес.
                    </Typography>
                  </AccordionDetails>
               </Accordion>

               <Accordion>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel2a-content"
                     id="panel2a-header"
                  >
                     <Typography className={classes.heading}>ОПЛАТА ПЛАСТИКОВОЙ КАРТОЙ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>
                       К оплате принимаются только пластиковые карты в белорусских рублях в любом нашем салоне продаж.
                     </Typography>
                  </AccordionDetails>
               </Accordion>
               
               <Accordion>
                  <AccordionSummary
                     expandIcon={<ExpandMoreIcon />}
                     aria-controls="panel2a-content"
                     id="panel2a-header"
                  >
                     <Typography className={classes.heading}>iPay - оплата с баланса мобильного телефона</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Typography>
                     Совершить платеж Вы можете из личного кабинета сайта iPay.by. Для входа в личный кабинет используйте свой номер телефона и сеансовый пароль.          </Typography>
                  </AccordionDetails>
               </Accordion>
               
            </div>

         </Paper>
      </div>
   )
}

export default Payment
