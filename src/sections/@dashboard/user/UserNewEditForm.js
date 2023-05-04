import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
//
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
import { useDispatch, useSelector } from '../../../redux/store';
import { addUser, updateUser } from '../../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from '../../../components/hook-form';

import UserApiService from '../../../services/User'
import useUsers from '../../../hooks/useUsers';
// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function UserNewEditForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userApiService = new UserApiService();
  const { setUserDetails } = useUsers();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    firstName: Yup.string().required('firstName is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    lastName: Yup.string().required('lastName is required'),
    registrationNumber: Yup.string().required('registrationNumber is required'),
    calendarColor: Yup.string().required('calendarColor is required'),
    userRole: Yup.string().required('userRole is required'),
    displayPicture: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const EditUserSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    firstName: Yup.string().required('firstName is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    lastName: Yup.string().required('lastName is required'),
    registrationNumber: Yup.string().required('registrationNumber is required'),
    calendarColor: Yup.string().required('calendarColor is required'),
    userRole: Yup.string().required('userRole is required'),
    displayPicture: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });

  const userRole = [
    {id: 1,code: 'is_staff', name:'Doctor'},
    {id: 2,code: 'is_front_office', name:'Front Office'},
    {id: 3,code: 'is_back_office', name:'Back Office'},
  ]

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

  const savedUserRole = (code) => {
    let roleOfUser = '';
    if (isEdit && currentUser) {
      Object.entries(currentUser).forEach(
        ([key, value]) => {
          ['is_back_office','is_front_office','is_staff'].forEach(role=>{
            if(key === role && value){
              roleOfUser = key
            }
          })
      });
    }
    console.log(roleOfUser)
    return roleOfUser
    
  }

  const defaultValues = useMemo(
    () => ({
      username: currentUser?.username || '',
      firstName: currentUser?.first_name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phone_number || '',
      lastName: currentUser?.last_name || '',
      registrationNumber: currentUser?.registration_number || '',
      calendarColor: currentUser?.calendar_color || '',
      displayPicture: currentUser?.display_picture || '',
      isActive: currentUser?.is_active || true,
      userRole: savedUserRole(currentUser?.userRole) || '',
      isSuperuser: currentUser?.is_superuser || false,
      newPassword: '',
      confirmNewPassword: '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );

  const methods = useForm({
    resolver: yupResolver(!isEdit ? NewUserSchema : EditUserSchema),
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
      data = await handleUserRole(data)
      if (data){
        if(isEdit){
          if(data.displayPicture === currentUser.display_picture){
            delete data.displayPicture;
          }
          dispatch(updateUser(data, currentUser.id))  
        }else{
          dispatch(addUser(data))  
        }
        enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
        navigate(PATH_DASHBOARD.settings.practicestaff);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserRole = (data) => {
    data.isFrontOffice = false;
    data.isBackOffice = false;
    data.isStaff = false;
    switch(data.userRole){
      case 'isFrontOffice':
        data.isFrontOffice = true;
        break;
      case 'isBackOffice':
        data.isBackOffice = true;
        break;
      default:
        data.isStaff = true;
        break;
    }
    return data
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'displayPicture',
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
                color={!currentUser?.is_active ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {currentUser?.is_active ? 'Active':'Not Active'}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="displayPicture"
                accept="image/*"
                maxSize={3145728}
                file={values.displayPicture}
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
              <RHFTextField name="email" label="Email Address" disabled={isEdit}/>
              <RHFTextField name="username" label="User Name" disabled={isEdit}/>
              
              <RHFTextField name="firstName" label="First Name"/>
              <RHFTextField name="lastName" label="Last Name"/>
              
              <RHFTextField name="phoneNumber" label="Phone Number"/>
              <RHFTextField name="registrationNumber" label="Registration Number"/>

              <RHFSelect name="calendarColor" label="Calendar Color" placeholder="Calendar Color">
                <option value="" />
                {colorCode.map((option) => (
                  <option style={{background: option.code, color: '#FFF'}} key={option.id} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              <RHFSelect name="userRole" label="User Role" placeholder="User Role">
                <option value="" />
                {userRole.map((option) => (
                  <option key={option.id} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </RHFSelect>

              {!isEdit && (
              <RHFTextField name="newPassword" type="password" label="New Password" />
              )}
              {!isEdit && (
              <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />
              )}

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
                name="isSuperuser"
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
