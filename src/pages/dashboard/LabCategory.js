import { paramCase } from 'change-case';
import { useState, useEffect, useReducer } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {groupBy, map} from 'lodash'; 
import moment from 'moment'
// @mui
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  Typography,
  Stack,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import { useDispatch, useSelector } from '../../redux/store';
// _mock_
import { _userList, _userCards } from '../../_mock';
import { getLabDetails } from '../../redux/slices/lab';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { DialogAnimate } from '../../components/animate';
import InputStyle from '../../components/InputStyle';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import { LabsTableToolbar, LabOrdersTableRow } from '../../sections/@dashboard/user/list';
import { PatientCard } from '../../sections/@dashboard/user/cards';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['All Patients', 'Recently Visited', 'Recently Added'];

const ROLE_OPTIONS = [
  'all',
  'In Production',
  'In Transit',
  'Received',
  'Sent'
];

const TABLE_HEAD = [
  { id: 'jobNo', label: 'Job No.', align: 'left' },
  { id: 'patientName', label: 'Patient Name', align: 'left' },
  { id: 'doctorName', label: 'Doctor Name', align: 'left' },
  { id: 'name', label: 'Name', align: 'center' },
  { id: 'lab', label: 'Lab', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'dueDate', label: 'Due Date', align: 'left' },
  { id: 'labExpense', label: 'Lab Expense', align: 'left' },
  { id: 'action', label: 'Action', align: 'left' },
];

const isSearch = true

// ----------------------------------------------------------------------

export default function LabOrders() {
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
  } = useTable();

  const dispatch = useDispatch();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(_userList);

  const [filterPatientName, setFilterPatientName] = useState('');

  const [filterLabName, setFilterLabName] = useState('all');

  const [isOpen, setDialogState] = useState(false);

  const { labs } = useSelector((state) => state.labs);

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    dispatch(getLabDetails());
  },[dispatch])

  useEffect(() => {
    // const monthName = labs => moment(labs.created_at, 'YYYY-MM-DD').format('YYYY-MM-DD');
    // const result = groupBy(labs, moment('created_at').format('MMMM'));
    const result = groupBy(labs, (lab) => moment(lab.created_at).format('DD-MM-YYYY'));
    /* const result = labs.groupBy(v => moment(v.created_at).format('MMMM'))
        .mapValues(v => map(v, 'name'))
        .value(); */
    console.log(result)
    setTableData(labs)
  },[labs])

  const handleFilterName = (filterPatientName) => {
    setFilterPatientName(filterPatientName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterLabName(event.target.value);
  };

  const handleDeleteRow = (id) => {
    const deleteRow = tableData.filter((row) => row.id !== id);
    setSelected([]);
    setTableData(deleteRow);
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.labs.edit(paramCase(id)));
  };

  const handleAddNew = () => {
    setDialogState(true)
  }

  const onClose = () => {
    setDialogState(true)
  }

  const findPatients = () => {
    setDialogState(true)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterPatientName,
    filterLabName,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterPatientName) ||
    (!dataFiltered.length && !!filterLabName) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title="Lab: Orders">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lab Orders"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Lab', href: PATH_DASHBOARD.labs.orders },
            { name: 'orders' },
          ]}
          action={
            <Button
              variant="contained"
              // component={RouterLink}
              // to={PATH_DASHBOARD.labs.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              onClick={handleAddNew}
            >
              Add
            </Button>
          }
        />

        <Card>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          />
          <Divider />
          <LabsTableToolbar
            filterPatientName={filterPatientName}
            filterLabName={filterLabName}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
          />

          <Scrollbar>
            <Stack spacing={1.5} sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2">1 Sep, 2022</Typography>
            </Stack>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={tableData.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                  actions={
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <LabOrdersTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.name)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Divider />
          <Box sx={{ position: 'relative', textAlign: 'center', my: 1.5 }}>
          <LoadingButton type="submit" variant="contained" loading={false}>
            Show More
          </LoadingButton>
          </Box>
        </Card>
      </Container>
      <DialogAnimate fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
        <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={filterStatus}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
        </Tabs>
        <InputStyle
          stretchStart={240}
          value=""
          onChange={(event) => findPatients(event.target.value)}
          placeholder="Find patients..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{ my: 1 }}
        />
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            m: 2
          }}
        >
          {_userCards.map((user) => (
            <PatientCard key={user.id} user={user} isSearch/>
          ))}
        </Box>
      </DialogAnimate>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterPatientName, filterStatus, filterLabName }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterPatientName) {
    tableData = tableData.filter((item) => item.patientName.toLowerCase().indexOf(filterPatientName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterLabName !== 'all') {
    tableData = tableData.filter((item) => item.labName === filterLabName);
  }

  return tableData;
}
