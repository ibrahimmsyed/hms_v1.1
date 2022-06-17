import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
// Service
import UserApiService from '../../../../services/User'
// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const userApiService = new UserApiService();
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let message;
    let classType;
    const response = await userApiService.changePassword(data)
    if(response?.status === 204){
        message = 'Update success!';
        classType = 'success';
    }else{
        message = response.detail ? response.detail : Object.entries(response).join(' ').replace(/[_,]/g, " ").toUpperCase();
        classType = 'error';
    }
    reset();
    enqueueSnackbar(message,{
      variant: classType,
    });
   /* try {
      const message = userApiService.changePassword(data)
      await new Promise((resolve) => {
        message = userApiService.changePassword(data)
      });
      reset();
      enqueueSnackbar(message);
    } catch (error) {
      console.error(error);
    } */
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Old Password" />

          <RHFTextField name="newPassword" type="password" label="New Password" />

          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
