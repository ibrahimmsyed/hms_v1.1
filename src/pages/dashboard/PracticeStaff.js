import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';


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
  DialogTitle,
  DialogActions,
  Typography
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useUsers from '../../hooks/useUsers';
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { useDispatch, useSelector } from '../../redux/store';
import { deleteUser } from '../../redux/slices/user';
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
import { DialogAnimate } from '../../components/animate';
// sections
import { UserTableToolbar, UserTableRow } from '../../sections/@dashboard/user/list';
import UserApiService from '../../services/User'

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all', 'active', 'in active'];

const ROLE_OPTIONS = [
  'all',
  'front office',
  'back office',
  'doctor',
  'admin'
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'lost_login', label: 'Last Login', align: 'left' },
  { id: 'action', label: 'Action', align: 'right'},
];
// ----------------------------------------------------------------------

export default function PracticeStaff() {
  const userApiService = new UserApiService();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user: users } = useUsers();
  
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

  useEffect(() => {
    if(users?.length) { 
      setTableData(users)
    }
  }, [users])

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const [id, setDeleteId] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('all');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };
  
  const openDialog = (id) => {
    setOpen(true);
    setDeleteId(id)
  };

  const handleDeleteRow = () => {
    console.log(id)
    dispatch(deleteUser(id));
    enqueueSnackbar('Deleted successfully');
    // const deleteRow = tableData.filter((row) => row.id !== id);
    // setSelected([]);
    // setTableData(deleteRow);
    setOpen(false);
  };
  const handleClose = (value: string) => {
    setOpen(false);
  };

  const handleDeleteRows = (selected) => {
    // const deleteRows = tableData.filter((row) => !selected.includes(row.id));
    // setSelected([]);
    // setTableData(deleteRows);
  };

  const handleEditRow = (id, name) => {
    navigate(PATH_DASHBOARD.user.edit(id));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return (
    <Page title="Practice Staff">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Practice Staff"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Practice Staff', href: PATH_DASHBOARD.user.root }
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.user.new}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New User
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
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab disableRipple key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            optionsRole={ROLE_OPTIONS}
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
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => openDialog(row.id)}
                      onEditRow={() => handleEditRow(row.id, row.username)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
        <DialogAnimate maxWidth={false}  open={open} onClose={handleClose} sx={{maxWidth: 860}}>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
              You are deleting the user. Once deleted you can't retrieve.
              Please confirm.
            </Typography>
            <Button onClick={handleDeleteRow} variant="contained">Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>          
        </DialogAnimate>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => (`${item.firstName} ${item.lastName}`).toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
  }

  if (filterStatus !== 'all') {
    tableData = filterStatus === 'active' ? tableData.filter((item) => item.isActive) : tableData.filter((item) => !item.isActive);
  }

  if (filterRole !== 'all') {
    switch(filterRole){
      case 'front office':
        tableData = tableData.filter((item) => item.isFrontOffice);
        break;
      case 'back office':
        tableData = tableData.filter((item) => item.isBackOffice);
        break;
      case 'doctor':
        tableData = tableData.filter((item) => item.isStaff);
        break;
      default:
        tableData = tableData.filter((item) => item.isSuperuser);
        break
    }
  }

  return tableData;
}
