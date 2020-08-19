import React from 'react';

import {
  Row,
  Col,
} from 'reactstrap';

import SupplierSelection from '../../components/SupplierSelection/SupplierSelection';
import DashboardOTDChart from '../../components/Charts/OTDLineChart/OTDLineChart';
import Widget from '../../components/Widget';

//import s from './Charts.module.scss';
import s from './Dashboard.module.scss';
import {chartData, liveChart, liveChartInterval} from './mock';

import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cd: chartData,
      ld: liveChart,
      initEchartsOptions: {
        renderer: 'canvas'
      },
      sparklineData: {
        series: [{data: [1,7,3,5,7,8]}],
        options1: {
          colors: ['#ffc247'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        },
        options2: {
          colors: ['#ffc0d9'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    }
  }

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { cd, initEchartsOptions } = this.state

    return( 
      <div className={s.root}>
        <SupplierSelection />
        <div>
          <Row>
            <Col xl={7} xs={12}>
              <DashboardOTDChart />
            </Col>
            <Col xl={5} xs={12}>
              <Widget
                title={<h5>Echarts <span className='fw-semi-bold'>Line Chart</span></h5>}
                close collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.line}
                  opts={initEchartsOptions}
                  style={{height: "365px"}}
                />
              </Widget>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Dashboard;