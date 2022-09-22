import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@mui/styles';
import faker from 'faker';
// material
import {
  Card,
  Table,
  Stack,
  CircularProgress,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  IconButton
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import {
  DepartmentListHead,
  DepartmentListToolbar,
  DepartmentMoreMenu
} from '../../components/_dashboard/department';
//
import { userList, userDelete } from '../../DAL/User/User';
import { baseUri } from '../../config/config';

// ============================================ styling=========================

const useStyles = makeStyles(() => ({
  loading: {
    marginLeft: '50%',
    marginTop: '20%'
  }
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'no', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'image', label: 'Image', alignRight: false },
  { id: 'price', label: 'Email', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  if (b.id < a.id) {
    return -1;
  }
  if (b.id > a.id) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.first_name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [iswaiting, setIswaiting] = useState(true);
  const [selectedRow, setRowData] = useState();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [opendialog, setOpenDialog] = React.useState(false);

  const handleDeleteTeam = async (data) => {
    setData([]);
    const result = await userDelete(data._id);
    if (result.code === 200) {
      // setData(result.Team_member_list);
      handleCloseDialog();
      await fetchListing();
    } else {
      handleCloseDialog();
      enqueueSnackbar(result.message, { variant: 'error' });
      await fetchListing();
    }
  };

  const handleOpenDialog = (data) => {
    setOpenDialog(true);
    setRowData(data);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    // if (event.target.checked) {
    //   const newSelecteds = USERLIST.map((n) => n.name);
    //   setSelected(newSelecteds);
    //   return;
    // }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const fetchListing = async () => {
    const result = await userList();
    if (result.code === 200) {
      setData(result.data);
      setIswaiting(false);
    } else {
      setIswaiting(false);
      enqueueSnackbar(result.message, { variant: 'error' });
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  if (iswaiting) {
    return <CircularProgress className={classes.loading} color="primary" />;
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Demo App">
      <Container>
        {/* <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/user/add_user')}
            startIcon={<Icon icon={plusFill} />}
          >
            Add User
          </Button>
        </Stack>

        <Card>
          {/* <DepartmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <DepartmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {/* {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, role, status, avatarUrl, isVerified } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return ( */}
                  {filteredUsers.map((x, i) => (
                    <TableRow
                      hover
                      key={i}
                      tabIndex={-1}
                      role="checkbox"
                      // selected={isItemSelected}
                      // aria-checked={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell> */}
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell component="th" scope="row" padding="normal">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {/* <Avatar alt={name} src={avatarUrl} /> */}
                          <Typography variant="subtitle2" noWrap>
                            {x.first_name}{" "}{x.last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {' '}
                        <Avatar src={`https://picsum.photos/800/600?random=${i}`} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="normal">
                            {x.email}
                      </TableCell>
                      <TableCell align="right">
                        <DepartmentMoreMenu isUserData={x} onOpenDeleteDialog={handleOpenDialog} />
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[50, 100, 150]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Dialog open={opendialog} onClose={handleCloseDialog}>
          <DialogTitle>Are you sure you want to delete this user ?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={() => handleDeleteTeam(selectedRow)}>Yes, Delete</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Page>
  );
}
