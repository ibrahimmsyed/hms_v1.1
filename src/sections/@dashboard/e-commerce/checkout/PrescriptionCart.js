import {useState} from 'react';
import sum from 'lodash/sum';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Button, CardHeader, TextField, Typography, List, ListItem, ListItemText, Checkbox, IconButton, ListItemButton, ListItemIcon, Box, InputAdornment, Stack } from '@mui/material';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import InputStyle from '../../../../components/InputStyle';
//
import CheckoutSummary from './CheckoutSummary';
import PrescriptionList from './PrescriptionList';

// ----------------------------------------------------------------------

export default function PrescriptionCart() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const drugs = [
    {
      id:1,
      name: "COMB Tab",
      strength: "100",
      duration: 4,
      morning: 4,
      noon: 4,
      night: 0,
      intake:  "bf",
      instruction: "Notes Here"
    },
    {
      id:2,
      name: "SESS Tab",
      strength: "500",
      duration: 3,
      morning: 0,
      noon: 1,
      night: 0,
      intake:  "af",
      instruction: "Notes Here 2"
    }
  ]
  const units = [
    {id: 1, name: 'mg' },
    {id: 2, name: 'gm' },
    {id: 3, name: 'units' },
    {id: 4, name: 'IU' },
    {id: 5, name: 'ml' },
  ]
  const drugType = [
    {id: 1, name: 'Tablets' },
    {id: 2, name: 'Capsule' },
    {id: 3, name: 'Cream' },
    {id: 4, name: 'Injection' },
    {id: 5, name: 'Mouth wash' },
  ]

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = drugs.length === 0;

  const NewProcedureSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    amount: Yup.string().required('amount is required')
  });

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const [checked, setChecked] = useState([0]);
  const [showAddForm, setShowAddForm] = useState(false);
   

  const methods = useForm({
    resolver: yupResolver(NewProcedureSchema),
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const onSubmit = async () => {
    try {
      console.log('')
    } catch (error) {
      console.error(error);
    }
  };

  const finddrugs = () => {
    
  }
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Prescriptions
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <PrescriptionList
                drugs={drugs}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Select Drug"
              description="Multiple items can be added."
            />
          )}
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" px={1} py={1.5}>
              <Typography sx={{ m: 2 }} variant="h6" component="div">
                Drugs
              </Typography>
              
            <IconButton onClick={toggleAddForm}>
              <Iconify icon={showAddForm? 'eva:close-circle-outline':'eva:plus-circle-outline'} />
            </IconButton>
            </Stack>
            {showAddForm && (<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  px:1,
                  display: 'grid',
                  columnGap: 1,
                  rowGap: 1,
                  gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                <RHFTextField name="name" label="Drug Name" />
                <RHFTextField name="strength" label="Strength" />
                <TextField
                    select
                    fullWidth
                    label="Drug type"
                    placeholder="type"
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    {drugType.map((option) => (
                      <option key={option.code} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    select
                    fullWidth
                    label="Unit"
                    placeholder="unit"
                    SelectProps={{ native: true }}
                  >
                    <option value="" />
                    {units.map((option) => (
                      <option key={option.code} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                <RHFTextField name="instruction" label="Instruction" />
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save
                </LoadingButton>
              </Box>
            </FormProvider>)}
            <Box
              sx={{
                display: 'flex', justifyContent: 'center', my: 1 
              }}
            >
              <InputStyle
                stretchStart={240}
                value=""
                onChange={(event) => finddrugs(event.target.value)}
                placeholder="Find drugs..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {[0, 1, 2, 3].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        0
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
        </Card> 
      </Grid>
    </Grid>
  );
}
