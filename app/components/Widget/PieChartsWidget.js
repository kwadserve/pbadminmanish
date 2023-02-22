import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import CardGiftcard from '@material-ui/icons/CardGiftcard';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import pink from '@material-ui/core/colors/pink';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { injectIntl, FormattedMessage } from 'react-intl';
import 'enl-styles/vendors/rechart/styles.css';
import {
    PieChart, Pie, Cell,
    Legend
} from 'recharts';
import { data2, data3 } from 'enl-api/chart/chartMiniData';
import colorfull from 'enl-api/palette/colorfull';
import messages from './messages';
import styles from './widget-jss';
import PapperBlock from '../PapperBlock/PapperBlock';

const colorsPie = [purple[500], blue[500], cyan[500], pink[500]];

function PieChartsWidget(props) {
  const { classes, intl } = props;
  return (
    <PapperBlock whiteBg noMargin title="Sales Charts" icon="timeline" desc="">
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <CardGiftcard className={classes.leftIcon} />
            
            Today’s Sale
          </Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.secondaryWrap}>
            <PieChart width={350} height={350}>
              <Pie
                data={data3}
                cx={150}
                cy={100}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                fill="#FFFFFF"
                paddingAngle={5}
                label
              >
                {
                  data3.map((entry, index) => <Cell key={index.toString()} fill={colorsPie[index % colorsPie.length]} />)
                }
              </Pie>
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            </PieChart>
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          <Typography className={classes.smallTitle} variant="button">
            <CardGiftcard className={classes.leftIcon} />
            
            Sales of PB Pass
          </Typography>
          <Divider className={classes.divider} />
          <Grid container className={classes.secondaryWrap}>
            <PieChart width={350} height={350}>
              <Pie
                data={data2}
                cx={150}
                cy={100}
                dataKey="value"
                innerRadius={40}
                outerRadius={80}
                fill="#FFFFFF"
                paddingAngle={5}
                label
              >
                {
                  data2.map((entry, index) => <Cell key={index.toString()} fill={colorsPie[index % colorsPie.length]} />)
                }
              </Pie>
              <Legend iconType="circle" verticalALign="bottom" iconSize={10} />
            </PieChart>
          </Grid>
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

PieChartsWidget.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default withStyles(styles)(injectIntl(PieChartsWidget));
