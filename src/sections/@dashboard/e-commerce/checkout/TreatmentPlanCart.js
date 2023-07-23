import {Fragment, useState, useMemo, useEffect} from 'react';
import sum from 'lodash/sum';
import * as Yup from 'yup';
import { Link as RouterLink, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
// @mui
import { LoadingButton, DatePicker, MobileDateTimePicker } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Grid, Card, TextField, Button, Avatar, CardHeader, Typography, List, ListItem, ListItemText, Checkbox, IconButton, ListItemButton, ListItemIcon, Box, InputAdornment, Stack } from '@mui/material';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { addProcedure, getProcedure } from '../../../../redux/slices/patient';
import { addTreatmentPlans } from '../../../../redux/slices/lab';
import { useDispatch, useSelector } from '../../../../redux/store';
import {
  deleteCart,
  onNextStep,
  applyDiscount,
  increaseQuantity,
  decreaseQuantity,
} from '../../../../redux/slices/product';
// hooks
import useUsers from '../../../../hooks/useUsers';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import EmptyContent from '../../../../components/EmptyContent';
import { FormProvider, RHFTextField, RHFSelect } from '../../../../components/hook-form';
import InputStyle from '../../../../components/InputStyle';
//
import CheckoutSummary from './CheckoutSummary';
import TreatmentPlansList from './TreatmentPlansList';

// ----------------------------------------------------------------------

export default function TreatmentPlanCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { checkout } = useSelector((state) => state.product);

  const { procedure: treatmentPlan } = useSelector((state) => state.patient);
  
  const [procedure, setProcedure ] = useState([]) 

  const [ selectedProcedure, setSelectedProcedure ] = useState([]) 

  const [ updatedProcedure, setUpdatedProcedure ] = useState('')

  const [isEmptyCart, setEmptyCart] = useState(true)

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

  const { patients } = useUsers();

  const { user: _userList } = useUsers();

  const { name = '', id = '' } = useParams();

  const currentPatient = patients.find((user) => Number(user.id) === Number(id));

  useEffect(() => {
    const staff =  _userList.filter(user => user.isStaff)
    setUser(staff)
    setFieldValue('orderedBy', staff[0]?.id);
    setFieldValue('plannedOn', new Date());
  },[_userList])

  const [user, setUser] = useState([])

  useEffect(() => {
    dispatch(getProcedure());
  },[dispatch])

  useEffect(() => {
    const plans = treatmentPlan.map(plan => ({...plan, isChecked : false, isVisible: true}));
    setProcedure(plans)
  },[treatmentPlan])

  useEffect(() => {
    const clonedProcedure = [...procedure]
    const selectedPlans = clonedProcedure.filter(plan => plan.isChecked);
    setEmptyCart(!selectedPlans.length > 0)
    setSelectedProcedure(selectedPlans)
  },[procedure])

  const NewProcedureSchema = Yup.object().shape({
    procedureName: Yup.string().required('Name is required'),
    cost: Yup.string().required('Cost is required')
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

  const handleUpdatedProcedure = (data) => {
    const plan = {}
    plan.updatedProcedure = data
    setUpdatedProcedure(JSON.stringify(plan))
    console.log(data)
  }

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

  const defaultValues = useMemo(
    () => ({
      orderedBy: '' || '',
      plannedOn: new Date() || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  const NewFullProcedureSchema = Yup.object().shape({
    orderedBy: Yup.string().required('Name is required'),
    plannedOn: Yup.string().required('dueDate is required'),
  });

  const labMethods = useForm({
    resolver: yupResolver(NewFullProcedureSchema),
    defaultValues
  });

  const {control: controlNewForm, setValue: setFieldValue, handleSubmit: handleSubmitForm, formState: {errors: errorsNewForm}} = labMethods

  const handleToggle = (value: number) => () => {
    console.log(value)
    const plans = [...procedure];
    plans.forEach((item) => {
      if(item.id === value.id){
        item.isChecked = !value.isChecked
      }
    });
    setProcedure(plans)
  };
  const onSubmit = async (data) => {
    try {
      console.log(data)
      dispatch(addProcedure(data))
      reset()
    } catch (error) {
      console.error(error);
    }
  }; 

  const handleSubmitPlan = async (data) => {
    try {
      data.selection = updatedProcedure
      data.patientId = `${currentPatient.id}`
      dispatch(addTreatmentPlans(data));
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.labs.plans);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const findProcedure = (value) => {
    console.log(value, value.length)
    let filteredPlan
    if(value.length){
      filteredPlan = procedure.map(plan => {
        if(!plan?.procedureName?.toLowerCase().includes(value.toLowerCase())){
          plan.isVisible = false
        }
        return plan
      })
    }else{
      filteredPlan = procedure.map(plan => ({...plan, isChecked : false, isVisible: true}));
    }
    setProcedure(filteredPlan)
  }
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const handleOrderedBy = (data) => {
    console.log(data)
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
                  &nbsp;({selectedProcedure?.length} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <TreatmentPlansList
                selectedProcedure={selectedProcedure}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
                updatedProcedures={handleUpdatedProcedure}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', m: 2 }}>
              <Avatar alt='' src='' sx={{ mr: 2 }} />
              <Typography variant="subtitle2" noWrap>
                {currentPatient?.patientName}
              </Typography>
            </Box>
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
                <RHFTextField name="procedureName" label="Procedure Name" />
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
              {!!procedure?.length && procedure.map((value, index) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <Fragment key={index}>
                  {value?.isVisible && <ListItem
                    key={value.cost}
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        ₹ {value.cost}
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={value.checked}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={value.procedureName} />
                    </ListItemButton>
                  </ListItem>
                  }
                  </Fragment>
                );
              })}
            </List>
        </Card> 
      </Grid>

        <FormProvider methods={labMethods} onSubmit={handleSubmitForm(handleSubmitPlan)}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', p: 2, position: 'fixed', bottom: 0, left: '10%', right: '10%', background: '#FFF', width: '80%', gap: '20px' }}>
          <RHFSelect name="orderedBy" label="Ordered By" placeholder="Ordered By">
            {user?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.firstName} {option.lastName}
              </option>
            ))}
          </RHFSelect>
          <Controller
            name="plannedOn"
            control={controlNewForm}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                label="Planned On"
                value={field.value}
                onChange={(newValue) => {
                  field.onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} fullWidth error={!!error} helperText={error?.message} />
                )}
              />
            )}
          />
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            Save
          </LoadingButton>
          </Box>
        </FormProvider>
      
    </Grid>
  );
}
