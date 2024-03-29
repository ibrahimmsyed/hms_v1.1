import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
import { useDispatch, useSelector } from '../../redux/store';
// hooks
import useUsers from '../../hooks/useUsers';
import useSettings from '../../hooks/useSettings';
import { getUsers } from '../../redux/slices/user';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  },[dispatch])

  const { user } = useUsers();

  const { users: stateUser } = useSelector((state) => state.user);

  const { themeStretch } = useSettings();

  const [users, setUsers] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [userName, setUserName] = useState(null);

  const { pathname } = useLocation();

  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(() => {
    if(user.length)
      setUsers(user)
  }, [user])  

  useEffect(() => {
    if(stateUser.length)
      setUsers(stateUser)
  }, [stateUser])  

  useEffect(() => {
    if(users?.length){
      const currentUser = users.find((user) => user.id === Number(id));
      if(currentUser?.id){
        setUserName(capitalCase(currentUser?.username))
      }
      setCurrentUser(currentUser)
    }
  }, [users])  

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Practice Staff', href: PATH_DASHBOARD.settings.practicestaff },
            { name: !isEdit ? 'New user' : userName },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
