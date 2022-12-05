// @mui
import { Container, Box, Button, Tabs, Tab, InputAdornment, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {useState, SyntheticEvent, ReactNode, useEffect} from 'react';
import { sub } from 'date-fns';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useUsers from '../../hooks/useUsers';
import useTabs from '../../hooks/useTabs';
import { useDispatch, useSelector } from '../../redux/store';
import { getAllTreatmentPlans } from '../../redux/slices/lab';
// _mock_
import { _userCards } from '../../_mock';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import InputStyle from '../../components/InputStyle';
import { DialogAnimate } from '../../components/animate';
import PatientInvoiceList from './PatientInvoiceList'
// sections
import { PatientCard } from '../../sections/@dashboard/user/cards';
import { AppointmentDetailsList } from '../../sections/@dashboard/e-commerce/product-details';
import FilesDetails from '../../sections/@dashboard/e-commerce/FilesDetails';
import CommunicationDetails from '../../sections/@dashboard/e-commerce/CommunicationDetails';
// ----------------------------------------------------------------------

export default function UserCards() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { patients } = useUsers();
  const { user } = useUsers();
  const [value, setValue] = useState(0);
  const [plans, setPlans] = useState([]);
  const [isOpen, setDialogState] = useState(false);
  const [url , setRedirectURL] = useState('labs')
  const { currentTab: filterLabName, onChangeTab: onChangeFilterStatus } = useTabs('all');
  const STATUS_OPTIONS = ['All Patients', 'Recently Visited', 'Recently Added'];

  useEffect(() => {
    dispatch(getAllTreatmentPlans());
  },[dispatch])

  const { treatmentPlans } = useSelector((state) => state.labs);

  useEffect(() => {
    // const plan = treatmentPlan.map((plan, i) => {id: i, procedure: plan, })
    const plans = []
    treatmentPlans?.forEach((plan, i) => {
      const patient = patients.find(patient => Number(patient.id) === Number(plan.patientId))
      const doctor = user.find(user => user.isStaff && Number(user.id) === Number(plan.orderedBy))
      console.log(patient , doctor)
      const planObj = {
        id: i+1,
        procedure: JSON.parse(plan.selection).updatedProcedure[0],
        patient,
        doctor 
      }
      plans.push(planObj)
    });
    console.log(plans)

    setPlans(plans)
  },[treatmentPlans])

  /* const plans = [
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
  ] */
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
  const handleAddNew = (url) => {
    setRedirectURL(url)
    setDialogState(true)
  }
  const onClose = () => {
    setDialogState(true)
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
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
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
              onClick={() => handleAddNew('treatments')}
            >
              Add New Plans
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
          <CommunicationDetails/>
        </TabPanel>
      </Container>
      <DialogAnimate fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
        <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterLabName}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
        </Tabs>
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
          sx={{ my: 1 }}
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
            m: 2
          }}
        >
          {patients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} url={url} isSearch/>
          ))}
        </Box>
      </DialogAnimate>
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