// @mui
import { Container, Box, Button, Tabs, Tab, InputAdornment, Typography, Stack, IconButton, Dialog, DialogActions, Tooltip } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import {useState, SyntheticEvent, ReactNode, useEffect} from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { sub } from 'date-fns';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useUsers from '../../hooks/useUsers';
import useTabs from '../../hooks/useTabs';
import { useDispatch, useSelector } from '../../redux/store';
import { getAllTreatmentPlans } from '../../redux/slices/lab';
import { getPresciptions, getUploadFiles, getMedicalCertificate, getClinicalNotes, getPatientDetails } from '../../redux/slices/patient';
import { getAllInventory } from '../../redux/slices/setting';
import { getCalendarEvents } from '../../redux/slices/calendar';
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
import PatientsDialog from '../../components/PatientsDialog';
import { RHFUploadSingleFile } from '../../components/hook-form';
import { PatientSearch } from '../../sections/@dashboard/user/profile'
import PrescriptionPDF from '../PrescriptionPDF'

// ----------------------------------------------------------------------

export default function UserCards() {
  const STATUS_OPTIONS = ['All Patients', 'Recently Visited', 'Recently Added'];
  const TAB_VALUE = ['profile', 'appointments', 'plans', 'notes', 'prescription', 'payments', 'files'];

  
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const { tab, id } = useParams();
  const dispatch = useDispatch();
  // const { patients } = useUsers();
  const { user } = useUsers();
  const [value, setValue] = useState(TAB_VALUE.indexOf(tab));
  const [selectedPatientId, setSelectedPatientId] = useState(id);
  const [plans, setPlans] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescription, setPrescription] = useState({})
  const [appointments, setAppointments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [isPrintOpen, setPrintOpen] = useState(false);
  const [isOpen, setDialogState] = useState(false);
  const [url , setRedirectURL] = useState('labs')
  const { currentTab: filterLabName, onChangeTab: onChangeFilterStatus } = useTabs('all');
  
  useEffect(() => {
    if(!id){
      dispatch(getPatientDetails())
    }
    dispatch(getAllInventory());
    dispatch(getMedicalCertificate())
  },[dispatch])

  useEffect(() => {
    if(id){
      dispatch(getPatientDetails(id))
    }
  }, [id])

  const { prescriptions: rawPrescriptions, files, medicalCertificate, clinicalNotes, treatmentPlans, calendarEvents, patients } = useSelector((state) => state.patient);

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
  },[treatmentPlans, patients]) 

  useEffect(() => {
    // const plan = treatmentPlan.map((plan, i) => {id: i, procedure: plan, })
    const items = []
    rawPrescriptions?.forEach((item, i) => {
      const patient = patients.find(patient => Number(patient.id) === Number(item.patientId))
      const doctor = user.find(user => user.isStaff && Number(user.id) === Number(item.orderedBy))
      console.log(patient , doctor)
      const itemObj = {
        id: item.id,
        drugs: JSON.parse(item?.cart),
        patient,
        doctor 
      }
      items.push(itemObj)
    });
    console.log(items)
    setPrescriptions(items)
  },[rawPrescriptions, patients])

  useEffect(() => {
    const items = []

    calendarEvents?.filter(events => events.eventType === 'appointment').forEach((item, i) => {
      const patient = patients.find(patient => Number(patient.id) === Number(item.patientId))
      const doctor = user.find(user => user.isStaff && Number(user.id) === Number(item.doctor))
      item = {...item, tags: item.tags.split(',')}
      const itemObj = {
        id: item.id,
        patient,
        doctor,
        appointments: item,
        description: item.description,
        procedure: item.tags,
        time: {
          // date: sub(new Date(), { days: 3, hours: 5 }),
          startTime: item.start,
          endTime: item.end
        } 
      }
      items.push(itemObj)
    });
    console.log(items)
    setAppointments(items)
  },[calendarEvents, patients])

  useEffect(() => {
    const items = []
    clinicalNotes?.forEach((item, i) => {
      const patient = patients.find(patient => Number(patient.id) === Number(item.patientId))
      const doctor = user.find(user => user.isStaff && Number(user.id) === Number(item.orderedBy))
      const itemObj = {
        id: item.id,
        patient,
        doctor,
        notes: JSON.parse(item.notes)
      }
      items.push(itemObj)
    });
    console.log(items)
    setNotes(items)
  },[clinicalNotes, patients])

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    if(id){
      navigate(PATH_DASHBOARD.patient.selected( TAB_VALUE[newValue], selectedPatientId));
      // navigate(PATH_DASHBOARD.patient.tab(TAB_VALUE[newValue]));
    }else{
      navigate(PATH_DASHBOARD.patient.tab(TAB_VALUE[newValue]));
    }
    console.log(event, newValue, event.target.value)
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

  const handleClose = () => {
    setDialogState(false)
  }

  const selectedPatient = (selected) => {
    navigate(PATH_DASHBOARD.patient.selected( TAB_VALUE[value], selected.id));
    setSelectedPatientId(selected.id)
    console.log(selected)
  };

  const onPrint = (id) => {
    setPrintOpen(true)
    setPrescription(prescriptions.filter(prescription => prescription.id === id)?.[0])
    console.log('onPrint')
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
            display: 'block', width: '50%' , m: '24px auto'
          }}
        >
          <PatientSearch selectedPatient={selectedPatient}/>
          {/* <InputStyle
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
          /> */}
        </Box>
        <Box
          sx={{
            display: 'flex', justifyContent: 'center', mb: 3
          }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example" variant="scrollable"  scrollButtons="auto">
            <Tab icon={<Iconify icon={'eva:people-outline'} width={20} height={20} />} label="Profile" />
            <Tab icon={<Iconify icon={'eva:calendar-outline'} width={20} height={20} />} label="Appointments" />
            <Tab icon={<Iconify icon={'eva:book-outline'} width={20} height={20} />} label="Treatment Plans" />
            <Tab icon={<Iconify icon={'eva:edit-2-outline'} width={20} height={20} />} label="Clinical Notes" />
            <Tab icon={<Iconify icon={'eva:clipboard-outline'} width={20} height={20} />} label="Prescription" />
            <Tab icon={<Iconify icon={'eva:credit-card-outline'} width={20} height={20} />} label="Payments" />
            <Tab icon={<Iconify icon={'eva:file-text-outline'} width={20} height={20} />} label="Files" />
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
              onClick={() => handleAddNew('notes')}
            >
              Add Notes
            </Button>
          </Stack>
            
          <AppointmentDetailsList notes={notes}/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse'}}
          >
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={() => handleAddNew('prescription')}
            >
              Add Prescription
            </Button>
          </Stack>
            
          <AppointmentDetailsList prescriptions={prescriptions} onPrint={onPrint}/>
        </TabPanel>
        <TabPanel value={value} index={5}>
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
        <TabPanel value={value} index={6}>
        <Stack
            direction="row"
            sx={{flexDirection: 'row-reverse', mx: 3, mb:1}}
          >
            <Button
              variant="contained"
              sx={{mx: 1}}
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={() => handleAddNew('mlc')}
              // component={RouterLink} to={PATH_DASHBOARD.patient.mlcfiles}
            >
              Add Notes
            </Button>
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={() => handleAddNew('files')}
              // component={RouterLink} to={PATH_DASHBOARD.patient.newfiles}
            >
              Add Files
            </Button>
          </Stack>
          <FilesDetails files={files} medicalCertificate={medicalCertificate}/>
        </TabPanel>
      </Container>
      <DialogAnimate fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
        <IconButton
            size="small"
            onClick={() => handleClose()}
            sx={{
                top: 6,
                p: '2px',
                right: 6,
                position: 'absolute',
                color: 'common.white',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                },
            }}
            >
            <Iconify icon={'eva:close-fill'} />
        </IconButton>
        <PatientsDialog patients={patients} url={url}/>
      </DialogAnimate>
      <Dialog fullScreen open={isPrintOpen}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <PrescriptionPDF prescription={prescription} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
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