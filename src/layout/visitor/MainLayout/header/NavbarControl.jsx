import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../../store/app-context';
import { DropDownIcon, SKAFlag, ThemeIcon, USAFlag } from "../../../../UI/Icons";
import LangsDropdwon from './LangsDropdwon';
import { motion, AnimatePresence } from 'framer-motion';
import ToolTipe from '../../../../UI/dropdownMenu/ToolTipe';

const NavbarControl = () => {


  const [showDropDown, setShowDropDown] = useState(false);
  const {t, i18n} = useTranslation();
  const ctx = useContext(AppContext);
  const [hover, setHover] = useState(false);
  const [themeHover, setThemeHover] = useState(false)

  const content = ctx.theme === 'dark' 
  ? <span className='d-none d-sm-block'>{`${t('Light')}`}</span> :
   <span className='d-none d-sm-block'>{`${t('Dark')}`}</span>;

   let toolTipeContent = ctx.lang === 'en' && ctx.theme !== 'dark' ? 'Switch To Dark'
   : ctx.lang === 'en' && ctx.theme === 'dark' ? 'Switch To Light' 
   : ctx.lang === 'ar' && ctx.theme !== 'dark' ? 'حول الى الوضع الليلى' : 'حول الى الوضع الساطع'


  return (
    <ul className='navbar_controls flex'>
      <motion.li className='nav-control position-relative'>
        <button 
          onClick={() => {
            setHover(false)
            setShowDropDown(prevSt => !prevSt)
          }} 
          className={showDropDown ? 'flex show' : 'flex' }
          id='toggle-menu-lang'
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {ctx.lang === 'en' ? 
          <span className='flex' 
            style={{columnGap: '10px', pointerEvents: 'none'}}>
            <USAFlag/>
            <span className='d-none d-sm-block'>English</span>
            <span className='d-block d-sm-none'>EN</span>
          </span> : 
          <span className='flex' 
            style={{
                columnGap: '10px',
                pointerEvents: 'none', 
                fontFamily: "'Almarai', sans-serif"
              }}>
            <SKAFlag/>
            <span className='d-none d-sm-block'>العربية</span>
            <span className='d-block d-sm-none'>ع</span>
          </span> 
          }
          <DropDownIcon />
        </button>
        {hover && !showDropDown && <ToolTipe>{ctx.lang === 'en' ? 'Switch To Arabic' : 'حول الى اللغة الانجليزية'}</ToolTipe>}
        <AnimatePresence>
          {showDropDown && 
            <LangsDropdwon
            id='toggle-menu-lang'
            setShowDropDown={setShowDropDown}
            />
          }
        </AnimatePresence>
      </motion.li>
      <li className='nav-control flex them-btn position-relative' 
        onClick={() => ctx.toggleTheme()}
        onMouseEnter={() => setThemeHover(true)}
        onMouseLeave={() => setThemeHover(false)}
      >
        <ThemeIcon />
        {content}
      {themeHover && <ToolTipe>{toolTipeContent}</ToolTipe>}
      </li>
    </ul>
  );
};

export default NavbarControl;