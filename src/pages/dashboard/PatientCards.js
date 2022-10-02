// @mui
import { Container, Box, Button, Tabs, Tab, InputAdornment, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {useState, SyntheticEvent, ReactNode} from 'react';
import { sub } from 'date-fns';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import { useDispatch, useSelector } from '../../redux/store';
// _mock_
import { _userCards } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import InputStyle from '../../components/InputStyle';
import PatientInvoiceList from './PatientInvoiceList'
// sections
import { PatientCard } from '../../sections/@dashboard/user/cards';
import { AppointmentDetailsList } from '../../sections/@dashboard/e-commerce/product-details';
import FilesDetails from '../../sections/@dashboard/e-commerce/FilesDetails';
// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();
  const [value, setValue] = useState(0);
  const plans = [
    {
      id:1,
      patient: {
        id: 32974,
        name: "Wilson",
        age: "52 Years",
        gender: "Male",
        avatarUrl: ""
      },
      doctor: {
        id: "1",
        name: "Dr L.P Mohan"
      },
      procedure: {
        id:1,
        name: "CROWN",
        cost: "1000",
        discount: "10",
        total: "900",
        notes: "6RD Dr. Deepika",
        estimatedAmount: "1000"
      }
    }
  ]
  const appointments = [
    {
      id:1,
      patient: {
        id: 32974,
        name: "Wilson",
        age: "52 Years",
        gender: "Male",
        avatarUrl: ""
      },
      procedure: {
        id:1,
        name: "CROWN"
      },
      notes: {
        id: 1,
        description: "6RD Dr. Deepika"
      },
      doctor: {
        id: "1",
        name: "Dr L.P Mohan"
      },
      time: {
        date: sub(new Date(), { days: 3, hours: 5 }),
        startTime: "12:00 AM",
        endTime: "12:45 AM"
      }
    }
  ]

  const prescriptions = [
    {
      id:1,
      patient: {
        id: 32974,
        name: "Wilson",
        age: "52 Years",
        gender: "Male",
        avatarUrl: ""
      },
      instruction: {
        id: 1,
        description: "6RD Dr. Deepika"
      },
      doctor: {
        id: "1",
        name: "Dr L.P Mohan"
      },
      time: {
        date: sub(new Date(), { days: 3, hours: 5 }),
        startTime: "12:00 AM",
        endTime: "12:45 AM"
      },
      drugs: [
        {
          id:1,
          name: "COMB Tab",
          strength: "100",
          duration: 4,
          morning: 4,
          noon: 4,
          night: 0,
          intake:  "bf"
        },
        {
          id:2,
          name: "SESS Tab",
          strength: "500",
          duration: 3,
          morning: 0,
          noon: 1,
          night: 0,
          intake:  "af"
        }
      ]
    }
  ]

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(event, newValue)
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
            <Tab icon={<Iconify icon={'eva:people-outline'} width={20} height={20} />} label="Profile" />
            <Tab icon={<Iconify icon={'eva:calendar-outline'} width={20} height={20} />} label="Appointments" />
            <Tab icon={<Iconify icon={'eva:book-outline'} width={20} height={20} />} label="Treatment Plans" />
            <Tab icon={<Iconify icon={'eva:clipboard-outline'} width={20} height={20} />} label="Prescription" />
            <Tab icon={<Iconify icon={'eva:credit-card-outline'} width={20} height={20} />} label="Payments" />
            <Tab icon={<Iconify icon={'eva:file-text-outline'} width={20} height={20} />} label="Files" />
            <Tab icon={<Iconify icon={'eva:message-square-outline'} width={20} height={20} />} label="Communication" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AppointmentDetailsList appointments={appointments}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse'}}
          >
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.patient.newplans}
            >
              Add Patient
            </Button>
          </Stack>
            
          <AppointmentDetailsList plans={plans}/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse'}}
          >
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.patient.newprescription}
            >
              Add Prescription
            </Button>
          </Stack>
            
          <AppointmentDetailsList prescriptions={prescriptions}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse', mx: 3, mb:1}}
          >
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.invoice.new}
            >
              Add Prescription
            </Button>
          </Stack>
          <PatientInvoiceList/>
        </TabPanel>
        <TabPanel value={value} index={5}>
        <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse', mx: 3, mb:1}}
          >
            <Button
              variant="contained"
              sx={{mx: 1}}
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.patient.mlcfiles}
            >
              Add Medical Certificate
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              component={RouterLink} to={PATH_DASHBOARD.patient.newfiles}
            >
              Add Files
            </Button>
          </Stack>
          <FilesDetails/>
        </TabPanel>
        <TabPanel value={value} index={6}>
         Communications
        </TabPanel>
      </Container>
    </Page>
  );
}

// Tab Panel
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}