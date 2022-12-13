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
import { Card, Button, Box, Chip, Grid, Stack, TextareaAutosize, Typography, Autocomplete, InputAdornment, MenuList, MenuItem, Divider, ListItemText, Avatar, IconButton } from '@mui/material';

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
  RHFCheckbox,
  RHFUploadSingleFile
} from '../../../components/hook-form';
import Image from '../../../components/Image';
import Iconify from '../../../components/Iconify';

// hook
import { useDispatch, useSelector } from '../../../redux/store';
import { uploadFiles } from '../../../redux/slices/patient';

// ----------------------------------------------------------------------

const RADIO_OPTION = ['Valid for absence from court attendance ', 'Invalid for absence from court attendance ', 'Dont mention'];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

FileNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};

export default function FileNewEditForm() {
  const dispatch = useDispatch();
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
    /* resolver: yupResolver(NewMLCSchema),
    defaultValues, */
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

  const onSubmit = async (data) => {
    try {
      dispatch(uploadFiles(data))
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  const onCancel = () => {
    console.log('CLose')
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
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
              <div>
                <LabelStyle>Upload Files</LabelStyle>
                <RHFUploadSingleFile name="cover" accept="image/*" maxSize={3145728} onDrop={handleDrop}/>
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
              <div style={{textAlign:'center'}}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <Iconify icon={'eva:camera-outline'} width={150} height={150}/>
              </IconButton>
              <LabelStyle>Take Photo</LabelStyle>
              </div>
              <div style={{textAlign:'center'}}>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" />
                <Iconify icon={'eva:file-add-outline'} width={150} height={150}/>
              </IconButton>
              <LabelStyle>Medical Certificate</LabelStyle>
              </div>
            </Box>
          <Stack direction="row" spacing={2}>
            <Button fullWidth onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
              Submit
            </LoadingButton>
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
