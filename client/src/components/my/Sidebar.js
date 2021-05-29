import React from 'react'
import CategoriesListSidebar from './Categories-list-sidebar'

const Sidebar = ({ closeMenu,setVisiblePopup,array}) => {

  const sortRef = React.useRef();

  const handleOutsideClick = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(sortRef.current)) {
       setVisiblePopup(false);
    }
  };
  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);

  }, []);
    return (
      
        <div ref={sortRef} className="sidebar ">
            <span
                className="sidebar-close-button"
                onClick={closeMenu}
             >&times;</span> 
           
            <CategoriesListSidebar
            setVisiblePopup={setVisiblePopup}
            array={array}
            />
        </div>
       
        
    )
}
export default Sidebar;
