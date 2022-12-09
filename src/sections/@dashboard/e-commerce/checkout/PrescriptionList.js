import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import moment from 'moment'
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
import { LoadingButton, DatePicker, DesktopDatePicker  } from '@mui/lab';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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
  const [defaultUser, setDefaultUser] = useState(_userList.filter(user => user.isStaff)[0].id)

  const duration = [
    {id: 1, label: 'day(s)'},
    {id: 2, label: 'week(s)'},
    {id: 3, label: 'month(s)'},
    {id: 4, label: 'year(s)'}
  ]
  const validationSchema = Yup.object().shape({
    cart: Yup.array().of(
      Yup.object().shape({
        when: Yup.string().required('This feild is required'),
        durationUnit: Yup.string().required('missing feild is not found'),
        duration: Yup.string().required('missing feild is not found'),
        morning: Yup.string().required('missing feild is not found'),
        noon: Yup.string().required('missing feild is not found'),
        night: Yup.string().required('missing feild is not found'),
      })
    ),
  });

  const defaultValues = {
    cart: [{ when: "" , durationUnit: duration[0].id, duration: "0", morning: "0", noon: "0", night: "0" }],
    orderedBy: defaultUser
  } 
  
  const {
    register,
    handleSubmit,
    formState,
    watch,
    reset,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });
  const { errors } = formState;
  const { fields, append, prepend, remove, replace } = useFieldArray({
    name: "cart",
    control,
    rules: {
      required: "Please append at least 1 item"
    }
  });

  useEffect(() => {
    console.log(errors)
  },[errors])

  useEffect(() => {
    const staff =  _userList.filter(user => user.isStaff)
    setUser(staff)
  },[_userList])

  useEffect(() => {
    drugs?.forEach(drug => {
      replace([{itemName: 'test'},{itemName: 'test2'}]) 
    })
    setCurrentPrescription(drugs)
  },[drugs])

  const [dateValue, setDateValue] = useState(moment(new Date()).format());

  const handleChange = (newValue) => {
    setDateValue(moment(newValue).format());
  };
  const handleStaffChange = (newValue) => {
    setDefaultUser(newValue.target.value);
  };

  const handleInstruction = (i) => {
    console.log(i)
    drugs[i].showInstruction = true
    setCurrentPrescription(drugs)
    console.log(currentPrescription)
  }

  
function onSubmit(data) {
    // display form data on success
    console.log(data);
}

  return (
    <>
    <form
        onSubmit={handleSubmit((data) => {
          console.log("Submit data", data);
        })}
      >
        {currentPrescription.map((field, index) => {
          return (
            <section key={field.id}>
              
              <Stack
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 3,
                  padding: 2,
                  justifyItems: 'center',
                  alignItems: 'center',
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                  {/* {cart[${i}]itemName} {`- ${prescription[${i}]strength}`} */}
                  {field.itemName} {field.strength ? '-' : ''}` {field.strength}
                </Typography>
                <RadioGroup
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 1,
                    gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  {...register(`cart.${index}.when`, { required: true })}
                >
                  <FormControlLabel value="before" control={<Radio />} label="Before Food" />
                  <FormControlLabel value="after" control={<Radio />} label="After Food" />
                </RadioGroup>
              </Stack>
              <Stack
              sx={{
                display: 'flex',
                columnGap: 2,
                flexDirection: 'row',
                rowGap: 3,
                padding: 2,
                gridTemplateColumns: { xs: 'repeat(5, 1fr)', sm: 'repeat(5, 1fr)' },
              }}
            >
              <TextField id="outlined-basic" label="Duration" {...register(`cart.${index}.duration`, { required: true })} variant="outlined" />
              <Controller
                name={`cart.${index}.durationUnit`}
                control={control}
                render={({ field }) => (
                  <Select
                  {...field}
                  {...register(`cart.${index}.durationUnit`, { required: true })} 
                >
                  {duration.map((option) => (
                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                  ))}
                </Select>
                )}
              />
              <TextField id="outlined-basic" label="Morning" {...register(`cart.${index}.morning`, { required: true })} variant="outlined" />
              <TextField id="outlined-basic" label="Noon" {...register(`cart.${index}.noon`, { required: true })} variant="outlined" />
              <TextField id="outlined-basic" label="Night" {...register(`cart.${index}.night`, { required: true })} variant="outlined" />
            </Stack>
            </section>
          );
        })}
        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', p: 2, position: 'fixed', bottom: 0, left: '25%', right: '10%', background: '#FFF', width: '50%', gap: '20px' }}>
          <Controller
            name="orderedBy"
            control={control}
            render={({ field }) => (
              <Select
              {...field}
              {...register(`orderedBy`, { required: true })}
            >
              {user.map((option) => (
                <MenuItem key={option.id} value={option.id}>{option.firstName} {option.lastName}</MenuItem>
              ))}
            </Select>
            )}
          />
          <DesktopDatePicker
            {...register(`orderedOn`, { required: true })}
            label="Date desktop"
            value={dateValue}
            inputFormat="dd/MM/yyyy"
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
          
          <LoadingButton type="submit" variant="contained" size="large" >
            Save
          </LoadingButton>
        </Stack>
        
      </form>
    {/* <FormProvider methods={formOptions} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((item, i) => (
          <Card key={item.id} sx={{ p: 3, display: 'grid', m: 1, }}>
            <Stack
              sx={{
                display: 'flex',
                columnGap: 2,
                flexDirection: 'row',
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(5, 1fr)', sm: 'repeat(5, 1fr)' },
              }}
            >
              <RHFTextField name={`prescription.${i}.duration`} {...register(`prescription.${i}.duration`)} ref={null} label="Duration" />
              <RHFTextField name={`prescription.${i}.morning`} {...register(`prescription.${i}.morning`)} ref={null} label="Morning" />
              <RHFTextField name={`prescription.${i}.noon`} {...register(`prescription.${i}.noon`)} ref={null} label="Noon" />
              <RHFTextField name={`prescription.${i}.night`} {...register(`prescription.${i}.night`)} ref={null} label="Night" />
              <div>
              <LoadingButton type="submit" variant="contained" size="large" >
                Save
              </LoadingButton>
              </div>
            </Stack>
          </Card>
      ))}
    </FormProvider> */}
    
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
