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
import { styled, alpha } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useUsers from '../../hooks/useUsers';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import { useDispatch, useSelector } from '../../redux/store';
// _mock_
import { _userList, _userCards } from '../../_mock';
import { getLabDetails, updateLabDetail, deleteLabDetail } from '../../redux/slices/lab';
import { getPatientDetails } from '../../redux/slices/patient';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { DialogAnimate } from '../../components/animate';
import InputStyle from '../../components/InputStyle';
import PatientsDialog from '../../components/PatientsDialog';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import { LabsTableToolbar, LabOrdersTableRow } from '../../sections/@dashboard/user/list';
import { PatientCard } from '../../sections/@dashboard/user/cards';
// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['All Patients', 'Recently Visited', 'Recently Added'];

const STATUS = [
  {id:0 , label: 'all'},
  {id:1 , label: 'Sent'},
  {id:2 , label: 'In Production'},
  {id:3 , label: 'In Transit'},
  {id:4 , label: 'Received'}
]

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

  const [filterStatus, setFilterStatus] = useState('all');

  const [isOpen, setDialogState] = useState(false);

  const { labs } = useSelector((state) => state.labs);

  const { patients: _userCards } = useSelector((state) => state.patient);
  
  const { currentTab: filterLabName, onChangeTab: onChangeFilterStatus } = useTabs('all');

  useEffect(() => {
    dispatch(getPatientDetails());
    dispatch(getLabDetails());
  },[dispatch])

  useEffect(() => {
    const result = groupBy(labs, (lab) => moment(lab.created_at).format('DD-MM-YYYY'));
    
    setTableData(labs)
  },[labs])

  const handleFilterName = (filterPatientName) => {
    console.log(filterPatientName)
    setFilterPatientName(filterPatientName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    console.log(event.target.value)
    setFilterStatus(event.target.value);
  };

  const handleDeleteRow = (drow) => {
    const deleteRow = tableData.filter((row) => row.id !== drow.id);
    setSelected([]);
    setTableData(deleteRow);
    dispatch(deleteLabDetail(drow, drow.id));
  };

  const handleDeleteRows = (selected) => {
    const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.labs.edit(id));
  };

  const onStatusSelected = (row) => {
    dispatch(updateLabDetail(row, row.id))
    console.log(row)
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

  const handleClose = () => {
    setDialogState(false)
  }

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterPatientName,
    filterStatus,
    filterLabName,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterPatientName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterLabName);

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
            value={filterLabName}
            onChange={onChangeFilterStatus}
            sx={{ px: 2, bgcolor: 'background.neutral' }}
          />
          <Divider />
          <LabsTableToolbar
            filterPatientName={filterPatientName}
            filterStatus={filterStatus}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={STATUS}
          />

          <Scrollbar>
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
                      onDeleteRow={() => handleDeleteRow(row)}
                      onEditRow={() => handleEditRow(row.id)}
                      onStatusSelected={onStatusSelected}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Divider />
        </Card>
      </Container>
      <DialogAnimate fullWidth maxWidth="md" open={isOpen} onClose={onClose}>
        <IconButton
            size="small"
            onClick={() => handleClose()}
            sx={{
                top: 6,
                p: '2px',
                right: 6,
                position: 'absolute',
                color: 'common.white',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48),
                },
            }}
            >
            <Iconify icon={'eva:close-fill'} />
        </IconButton>
        <PatientsDialog patients={_userCards} url={'labs'}/>
      </DialogAnimate>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterPatientName, filterLabName, filterStatus }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterPatientName) {
    tableData = tableData.filter((item) => item.patientName.toLowerCase().indexOf(filterPatientName.toLowerCase()) !== -1 || item.jobId.toLowerCase().indexOf(filterPatientName.toLowerCase()) !== -1 || item.labName.toLowerCase().indexOf(filterPatientName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterLabName !== 'all') {
    tableData = tableData.filter((item) => item.labName === filterLabName);
  }

  return tableData;
}
