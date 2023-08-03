// form
import { useFormContext, useFieldArray } from 'react-hook-form';
import {useState, SyntheticEvent, ReactNode, useEffect} from 'react';
// @mui
import { Box, Stack, Button, Divider, Typography, InputAdornment, MenuItem } from '@mui/material';
// utils
import { fNumber } from '../../../../utils/formatNumber';
import { useDispatch, useSelector } from '../../../../redux/store';
import { getProcedure } from '../../../../redux/slices/patient';
// components
import Iconify from '../../../../components/Iconify';
import { RHFSelect, RHFTextField } from '../../../../components/hook-form';

// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch } = useFormContext();
  const dispatch = useDispatch();

  const { procedure } = useSelector((state) => state.patient);

  useEffect(() => {
    dispatch(getProcedure());
  },[dispatch])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();
  const total = values.items.reduce((n, {price, quantity}) => n + (quantity * price), 0)  + values.taxes - values.discount
  

  useEffect(()=> {
    console.log(fields)
  },[fields])

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: '',
      price: '',
      total: '',
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const onServiceChange = (value, i) => {
    setValue(`items[${i}].service`, value)
    setValue(`items[${i}].price`, Number(procedure.filter(plan => plan.id === value)[0].cost))
    console.log(value)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <RHFTextField
                size="small"
                name={`items[${index}].title`}
                label="Title"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                name={`items[${index}].description`}
                label="Description"
                InputLabelProps={{ shrink: true }}
              />

              <RHFSelect
                name={`items[${index}].service`}
                label="Service type"
                size="small"
                InputLabelProps={{ shrink: true }}
                SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
                sx={{ maxWidth: { md: 160 } }}
                onChange={(event) => onServiceChange(event.target.value, index)}
              >
                <MenuItem
                  value=""
                  sx={{
                    mx: 1,
                    borderRadius: 0.75,
                    typography: 'body2',
                    fontStyle: 'italic',
                    color: 'text.secondary',
                  }}
                >
                  None
                </MenuItem>
                <Divider />
                {procedure.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.id}
                    sx={{
                      mx: 1,
                      my: 0.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      textTransform: 'capitalize',
                    }}
                  >
                    {option.procedureName}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].quantity`}
                label="Quantity"
                onChange={(event) => event?.target?.value ? setValue(`items[${index}].quantity`, event?.target?.value ) : setValue(`items[${index}].quantity`, '')}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].price`}
                label="Price"
                onChange={(event) => setValue(`items[${index}].price`, event?.target?.value ? Number(event?.target?.value) : '')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                disabled
                size="small"
                name={`items[${index}].total`}
                label="Total"
                value={fNumber(values.items[index].quantity * values.items[index].price)}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
                sx={{ maxWidth: { md: 96 } }}
              />
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="eva:trash-2-outline" />}
              onClick={() => handleRemove(index)}
            >
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={2}
        direction={{ xs: 'column-reverse', md: 'row' }}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAdd} sx={{ flexShrink: 0 }}>
          Add new detail
        </Button>

        <Stack spacing={2} justifyContent="flex-end" direction={{ xs: 'column', md: 'row' }} sx={{ width: 1 }}>
          <RHFTextField
            size="small"
            label="Discount"
            name="discount"
            onChange={(event) => setValue('discount', event?.target?.value ? Number(event?.target?.value) : '')}
            sx={{ maxWidth: { md: 200 } }}
          />

          <RHFTextField
            size="small"
            label="Taxes"
            name="taxes"
            onChange={(event) => setValue('taxes', event?.target?.value ? Number(event?.target?.value) : '')}
            sx={{ maxWidth: { md: 200 } }}
          />

          <RHFTextField
            disabled
            size="small"
            label="Grand Total"
            name="grandTotal"
            value={total}
            onChange={(event) => setValue('grandTotal', total)}
            sx={{ maxWidth: { md: 200 } }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
