import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
//
import { useForm, Controller, useFieldArray  } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
  Card,
  Link,
  TextField
} from '@mui/material';
//
import { LoadingButton, DatePicker } from '@mui/lab';
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
// hooks
import useUsers from '../../../../hooks/useUsers';
// components
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFRadioGroup } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

// ----------------------------------------------------------------------

PrescriptionList.propTypes = {
  drugs: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default function PrescriptionList({ drugs, onDelete, onIncreaseQuantity, onDecreaseQuantity }) {
  const INTAKE_OPTION = ['Before Food', 'After Food'];
  const [currentPrescription, setCurrentPrescription] = useState([]);
  const { user: _userList } = useUsers();
  const [user, setUser] = useState([])

  useEffect(() => {
    const staff =  _userList.filter(user => user.isStaff)
    setUser(staff)
  },[_userList])

  /* const NewPrescriptionSchema = Yup.object().shape({
    strength: Yup.string().required('Strength is required'),
    duration: Yup.string().required('Duration is required'),
    morning: Yup.string().required('Morning is required'),
    noon: Yup.string().required('Noon is required'),
    night: Yup.string().required('Night is required'),
    instruction: Yup.string(),
    orderedBy: Yup.string(),
    orderedOn: Yup.string(),
  }); */

  const newSchema = Yup.array().of(
    Yup.object().shape({
      strength: Yup.string().required('Strength is required'),
      duration: Yup.string().required('Duration is required'),
      morning: Yup.string().required('Morning is required'),
      noon: Yup.string().required('Noon is required'),
      night: Yup.string().required('Night is required'),
      instruction: Yup.string(),
      orderedBy: Yup.string(),
      orderedOn: Yup.string(),
    })
  )

  const formOptions = useForm({
    resolver: yupResolver(newSchema),
    // defaultValues,
  });

  // functions to build form returned by useForm() and useFieldArray() hooks
  const { register, control, handleSubmit, reset, formState, watch } = useForm(formOptions);
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({ name: 'prescription', control });
  /* const defaultValues = useMemo(
    () => ({
      strength: currentPrescription?.strength || '',
      duration: currentPrescription?.duration || '',
      morning: currentPrescription?.morning || 0,
      noon: currentPrescription?.noon || 0,
      night: currentPrescription?.night || 0,
      instruction: currentPrescription?.instruction || '',
      orderedBy: currentPrescription?.duration || '',
      orderedOn: currentPrescription?.orderedOn || new Date(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPrescription]
  ); */

  useEffect(() => {

    setCurrentPrescription(drugs)
  },[drugs])

  /* const methods = useForm({
    resolver: yupResolver(NewPrescriptionSchema),
    // defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods; */

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInstruction = (i) => {
    console.log(i)
    drugs[i].showInstruction = true
    setCurrentPrescription(drugs)
    console.log(currentPrescription)
  }

  return (
    <>
    <FormProvider methods={formOptions} onSubmit={handleSubmit(onSubmit)}>
      {currentPrescription.map((drug, i) => {
        const { id, itemName, strength, duration, morning, noon, night, intake, instruction, showInstruction } = drug;
        return (
          <Card sx={{ p: 3, display: 'grid', m: 1, }}>
            <Stack
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
            <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                {itemName} {`- ${strength}`}
              </Typography>
              <RHFRadioGroup
                  name="intake"
                  options={INTAKE_OPTION}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
            </Stack>
            <Stack
              sx={{
                display: 'flex',
                columnGap: 2,
                flexDirection: 'row',
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(5, 1fr)', sm: 'repeat(5, 1fr)' },
              }}
            >
              <RHFTextField name={`prescription[${i}]duration`} {...register(`prescription.${i}.duration`)} label="Duration" />
              <RHFTextField name={`prescription[${i}]morning`} {...register(`prescription.${i}.morning`)} label="Morning" />
              <RHFTextField name={`prescription[${i}]noon`} {...register(`prescription.${i}.noon`)} label="Noon" />
              <RHFTextField name={`prescription[${i}]night`} {...register(`prescription.${i}.night`)} label="Night" />
              <div>
              <IconButton>
                <Iconify icon={'eva:trash-2-outline'} />
              </IconButton>
              </div>
            </Stack>
            <Stack
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
            <Link
              component="button"
              variant="body2"
              onClick={() => handleInstruction(i)}
            >
              + add instruction
            </Link>
            </Stack>
            <Stack
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
            {( showInstruction && 
              <RHFTextField name={`instruction-${i}`} label="Instruction" multiline rows={3} />
            )}
            </Stack>
            <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', p: 2, position: 'fixed', bottom: 0, left: '10%', right: '10%', background: '#FFF', width: '80%', gap: '20px' }}>
              <RHFSelect name={`orderedBy-${i}`} label="Ordered By" placeholder="Ordered By">
                {user.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.firstName} {option.lastName}
                  </option>
                ))}
              </RHFSelect>
              <Controller
                name={`orderedOn-${i}`}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Ordered On"
                    onChange={(newValue) => {
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                    )}
                  />
                )}
              />
              <LoadingButton type="submit" variant="contained" size="large" >
                Save
              </LoadingButton>
            </Stack>
          </Card>
          
        );
      })}
    </FormProvider>
    <Stack
      sx={{
        display: 'grid',
        columnGap: 2,
        rowGap: 3,
        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
      }}
    >
    {/* <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Prescribe Custom Drug
    </Link> */}
    </Stack>
    </>
  );
}

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func,
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon={'eva:minus-fill'} width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon={'eva:plus-fill'} width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}
