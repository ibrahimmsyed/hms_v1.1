import { useContext } from 'react';
import { UsersContext } from '../contexts/UsersContext';

// ----------------------------------------------------------------------

const useUsers = () => useContext(UsersContext);

export default useUsers;