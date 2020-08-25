import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import DashboardOpenOrderTable from '../../components/Tables/DashboardOpenOrderTable/DashboardOpenOrderTable';
import DashboardPendingQualityIssueTable from '../../components/Tables/DashboardPendingQualityIssueTable/DashboardPendingQualityIssueTable';

import s from './Dashboard.module.scss';


class Dashboard extends React.Component {

  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xs={12}>
              <DashboardOpenOrderTable />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <DashboardPendingQualityIssueTable />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;