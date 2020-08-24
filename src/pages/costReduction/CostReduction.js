import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';

import CostReductionLineChart from '../../components/Charts/CostReductionLineChart/CostReductionLineChart';
import CostReductionPieChart from '../../components/Charts/CostReductionPieChart/CostReductionPieChart';
import CostReductionBestWorstTable from '../../components/Tables/CostReductionTable/CostReductionBestWorstTable';
import CostReductionTable from '../../components/Tables/CostReductionTable/CostReductionTable';

import s from './CostReduction.module.scss';

class CostReduction extends React.Component {
  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <CostReductionLineChart />
            </Col>
            <Col xl={5} xs={12}>
              <CostReductionPieChart />
            </Col>
          </Row>
          <CostReductionBestWorstTable />
          <Row>
            <Col xs={12}>
              <CostReductionTable />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default CostReduction;