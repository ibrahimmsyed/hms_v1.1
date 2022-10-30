import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
import * as Yup from 'yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Container, Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, TableContainer, Table, TableBody, InputAdornment, Checkbox, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';

// _mock_
import { _userList, _labTreatments } from '../../_mock';
// components
import SingleFieldForm from '../../components/SingleFieldForm';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField } from '../../components/hook-form';
import InputStyle from '../../components/InputStyle';

import lab, { getAllLabWork, addLabWorks } from '../../redux/slices/lab';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import LabsNewEditForm from '../../sections/@dashboard/user/LabsNewEditForm';

// ----------------------------------------------------------------------

export default function LabsWork() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState('panel1');

  const [labTreatments, setLabTreatments] = useState([]);

  const dispatch = useDispatch();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  

  useEffect(() => {
    dispatch(getAllLabWork());
  },[dispatch])

  const { labworks } = useSelector((state) => state.labs);

  useEffect(() => {
    console.log(labworks)
    setLabTreatments(cookArrayForView(labworks))
  },[labworks])

  const NewProcedureSchema = Yup.object().shape({
    parentId: Yup.string().required('This field is required and should not be repeat'),
  });

  const NewSubCategorySchema = Yup.object().shape({
    /* for(i = 0; i < labTreatments.length; i++ ){
      categoryId[i]: Yup.string().required('This field is required and should not be repeat'),
    } */
    // categoryId: Yup.string().required('This field is required'),
  });

  const [showAddForm, setShowAddForm] = useState(false); 
  const [expandedForm, setExpandedForm] = useState(false);

  const [currentNewWork, setCurrentNewWork] = useState({});
  const [currentSubNewWork, setCurrentSubNewWork] = useState({});
   
  const defaultValues = useMemo(
    () => ({
      parentId: currentNewWork?.parentId || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentNewWork]
  );
  const subDefaultValues = useMemo(
    () => ({
      categoryId: currentSubNewWork?.categoryId || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentSubNewWork]
  );

  const methods = useForm({
    resolver: yupResolver(NewProcedureSchema),
    defaultValues
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const subMethods = useForm({
    // resolver: yupResolver(),
    subDefaultValues
  });

  const {
    reset: reserSub,
    watch: watchSub,
    control: controlSub,
    setValue: setValueSub,
    handleSubmit: handleSubSubmit,
    formState: { isSubSubmitting },
  } = subMethods;

  



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

  const handleChange =
    (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  const handleMenuChange  = (e, panel: string) => {
    e.stopPropagation();
    // labTreatments = labTreatments.map(work => work.showForm = !work.showForm)
    const updateTreatments = [...labTreatments]
    const indexArr = updateTreatments.findIndex(x => x.id === panel);
    updateTreatments[indexArr].showForm = !updateTreatments[indexArr].showForm;
    setLabTreatments(updateTreatments)
    console.log(panel)
      // setExpandedForm(newExpanded ? panel : false);
    };
  const onSubmit = async (data) => {
    try {
      
      const payload = {
        "parentId": "",
        "categoryID": data.parentId.replace(' ','-').toLowerCase(),
        "title": data.parentId
      }
      dispatch(addLabWorks(payload));
      reset(defaultValues);
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  };

  const onSubSubmit = async (data) => {
    try {
      const payload = {
        "parentId": data.parentId,
        "categoryID": data.categoryId.replace(' ','-').toLowerCase(),
        "title": data.categoryId
      }
      dispatch(addLabWorks(payload));
      reset(defaultValues);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = () => {
    setShowAddForm(!showAddForm)
  }

  return (
    <Page title="Labs: Create a new lab work">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'All Lab Work' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Labs', href: PATH_DASHBOARD.user.list },
            { name: !isEdit ? 'Lab Work' : capitalCase(name) },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} width={20} height={20} />}
              onClick={handleToggle}
            >
              Add New Work
            </Button>
          }
        />

          <Scrollbar>
          {showAddForm && (<FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  p:5,
                  display: 'grid',
                  columnGap: 1,
                  rowGap: 1,
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                }}
              >
                <RHFTextField name="parentId" label="New Work" />
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save
                </LoadingButton>
              </Box>
            </FormProvider>)}
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
                  <MenuItem key={treatment.id}>
                    <ListItemText>{treatment.title}</ListItemText>
                  </MenuItem>
                ))}
                  <MenuItem onClick={(e) => { handleMenuChange(e, accordion.id);}}>
                    <ListItemText>+ Add New Item</ListItemText>
                  </MenuItem>
                  <MenuItem>
                  <SingleFieldForm onSubSubmit={onSubSubmit} id={accordion.id} parentId={accordion.categoryID}/>
                    {/* {accordion.showForm && (<FormProvider methods={subMethods} onSubmit={handleSubSubmit(onSubSubmit)}>
                      <Box
                        sx={{
                          p:5,
                          display: 'grid',
                          columnGap: 1,
                          rowGap: 1,
                          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                      >
                        <RHFTextField name={`categoryId-${accordion.title.replace(' ','-').toLowerCase()}`} label="New Sub Work" />
                        <LoadingButton type="submit" variant="contained" loading={isSubSubmitting}>
                          Save
                        </LoadingButton>
                      </Box>
                    </FormProvider>)} */}
                  </MenuItem>
                </MenuList>
                </AccordionDetails>
              </Accordion>
            ))}
          </Scrollbar>
      </Container>
    </Page>
  );
}
