import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Button, Box, Chip, Grid, Stack, TextareaAutosize, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
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
  const navigate = useNavigate();
  const patient = {
    id: 32974,
    name: "Wilson",
    age: "52 Years",
    gender: "Male",
    avatarUrl: ""
  }
  const [currentMLCDetail, setCurrentMLCDetail] = useState({});
  const NewMLCSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });
  const defaultValues = useMemo(
    () => ({
      name: currentMLCDetail?.name || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMLCDetail]
  );

  const methods = useForm({
    resolver: yupResolver(NewMLCSchema),
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

  const onSubmit = async () => {
    try {
      console.error('Submit');
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
                <Avatar alt={patient.name} src={patient.avatarUrl} sx={{ mr: 2 }} />
                <Typography variant="subtitle2" noWrap>
                  {patient.name}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {patient.age} / {patient.gender}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  {patient.id}
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
              <RHFCheckbox name="remember" label="Excused from duty" />
              <RHFCheckbox name="remember" label="Fit for light duty" />
              <RHFCheckbox name="remember" label="Proof of attendance at practice" />
              <div>
                <LabelStyle>Notes</LabelStyle>
                <RHFEditor simple name="instruction" />
              </div>
            </Box>
            <Typography variant="subtitle2" noWrap>
            Issued by Dr.L.P.Mohan on 2 Oct 2022  <Button variant="text">change</Button>
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button fullWidth onClick={onCancel}>
              Cancel
            </Button>

            <Button fullWidth variant="contained" onClick={onCancel}>
              Save
            </Button>
          </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
