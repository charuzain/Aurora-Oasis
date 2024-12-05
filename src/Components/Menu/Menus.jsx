import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';

const MenusContext = createContext();
const Menus = ({ children }) => {
  // which one is currently opened id
  const [openId, setOpenID] = useState(''); // none of menus is open
  const [position, setPosition] = useState(null);
  const close = () => setOpenID('');
  const open = setOpenID;
  return (
    <MenusContext.Provider
      value={{ openId, open, close, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};
const Menu = ({ children }) => {
  return <div>{children}</div>;
};
const Toggle = ({ id }) => {
  const { openId, open, close, position, setPosition } =
    useContext(MenusContext);
  const handleClick = (e) => {
    const rect = e.target.closest('button').getBoundingClientRect();
    console.log(rect);
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.height + rect.y + 8,
    });
    if (openId === '' || openId !== id) {
      open(id);
    } else {
      close();
    }
  };
  return (
    <button onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
};
const List = ({ id, children }) => {
  const { openId, position, close } = useContext(MenusContext);

  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = function (e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener('click', handleOutsideClick,true);
    return () => {
      document.removeEventListener('click', handleOutsideClick,true);
    };
  }, []);

  if (openId !== id) return null;
  return createPortal(
    <ul
      style={{ position: 'fixed', top: position.y, right: position.x }}
      ref={menuRef}
    >
      {children}
    </ul>,
    document.body
  );
};
const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);
  const clickHander = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <button onClick={clickHander}>
        <span>{icon}</span>
        {children}
      </button>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
