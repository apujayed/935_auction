import {useState} from 'react';
import Vertical from '../components/header/vertical';
import Horizontal from '../components/header/horizontal';

const Layout = ({ children }) => {
  
const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
const handleMenuToggle = () => {
  setIsMenuCollapsed(!isMenuCollapsed);
  
  
};
  return (
     <div className='flex selection:bg-black selection:text-white'>
       <Vertical isMenuCollapsed={isMenuCollapsed} />
        <div className='w-full'>
          <div className='sticky inset-0 z-50'>
          <Horizontal onMenuToggle={handleMenuToggle} />
          </div>
          <>{children}</>
        </div>
      </div>
  );
};

export default Layout;