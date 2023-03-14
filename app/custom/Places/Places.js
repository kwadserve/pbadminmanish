import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import { Button, IconButton, Tooltip, TextField, DialogActions, Dialog,
   DialogContent, DialogTitle, DialogContentText } from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import styles from '../styles'
import Notification from '../Notification/Notification';

const url = 'https://pb.kwad.in/api/placeType'
var errVar = false
function Places(props) {
  const title = brand.name + ' - Places';
  const description = brand.desc;
  const { classes } = props;
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setError] = useState(false)
  const [add, setAdd] = useState(false);
  const [addData, setAddData] = useState({ type: '' })
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState({ id: 0, type: '' })
  const [del, setDelete] = useState(false);
  const [delData, setDelData] = useState({ id: 0 })

  const handleAdd = () => {
    setAdd(true);
    setAddData({ type: '' })
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
    if(addData.type == ''){
      setError(true)
      errVar = true
    } else {
      setError(false)
      errVar = false
    }
  }
  const submitAdd = () => {
    validateAdd()
    if(!errVar){
      fetch(url, {
        method: 'post',
        body: JSON.stringify({
          "type": addData.type
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setAdd(false);
      setOpen(true)
      setMsg('Place Type Added')
    }
  }

  const validateEdit = () => {
    if(editData.type == '' || editData.id == 0){
      setError(true)
      errVar = true
    } else {
      setError(false)
      errVar = false
    }
  }
  const submitEdit = () => {
    validateEdit()
    if(!errVar){
      fetch(url + '/edit', {
        method: 'post',
        body: JSON.stringify({
          "id": editData.id,
          "type": editData.type
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setEdit(false);
      setOpen(true)
      setMsg('Place Type Updated')
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
    setMsg('Place Type Deleted')
  }


  const columns = [
    {
      label: 'ID',
      name: 'id',
      options: {
        filter: false
      }
    },
    {
      label: 'Place',
      name: 'type',
      options: {
        filter: false,
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
                    setEditData({...editData, id : data[tableMeta.rowIndex].id, type : data[tableMeta.rowIndex].type})
                  }}>
                    <Edit />
                  </IconButton>
                </Tooltip>
              </span>
              <span>
                <Tooltip title={"Delete"}>
                  <IconButton onClick={() => {
                    setDelete(true);
                    setDelData({id : data[tableMeta.rowIndex].id})
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

  const [data, setData] = useState();

  const getApiData = async () => {
    const response = await fetch(url).then((response) => response.json());
  
    // update the state
    setData(response);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: true,
    rowsPerPage: 10,
    page: 0,
    customToolbar: () => {
      return (
        <span>
          <Tooltip title={"Add Place"}>
            <IconButton onClick={handleAdd}>
              <Add />
            </IconButton>
          </Tooltip>
        </span>
      )
    },
    selectableRows: 'none'
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.table}>
        { data && 
          <MUIDataTable
            title="List of Places"
            data={data}
            columns={columns}
            options={options}
          />
        }

        <Dialog fullWidth maxWidth="sm" className={classes.dialog}
          open={add} >
          <DialogTitle id="alert-dialog-title">
            {"Add New Place Type"}
          </DialogTitle>
          <DialogContent>
            <TextField id="type" label="Type" variant="outlined" fullWidth required
            {...(addData.type == '' && { error: true, helperText: 'Enter Place' })}
              onChange={(e) => {
                setAddData({type : e.target.value})
              }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={submitAdd}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth maxWidth="sm" className={classes.dialog}
          open={edit} >
          <DialogTitle id="alert-dialog-title">
            {"Edit Place Type"}
          </DialogTitle>
          <DialogContent>
            <TextField id="type" label="Type" variant="outlined" fullWidth required defaultValue={editData.type}
            {...(editData.type == '' && { error: true, helperText: 'Enter Place' })}
              onChange={(e) => {
                setEditData({...editData, type : e.target.value})
              }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={submitEdit}>Edit</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth maxWidth="sm" className={classes.dialog}
          open={del}
          onClose={handleClose} >
          <DialogTitle id="alert-dialog-title">
            {"Delete Place Type"}
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
    </div>
  );
}

Places.propTypes = {
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(Places));
