// @mui
import { Container } from '@mui/material';
// routes
import { Link as RouterLink, useParams } from 'react-router-dom';
import {useState, SyntheticEvent, ReactNode, useEffect} from 'react';
import { PATH_DASHBOARD } from '../../routes/paths';

// hooks
import useSettings from '../../hooks/useSettings';
import useUsers from '../../hooks/useUsers';
import { useDispatch, useSelector } from '../../redux/store';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { getCalendarEvents } from '../../redux/slices/calendar';
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';


// ----------------------------------------------------------------------

export default function InvoiceCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [currentPatient, setCurrentPatient] = useState({});
  // const [loadingSend, setLoadingSend] = useState({});

  const { id = '' } = useParams();
  const { calendarEvents } = useSelector((state) => state.calendar);
  const appointment = calendarEvents.find((event) => Number(event.id) === Number(id));
  const { patients } = useUsers();
  
  
  useEffect(() => {
    dispatch(getCalendarEvents());
  },[dispatch])

  useEffect(() => {
    if(patients && appointment){
      const patient = patients.find((user) => Number(user.patientId) === Number(appointment.patientId));
      setCurrentPatient(patient);
    }
  },[patients, appointment])

  return (
    <Page title="Invoices: Create a new invoice">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Create a new invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: 'New invoice' },
          ]}
        />

        <InvoiceNewEditForm appointment={appointment} currentPatient={currentPatient}/>
      </Container>
    </Page>
  );
}
