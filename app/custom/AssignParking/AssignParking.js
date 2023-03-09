import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl } from 'react-intl';
import { PapperBlock } from 'enl-components';
import MUIDataTable from 'mui-datatables';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles'

function AssignParking(props) {
    const title = 'Assign Parking';
    const description = brand.desc;
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
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="assign parkings">
                        <Tab label="Assigned" {...a11yProps(0)} />
                        <Tab label="Unassigned" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </div>
        </div>
    );
}

AssignParking.propTypes = {
    intl: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(AssignParking));
