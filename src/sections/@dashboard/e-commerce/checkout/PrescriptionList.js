import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
//
import { useForm, Controller } from 'react-hook-form';
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
// utils
import getColorName from '../../../../utils/getColorName';
import { fCurrency } from '../../../../utils/formatNumber';
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
  const [currentPrescription, setCurrentPrescription] = useState({});
  const NewPrescriptionSchema = Yup.object().shape({
    strength: Yup.string().required('Strength is required'),
    duration: Yup.string().required('Duration is required').email(),
    morning: Yup.string().required('Morning is required'),
    noon: Yup.string().required('Noon is required'),
    night: Yup.string().required('Night is required'),
  });
  const defaultValues = useMemo(
    () => ({
      strength: currentPrescription?.strength || '',
      duration: currentPrescription?.duration || '',
      morning: currentPrescription?.morning || '',
      noon: currentPrescription?.noon || '',
      night: currentPrescription?.night || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPrescription]
  );

  const methods = useForm({
    resolver: yupResolver(NewPrescriptionSchema),
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

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {drugs.map((drug, index) => {
        const { id, name, strength, duration, morning, noon, night, intake, instruction } = drug;
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
                {name}
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
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(6, 1fr)', sm: 'repeat(6, 1fr)' },
              }}
            >
              <RHFTextField name="strength" label="Strength" />
              <RHFTextField name="duration" label="Duration" />
              <RHFTextField name="morning" label="Morning" />
              <RHFTextField name="noon" label="Noon" />
              <RHFTextField name="night" label="Night" />
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
              onClick={() => {
                console.info("I'm a button.");
              }}
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
            {( drug[index]?.showInstruction && <TextField
              multiline
              fullWidth
              rows={4}
              placeholder="Instructions.."
              sx={{
                '& fieldset': {
                  borderWidth: `1px !important`,
                  borderColor: (theme) => `${theme.palette.grey[500_32]} !important`,
                },
              }}
            />)}
            
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
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Prescribe Custom Drug
    </Link>
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
