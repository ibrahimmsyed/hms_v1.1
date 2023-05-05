import PropTypes from 'prop-types';

import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Container, Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, TableContainer, Table, TableBody, InputAdornment, Checkbox, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from './hook-form';
import InputStyle from './InputStyle';

SingleFieldForm.propTypes = {
  id: PropTypes.number,
};

export default function SingleFieldForm({ id, parentId, onSubSubmit }) {

  const [currentSubNewWork, setCurrentSubNewWork] = useState({});

  useEffect(() => {
    const formValue = {...currentSubNewWork}
    formValue.parentId = parentId
    setCurrentSubNewWork(formValue)
    reset(subDefaultValues);
    console.log(formValue)
  },[parentId])

  const NewSubCategorySchema = Yup.object().shape({
    categoryId: Yup.string().required('This field is required'),
    // parentId: Yup.string().required('This field is required'),
  });

  const subDefaultValues = useMemo(
    () => ({
      categoryId: currentSubNewWork?.categoryId || '',
      parentId: currentSubNewWork?.parentId || ''
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSubNewWork]
  );

  const methods = useForm({
    resolver: yupResolver(NewSubCategorySchema),
    subDefaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    data.parentId = id
    onSubSubmit(data)
    console.log(data)
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          p:5,
          display: 'grid',
          columnGap: 1,
          rowGap: 1,
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
        }}
      >
        <RHFTextField name="categoryId" label="New Sub Work" />
        <RHFTextField name="parentId" label="New Sub Work" style={{display:'none'}}/>
        <LoadingButton type="submit" variant="contained" loading={isSubSubmitting}>
          Save
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
