import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton, DesktopDatePicker } from '@mui/lab';
import { IconButton, TableRow, Checkbox, TableCell, MenuItem, Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, TableContainer, Table, TableBody, InputAdornment, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import moment from 'moment'
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// hooks
import useUsers from '../../../hooks/useUsers';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getProducts } from '../../../redux/slices/product';
import { getMedicalHistory, addMedicalHistory, deleteMedicalHistory, addPatientsDetail } from '../../../redux/slices/patient';
// Service
import PatientApiService from '../../../services/Patient'
// components
import Scrollbar from '../../../components/Scrollbar';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFRadioGroup } from '../../../components/hook-form';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import { ProductTableRow, ProductTableToolbar } from '../e-commerce/product-list';

// ----------------------------------------------------------------------

PatientNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPatient: PropTypes.object,
};

export default function PatientNewEditForm({ isEdit, currentPatient }) {
  const navigate = useNavigate();
  const { setPatientDetails } = useUsers();
  const patientApiService = new PatientApiService();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const GENDER_OPTION = ['Men', 'Women', 'Kids'];
  const LANGUAGES_OPTION = [
    "Asami",
    "Bengali",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Malayalam",
    "Marathi",
    "Odia",
    "Punjabi",
    "Tamil",
    "Telugu",
    "Urdu",
    "Sanskrit",
    "English",
    "Konkani",
    "Nepali",
    "Bodo",
    "Kashmiri",
    "Maithili",
    "Santali",
    "Sindhi"
  ]
  const RELATION_OPTION = ['Father', 'Mother', 'Son', 'Daughter', 'Husband', 'Wife', 'Brother', 'Sister', 'Niece', 'Nephew', 'Uncle', 'Aunt', 'Grand Father', 'Grand Mother'];
  const BLOODGROUP_OPTION = ['A+', 'A-', 'B-', 'O+', 'O-', 'AB+', 'AB-', 'B+']
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

  const { patientHistory, isLoading } = useSelector((state) => state.patient);
  useEffect(() => {
    setTableData(patientHistory)
  }, [patientHistory]);

  const TABLE_HEAD = [
    { id: 'name', label: 'History', align: 'left' },
    { id: '' }
  ];
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'createdAt',
    defaultRowsPerPage: patientHistory?.length
  });
  const [medicalHistoryTableData, setTableData] = useState([]);
  const [newHistory, setNewHistory] = useState('');
  const NewUserSchema = Yup.object().shape({
    patientName: Yup.string().required('patientName is required'),
    patientId: Yup.string().required('patientId is required'),
    aadharId: Yup.string().required('AadharId is required'),
    gender: Yup.string().required('Gender is required'),
    dob: Yup.string().required('date of birth is required'),
    anniversary: Yup.string().required('Anniversary is required'),
    bloodGroup: Yup.string().required('Blood group is required'),
    email: Yup.string().required('Email is required'),
    primaryMobNo: Yup.string().required('Primary Moile No is required'),
    secondaryMobNo: Yup.string().required('Secondary Moile No is required'),
    landlineNo: Yup.string().required('Landline No is required'),
    relationType:Yup.string().required('Relation Type is required'),
    relationName:Yup.string().required('Relation Name is required'),
    languagePref:Yup.string().required('Language Preference is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
    pinCode: Yup.string().required('Pincode is required'),
    dop: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
    locality: Yup.string().required('Locality is required'),
    // otherHistory: Yup.string().required('Other History is required'),
    // medicalHistory: Yup.string().required('Medical History is required'),
  });
  const defaultValues = useMemo(
    () => ({
      patientName: currentPatient?.patientName || '',
      patientId: currentPatient?.patientId || '',
      aadharId: currentPatient?.aadharId || '',
      gender: currentPatient?.gender || '',
      dob: currentPatient?.dob || new Date(),
      anniversary: currentPatient?.anniversary || new Date(),
      bloodGroup: currentPatient?.bloodGroup || '',
      email: currentPatient?.email || '',
      primaryMobNo: currentPatient?.primaryMobNo || '',
      secondaryMobNo: currentPatient?.secondaryMobNo || '',
      landlineNo: currentPatient?.landlineNo || '',
      relationType: currentPatient?.relationType || '',
      relationName: currentPatient?.relationName || '',
      languagePref: currentPatient?.languagePref || '',
      street: currentPatient?.street || '',
      city: currentPatient?.city || '',
      pinCode: currentPatient?.pinCode || '',
      dop: currentPatient?.dop || '',
      locality: currentPatient?.locality || '',
      // otherHistory: currentPatient?.otherHistory,
      medicalHistory: currentPatient?.medicalHistory || '',
     }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPatient]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  


  useEffect(() => {
    if (isEdit && currentPatient) {
      reset(defaultValues);
      const selectedHistory = currentPatient?.medicalHistory?.split(",").map(Number);
      setSelected(selectedHistory)
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    dispatch(getMedicalHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPatient, dispatch]);


  const onSubmit = async (data) => {
    try {
      console.log(data)
      data.dob = moment(data.dob).format('YYYY-MM-DD');
      data.anniversary = moment(data.anniversary).format('YYYY-MM-DD');
      data.dop = data?.dop?.path;
      data.medicalHistory = selected.toString();
      const response = isEdit ? await patientApiService.updatePatient(data, currentPatient.id) : dispatch(addPatientsDetail(data))
      setPatientDetails(response)
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.patient.profile);
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNew = async () => {
    const data = {
      name: newHistory
    }
    dispatch(addMedicalHistory(data));
    enqueueSnackbar('Create success!');
    console.log(newHistory)
  }

  const handleNewHistoryChange = (e) => {
    setNewHistory(e.target.value)
  }

  const onDeleteRow = async (id) => {
    console.log(id)
    dispatch(deleteMedicalHistory(id));
    enqueueSnackbar('delete success!');
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'dop',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );
  const denseHeight = dense ? 60 : 80;
  const [filterName, setFilterName] = useState('');
  const dataFiltered = applySortFilter({
    medicalHistoryTableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, display: 'grid', rowGap: 3, }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="patientName" label="Patient Name" />
              <RHFTextField name="patientId" label="Patient Id" />
              <RHFTextField name="aadharId" label="Aadhaar Id" />
              <div>
                <LabelStyle>Gender</LabelStyle>
                <RHFRadioGroup
                  name="gender"
                  options={GENDER_OPTION}
                  sx={{
                    '& .MuiFormControlLabel-root': { mr: 4 },
                  }}
                />
              </div>
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label="Date of Birth"
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <Controller
                name="anniversary"
                control={control}
                render={({ field }) => (
                  <DesktopDatePicker
                    {...field}
                    label="Anniversary"
                    inputFormat="MM/dd/yyyy"
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
              />
              <RHFSelect name="bloodGroup" label="Blood Group" placeholder="Blood Group">
                <option value="" />
                {BLOODGROUP_OPTION.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 2,
                  rowGap: 5,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFSelect name="relationType" label="Relation" placeholder="Relation">
                  <option value="" />
                  {RELATION_OPTION.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </RHFSelect>
                <RHFTextField name="relationName" label="Name" />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <RHFTextField name="primaryMobNo" label="Primary Mobile No." />
              <RHFTextField name="secondaryMobNo" label="Secondary Mobile No." />
              <RHFSelect name="languagePref" label="Language Preference" placeholder="Language Preference">
                <option value="" />
                {LANGUAGES_OPTION.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="landlineNo" label="Land Line Nos." />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="street" label="Street Address" />
              <RHFTextField name="locality" label="Locality" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="pinCode" label="Pincode" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, marginBottom: 3 }}>
            {isEdit && (
              <Label
                color={values.status !== 'active' ? 'error' : 'success'}
                sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="dop"
                accept="image/*"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
          <Card sx={{ py: 10, px: 3, display: 'grid', rowGap: 2,  marginBottom: 3 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              {/* <LoadingButton sx={{ mb: 5 }} type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Add New' : 'Add New'}
              </LoadingButton> */}
              <TextField
                fullWidth
                placeholder="Add New History"
                name="newHistory"
                onChange={handleNewHistoryChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={onAddNew} sx={{ mr: -0.5 }}>
                        Add
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Scrollbar
              sx={{
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 350,
              }}>
              <TableContainer sx={{ minWidth: 0 }}>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableBody>
                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) =>
                        row ? (
                          <TableRow hover key={row.id} selected={selected?.includes(row.id)}>
                            <TableCell padding="checkbox">
                              <Checkbox checked={selected?.includes(row.id)} onClick={() => onSelectRow(row.id)} />
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                            <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => onDeleteRow(row.id)}>
                              <Iconify icon={'eva:trash-2-outline'} />
                            </IconButton>
                            </TableCell>
                          </TableRow>
                          
                        ) : (
                          !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                        )
                      )}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, medicalHistoryTableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card>
          {/* <Card sx={{ py: 10, px: 3, display: 'grid', rowGap: 2,  marginBottom: 3 }}>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Add New' : 'Add New'}
              </LoadingButton>
            </Stack>
            <Scrollbar>
              <TableContainer sx={{ minWidth: 0 }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={medicalHistoryTableData.length}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        medicalHistoryTableData.map((row) => row.id)
                      )
                    }
                  />
                )}

                <Table size={dense ? 'small' : 'medium'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={medicalHistoryTableData.length}
                    numSelected={selected.length}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        medicalHistoryTableData.map((row) => row.id)
                      )
                    }
                  />

                  <TableBody>
                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) =>
                        row ? (
                          <ProductTableRow
                            key={row.id}
                            row={row}
                            selected={selected.includes(row.id)}
                            onSelectRow={() => onSelectRow(row.id)}
                          />
                        ) : (
                          !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                        )
                      )}

                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, medicalHistoryTableData.length)} />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          </Card> */}
        </Grid>
      </Grid>
    </FormProvider>
  );
}
// ----------------------------------------------------------------------

function applySortFilter({ medicalHistoryTableData, comparator, filterName }) {
  const stabilizedThis = medicalHistoryTableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  medicalHistoryTableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    medicalHistoryTableData = medicalHistoryTableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return medicalHistoryTableData;
}