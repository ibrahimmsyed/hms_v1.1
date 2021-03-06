import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useUsers from '../../hooks/useUsers';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
import { useSelector } from '../../redux/store';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { user: _userList } = useUsers();
  
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { username = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.username) === username);

  return (
    <Page title="User: Create a new user">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase(username) },
          ]}
        />

        <UserNewEditForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
