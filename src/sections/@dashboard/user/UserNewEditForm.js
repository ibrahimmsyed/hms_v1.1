import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

import UserApiService from '../../../services/User'
// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const userApiService = new UserApiService();

  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    userName: Yup.string().required('userName is required'),
    firstName: Yup.string().required('firstName is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    lastName: Yup.string().required('lastName is required'),
    registrationNumber: Yup.string().required('registrationNumber is required'),
    calendarColor: Yup.string().required('calendarColor is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const colorCode = [
    {id: 1,code: '#f44336', name:'RED'},
    {id: 2,code: '#e91e63', name:'PINK'},
    {id: 3,code: '#9c27b0', name:'PURPLE'},
    {id: 4,code: '#673ab7', name:'indigo'},
    {id: 5,code: '#2196f3', name:'blue'},
    {id: 6,code: '#03a9f4', name:'lightBlue'},
    {id: 7,code: '#00bcd4', name:'cyan'},
    {id: 8,code: '#009688', name:'teal'},
    {id: 9,code: '#4caf50', name:'green'},
    {id: 10,code: '#8bc34a', name:'lightGreen'},
    {id: 11,code: '#cddc39', name:'lime'},
    {id: 12,code: '#ffeb3b', name:'yellow'},
    {id: 13,code: '#ffc107', name:'amber'},
    {id: 14,code: '#ff9800', name:'orange'},
    {id: 15,code: '#ff5722', name:'deepOrange'},
    {id: 16,code: '#795548', name:'brown'},
    {id: 17,code: '#9e9e9e', name:'grey'},
    {id: 18,code: '#607d8b', name:'blueGrey'}
  ]

  const defaultValues = useMemo(
    () => ({
      userName: currentUser?.userName || '',
      firstName: currentUser?.firstName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      lastName: currentUser?.lastName || '',
      registrationNumber: currentUser?.registrationNumber || '',
      calendarColor: currentUser?.calendarColor || '',
      avatarUrl: currentUser?.avatarUrl || '',
      isActive: currentUser?.isActive || true,
      isStaff: currentUser?.isStaff || true,
      isAdmin: currentUser?.isAdmin || false,
      newPassword: '',
      confirmNewPassword: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await userApiService.createUser(data)
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // reset();
      // enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      // navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {isEdit && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) => field.onChange(event.target.checked ? 'banned' : 'active')}
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Banned
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="firstName" label="First Name"/>
              <RHFTextField name="lastName" label="Last Name"/>
              <RHFTextField name="email" label="Email Address"/>

              <RHFTextField name="phoneNumber" label="Phone Number"/>
              <RHFTextField name="userName" label="User Name"/>
              <RHFTextField name="registrationNumber" label="Registration Number"/>

              <RHFSelect name="calendarColor" label="Calendar Color" placeholder="Calendar Color">
                <option value="" />
                {colorCode.map((option) => (
                  <option style={{background: option.code, color: '#FFF'}} key={option.id} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField name="newPassword" type="password" label="New Password" />
              <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />
              
              <RHFSwitch
                name="isActive"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      User Status
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Disabling this will inactive the user
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="isStaff"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Staff
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Enable if the user is Staff
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
              <RHFSwitch
                name="isAdmin"
                labelPlacement="start"
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      Admin
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Enable if the user is Admin
                    </Typography>
                  </>
                }
                sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
