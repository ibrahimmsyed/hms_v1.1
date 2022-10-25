import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState, SyntheticEvent } from 'react';
// @mui
import { Container, Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, TextField, TableContainer, Table, TableBody, InputAdornment, Checkbox, Button, Avatar, Accordion, AccordionSummary, AccordionDetails, MenuList, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList, _labTreatments } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { getAllLabWork } from '../../redux/slices/lab';
import { useDispatch, useSelector } from '../../redux/store';
// sections
import LabsNewEditForm from '../../sections/@dashboard/user/LabsNewEditForm';

// ----------------------------------------------------------------------

export default function LabsWork() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

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

  const cookArrayForView = (labworks) => {
    const category = labworks.filter(a => a.categoryID === 0);
    const subCategory = labworks.filter(a => a.categoryID !== 0);
    const updateCategory = category.map( (p, i) => {
      const newObj = {...p}
      Object.assign(newObj, {treatments:[]})
      subCategory.forEach((c) => {
          if(newObj.parentId === c.parentId){
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
        />

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
                  <MenuItem key={treatment.id}>
                    <ListItemText>{treatment.title}</ListItemText>
                  </MenuItem>
                ))}
                </MenuList>
                </AccordionDetails>
              </Accordion>
            ))}
          </Scrollbar>
      </Container>
    </Page>
  );
}
