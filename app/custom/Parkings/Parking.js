import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, IconButton, Tooltip, TextField, DialogActions, Dialog, InputLabel, MenuItem, FormControl, Select,
  DialogContent, DialogTitle, DialogContentText, Grid
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';
import styles from '../styles'

const url = 'https://pb.kwad.in/api/parkings'

function Parking(props) {
  const title = brand.name + ' - Parkings';
  const description = brand.desc;
  let PMeta = []
  const { classes } = props;
  const [data, setData] = useState();
  const [placeType, setPlaceType] = useState();
  const [vehicleType, setVehicleType] = useState();
  const [add, setAdd] = useState(false);
  const [addData, setAddData] = useState(
    {
      name: '',
      placeType: 0,
      city: '',
      pin: '',
      state: '',
      address: '',
      latitude: '',
      longitude: '',
    }
  )
  const [addParkingMeta, setAddPM] = useState([])
  const [editParkingMeta, setEditPM] = useState()
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(
    {
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
    })
  const [del, setDelete] = useState(false);
  const [delData, setDelData] = useState({ id: 0 })

  const handleAdd = () => {
    setAdd(true);
    setAddData({
      name: '',
      placeType: 0,
      city: '',
      pin: '',
      state: '',
      address: '',
      latitude: '',
      longitude: '',
    })
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
  const submitAdd = () => {
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
  }
  const submitEdit = () => {
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
    setEditPM([])
    PMeta = []
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
                <div>
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
            editData.id = data[tableMeta.rowIndex].id
            editData.name = data[tableMeta.rowIndex].name
            editData.placeType = p[0].id
            editData.city = data[tableMeta.rowIndex].city
            editData.state = data[tableMeta.rowIndex].state
            editData.pin = data[tableMeta.rowIndex].pin
            editData.address = data[tableMeta.rowIndex].address
            editData.latitude = data[tableMeta.rowIndex].latitude
            editData.longitude = data[tableMeta.rowIndex].longitude
            
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
                    delData.id = data[tableMeta.rowIndex].id
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
          open={add}
          onClose={handleClose} >
          <DialogTitle id="alert-dialog-title">
            {"Add New Parking"}
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" variant="outlined" fullWidth
                onChange={(e) => {
                  addData.name = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="placeType-label">Place</InputLabel>
              <Select
                labelId="placeType-label"
                id="placeType"
                label="Place"
                defaultValue=""
                onChange={(e) => {
                  addData.placeType = e.target.value
                }}
              >
                {placeType && placeType.map(e => (<MenuItem value={e.id}>{e.type}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="city" label="city" variant="outlined" fullWidth
                onChange={(e) => {
                  addData.city = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="state" label="State" variant="outlined" fullWidth
                onChange={(e) => {
                  addData.state = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="address" label="Address" variant="outlined" fullWidth required
                onChange={(e) => {
                  addData.address = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="pin" label="PIN" variant="outlined" fullWidth required
                onChange={(e) => {
                  addData.pin = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="latitude" label="Latitude" variant="outlined" fullWidth required
                onChange={(e) => {
                  addData.latitude = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="longitude" label="Longitude" variant="outlined" fullWidth required
                onChange={(e) => {
                  addData.longitude = e.target.value
                }} />
            </FormControl>
            {vehicleType && vehicleType.map((val, i) => (
              <Grid container key={i}>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="vehicleType" label="Vehicle Type" variant="outlined" fullWidth required disabled
                      value={val.type} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="capacity" label="Capacity" variant="outlined" fullWidth required
                      onChange={(e) => {
                        addParkingMeta[i].capacity = e.target.value
                      }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="pricePerHour" label="PricePerHr" variant="outlined" fullWidth required
                      onChange={(e) => {
                        addParkingMeta[i].rate = e.target.value
                      }} />
                  </FormControl>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={submitAdd}>Add</Button>
          </DialogActions>
        </Dialog>

        <Dialog fullWidth maxWidth="sm"
          open={edit}
          onClose={handleClose} >
          <DialogTitle id="alert-dialog-title">
            {"Edit Parking"}
          </DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <TextField id="name" label="Name" variant="outlined" fullWidth required defaultValue={editData.name}
                onChange={(e) => {
                  editData.name = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="placeType-label">Place</InputLabel>
              <Select
                labelId="placeType-label"
                id="placeType"
                defaultValue={editData.placeType}
                label="Place"
                onChange={(e) => {
                  editData.placeType = e.target.value
                }}
              >
                {placeType && placeType.map(e => (<MenuItem value={e.id}>{e.type}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="city" label="City" variant="outlined" fullWidth required defaultValue={editData.city}
                onChange={(e) => {
                  editData.city = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="state" label="State" variant="outlined" fullWidth required defaultValue={editData.state}
                onChange={(e) => {
                  editData.state = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="pin" label="PIN" variant="outlined" fullWidth required defaultValue={editData.pin}
                onChange={(e) => {
                  editData.pin = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="address" label="Address" variant="outlined" fullWidth required defaultValue={editData.address}
                onChange={(e) => {
                  editData.address = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="latitude" label="Latitude" variant="outlined" fullWidth required defaultValue={editData.latitude}
                onChange={(e) => {
                  editData.latitude = e.target.value
                }} />
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField id="longitude" label="Longitude" variant="outlined" fullWidth required defaultValue={editData.longitude}
                onChange={(e) => {
                  editData.longitude = e.target.value
                }} />
            </FormControl>
            {editParkingMeta && editParkingMeta.map((val, i) => (
              <Grid container key={i}>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="vehicleType" label="Vehicle Type" variant="outlined" fullWidth required disabled
                      value={vehicleType && vehicleType.filter(entry => entry.id === val.type)[0].type} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="capacity" label="Capacity" variant="outlined" fullWidth required defaultValue={val.capacity}
                      onChange={(e) => {
                        editParkingMeta[i].capacity = e.target.value
                      }} />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl className={classes.formControl}>
                    <TextField id="pricePerHour" label="PricePerHr" variant="outlined" fullWidth required defaultValue={val.rate}
                      onChange={(e) => {
                        editParkingMeta[i].rate = e.target.value
                      }} />
                  </FormControl>
                </Grid>
              </Grid>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={submitEdit}>Update</Button>
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
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

Parking.propTypes = {
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(Parking));
