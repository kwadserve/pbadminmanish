import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles'
import {
    Button, IconButton, Tooltip, DialogActions, Dialog, InputLabel, MenuItem, FormControl, Select,
    DialogContent, DialogTitle, DialogContentText, Grid, Tabs, Tab,
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

function AssignParking(props) {
    const title = 'Assign Parking';
    const description = brand.desc;
    const { classes } = props;
    const [assignedData, setAssignedData] = useState()
    const [unAssignedData, setUnAssignedData] = useState()
    const [assignParking, setAssignParking] = useState(
        {
            parking_id: 0,
            manager_id: 0,
            operator_id: 0,
        }
    )
    const [unAssignParking, setUnAssignParking] = useState(
        {
            id: 0,
            parking_id: 0,
        }
    )
    const [updateAssignParking, setUpdateAssignParking] = useState(
        {
            id: 0,
            manager_id: 0,
            operator_id: 0,
        }
    )
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDelete] = useState(false);
    const [operators, setOperators] = useState()
    const [managers, setManagers] = useState()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const getApiData = async () => {
        const response = await fetch('https://pb.kwad.in/api/unAssignedParkings').then((response) => response.json());
        const res = await fetch('https://pb.kwad.in/api/assignedParkings').then((response) => response.json());
        const resp = await fetch('https://pb.kwad.in/api/managers').then((response) => response.json());
        const op = await fetch('https://pb.kwad.in/api/operators').then((response) => response.json());

        // update the state
        setUnAssignedData(response);
        setAssignedData(res);
        setManagers(resp)
        setOperators(op)
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleClose = () => {
        setAdd(false);
        setEdit(false);
        setDelete(false);
    };
    const submitAdd = () => {
        fetch('https://pb.kwad.in/api/assignParking', {
            method: 'post',
            body: JSON.stringify({
                "parking_id": assignParking.parking_id,
                "manager_id": assignParking.manager_id,
                "operator_id": assignParking.operator_id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => getApiData())
        setAdd(false);
        setAssignParking({
            parking_id: 0,
            manager_id: 0,
            operator_id: 0,
        })
    }
    const submitEdit = () => {
        fetch('https://pb.kwad.in/api/assignedParkings/edit', {
            method: 'post',
            body: JSON.stringify({
                "id": updateAssignParking.id,
                "manager_id": updateAssignParking.manager_id,
                "operator_id": updateAssignParking.operator_id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => getApiData())
        setEdit(false);
        setUpdateAssignParking({
            id: 0,
            manager_id: 0,
            operator_id: 0,
        })
    }
    const submitDelete = () => {
        fetch('https://pb.kwad.in/api/unAssignParking', {
            method: 'post',
            body: JSON.stringify({
                "id": unAssignParking.id,
                "parking_id": unAssignParking.parking_id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).then((res) => getApiData())
        setDelete(false);
        setUnAssignParking({
            id: 0,
            parking_id: 0,
        })
    }

    const optionsAssign = {
        filterType: 'dropdown',
        responsive: 'vertical',
        print: true,
        rowsPerPage: 10,
        page: 0,
        selectableRows: 'none'
    }

    const optionsUnAssign = {
        filterType: 'dropdown',
        responsive: 'vertical',
        print: true,
        rowsPerPage: 10,
        page: 0,
        selectableRows: 'none'
    }

    const columnsAssign = [
        {
            label: 'ID',
            name: 'id',
            options: {
                filter: false
            }
        },
        {
            label: 'Operator',
            name: 'operator',
            options: {
                filter: false
            }
        },
        {
            label: 'Manager',
            name: 'manager',
            options: {
                filter: false,
            }
        },
        {
            label: 'Parking',
            name: 'parking',
            options: {
                filter: false,
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
            label: 'Address',
            name: 'address',
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
                                        updateAssignParking.id = assignedData[tableMeta.rowIndex].id
                                        updateAssignParking.manager_id = assignedData[tableMeta.rowIndex].manager_id
                                        updateAssignParking.operator_id = assignedData[tableMeta.rowIndex].operator_id
                                        setEdit(true);
                                    }}>
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                            </span>
                            <span>
                                <Tooltip title={"Unassign"}>
                                    <IconButton onClick={() => {
                                        setDelete(true);
                                        unAssignParking.id = assignedData[tableMeta.rowIndex].id
                                        unAssignParking.parking_id = assignedData[tableMeta.rowIndex].parking_id
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

    const columnsUnAssign = [
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
                filter: false,
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
            name: 'Action',
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const handleAssign = () => {
                        setAdd(true);
                        assignParking.parking_id = unAssignedData[tableMeta.rowIndex].id
                    }
                    return (
                        <div>
                            <span>
                                <Tooltip title={"Assign"}>
                                    <IconButton onClick={handleAssign}>
                                        <Add />
                                    </IconButton>
                                </Tooltip>
                            </span>
                        </div>
                    )
                }
            }
        },
    ];
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
            <div className={classes.root}>
                <Tabs value={value} onChange={handleChange} aria-label="assign parkings">
                    <Tab label="Assigned" {...a11yProps(0)} />
                    <Tab label="Unassigned" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {assignedData &&
                        <MUIDataTable
                            title="List of Parkings"
                            data={assignedData}
                            columns={columnsAssign}
                            options={optionsAssign}
                        />
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {unAssignedData &&
                        <MUIDataTable
                            title="List of Parkings"
                            data={unAssignedData}
                            columns={columnsUnAssign}
                            options={optionsUnAssign}
                        />
                    }
                </TabPanel>
            </div>

            <Dialog fullWidth={true} maxWidth="md"
                open={add}
                onClose={handleClose} >
                <DialogTitle id="alert-dialog-title">
                    {"Assign Parking"}
                </DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="managers-label">Manager</InputLabel>
                        <Select
                            labelId="managers-label"
                            id="managers"
                            label="Managers"
                            defaultValue=""
                            onChange={(e) => {
                                assignParking.manager_id = e.target.value
                            }}
                        >
                            {managers && managers.map(e => (<MenuItem value={e.id} key={e.id}>{e.firstName} {e.lastName}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="operators-label">Operator</InputLabel>
                        <Select
                            labelId="operators-label"
                            id="operators"
                            label="Operators"
                            defaultValue=""
                            onChange={(e) => {
                                assignParking.operator_id = e.target.value
                            }}
                        >
                            {operators && operators.map(e => (<MenuItem value={e.id} key={e.id}>{e.firstName} {e.lastName}</MenuItem>))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitAdd}>Assign</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth="sm"
                open={edit}
                onClose={handleClose} >
                <DialogTitle id="alert-dialog-title">
                    {"Update Assigned Parking"}
                </DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="managers-label">Managers</InputLabel>
                        <Select
                            labelId="managers-label"
                            id="managers"
                            defaultValue={updateAssignParking.manager_id}
                            label="Managers"
                            onChange={(e) => {
                                updateAssignParking.manager_id = e.target.value
                            }}
                        >
                            {managers && managers.map(e => (<MenuItem value={e.id} key={e.id}>{e.firstName} {e.lastName}</MenuItem>))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="operators-label">Operators</InputLabel>
                        <Select
                            labelId="operators-label"
                            id="operators"
                            defaultValue={updateAssignParking.operator_id}
                            label="Operators"
                            onChange={(e) => {
                                updateAssignParking.operator_id = e.target.value
                            }}
                        >
                            {operators && operators.map(e => (<MenuItem value={e.id} key={e.id}>{e.firstName} {e.lastName}</MenuItem>))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitEdit}>Update</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth="sm"
                open={del}
                onClose={handleClose} >
                <DialogTitle id="alert-dialog-title">
                    {"Unassign Parking"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure want to unassign?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitDelete}>Unassign</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

AssignParking.propTypes = {
    intl: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(AssignParking));
