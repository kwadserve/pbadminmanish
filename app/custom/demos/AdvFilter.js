import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';
import {
  Button, IconButton, Tooltip, TextField, DialogActions, Dialog,
  DialogContent, DialogTitle, DialogContentText, FormControl, Snackbar, SnackbarContent, Grid,

} from '@material-ui/core';
import { Add, Delete, Edit, Error, Close } from '@material-ui/icons';
import styles from '../styles'
import Notification from '../Notification/Notification';
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/


const url = 'https://pb.kwad.in/api/users'
const initialAdd = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  mobile: '',
}
const initialEdit = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  mobile: '',
}
var errConst = false
function AdvFilter(props) {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setError] = useState(false)
  const [add, setAdd] = useState(false);
  const [addData, setAddData] = useState(initialAdd)
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(initialEdit)
  const [del, setDelete] = useState(false);
  const [delData, setDelData] = useState({ id: 0 })

  const handleAdd = () => {
    setAdd(true)
    setAddData(initialAdd)
  };

  const getUpdatedApiData = () => {
    fetch(url).then((response) => response.json()).then((data) => setData(data));
  };

  const handleClose = () => {
    setAdd(false);
    setEdit(false);
    setDelete(false);
  };
  const validateAdd = () => {
    if (addData.firstName == '' || addData.lastName == '' || addData.email == '' || addData.password == '' || addData.mobile == '') {
      setError(true)
      errConst = true
    } else {
      setError(false)
      errConst = false
    }
  }
  const submitAdd = () => {
    validateAdd()
    if (!errConst) {
      fetch(url, {
        method: 'post',
        body: JSON.stringify({
          "firstName": addData.firstName,
          "lastName": addData.lastName,
          "email": addData.email,
          "password": addData.password,
          "mobile": addData.mobile,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setAdd(false);
      setOpen(true)
      setMsg('New User Added')
    }
  }
  const validateEdit = () => {
    if(editData.firstName == '' || editData.lastName == '' || editData.email == '' || editData.mobile == ''){
      setError(true)
      errConst = true
    } else {
      setError(false)
      errConst = false
    }
  }
  const submitEdit = () => {
    validateEdit()
    if(!errConst){
      fetch(url + '/edit', {
        method: 'post',
        body: JSON.stringify({
          "id": editData.id,
          "firstName": editData.firstName,
          "lastName": editData.lastName,
          "email": editData.email,
          "mobile": editData.mobile,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setEdit(false);
      setOpen(true)
      setMsg('User Updated')
    }
  }
  const submitDelete = () => {
    fetch(url + '/delete', {
      method: 'post',
      body: JSON.stringify({
        "id": delData.id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }).then((res) => getUpdatedApiData())
    setDelete(false);
    setOpen(true)
    setMsg('User Deleted')
  }

  const getApiData = async () => {
    const response = await fetch(url).then((response) => response.json());

    // update the state
    setData(response);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const columns = [
    {
      label: 'ID',
      name: 'id',
      options: {
        filter: false
      }
    },
    {
      label: 'First Name',
      name: 'firstName',
      options: {
        filter: true
      }
    },
    {
      label: 'Last Name',
      name: 'lastName',
      options: {
        filter: true
      }
    },
    {
      label: 'Email',
      name: 'email',
      options: {
        filter: true,
      }
    },
    {
      label: 'Mobile',
      name: 'mobile',
      options: {
        filter: false,
      }
    },
    {
      label: 'Status',
      name: 'status',
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 'active') {
            return (<Chip label="Active" color="secondary" />);
          }
          if (value === 'non-active') {
            return (<Chip label="Non Active" color="primary" />);
          }
          return (<Chip label="Unknown" />);
        }
      }
    },
    {
      label: 'Block',
      name: 'isBlocked',
      options: {
        filter: true,
        customBodyRender: (value) => {
          if (value === 'true') {
            return (<Chip label="Unblock" color="secondary" />);
          }
          if (value === 'false') {
            return (<Chip label="Block" color="primary" />);
          }
          return (<Chip label="Unknown" />);
        }
      }
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <span>
                <Tooltip title={"Edit"}>
                  <IconButton onClick={() => {
                    setEdit(true);
                    setEditData({
                      id: data[tableMeta.rowIndex].id,
                      firstName: data[tableMeta.rowIndex].firstName,
                      lastName: data[tableMeta.rowIndex].lastName,
                      email: data[tableMeta.rowIndex].email,
                      mobile: data[tableMeta.rowIndex].mobile
                    })
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </span>
              <span>
                <Tooltip title={"Delete"}>
                  <IconButton onClick={() => {
                    setDelete(true);
                    setDelData({ id: data[tableMeta.rowIndex].id })
                  }}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              </span>
            </div>
          )
        }
      }
    },
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    customToolbar: () => {
      return (
        <span>
          <Tooltip title={"Add User"}>
            <IconButton onClick={handleAdd}>
              <Add />
            </IconButton>
          </Tooltip>
        </span>
      )
    },
    selectableRows: 'none'
  };

  const { classes } = props;

  return (
    <div className={classes.table}>
      {data &&
        <MUIDataTable
          title="Users list"
          data={data}
          columns={columns}
          options={options}
        />
      }

      <Dialog fullWidth maxWidth="sm" scroll='body'
        open={add}
        onClose={handleClose} >
        <DialogTitle id="alert-dialog-title">
          {"Add New User"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <FormControl className={classes.formControl}>
                <TextField id="firstName" label="First Name" variant="outlined" fullWidth required
                  {...(addData.firstName == '' && { error: true, helperText: 'Enter FirstName' })}
                  onChange={(e) => {
                    setAddData({ ...addData, firstName: e.target.value })
                  }} />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl className={classes.formControl}>
                <TextField id="lastName" label="Last Name" variant="outlined" fullWidth required
                  {...(addData.lastName == '' && { error: true, helperText: 'Enter LastName' })}
                  onChange={(e) => {
                    setAddData({ ...addData, lastName: e.target.value })
                  }} />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl className={classes.formControl}>
            <TextField id="email" label="Email" type="email" variant="outlined" fullWidth required
            {...(addData.email == '' && { error: true, helperText: 'Enter Email' })}
              onChange={(e) => {
                setAddData({ ...addData, email: e.target.value })
              }} />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField id="password" label="Password" type="password" variant="outlined" fullWidth required
            {...(addData.password == '' && { error: true, helperText: 'Enter Password' })}
              onChange={(e) => {
                setAddData({ ...addData, password: e.target.value })
              }} />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField id="mobile" label="Mobile" variant="outlined" fullWidth required
            {...(addData.mobile == '' && { error: true, helperText: 'Enter Mobile' })}
              onChange={(e) => {
                setAddData({ ...addData, mobile: e.target.value })
              }} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitAdd}>Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="sm"
        open={edit} >
        <DialogTitle id="alert-dialog-title">
          {"Edit User"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item md={6}>
              <FormControl className={classes.formControl}>
                <TextField id="firstName" label="First Name" variant="outlined" fullWidth required defaultValue={editData.firstName}
                  onChange={(e) => {
                    setEditData({ ...editData, firstName: e.target.value })
                  }}
                  {...(editData.firstName == '' && { error: true, helperText: 'Enter FirstName' })} />
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <FormControl className={classes.formControl}>
                <TextField id="lastName" label="Last Name" variant="outlined" fullWidth required defaultValue={editData.lastName}
                  onChange={(e) => {
                    setEditData({ ...editData, lastName: e.target.value })
                  }}
                  {...(editData.lastName == '' && { error: true, helperText: 'Enter LastName' })} />
              </FormControl>
            </Grid>
          </Grid>
          <FormControl className={classes.formControl}>
            <TextField id="email" label="Email" variant="outlined" fullWidth required defaultValue={editData.email}
              onChange={(e) => {
                setEditData({ ...editData, email: e.target.value })
              }}
              {...(editData.email == '' && { error: true, helperText: 'Enter Email' })} />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField id="mobile" label="Mobile" variant="outlined" fullWidth required defaultValue={editData.mobile}
              onChange={(e) => {
                setEditData({ ...editData, mobile: e.target.value })
              }}
              {...(editData.mobile == '' && { error: true, helperText: 'Enter Mobile' })} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitEdit}>Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog fullWidth maxWidth="sm"
        open={del}
        onClose={handleClose} >
        <DialogTitle id="alert-dialog-title">
          {"Delete User"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={submitDelete}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Notification open={open} message={msg} close={setOpen}/>
    </div>
  );
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
