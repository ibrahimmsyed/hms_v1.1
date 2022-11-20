import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useUsers from '../../hooks/useUsers';
import { useDispatch, useSelector } from '../../redux/store';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
import { getLabDetails } from '../../redux/slices/lab';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import LabsNewEditForm from '../../sections/@dashboard/user/LabsNewEditForm';

// ----------------------------------------------------------------------

export default function LabsCreate() {
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

  const [currentWork, setCurrentWork] = useState({});

  const { patients:_userCards } = useUsers();

  const { labs } = useSelector((state) => state.labs);

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getLabDetails());
  },[dispatch])

  const { name = '', id = '' } = useParams();

  const isEdit = pathname.includes('edit');

  useEffect(() => {
    let currentWork = labs.find((lab) => Number(lab.id) === Number(id));
    if(!isEdit && labs.length){
      currentWork = {}
      currentWork.jobId = `0000${Math.max(...labs.map(o => o.id), 0) + 1}`;
    }
    setCurrentWork(currentWork)
  },[labs])

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

        <LabsNewEditForm isEdit={isEdit} currentPatient={currentPatient} currentWork={currentWork}/>
      </Container>
    </Page>
  );
}
