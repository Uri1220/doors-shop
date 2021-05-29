import React from 'react'
import { Link } from 'react-router-dom'
import { array } from '../data'
import HomeStepper from '../components/MU/HomeStepper'



function Home() {

   // console.log(array)


   return (
      <div className='home'>
         <div className="home_title">Каталог дверей</div>
         <div className="home_items">
            {
               array.doorsCat.map((obj, index) => (
                  <Link key={`${obj.name}_${index}`} to={obj.url}>

                     <img src={obj.image} alt='image' />
                     <span>
                        {obj.name}
                     </span>
                  </Link>
               ))
            }
         </div>
         <div  className="home_stepper" >
            <HomeStepper/>
         </div>

        
      </div>
   )
}

export default Home
