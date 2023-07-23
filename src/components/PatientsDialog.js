import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Button, Box, Chip, Grid, Stack, Tabs, Typography, Autocomplete, InputAdornment, Divider, Tab, IconButton } from '@mui/material';
// components
import { PatientCard } from '../sections/@dashboard/user/cards';
import useTabs from '../hooks/useTabs';
import Iconify from './Iconify';
import InputStyle from './InputStyle';

// ----------------------------------------------------------------------

const RADIO_OPTION = ['Yes', 'No'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

PatientsDialog.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function PatientsDialog({patients, url}) {
const STATUS_OPTIONS = ['All Patients', 'Recently Visited', 'Recently Added'];
const { currentTab: filterPatientName, onChangeTab: onChangeFilterStatus } = useTabs('All Patients');
const [clonedPatients, setClonedPatients] = useState(patients)
const findPatients = (searchTxt) => {
    if(searchTxt){
        const searchedPatients = clonedPatients.filter(patient => patient.patientName.toLowerCase().includes(searchTxt.toLowerCase()))
        setClonedPatients(searchedPatients)
    }else {
        setClonedPatients(patients)
    }
}

useEffect(() => {
    switch(filterPatientName){
        case 'Recently Added':
            sortBy('recent');
            break;
        case 'Recently Visited':
            sortBy('visited')
            break;
        default:
            setClonedPatients(patients);
            break;
    }
    console.log(filterPatientName)
}, [filterPatientName])

const sortBy = (type) => {
    console.log(type);
}

const onClose = () => {

}
return (
    <>
        <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterPatientName}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
        </Tabs>
        <InputStyle
          stretchStart={240}
          onChange={(event) => findPatients(event.target.value)}
          placeholder="Find patients..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{ m: 2 }}
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
          {clonedPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} url={url} isSearch/>
          ))}
        </Box>
    </>
  );
}
