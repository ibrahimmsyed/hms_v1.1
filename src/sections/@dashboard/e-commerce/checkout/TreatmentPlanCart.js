import {useState} from 'react';
import sum from 'lodash/sum';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { LoadingButton } from '@mui/lab';
import { Grid, Card, Button, CardHeader, Typography, List, ListItem, ListItemText, Checkbox, IconButton, ListItemButton, ListItemIcon, Box, InputAdornment, Stack } from '@mui/material';

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
import TreatmentPlansList from './TreatmentPlansList';

// ----------------------------------------------------------------------

export default function TreatmentPlanCart() {
  const dispatch = useDispatch();

  const { checkout } = useSelector((state) => state.product);

  const plans = [
    {
      id: 1,
      treatmentName: "Consultation",
      quantity: 1,
      cost: 1000,
      discount: 5,
      notes: "Notes Here",
      available: 50
    }
  ]

  const { cart, total, discount, subtotal } = checkout;

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = plans.length === 0;

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

  const findProcedure = () => {
    
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
                Treatment Plans
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({totalItems} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <TreatmentPlansList
                plans={plans}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Select Treatment"
              description="Multiple items can be added."
            />
          )}
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card sx={{ mb: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" px={1} py={1.5}>
              <Typography sx={{ m: 2 }} variant="h6" component="div">
                Procedures
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
                <RHFTextField name="name" label="Procedure Name" />
                <RHFTextField name="cost" label="Cost" />
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
                onChange={(event) => findProcedure(event.target.value)}
                placeholder="Find procedure..."
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
