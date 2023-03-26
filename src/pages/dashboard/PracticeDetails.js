import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import PracticeNewEditForm from '../../sections/@dashboard/user/PracticeNewEditForm';
//
import { useDispatch, useSelector } from '../../redux/store';
import { getPracticeDetails } from '../../redux/slices/setting';

// ----------------------------------------------------------------------

export default function PracticeDetails() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPracticeDetails());
  },[dispatch])

  const { practiceDetails } = useSelector((state) => state.setting);

  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = true;

  return (
    <Page title="Practice Details">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Practice Details' : 'Practice Details'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Practice Details', href: PATH_DASHBOARD.user.list },
          ]}
        />

        <PracticeNewEditForm isEdit={isEdit} currentUser={practiceDetails[0]} />
      </Container>
    </Page>
  );
}
