import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import {
  Button, IconButton, Tooltip, Chip
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import styles from '../styles'

const url = 'https://pb.kwad.in/api/bookings'

function BookedParking(props) {
  const title = brand.name + ' - Bookings';
  const description = brand.desc;
  const { classes } = props;
  const [data, setData] = useState();

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
      label: 'User',
      name: 'user',
      options: {
        filter: true
      }
    },
    {
      label: 'Vehicle Type',
      name: 'vehicleType',
      options: {
        filter: true
      }
    },
    {
      label: 'Parking',
      name: 'parking',
      options: {
        filter: true
      }
    },
    {
      label: 'PIN',
      name: 'pin',
      options: {
        filter: true,
      }
    },
    {
      label: 'Charges',
      name: 'charges',
      options: {
        filter: false,
      }
    },
    {
      label: 'In Time',
      name: 'start_time',
      options: {
        filter: false,
      }
    },
    {
      label: 'Out Time',
      name: 'end_time',
      options: {
        filter: false,
      }
    },
    {
      label: 'Booked',
      name: 'created_at',
      options: {
        filter: false,
      }
    },
    {
      label: 'Status',
      name: 'status',
      options: {
        filter: true,
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
                <Tooltip title={"View"}>
                  <IconButton onClick={() => {}}>
                    <Edit />
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
            title="Bookings list"
            data={data}
            columns={columns}
            options={options}
          />
        }
      </div>
    </div>
  );
}

BookedParking.propTypes = {
  intl: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default injectIntl(withStyles(styles)(BookedParking));
