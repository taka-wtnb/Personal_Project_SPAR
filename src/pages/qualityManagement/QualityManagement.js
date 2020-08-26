import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import QualityManagementBarChart from '../../components/Charts/QualityManagementBarChart/QualityManagementBarChart';
import QualityManagementPieChart from '../../components/Charts/QualityManagementPieChart/QualityManagementPieChart';
import QualityBestTable from '../../components/Tables/QualityTables/QualityBestTable';
import QualityWorstTable from '../../components/Tables/QualityTables/QualityWorstTable';

import s from './QualityManagement.module.scss';

class QualityManagement extends React.Component {
  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <QualityManagementBarChart />
            </Col>
            <Col xl={5} xs={12}>
              <QualityManagementPieChart />
            </Col>
          </Row>
          <Row>
            <Col xl={6} xs={12}>     
              <QualityWorstTable />
            </Col>
            <Col xl={6} xs={12}>
              <QualityBestTable />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default QualityManagement;