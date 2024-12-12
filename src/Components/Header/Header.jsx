import { useNavigate } from 'react-router-dom';
import defaultImage from '../../../public/default-user.jpg';
import { TbLogout } from 'react-icons/tb';
import { HiOutlineUser, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useLogout } from '../../hooks/useLogout';

const Header = () => {
  const navigate = useNavigate();
  const { user, isLoading, isError } = useCurrentUser();
  const { logout, isPending } = useLogout();
  console.log(user);

  return (
    <div>
      <div>
        <img src={user.user_metadata.avatar || defaultImage} alt="Avatar" style={{height:'50px'}} />
        <p>{user.user_metadata.fullName}</p>
      </div>
      <button onClick={() => navigate('/account')}>
        <HiOutlineUser />
      </button>
      <button>
        <HiOutlineMoon />
      </button>
      <button onClick={() => logout()} disabled={isPending}>
        <TbLogout />
      </button>
    </div>
  );
};

export default Header;
