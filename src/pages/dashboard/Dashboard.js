import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import DashboardOpenOrderTable from '../../components/Tables/DashboardOpenOrderTable/DashboardOpenOrderTable';

import s from './Dashboard.module.scss';


class Dashboard extends React.Component {

  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={12} xs={12}>
              <DashboardOpenOrderTable />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;