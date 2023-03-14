import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, IconButton, Tooltip, TextField, DialogActions, Dialog, InputLabel, MenuItem, FormControl, Select,
  DialogContent, DialogTitle, DialogContentText, Grid, FormHelperText
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import styles from '../styles'
import Notification from '../Notification/Notification';

const url = 'https://pb.kwad.in/api/parkings'
const initialAdd = {
  name: '',
  placeType: 0,
  city: '',
  pin: '',
  state: '',
  address: '',
  latitude: '',
  longitude: '',
}
const initialEdit = {
  id: 0,
  name: '',
  placeType: 0,
  city: '',
  pin: '',
  state: '',
  address: '',
  latitude: '',
  longitude: '',
  meta: '',
}
const initialAddPM = []
var errVar = false
function Parking(props) {
  const title = brand.name + ' - Parkings';
  const description = brand.desc;
  let PMeta = []
  const { classes } = props;
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setError] = useState(false)
  const [data, setData] = useState();
  const [placeType, setPlaceType] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [add, setAdd] = useState(false);
  const [addData, setAddData] = useState(initialAdd)
  const [addParkingMeta, setAddPM] = useState([])
  const [editParkingMeta, setEditPM] = useState()
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(initialEdit)
  const [del, setDelete] = useState(false);
  const [delData, setDelData] = useState({ id: 0 })

  const handleAdd = () => {
    setAdd(true);
    setAddData(initialAdd)
    vehicleType.map((e, i) => { setAddPM(oldData => [...oldData, { type: e.id, capacity: 0, rate: 0 }]) })
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
    if(addData.name == '' || addData.placeType == 0 || addData.city == '' || addData.state == '' || addData.pin == '' || addData.address == '' || addData.latitude == '' || addData.longitude == ''){
      setError(true)
      errVar = true
    } else {
      setError(false)
      errVar = false
    }
  }
  const submitAdd = () => {
    validateAdd()
    console.log(err)
    if(!errVar){
      fetch(url, {
        method: 'post',
        body: JSON.stringify({
          "name": addData.name,
          "placeType": addData.placeType,
          "city": addData.city,
          "state": addData.state,
          "pin": addData.pin,
          "address": addData.address,
          "latitude": addData.latitude,
          "longitude": addData.longitude,
          "meta": addParkingMeta,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setAdd(false);
      setAddPM([])
      setOpen(true)
      setMsg('Parking Added')
    }        
  }
  const validateEdit = () => {
    if(editData.id == 0 || editData.name == '' || editData.placeType == 0 || editData.city == '' || editData.state == '' || editData.pin == '' || editData.address == '' || editData.latitude == '' || editData.longitude == ''){
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
          "name": editData.name,
          "placeType": editData.placeType,
          "city": editData.city,
          "state": editData.state,
          "pin": editData.pin,
          "address": editData.address,
          "latitude": editData.latitude,
          "longitude": editData.longitude,
          "meta": editParkingMeta,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((res) => getUpdatedApiData())
      setEdit(false);
      setOpen(true)
      setMsg('Parking Updated')
      setEditPM([])
      PMeta = []
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
    setMsg('Parking Deleted')
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
      label: 'Name',
      name: 'name',
      options: {
        filter: false
      }
    },
    {
      label: 'Place',
      name: 'placeType',
      options: {
        filter: true,
      }
    },
    {
      label: 'City',
      name: 'city',
      options: {
        filter: true
      }
    },
    {
      label: 'State',
      name: 'state',
      options: {
        filter: true
      }
    },
    {
      label: 'PIN',
      name: 'pin',
      options: {
        filter: false
      }
    },
    {
      label: 'Address',
      name: 'address',
      options: {
        filter: false,
      }
    },
    {
      label: 'Latitude',
      name: 'latitude',
      options: {
        filter: false,
      }
    },
    {
      label: 'Longitude',
      name: 'longitude',
      options: {
        filter: false,
      }
    },
    {
      label: 'Details',
      name: 'meta',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {data[tableMeta.rowIndex].meta.map((val, index) => (
                <div key={index}>
                  <span><strong>Type:</strong> {vehicleType && vehicleType.filter(entry => entry.id === val.vehicle_type)[0].type}</span>
                  <span> | <strong>Capacity:</strong> {val.capacity} | </span>
                  <span><strong>Rate:</strong> {val.rate}</span>
                </div>
              ))}
            </div>
          )
        }
      }
    },
    {
      name: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          const handleEditClick = () => {            
            const p = placeType.filter(entry => { if (entry.type === data[tableMeta.rowIndex].placeType) return entry.id })
            setEditData({
              id : data[tableMeta.rowIndex].id,
              name : data[tableMeta.rowIndex].name,
              placeType : p[0].id,
              city : data[tableMeta.rowIndex].city,
              state : data[tableMeta.rowIndex].state,
              pin : data[tableMeta.rowIndex].pin,
              address : data[tableMeta.rowIndex].address,
              latitude : data[tableMeta.rowIndex].latitude,
              longitude : data[tableMeta.rowIndex].longitude,
            })
            
            data[tableMeta.rowIndex].meta.map((val, index) => {
              PMeta.push({type: val.vehicle_type, capacity: val.capacity, rate: val.rate})              
            })

            vehicleType.map((e, i) => {
              if(PMeta.filter(entry => entry.type === e.id).length === 0)
              PMeta.push({type: e.id, capacity: 0, rate: 0})
            })
            
            setEditPM(PMeta)
            setEdit(true);
          }
          return (
            <div>
              <span>
                <Tooltip title={"Edit"}>
                  <IconButton onClick={handleEditClick}>
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

  const getApiData = async () => {
    const response = await fetch(url).then((response) => response.json());
    const placeTypes = await fetch('https://pb.kwad.in/api/placeType').then((response) => response.json());
    const vehicleTypes = await fetch('https://pb.kwad.in/api/vehicleType').then((response) => response.json());

    // update the state
    setData(response);
    setPlaceType(placeTypes);
    setVehicleType(vehicleTypes);
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
          <Tooltip title={"Add Parking"}>
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
        {data &&
          <MUIDataTable
            title="List of Parkings"
            data={data}
            columns={columns}
            options={options}
          />
        }

        <Dialog fullWidth={true} maxWidth="md"
          open={add} >
          <DialogTitle id="alert-dialog-title">
            {"Add New Parking"}
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" variant="outlined" fullWidth
              {...(addData.name == '' && { error: true, helperText: 'Enter Parking Name' })}
                onChange={(e) => {
                  setAddData({...addData, name : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}
              {...(addData.placeType == '' && { error: true })}
            >
              <InputLabel id="placeType-label">Place</InputLabel>
              <Select
                labelId="placeType-label"
                id="placeType"
                label="Place"
                defaultValue=""
                onChange={(e) => {
                  setAddData({...addData, placeType : e.target.value})
                }}
              >
                {placeType && placeType.map(e => (<MenuItem value={e.id} key={e.id}>{e.type}</MenuItem>))}
              </Select>
              { addData.placeType == '' &&
                <FormHelperText>Select Place</FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="city" label="city" variant="outlined" fullWidth
              {...(addData.city == '' && { error: true, helperText: 'Enter City' })}
                onChange={(e) => {
                  setAddData({...addData, city : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="state" label="State" variant="outlined" fullWidth
              {...(addData.state == '' && { error: true, helperText: 'Enter State' })}
                onChange={(e) => {
                  setAddData({...addData, state : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="address" label="Address" variant="outlined" fullWidth required
              {...(addData.address == '' && { error: true, helperText: 'Enter Address' })}
                onChange={(e) => {
                  setAddData({...addData, address : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="pin" label="PIN" variant="outlined" fullWidth required
              {...(addData.pin == '' && { error: true, helperText: 'Enter PIN' })}
                onChange={(e) => {
                  setAddData({...addData, pin : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="latitude" label="Latitude" variant="outlined" fullWidth required
              {...(addData.latitude == '' && { error: true, helperText: 'Enter Latitude' })}
                onChange={(e) => {
                  setAddData({...addData, latitude : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="longitude" label="Longitude" variant="outlined" fullWidth required
              {...(addData.longitude == '' && { error: true, helperText: 'Enter Longitude' })}
                onChange={(e) => {
                  setAddData({...addData, longitude : e.target.value})
                }} />
            </FormControl>
            {vehicleType && vehicleType.map((val, i) => (
              <Grid container key={i} spacing={1}>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="vehicleType" label="Vehicle Type" variant="outlined" fullWidth required disabled
                      value={val.type} />
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="capacity" label="Capacity" variant="outlined" fullWidth required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(e) => {
                        setAddPM(oldData => ([
                          ...oldData.slice(0,i),
                          {
                            ...oldData[i],
                            capacity : e.target.value
                          }
                        ]))
                        // addParkingMeta[i].capacity = e.target.value
                        //console.log(addParkingMeta)
                      }} />
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="pricePerHour" label="PricePerHr" variant="outlined" fullWidth required
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(e) => {
                        setAddPM(oldData => ([
                          ...oldData.slice(0,i),
                          {
                            ...oldData[i],
                            rate : e.target.value
                          }
                        ]))
                      }} />
                  </FormControl>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={submitAdd}>Add</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth maxWidth="sm"
          open={edit} >
          <DialogTitle id="alert-dialog-title">
            {"Edit Parking"}
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" variant="outlined" fullWidth required defaultValue={editData.name}
              {...(editData.name == '' && { error: true, helperText: 'Enter Parking Name' })}
                onChange={(e) => {
                  setEditData({...editData, name : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}
              {...(editData.placeType == '' && { error: true })}
            >
              <InputLabel id="placeType-label">Place</InputLabel>
              <Select
                labelId="placeType-label"
                id="placeType"
                defaultValue={editData.placeType}
                label="Place"
                onChange={(e) => {
                  setEditData({...editData, placeType : e.target.value})
                }}
              >
                {placeType && placeType.map(e => (<MenuItem value={e.id} key={e.id}>{e.type}</MenuItem>))}
              </Select>
              { editData.placeType == '' &&
                <FormHelperText>Select Place</FormHelperText>
              }
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="city" label="City" variant="outlined" fullWidth required defaultValue={editData.city}
              {...(editData.city == '' && { error: true, helperText: 'Enter City' })}
                onChange={(e) => {
                  setEditData({...editData, city : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="state" label="State" variant="outlined" fullWidth required defaultValue={editData.state}
              {...(editData.state == '' && { error: true, helperText: 'Enter State' })}
                onChange={(e) => {
                  setEditData({...editData, state : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="pin" label="PIN" variant="outlined" fullWidth required defaultValue={editData.pin}
              {...(editData.pin == '' && { error: true, helperText: 'Enter PIN' })}
                onChange={(e) => {
                  setEditData({...editData, pin : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="address" label="Address" variant="outlined" fullWidth required defaultValue={editData.address}
              {...(editData.address == '' && { error: true, helperText: 'Enter Address' })}
                onChange={(e) => {
                  setEditData({...editData, address : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="latitude" label="Latitude" variant="outlined" fullWidth required defaultValue={editData.latitude}
              {...(editData.latitude == '' && { error: true, helperText: 'Enter Latitude' })}
                onChange={(e) => {
                  setEditData({...editData, latitude : e.target.value})
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="longitude" label="Longitude" variant="outlined" fullWidth required defaultValue={editData.longitude}
              {...(editData.longitude == '' && { error: true, helperText: 'Enter Longitude' })}
                onChange={(e) => {
                  setEditData({...editData, longitude : e.target.value})
                }} />
            </FormControl>
            {editParkingMeta && editParkingMeta.map((val, i) => (
              <Grid container key={i} spacing={1}>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="vehicleType" label="Vehicle Type" variant="outlined" fullWidth required disabled
                      value={vehicleType && vehicleType.filter(entry => entry.id === val.type)[0].type} />
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="capacity" label="Capacity" variant="outlined" fullWidth required defaultValue={val.capacity}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(e) => {
                        setEditPM(oldData => ([
                          ...oldData.slice(0,i),
                          {
                            ...oldData[i],
                            capacity : e.target.value
                          }
                        ]))
                      }} />
                  </FormControl>
                </Grid>
                <Grid item md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="pricePerHour" label="PricePerHr" variant="outlined" fullWidth required defaultValue={val.rate}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(e) => {
                        setEditPM(oldData => ([
                          ...oldData.slice(0,i),
                          {
                            ...oldData[i],
                            rate : e.target.value
                          }
                        ]))
                      }} />
                  </FormControl>
                </Grid>
              </Grid>
            ))}
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
            {"Delete Parking"}
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

Parking.propTypes = {
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(Parking));
