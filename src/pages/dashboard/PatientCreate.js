import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// react
import { useEffect, useState } from 'react';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
// hooks
import useUsers from '../../hooks/useUsers';
import useSettings from '../../hooks/useSettings';
import { getCurrentPatientsDetails, getPatientsDetails } from '../../redux/slices/patient';
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
  const dispatch = useDispatch();
  const { patients } = useSelector((state) => state.patient);
  const [newPatientId, setNewPatientId] = useState('');

  const { pathname } = useLocation();

  const { name } = useParams();

  const currentPatient = patients?.find(patient => patient?.id === Number(name));

  useEffect(() => {
    dispatch(getPatientsDetails())
    // dispatch(getCurrentPatientsDetails(Number(name)));
  },[dispatch])

  // const currentPatient = _patients?.find(patient => patient?.id === Number(name));
  
  const isEdit = pathname.includes('edit');

  useEffect(() => {
    if(patients.length){
      console.log(patients[patients?.length - 1]?.patientId)
      setNewPatientId(Number(patients[patients?.length - 1].patientId) + 1)
    }
  },[patients])

  return (
    <Page title="User: Create a new patient">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new patient' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Patient', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'New user' : '' },
          ]}
        />

        <PatientNewEditForm isEdit={isEdit} currentPatient={currentPatient} newPatientId={newPatientId}/>
      </Container>
    </Page>
  );
}
