import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import QualityManagementLineChart from '../../components/Charts/QualityManagementLineChart/QualityManagementLineChart';
import QualityManagementPieChart from '../../components/Charts/QualityManagementPieChart/QualityManagementPieChart';
import OTDBestTable from '../../components/Tables/OTDTables/OTDBestTable';
import OTDWorstTable from '../../components/Tables/OTDTables/OTDWorstTable';

import s from './QualityManagement.module.scss';

class QualityManagement extends React.Component {
  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <QualityManagementLineChart />
            </Col>
            <Col xl={5} xs={12}>
              <QualityManagementPieChart />
            </Col>
          </Row>
          <Row>
            <Col xl={6} xs={12}>
              <OTDBestTable />
            </Col>
            <Col xl={6} xs={12}>
              <OTDWorstTable />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default QualityManagement;