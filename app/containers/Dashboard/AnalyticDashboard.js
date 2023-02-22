import React from 'react';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import {
  CounterChartWidget,
  SalesChartWidget,
  CounterIconsWidget,
  PerformanceChartWidget,
  DateWidget,
  TaskWidget,
  WeatherWidget,
  ContactWidget,
  TimelineWidget,
  FilesWidget, PieChartsWidget
} from 'enl-components';
import styles from './dashboard-jss';

function AnalyticDashboard(props) {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const { classes } = props;
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
      {/* 1st Section */}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          {/* <CounterIconsWidget /> */}
          <CounterChartWidget />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <SalesChartWidget />
      <Divider className={classes.divider} />
      <PieChartsWidget />
      <Divider className={classes.divider} />
      {/* 2nd Section */}
      <PerformanceChartWidget />
      <Divider className={classes.divider} />
      {/* 3rd Section */}
      
      <Divider className={classes.divider} />
      {/* <FilesWidget /> */}
    </div>
  );
}

AnalyticDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnalyticDashboard);
