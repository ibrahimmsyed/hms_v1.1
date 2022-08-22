// @mui
import { Container, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// react
import { useEffect } from 'react';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useUsers from '../../hooks/useUsers';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getPatientsDetails } from '../../redux/slices/patient';
// _mock_
import { _userCards } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { PatientCard } from '../../sections/@dashboard/user/cards';

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { patients:_patients, isLoading } = useSelector((state) => state.patient);
  useEffect(() => {
    dispatch(getPatientsDetails());
  },[dispatch])

  return (
    <Page title="User: Cards">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Patients"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Patients', href: PATH_DASHBOARD.user.root },
            { name: 'Profile' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.patient.new}
            >
              Add Patient
            </Button>
          }
        />

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {_patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
