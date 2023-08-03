import { useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _invoices } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// redux
import { getPatientsDetails, getInvoice } from '../../redux/slices/patient';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import InvoiceNewEditForm from '../../sections/@dashboard/invoice/new-edit-form';

// ----------------------------------------------------------------------

export default function InvoiceEdit() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();

  const { invoice, patients } = useSelector((state) => state.patient);

  const { id } = useParams();

  const [currentInvoice, setCurrentInvoice] = useState(null);

  const [currentPatient, setCurrentPatient] = useState(null);

  useEffect(() => {
    dispatch(getInvoice());
    if( !patients?.length )
      dispatch(getPatientsDetails());
  },[dispatch])

  useEffect(() => {
    let currInv = invoice?.find((inv) => Number(inv.id) === Number(id))
    if(currInv){
      currInv = {...currInv, items : JSON.parse(currInv.items)}
      setCurrentInvoice(currInv)
    }
  }, [invoice])

  useEffect(() => {
    const currPateint = patients?.find((user) => Number(user.id) === Number(currentInvoice?.patientId))
    if(currPateint){
      setCurrentPatient(currPateint)
    }
  }, [currentInvoice, patients])

  

  return (
    <Page title="Invoices: Edit">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Edit invoice"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.list },
            { name: currentInvoice?.invoiceNumber || '' },
          ]}
        />

        <InvoiceNewEditForm isEdit currentInvoice={currentInvoice} currentPatient={currentPatient}/>
      </Container>
    </Page>
  );
}
