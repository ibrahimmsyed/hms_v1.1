import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useState, SyntheticEvent, useMemo, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Container, Tab, Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions, Chip, Autocomplete, Typography } from '@mui/material';
import { LoadingButton, DatePicker, MobileDateTimePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSelect, RHFRadioGroup, RHFCheckbox } from '../../../components/hook-form';
import { PatientSearch } from '../user/profile'
import { countries } from '../../../_mock';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useUsers from '../../../hooks/useUsers';
import AppointmentNewEditForm from './AppointmentNewEditForm';
import ReminderNewEditForm from './ReminderNewEditForm';
import BlockNewEditForm from './BlockNewEditForm'

AppointmentForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function AppointmentForm({ isEdit, currentAppointment, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { user: staffList } = useUsers();

  const { procedure } = useSelector((state) => state.patient);
  const [staff, setStaff] = useState([])
  const [isPatientFieldDirty, setIsPatientFieldDirty] = useState(false)
  
  const [value, setTabValue] = useState('appointment');

  useEffect(() => {
    console.log(procedure)
  }, [procedure])

  useEffect(() => {
    const staff =  staffList.filter(user => user.isStaff)
    if(staff.length){
      setStaff(staff)
    }
  },[staffList])

  /* useEffect(() => {
    const clonedEvents = {...currentAppointment}
    if(isEdit){
      if(clonedEvents.tags){
        clonedEvents.tags = clonedEvents.tags.split(",")
      }
      setTabValue(clonedEvents.eventType)
    }
    setCurrentAppointment(clonedEvents)
  },[currentAppointment]) */

  

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    /* if(isDirty || isPatientFieldDirty){
      if(window.confirm("This will refresh the form selections, you want to continue?")){
        reset(defaultValues)
        resetStaff(staff)
        setTabValue(newValue);
      }else{
        return null;
      }
    } */
    setTabValue(newValue);
  };

  const DURATION = ['All Day', 'Custom'];

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

  const handleDelete = async () => {
    
  };

  const renderForm = () => {
    switch(currentAppointment.eventType) {
      case "reminder": return <ReminderNewEditForm isEdit={isEdit} staff={staff} currentAppointment={currentAppointment} range={range} selectedTab={value} onCancel={onCancel}/>;
      case "block": return <BlockNewEditForm isEdit={isEdit} staff={staff} range={range} currentAppointment={currentAppointment} selectedTab={value} onCancel={onCancel}/>;
      default: return <AppointmentNewEditForm isEdit={isEdit} staff={staff} currentAppointment={currentAppointment} range={range} selectedTab={value} onCancel={onCancel}/>;
    }
  }

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      {!isEdit && <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Appointment" value="appointment" />
              <Tab label="Reminder" value="reminder" />
              <Tab label="Block calendar" value="block" />
            </TabList>
          </Box>
          <TabPanel value="appointment">
            <AppointmentNewEditForm isEdit={isEdit} staff={staff} currentAppointment={currentAppointment} range={range} selectedTab={value} onCancel={onCancel}/>
          </TabPanel>
            <TabPanel value="reminder">  
              <ReminderNewEditForm isEdit={isEdit} staff={staff} currentAppointment={currentAppointment} range={range} selectedTab={value} onCancel={onCancel}/>
            </TabPanel>
          <TabPanel value="block">
            <BlockNewEditForm isEdit={isEdit} staff={staff} range={range} currentAppointment={currentAppointment} selectedTab={value} onCancel={onCancel}/>
          </TabPanel>
      </TabContext> }
      {isEdit && currentAppointment && renderForm()}
      </Box>
      
    </Container>
  );
}
