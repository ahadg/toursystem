import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Alert } from 'react-bootstrap';

const myAlert = ({alerts}) =>
 alerts !== null && alerts.length > 0 && alerts.map(alert => (
    <Alert key={alert.id} variant={`${alert.alerttype}`}>
      {alert.msg}
    </Alert>

))


const mapStatetoProps = state => ({
  // getting alerts from state.alert
    alerts : state.alertreducer
});
export default connect(mapStatetoProps)(myAlert);