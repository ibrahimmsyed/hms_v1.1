import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, TableContainer, Table, TableBody, InputAdornment, Checkbox, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, ListItemIcon, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries, _faqs, _labTreatments } from '../../../_mock';
// redux
import { getAllLabWork, addLabName, getAllLabNames } from '../../../redux/slices/lab';
import { useDispatch, useSelector } from '../../../redux/store';
import { getProducts } from '../../../redux/slices/product';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import ToothSelectionButton from '../../../components/ToothSelectionButton';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedActions,
} from '../../../components/table';
import Label from '../../../components/Label';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFRadioGroup } from '../../../components/hook-form';
import useTable, { getComparator, emptyRows } from '../../../hooks/useTable';
import { ProductTableRow, ProductTableToolbar } from '../e-commerce/product-list';

// ----------------------------------------------------------------------

LabsNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function LabsNewEditForm({ isEdit, currentPatient, currentWork }) {

  console.log(currentPatient)
  const dispatch = useDispatch();

  const [newLabNames, setNewLabNames] = useState([]);

  const [labTreatments, setLabTreatments] = useState([]);

  const [labWorkName, setLabWorkName] = useState('')

  const [showAddForm, setShowAddForm] = useState(false);

  const [newLabName, setNewLabName] = useState('')

  const [open, setOpen] = useState(false);

  const toothOption = {
    from: 21, 
    to: 28
  }
  const toothOption2 = {
    from: 18,
    to: 11
  }
  const status = [
    {id:1 , label: 'Sent'},
    {id:2 , label: 'In Production'},
    {id:3 , label: 'In Transit'},
    {id:4 , label: 'Received'}
  ]
  const alloy = [
    {id: 1, label: 'Semi-precious porcelain bonded (yellow)'},
    {id: 2, label: 'Precious porcelain bonded (white)'},
    {id: 3, label: 'Precious porcelain bonded (yellow)'},
    {id: 4, label: 'Non-precious porcelain bonded'},
    {id: 5, label: 'Full metal (white)'},
    {id: 6, label: 'Full metal (yellow)'},
    {id: 7, label: 'Others'},
  ]
  const shade = [
    {id: 1, label: 'A1'},
    {id: 2, label: 'A2'},
    {id: 3, label: 'A2.5'},
    {id: 4, label: 'A3'},
    {id: 5, label: 'A3.5'},
    {id: 6, label: 'A4'},
    {id: 7, label: 'B1'},
    {id: 8, label: 'B1.5'},
    {id: 9, label: 'B2'},
    {id: 10, label: 'B3'},
    {id: 11, label: 'B4'},
    {id: 12, label: 'C1'},
    {id: 13, label: 'C1.5'},
    {id: 14, label: 'C2'},
    {id: 15, label: 'C3'},
    {id: 16, label: 'C4'},
    {id: 17, label: 'D2'},
    {id: 18, label: 'D3'},
    {id: 19, label: 'D4'},
  ]

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const GENDER_OPTION = ['Men', 'Women', 'Kids'];
  const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));
  const { products, isLoading } = useSelector((state) => state.product);
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
  });
  const [tableData, setTableData] = useState([]);
  const[showChildTeeth, setShowChildTeeth]=useState(false);
  const NewUserSchema = Yup.object().shape({
    jobNo: Yup.string().required('jobNo is required'),
    labName: Yup.string().required('labName is required').email(),
    dueDate: Yup.string().required('dueDate is required'),
    workName: Yup.string().required('workName is required'),
    shade: Yup.string().required('shade is required'),
    alloyType: Yup.string().required('alloyType is required'),
    status: Yup.string().required('status is required'),
    teeth: Yup.string().required('teeth is required'),
    expense: Yup.string().required('expense is required'),
  });
  const defaultValues = useMemo(
    () => ({
      jobNo: currentWork?.jobNo || '',
      labName: currentWork?.labName || '',
      dueDate: currentWork?.dueDate || new Date(),
      workName: currentWork?.workName || '',
      shade: currentWork?.shade || '',
      alloyType: currentWork?.alloyType || '',
      status: currentWork?.status || '',
      teeth: currentWork?.teeth || '',
      expense: currentWork?.expense || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentWork]
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
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const newLabDefaultValues = useMemo(
    () => ({
      newLabName: newLabName || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newLabName]
  );

  const schemaNewLab = Yup.object().shape({
    newLabName: Yup.string().required('jobNo is required'),
  });

  const labMethods = useForm({
    resolver: yupResolver(schemaNewLab),
    newLabDefaultValues
  });

  const {control: controlNewLab, handleSubmit: handleSubmitNewLab, formState: {errors: errorsNewLab}} = labMethods
  

  const values = watch();

  useEffect(() => {
    dispatch(getAllLabWork());
    dispatch(getAllLabNames());
  },[dispatch])

  const { labworks } = useSelector((state) => state.labs);
  const { labNames } = useSelector((state) => state.labs);

  useEffect(() => {
    console.log(labworks)
    setLabTreatments(cookArrayForView(labworks))
    setNewLabNames(labNames)
  },[labworks, labNames])

  const cookArrayForView = (labworks) => {
    const category = labworks.filter(a => !a.parentId);
    const subCategory = labworks.filter(a => a.parentId);
    const updateCategory = category.map( (p, i) => {
      const newObj = {...p}
      Object.assign(newObj, {treatments:[], showForm: false})
      subCategory.forEach((c) => {
          if(newObj.categoryID === c.parentId){
            newObj.treatments.push(c) 
          }
      })
      return newObj
    })
    return updateCategory;
  }

  useEffect(() => {
    if (isEdit && currentWork) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentWork]);

  const toggleChildTeeth = () => {
    setShowChildTeeth(!showChildTeeth)
  }

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm)
  }

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const onNewLabSubmit = async (data) => {
    try {
      console.log(data)
      const payload = {
        labName: data.newLabName
      }
      dispatch(addLabName(payload))
      reset();
      setOpen(false);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
    //  navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
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
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });
  const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

  const [expanded, setExpanded] = useState('panel1');
  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const setWorkName = (treatment) => {
    setLabWorkName(treatment.title)
    console.log(treatment)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Card sx={{ p: 3, display: 'grid', rowGap: 3, }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  columnGap: 3,
                  rowGap: 5,
                  gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                }}
              >
                
                <RHFTextField name="jobNo" label="Job No" />
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={handleClickOpen}>
                    <Iconify icon={showAddForm? 'eva:close-circle-outline':'eva:plus-circle-outline'} />
                  </IconButton>
                  {newLabNames && newLabNames.length && (<RHFSelect name="labName" label="Lab Name" placeholder="Choose the Lab">
                    <option value="" />
                    {newLabNames.map((option) => (
                      <option key={option.id} value={option.labName}>
                        {option.labName}
                      </option>
                    ))}
                  </RHFSelect>)}
                </div>
                
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <MobileDateTimePicker
                      {...field}
                      label="Due Date"
                      inputFormat="dd/MM/yyyy"
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  )}
                />
              </Box>
              <RHFTextField name="workName" label="Work Name" value={labWorkName} />
              <RHFSelect name="selectShade" label="Please select Shade" placeholder="Please select Shade">
                <option value="" />
                {shade.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="selectAlloyType" label="Please select Alloy Type" placeholder="Please select Alloy Type">
                <option value="" />
                {alloy.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value="" />
                {status.map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <Typography variant="subtitle2" gutterBottom>
                Select Teeth
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ToothSelectionButton from={18} to={11}/>
                <ToothSelectionButton from={21} to={28}/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ToothSelectionButton from={48} to={41}/>
                <ToothSelectionButton from={31} to={38}/>
              </Box>
              <Button variant="text" onClick={toggleChildTeeth}> {showChildTeeth ? 'Hide' : 'Show'} child teeth</Button>
              
              {showChildTeeth?
              <>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ToothSelectionButton from={55} to={51}/>
                <ToothSelectionButton from={61} to={65}/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ToothSelectionButton from={85} to={81}/>
                <ToothSelectionButton from={71} to={75}/>
              </Box>
              </>: null}
              <RHFTextField
                  name="labExpense"
                  label="Lab Expense"
                  placeholder="0.00"
                  value={getValues('priceSale') === 0 ? '' : getValues('priceSale')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    type: 'number',
                  }}
                />
            </Box>
            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create User' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card sx={{ py: 5, px: 3, display: 'grid', rowGap: 2,  marginBottom: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Avatar alt='' src='' sx={{ mr: 2 }} />
            <Typography variant="subtitle2" noWrap>
              {currentPatient.patientName}
            </Typography>
          </Box>
            <Scrollbar>
            {labTreatments?.length && labTreatments.map((accordion) => (
              <Accordion onChange={handleChange(`panel${accordion.id}`)} expanded={expanded === `panel${accordion.id}`} key={accordion.id}>
                <AccordionSummary
                  expandIcon={<Iconify icon={'eva:arrow-ios-downward-fill'} width={20} height={20} />}
                >
                  <Typography variant="subtitle1">{accordion.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <MenuList>
                {accordion.treatments.map((treatment) => (
                  <MenuItem key={treatment.id} onClick={() => setWorkName(treatment)}>
                    <ListItemText>{treatment.title}</ListItemText>
                  </MenuItem>
                ))}
                </MenuList>
                </AccordionDetails>
              </Accordion>
            ))}
            </Scrollbar>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Lab Name</DialogTitle>
      <FormProvider methods={labMethods} onSubmit={handleSubmitNewLab(onNewLabSubmit)}>
        <DialogContent>
          
            <RHFTextField autoFocus name="newLabName" label="New Lab Name" fullWidth variant="standard"/>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
    </>
  );
}
// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  return tableData;
}