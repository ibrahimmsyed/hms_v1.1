import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, TextField, Typography, Autocomplete, InputAdornment } from '@mui/material';
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
} from '../../../components/hook-form';
import InventoryApiService from '../../../services/Inventory'
import useUsers from '../../../hooks/useUsers';

// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { addInventory, modifyInventory } from '../../../redux/slices/setting';
// ----------------------------------------------------------------------

const ITEMTYPE_OPTION = [
  { id: 1, name: 'drug', label: 'Drug' },
  { id: 2, name: 'equipment', label: 'Equipment' },
  { id: 3, name: 'supplies', label: 'Supplies' },
];

const MONTH_OPTION = [
  { id: 1, name: '01' },
  { id: 2, name: '02' },
  { id: 3, name: '03' },
  { id: 4, name: '04' },
  { id: 5, name: '05' },
  { id: 6, name: '06' },
  { id: 7, name: '07' },
  { id: 8, name: '08' },
  { id: 9, name: '09' },
  { id: 10, name: '10' },
  { id: 11, name: '11' },
  { id: 12, name: '12' }
];

const YEAR_OPTION = [
  { id: 1, code: 2022, name: '2022' },
  { id: 2, code: 2023, name: '2023' },
  { id: 3, code: 2024,  name: '2024' },
  { id: 4, code: 2025,  name: '2025' },
  { id: 5, code: 2026,  name: '2026' },
  { id: 6, code: 2027,  name: '2027' },
  { id: 7, code: 2028,  name: '2028' },
  { id: 8, code: 2029,  name: '2029' },
  { id: 9, code: 2030,  name: '2030' },
  { id: 10, code: 2031,  name: '2031' },
  { id: 11, code: 2032,  name: '2032' }
]

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

InventoryNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentItem: PropTypes.object,
};

export default function InventoryNewEditForm({ isEdit, currentItem }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inventoryApiService = new InventoryApiService();
  const { enqueueSnackbar } = useSnackbar();
  const { setInventoryDetails } = useUsers();

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

  const NewProductSchema = Yup.object().shape({
    itemName: Yup.string().required('Name is required'),
    stockingUnit: Yup.string().required('Stocking Unit is required'),
    itemType: Yup.string().required('Stocking Unit is required'),
    // price: Yup.number().moreThan(0, 'Price should not be $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      itemName: currentItem?.itemName || '',
      itemCode : `000${currentItem?.id}` || 'NA',
      manufacturer : currentItem?.manufacturer || '',
      stockingUnit: currentItem?.stockingUnit || '',
      reorderLevel : currentItem?.reorderLevel || 0,
      retailPrice : currentItem?.retailPrice || 0,
      itemType : currentItem?.itemType || '',
      strength : currentItem?.strength || '',
      quantity : currentItem?.quantity || 0,
      batch : currentItem?.batch || '',
      unitCost : currentItem?.unitCost || 0,
      expMonth : currentItem?.expMonth || 1,
      expYear : currentItem?.expYear || 2022,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentItem]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
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

  const values = watch();

  useEffect(() => {
    if (isEdit && currentItem) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentItem]);

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = isEdit ? dispatch(modifyInventory(data, currentItem.id)) : dispatch(addInventory(data))
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.settings.inventory);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="itemName" label="Item Name" />
              <RHFTextField name="itemCode" label="Item Code" disabled/>
              <RHFTextField name="manufacturer" label="Manufacturer" />
              <RHFTextField name="stockingUnit" label="Stocking Units" />
              <RHFTextField name="reorderLevel" label="Re-order level" />


              <RHFSelect name="itemType" label="Item Type">
                <option value="" />
                {ITEMTYPE_OPTION.map((type) => (
                  <option key={type.id} value={type.name}>
                  {type.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="strength" label="Strength" />
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mt={2}>
                <RHFTextField name="quantity" label="Quantity" />
                <RHFTextField name="batch" label="Batch" />
                <RHFTextField
                  name="retailPrice"
                  label="Retail Price"
                  placeholder="0.00"
                  value={getValues('retailPrice') === 0 ? '' : getValues('retailPrice')}
                  onChange={(event) => setValue('retailPrice', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    type: 'number',
                  }}
                />
                <RHFTextField
                  name="unitCost"
                  label="Unit Cost"
                  placeholder="0.00"
                  value={getValues('unitCost') === 0 ? '' : getValues('unitCost')}
                  onChange={(event) => setValue('unitCost', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
            </Card>

            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFSelect name="expMonth" label="Exp Month">
                  <option value="" />
                  {MONTH_OPTION.map((month) => (
                    <option key={month.id} value={month.id}>
                    {month.name}
                    </option>
                  ))}
                </RHFSelect>
                <RHFSelect name="expYear" label="Exp Year">
                  <option value="" />
                  {YEAR_OPTION.map((month) => (
                    <option key={month.id} value={month.code}>
                      {month.name}
                    </option>
                  ))}
                </RHFSelect>
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Item' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
