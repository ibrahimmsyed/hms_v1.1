import PropTypes from 'prop-types';
import * as Yup from 'yup';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { Card, Button, Box, Chip, Grid, Stack, TextField, TextareaAutosize, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// redux
import { addMedicalCertificate } from '../../../redux/slices/patient';
import { useDispatch, useSelector } from '../../../redux/store';
// components
import {
  FormProvider,
  RHFSwitch,
  RHFSelect,
  RHFEditor,
  RHFTextField,
  RHFRadioGroup,
  RHFUploadMultiFile,
  RHFCheckbox
} from '../../../components/hook-form';
import Image from '../../../components/Image';
import { calculateAge, mediaURL } from '../../../utils/utilities';
import useUsers from '../../../hooks/useUsers';
// ----------------------------------------------------------------------

const RADIO_OPTION = ['Valid for absence from court attendance ', 'Invalid for absence from court attendance ', 'Dont mention'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

MLCNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function MLCNewEditForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { patients, user: _userList } = useUsers();
  const { name = '', id = '' } = useParams();
  const currentPatient = patients.find((user) => Number(user.id) === Number(id));
  const [user, setUser] = useState([])
  const [currentMLCDetail, setCurrentMLCDetail] = useState({});

  useEffect(() => {
    const staff =  _userList.filter(user => user.isStaff)
    setValue('issuedBy', staff[0].id)
    setValue('issuedOn', new Date()) 
    setValue('patientId', currentPatient.id)
    setUser(staff)
  },[_userList])

  const NewMLCSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });
  const defaultValues = useMemo(
    () => ({
      issuedOn: new Date(),
      exusedStart: new Date(),
      exusedEnd: new Date(),
      fitStart: new Date(),
      fitEnd: new Date(),
      attendanceStart: new Date(),
      attendanceEnd: new Date()

    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMLCDetail]
  );

  const methods = useForm({
    // resolver: yupResolver(NewMLCSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const watchExused = watch("exused", false);
  const watchFit = watch("fitforlight", false);
  const watchAttendance = watch("attendance", false);

  const onSubmit = async (data) => {
    try {
      data.issuedOn = moment(data.issuedOn).format('YYYY-MM-DD')
      data.exusedStart = moment(data.exusedStart).format('YYYY-MM-DD')
      data.exusedEnd = moment(data.exusedEnd).format('YYYY-MM-DD')
      data.fitStart = moment(data.fitStart).format('YYYY-MM-DD')
      data.fitEnd = moment(data.fitEnd).format('YYYY-MM-DD')
      data.attendanceStart = moment(data.attendanceStart).format('YYYY-MM-DD HH:mm:ss')
      data.attendanceEnd = moment(data.attendanceEnd).format('YYYY-MM-DD HH:mm:ss')
      dispatch(addMedicalCertificate(data))
      console.log('Submit', data);
    } catch (error) {
      console.error(error);
    }
  };
  const onCancel = () => {
    console.log('CLose')
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{justifyContent: 'space-around'}}>
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 3, display: 'grid', rowGap: 3, width: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={1} p={1} sx={{
                  width: '100%'
                }}>
                <Avatar alt={currentPatient.patientName} src={currentPatient.dp} sx={{ mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                  {currentPatient.patientName}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {calculateAge(currentPatient.dob)} Year(s) / {currentPatient.gender}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {currentPatient.id}
                </Typography>
            </Stack>
            <Box 
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="MLNo" label="Medical Leave No" />
              <RHFCheckbox name="exused" label="Excused from duty" />
              {watchExused && 
                <>
                  <Controller
                    name="exusedStart"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="exusedEnd"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label="End Date"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </>
              }
              <RHFCheckbox name="fitforlight" label="Fit for light duty" />
              {watchFit && 
                <>
                  <Controller
                    name="fitStart"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label="Start Date"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                  <Controller
                    name="fitEnd"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <DatePicker
                        label="End Date"
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                        )}
                      />
                    )}
                  />
                </>
              }
              <RHFCheckbox name="attendance" label="Proof of attendance at practice" />
              {watchAttendance && 
                <>
                  <Controller
                    name="attendanceStart"
                    control={control}
                    render={({ field }) => (
                      <MobileDateTimePicker
                        {...field}
                        label="Start Date"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    )}
                  />
                  <Controller
                    name="attendanceEnd"
                    control={control}
                    render={({ field }) => (
                      <MobileDateTimePicker
                        {...field}
                        label="End Date"
                        inputFormat="dd/MM/yyyy hh:mm a"
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    )}
                  />
                </>
              }
              <div>
                <LabelStyle>Notes</LabelStyle>
                <RHFEditor simple name="instruction" />
              </div>
            </Box>
            <Box 
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFSelect name="issuedBy" label="Issued By" placeholder="Issued By">
                {user.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName} {option.lastName}
                  </option>
                ))}
              </RHFSelect>
              <Controller
                name="issuedOn"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Issued On"
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
            </Box>
          <Stack direction="row" spacing={2}>
            <Button fullWidth onClick={onCancel}>
              Cancel
            </Button>

            <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
