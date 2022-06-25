import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useState, SyntheticEvent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Container, Tab, Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions, Chip, Autocomplete, Typography } from '@mui/material';
import { LoadingButton, MobileDateTimePicker, TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/material/styles';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSelect, RHFRadioGroup, RHFCheckbox } from '../../../components/hook-form';
import { PatientSearch } from '../user/profile'
import { countries } from '../../../_mock';
import { PATH_DASHBOARD } from '../../../routes/paths';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date(),
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

AppointmentForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function AppointmentForm({ event, range, onCancel }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const isCreating = Object.keys(event).length === 0;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
  });

  const methods = useForm({
    resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event, range),
  });
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const DURATION = ['All Day', 'Custom'];

  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const newEvent = {
        title: data.title,
        description: data.description,
        textColor: data.textColor,
        allDay: data.allDay,
        start: data.start,
        end: data.end,
      };
      if (event.id) {
        dispatch(updateEvent(event.id, newEvent));
        enqueueSnackbar('Update success!');
      } else {
        enqueueSnackbar('Create success!');
        dispatch(createEvent(newEvent));
      }
      onCancel();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!event.id) return;
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete success!');
    } catch (error) {
      console.error(error);
    }
  };

  const values = watch();

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  const TAGS_OPTION = [
    'Toy Story 3',
    'Logan',
    'Full Metal Jacket',
    'Dangal',
    'The Sting',
    '2001: A Space Odyssey',
    "Singin' in the Rain",
    'Toy Story',
    'Bicycle Thieves',
    'The Kid',
    'Inglourious Basterds',
    'Snatch',
    '3 Idiots',
  ];
  const TIME_OPTION = [
    { code: '20', label: '20 minutes' },
    { code: '30', label: '30 minutes' },
    { code: '45', label: '45 minutes' },
    { code: '1', label: '1 hour' },
    { code: '1.30', label: '1 hour 30 minutes' },
  ];
  const DOC_OPTIONS = [
    { code: '1', label: 'Dr. L.P. Mohan' },
    { code: '2', label: 'Dr. Dinesh Babu' },
    { code: '3', label: 'Dr. Suresh' },
    { code: '4', label: 'Dr. Sreenivasan' },
    { code: '5', label: 'Dr. Keerthana' },
    { code: '6', label: 'Dr. Aarthi' },
  ]

  return (
    <Container>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Appointment" value="1" />
              <Tab label="Reminder" value="2" />
              <Tab label="Block calendar" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
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
                  <PatientSearch />

                  <RHFTextField name="mnumber" label="Mobile Number" />

                  <RHFSelect name="doctor" label="Doctor" placeholder="Doctor">
                    <option value="" />
                    {DOC_OPTIONS.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
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
                  <RHFTextField name="id" label="Patient Id" disabled />
                  <RHFTextField name="email" label="Email Id"/>
                  <RHFSelect name="category" label="Category" placeholder="Category">
                    <option value="" />
                    {TIME_OPTION.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </RHFSelect>
                  <Controller
                    name="tags"
                    control={control}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        multiple
                        freeSolo
                        onChange={(event, newValue) => field.onChange(newValue)}
                        options={TAGS_OPTION.map((option) => option)}
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
          </TabPanel>
          <TabPanel value="2">  
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
                  <RHFTextField name="rtitle" label="Reminder Title" />
                  <div>
                    <LabelStyle>Duration</LabelStyle>
                    <RHFRadioGroup
                      name="gender"
                      options={DURATION}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </div>
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
                </Stack>
                <Stack spacing={3} sx={{ p: 1 }}>
                  <RHFSelect name="doctor" label="Doctor" placeholder="Doctor">
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
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
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                  Cancel
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Add
                </LoadingButton>
              </DialogActions>
            </FormProvider>
            </TabPanel>
          <TabPanel value="3">
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
                  <RHFTextField name="leave" label="Leave Details" />
                  <div>
                    <LabelStyle>Duration</LabelStyle>
                    <RHFRadioGroup
                      name="gender"
                      options={DURATION}
                      sx={{
                        '& .MuiFormControlLabel-root': { mr: 4 },
                      }}
                    />
                  </div>
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
                  {/* <LabelStyle>Select the block type.</LabelStyle>
                  <RHFCheckbox name="video" label="Block Video Appointments" sx={{ mt: 3 }} />
                  <RHFCheckbox name="inclinic" label="Block In-Clinic Appointments" sx={{ mt: 3 }} /> */}
                </Stack>
                <Stack spacing={3} sx={{ p: 1 }}>
                  <RHFSelect name="doctor" label="Doctor" placeholder="Doctor">
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
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
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                  Cancel
                </Button>

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Add
                </LoadingButton>
              </DialogActions>
            </FormProvider>
          </TabPanel>
        </TabContext>
      </Box>
      
    </Container>
  );
}
