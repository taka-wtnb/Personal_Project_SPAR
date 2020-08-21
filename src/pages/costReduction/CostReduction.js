import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';

import CostReductionLineChart from '../../components/Charts/CostReductionLineChart/CostReductionLineChart';
import OTDPieChart from '../../components/Charts/OTDPieChart/OTDPieChart';
import OTDBestTable from '../../components/Tables/OTDTables/OTDBestTable';
import OTDWorstTable from '../../components/Tables/OTDTables/OTDWorstTable';

import s from './CostReduction.module.scss';

class CostReduction extends React.Component {
  render() {
    return( 
      <div className={s.root}>
        <SupplierSelection />
        {/* <ItemSelection /> */}
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <CostReductionLineChart />
            </Col>
            <Col xl={5} xs={12}>
              <OTDPieChart />
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

export default CostReduction;