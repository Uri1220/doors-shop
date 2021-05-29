import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'


function Main() {
   const [isAdm, setIsAdm] = React.useState(false);

   const userS = useSelector(state => state.userSignin)
  const { userInfo } = userS;


  React.useEffect(() => {
   
   if (userInfo) {
      //  console.log("doors", userInfo)
     setIsAdm(userInfo.isAdmin)
   }
  },[isAdm,    userInfo])

   return (
      <div>
         <h2>Main page</h2>
           { userInfo && userInfo.isAdmin ? (
        <div className="back-to-result">
          <Link to="/orders/">Заказы</Link>
        </div> ) : ('')
      //      { isAdm ? (
      //   <div className="back-to-result">
      //     <Link to="/orders/">Заказы</Link>
      //   </div> ) : ('')

        }
         {/* <div className="back-to-result">
            <Link to="/orders/">Заказы</Link>
         </div> */}
         <div className="back-to-result">
            <Link to="/flex-cat">Flex Cat    </Link>
         </div>
         <div className="back-to-result">
            <Link to="/mu-search">Mu Search</Link>
         </div>
         <div className="back-to-result">
            <Link to="/select">Select</Link>
         </div>
      </div>
   )
}

export default Main
