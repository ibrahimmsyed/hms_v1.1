import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState, SyntheticEvent, useMemo, useEffect } from 'react';
import { isBefore } from 'date-fns';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton, DatePicker, MobileDateTimePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, IconButton, Button, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment, DialogActions, Tooltip } from '@mui/material';
//
import { useDispatch, useSelector } from '../../../redux/store';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import { ColorSinglePicker } from '../../../components/color-utils';
// components
import Iconify from '../../../components/Iconify';
import { DialogAnimate } from '../../../components/animate';
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
} from '../../../components/hook-form';
import { PatientSearch } from '../user/profile'
import { addCalendarEvents, updateCalendarEvents, deleteCalendarEvents } from '../../../redux/slices/calendar';
// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

let COLOR_OPTIONS = [
  '#00AB55'
];

// ----------------------------------------------------------------------

AppointmentNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function AppointmentNewEditForm({ isEdit, staff, currentAppointment, range, selectedTab, onCancel }) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const { procedure } = useSelector((state) => state.patient);

  const [patient, setSelectedPatient] = useState({});

  const [isPatientFieldDirty, setIsPatientFieldDirty] = useState(false)

  const [open, setOpen] = useState(false);

  const handleClose = (value: string) => {
    setOpen(false);
  };

  useEffect(() => {
    if (isEdit && currentAppointment) {
      COLOR_OPTIONS = [currentAppointment?.textColor]
      reset(currentAppointment);
    }
    if (!isEdit && staff.length) {
      // reset(defaultValues);
      resetStaff(staff)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentAppointment, staff]);

  const defaultValues = useMemo(
    () => ({
      patientName: currentAppointment?.patientName || '',
      patientId: currentAppointment?.patientId || '',
      email: currentAppointment?.email || '',
      mobileNo: currentAppointment?.mobileNo || '',
      doctor: currentAppointment?.doctor || '',
      description: currentAppointment?.description || '',
      tags: currentAppointment?.tags || [],
      start: currentAppointment?.start ? new Date(currentAppointment?.start) : range?.start,
      end: currentAppointment?.end ? new Date(currentAppointment.end) : range?.end,
      textColor: currentAppointment?.textColor || '#EFEFEF',
     }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentAppointment]
  );

  const EventSchema = Yup.object().shape({
    // title: Yup.string().max(255).required('Title is required'),
    // description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    getValues,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = methods;

  const onSubmit = async (data) => {
    try {
      data.tags = data.tags.toString()
      data.eventType = selectedTab
      if (isEdit) {
        dispatch(updateCalendarEvents(data, currentAppointment.id))
        enqueueSnackbar('Update success!');
      } else {
        dispatch(addCalendarEvents(data))
        enqueueSnackbar('Create success!');
      }
      // onCancel();
      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRow = () => {
    onCancel();
    dispatch(deleteCalendarEvents(currentAppointment.id))
    enqueueSnackbar('Delete success!');
    setOpen(false);
  };

  const handleDelete = async () => { 
    setOpen(true);
  };

  const selectedPatient = (selected) => {
    setSelectedPatient(selected)
    setIsPatientFieldDirty(true)
    const doctorValue = getValues("doctor");
    const colorValue = getValues("textColor");
    let resetDefaultValues = {...defaultValues};
    resetDefaultValues = {
      ...resetDefaultValues,
      textColor: colorValue,
      doctor: doctorValue,
      patientName : selected.patientName,
      patientId : selected.id,
      email : selected.email,
      mobileNo : selected.primaryMobNo
    }
    reset({ ...resetDefaultValues });
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  const isCreating = !(currentAppointment && Object.keys(currentAppointment).length === 0);

  const watchDoctor = watch("doctor");
  
  useEffect(() => {
    const selectedStaff =  staff.find(user => user.id === Number(watchDoctor))
    setValue('textColor', selectedStaff?.calendarColor)
    COLOR_OPTIONS = [selectedStaff?.calendarColor]
  },[watchDoctor])

  const resetStaff = (staff) => {
    let resetDefaultValues = {...defaultValues};
    resetDefaultValues = {
      ...resetDefaultValues,
      doctor : `${staff[0]?.id}`,
    }
    reset({ ...resetDefaultValues });
  }

  const handleNoShow = () => {
    currentAppointment.tags = currentAppointment.tags.toString()
    currentAppointment.status = 'No Show'
    dispatch(updateCalendarEvents(currentAppointment, currentAppointment.id))
  } 

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              > 
                <Stack spacing={3} sx={{ p: 1 }}>
                  {!isEdit && <PatientSearch selectedPatient={selectedPatient}/>}
                  {isEdit && <RHFTextField name="patientName" label="Patient Name" disabled />}
                  <RHFTextField name="mobileNo" label="Mobile Number" disabled/>
                  <Box
                    sx={{
                      display: 'flex',
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                  >
                    <RHFSelect name="doctor" label="Doctor" placeholder="Doctor">
                      {staff.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </RHFSelect>

                    <Controller
                      name="textColor"
                      control={control}
                      render={({ field }) => (
                        <ColorSinglePicker value={field.value} onChange={field.onChange} colors={COLOR_OPTIONS} />
                      )}
                    />
                  </Box>
                  

                  <Controller
                    name="start"
                    control={control}
                    render={({ field }) => (
                      <MobileDateTimePicker
                        {...field}
                        label="Start date"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    )}
                  />

                  <Controller
                    name="end"
                    control={control}
                    render={({ field }) => (
                      <MobileDateTimePicker
                        {...field}
                        label="End date"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            error={!!isDateError}
                            helperText={isDateError && 'End date must be later than start date'}
                          />
                        )}
                      />
                    )}
                  />
                </Stack>
                <Stack spacing={3} sx={{ p: 1 }}>
                  <RHFTextField name="patientId" label="Patient Id" disabled />
                  <RHFTextField name="email" label="Email Id" disabled/>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        freeSolo
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={procedure.map((option) => option.procedureName)}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                          ))
                        }
                        renderInput={(params) => <TextField label="Tags" {...params} />}
                      />
                    )}
                  />

                  <RHFTextField name="description" label="Description" multiline rows={4} />
                </Stack>     
              </Box>
              
              <DialogActions>
                {isEdit && (
                  <Tooltip title="Delete Event">
                    <IconButton onClick={handleDelete}>
                      <Iconify icon="eva:trash-2-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {isEdit && (
                  <Tooltip title="No Show">
                    <IconButton onClick={handleNoShow}>
                      <Iconify icon="eva:person-delete-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {isEdit && (
                  <Tooltip title="Collect Payment">
                    <IconButton variant="subtitle2" component={RouterLink} to={PATH_DASHBOARD.invoice.new(currentAppointment.id)}>
                      <Iconify icon="eva:credit-card-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                  Cancel
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {isEdit ? 'Update' : 'Add'}
                </LoadingButton>
              </DialogActions>
              <DialogAnimate maxWidth={false}  open={open} onClose={handleClose} sx={{maxWidth: 860}}>
                <DialogActions sx={{ py: 2, px: 3 }}>
                  <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                    You are deleting the event. Once deleted you can't retrieve.
                    Please confirm.
                  </Typography>
                  <Button onClick={handleDeleteRow} variant="contained">Confirm</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>          
              </DialogAnimate>
    </FormProvider>
  );
}
