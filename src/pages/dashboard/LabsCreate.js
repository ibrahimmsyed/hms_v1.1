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
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import LabsNewEditForm from '../../sections/@dashboard/user/LabsNewEditForm';

// ----------------------------------------------------------------------

export default function LabsCreate() {
  const { themeStretch } = useSettings();

  const { patients:_userCards } = useUsers();

  const { pathname } = useLocation();

  const { name = '', id = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentPatient = _userCards.find((user) => Number(user.id) === Number(id));

  return (
    <Page title="Labs: Create a new order">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new order' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Labs', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New Order' : capitalCase(name) },
          ]}
        />

        <LabsNewEditForm isEdit={isEdit} currentPatient={currentPatient} />
      </Container>
    </Page>
  );
}
