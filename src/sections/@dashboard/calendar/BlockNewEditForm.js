import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useState, SyntheticEvent, useMemo, useEffect } from 'react';
import { isBefore } from 'date-fns';
import moment from 'moment'
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
import { addCalendarEvents } from '../../../redux/slices/calendar';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

const COLOR_OPTIONS = [
  '#00AB55'
];
const DURATION = ['All Day', 'Custom'];
// ----------------------------------------------------------------------

BlockNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function BlockNewEditForm({ isEdit, staff, currentAppointment, range, selectedTab, onCancel, handleDelete }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const { treatmentPlan: procedure } = useSelector((state) => state.patient);

  const [patient, setSelectedPatient] = useState({});

  const [isPatientFieldDirty, setIsPatientFieldDirty] = useState(false)

  const defaultValues = useMemo(
    () => ({
      leaveDetails: currentAppointment?.leaveDetails || '',
      doctor: currentAppointment?.doctor || '',
      start: currentAppointment?.start ? new Date(currentAppointment?.start) : new Date(range?.start),
      end: currentAppointment?.end ? new Date(currentAppointment?.end) : new Date(range?.end),
      textColor: currentAppointment?.textColor ||  '#F4364C',
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
      data.eventType = selectedTab
      dispatch(addCalendarEvents(data))
      /* if (event.id) {
        enqueueSnackbar('Update success!');
      } else {
        enqueueSnackbar('Create success!');
      } */
      // onCancel();
      // reset();
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  const isCreating = !(currentAppointment && Object.keys(currentAppointment).length === 0);

  useEffect(() => {
    if (isEdit && currentAppointment) {
      reset(defaultValues);
    }
    if (!isEdit && staff.length) {
      // reset(defaultValues);
      resetStaff(staff)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentAppointment, staff]);

  const resetStaff = (staff) => {
    let resetDefaultValues = {...defaultValues};
    resetDefaultValues = {
      ...resetDefaultValues,
      doctor : `${staff[0]?.id}`,
    }
    reset({ ...resetDefaultValues });
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
                  <RHFTextField name="leaveDetails" label="Leave Details" />
                  
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
                  <RHFSelect name="doctor" label="Doctor" placeholder="Doctor">
                    {staff.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.firstName} {option.lastName}
                      </option>
                    ))}
                  </RHFSelect>
                </Stack>     
              </Box>
              
              <DialogActions>
                {!isCreating && (
                  <Tooltip title="Delete Event">
                    <IconButton onClick={handleDelete}>
                      <Iconify icon="eva:trash-2-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {!isCreating && (
                  <Tooltip title="No Show">
                    <IconButton>
                      <Iconify icon="eva:person-delete-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                {!isCreating && (
                  <Tooltip title="Collect Payment">
                    <IconButton variant="subtitle2" component={RouterLink} to={PATH_DASHBOARD.invoice.new}>
                      <Iconify icon="eva:credit-card-outline" width={20} height={20} />
                    </IconButton>
                  </Tooltip>
                )}
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                  Cancel
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isCreating ? 'Update' : 'Add'}
                </LoadingButton>
              </DialogActions>
    </FormProvider>
  );
}
