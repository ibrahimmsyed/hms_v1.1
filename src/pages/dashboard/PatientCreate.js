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
import PatientNewEditForm from '../../sections/@dashboard/user/PatientNewEditForm';

// ----------------------------------------------------------------------

export default function PatientCreate() {
  const { themeStretch } = useSettings();

  const { patientdetails: _patients } = useUsers();

  const { pathname } = useLocation();

  const { name } = useParams();

  const currentPatient = _patients?.find(patient => patient?.id === Number(name));
  
  const isEdit = pathname.includes('edit');
  
  return (
    <Page title="User: Create a new patient">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new patient' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Patient', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : capitalCase(currentPatient.patientName) },
          ]}
        />

        <PatientNewEditForm isEdit={isEdit} currentPatient={currentPatient} />
      </Container>
    </Page>
  );
}
