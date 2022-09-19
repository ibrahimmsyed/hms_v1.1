// @mui
import { Container, Box, Button, Tabs, Tab, InputAdornment } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {useState, SyntheticEvent} from 'react';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userCards } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import InputStyle from '../../components/InputStyle';
// sections
import { PatientCard } from '../../sections/@dashboard/user/cards';

// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const findPatients = () => {
    
  }

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
            display: 'flex', justifyContent: 'center', mb: 3
          }}
        >
          <InputStyle
            stretchStart={240}
            value=""
            onChange={(event) => findPatients(event.target.value)}
            placeholder="Find patients..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex', justifyContent: 'center', mb: 3
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
            <Tab icon={<Iconify icon={'eva:calendar-outline'} width={20} height={20} />} label="Appointments" />
            <Tab icon={<Iconify icon={'eva:book-outline'} width={20} height={20} />} label="Treatment Plans" />
            <Tab icon={<Iconify icon={'eva:file-text-outline'} width={20} height={20} />} label="Files" />
            <Tab icon={<Iconify icon={'eva:credit-card-outline'} width={20} height={20} />} label="Payments" />
            <Tab icon={<Iconify icon={'eva:message-square-outline'} width={20} height={20} />} label="Communication" />
          </Tabs>
        </Box>
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
          {_userCards.map((user) => (
            <PatientCard key={user.id} user={user} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
