import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { ClickAwayListener } from '@material-ui/core';
import { Link } from 'react-router-dom'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
   {
      p1: 'Входные двери по лучшей стоимости',
      p2: 'Более 500 моделей в наличии / Рассрочка до 12 месяцев / Цены от 176 рублей',
      imgPath:
         'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
      path: '/doors/category/vchod'
   },
   {
      p1: 'Межкомнатные двери по лучшей стоимости',
      p2: 'Более 500 моделей в наличии / Рассрочка до 12 месяцев / Цены от 82 рублей',
      imgPath:
         'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
   path: '/doors/category/ecoshpon'
   },
   // {
   //    label: 'Bird',
   //    imgPath:
   //       'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
   // },
   // {
   //    label: 'Bali, Indonesia',
   //    imgPath:
   //       'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
   // },
   // {
   //    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
   //    imgPath:
   //       'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
   // },
   // {
   //    label: 'Goč, Serbia',
   //    imgPath:
   //       'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
   // },
];

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 750,
      flexGrow: 1,
   },
   header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
   },
   img: {
      height: 255,
      display: 'block',
      maxWidth: 750,
      overflow: 'hidden',
       width: '100%',
   },
   but: {
      position: 'absolute',
      top: '70%',
      left: '50%',
      transform: ' translate(-50%, -50%)',
      width: 320,
      fontSize: 18,
      padding: 5,
      lineHeight: 1.5,
      display: 'inlineBloch',
      background: '#ef9200',
      color: '#fff',
      textAlign: 'center',


   },
   title: {
      width: '90%',
      position: 'absolute',
      top: '25%',
      left: '50%',
      transform: ' translate(-50%, -50%)',
      fontSize: 25,
      lineHeight: 1.5,
      display: 'inlineBloch',
      color: '#fff',
      textAlign: 'center',
      fontWeight: 600


   },
   link: {
      '&:hover': {
         opacity: .9,
         color: '#fff'
      },

   }
}));

export default function SwipeableTextMobileStepper(props) {
   const classes = useStyles();
   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(0);
   const maxSteps = tutorialSteps.length;

   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
   };

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   const handleStepChange = (step) => {
      setActiveStep(step);
   };

   return (
      <div className={classes.root}>
         {/* <Paper square elevation={0} className={classes.header}>
            <Typography>{tutorialSteps[activeStep].label}</Typography>
         </Paper> */}
         <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
         >
            {tutorialSteps.map((step, index) => (

               <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                     <div style={{ position: 'relative' }}>
                        <img className={classes.img} src={step.imgPath} alt={step.label} />
                        <Link className={classes.link} to={step.path}>
                           <div className={classes.title}>
                              <p > {step.p1}</p>
                              <p style={{ fontSize: 15, fontWeight: 500 }}>{step.p2}</p>

                           </div>
                           <div className={classes.but}  >Перейти в каталог дверей</div>

                        </Link>
                     </div>
                  ) : null}

               </div>


            ))}
         </AutoPlaySwipeableViews>
         <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
               <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
               </Button>
            }
            backButton={
               <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
            }
         />
      </div>
   );
}

