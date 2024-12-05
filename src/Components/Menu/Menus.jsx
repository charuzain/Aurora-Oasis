import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';

const MenusContext = createContext();
const Menus = ({ children }) => {
  // which one is currently opened id
  const [openId, setOpenID] = useState(''); // none of menus is open

  const close = () => setOpenID('');
  const open = setOpenID;
  return (
    <MenusContext.Provider value={{ openId, open, close }}>
      {children}
    </MenusContext.Provider>
  );
};
const Menu = ({ children }) => {
  return <div>{children}</div>;
};
const Toggle = ({ id }) => {
  const { openId, open, close } = useContext(MenusContext);
  const handleClick = () => {
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
  const { openId } = useContext(MenusContext);
  if (openId !== id) return null;
  return createPortal(
    <ul style={{ position: 'fixed', top: 20, right: 20 }}>{children}</ul>,
    document.body
  );
};
const Button = ({ children }) => {
  return (
    <li>
      <button>{children}</button>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
