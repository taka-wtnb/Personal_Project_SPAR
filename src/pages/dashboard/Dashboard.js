import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import Widget from '../../components/Widget';
import ApexChart from 'react-apexcharts';

//import s from './Charts.module.scss';
import s from './Dashboard.module.scss';
import {chartData, liveChart, liveChartInterval} from './mock';
import Sparklines from '../../components/Sparklines';

import ReactEchartsCore from 'echarts-for-react/lib/core';

import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';
import { requestSuppliers } from '../../actions/suppliers';

exporting(Highcharts);
exportData(Highcharts);

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestSuppliers: () => dispatch(requestSuppliers())
  }
}

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      isFirstRender: true,
      supplierName: '',
      dropdownOpen: false,
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

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      supplierName: event.target.innerText,
      isFirstRender: false
    });
  }

  componentDidMount() {
    this.props.onRequestSuppliers();
  }

  componentWillUnmount() {
    clearInterval(liveChartInterval);
  }

  render() {
    const { suppliers, isPending } = this.props;

    let initialSupplierName = isPending ? '' : suppliers[0].supplier_name;

    let supplierList = isPending ? [] : suppliers.map((supplier, i) => {
      return (
        <DropdownItem key={i} onClick={this.select}>{supplier.supplier_name}</DropdownItem>
      )
    });

    const { cd, ld, initEchartsOptions, sparklineData } = this.state

    return isPending ? 
      <h1>Loading...</h1> :
      (
      <div className={s.root}>
        <div style={{display: "flex", alignItems: "center"}}>
          <h1 className="page-title"><span className="fw-semi-bold">{this.state.isFirstRender ? initialSupplierName : this.state.supplierName}</span></h1>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft: "40px", alignItems: "stretch"}}>
            <DropdownToggle caret className="fw-semi-bold text-inverse">
              {this.state.isFirstRender ? initialSupplierName : this.state.supplierName}
            </DropdownToggle>
            <DropdownMenu>
              {supplierList}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Row>
            <Col lg={7} xs={12}>
              <Widget
                title={<h5>Apex <span className='fw-semi-bold'>Column Chart</span></h5>}
                close collapse
              >
                <ApexChart 
                  className="sparkline-chart" 
                  height={350} 
                  series={cd.apex.column.series}
                  options={cd.apex.column.options}
                  type={"bar"}
                />
              </Widget>
            </Col>
            <Col lg={5} xs={12}>
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
            <Col lg={5} xs={12}>
              <Widget
                title={<h5>Highcharts <span className='fw-semi-bold'>Line Chart</span></h5>}
                close collapse
              >
                <HighchartsReact options={cd.highcharts.mixed}/>
                <h5 className="mt">Interactive <span className="fw-semi-bold">Sparklines</span></h5>
                <Row className="mt">
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini">Overall Values</h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines 
                          options={sparklineData.options2}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <div className="stats-row">
                      <div className="stat-item">
                        <p className="value5 fw-thin">34 567</p>
                        <h6 className="name text-muted m0 fs-mini">Overall Values</h6>
                      </div>
                      <div className="stat-item stat-item-mini-chart">
                        <Sparklines 
                          options={sparklineData.options1}
                          width={80}
                          height={25}
                          data={sparklineData.series}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </Widget>
            </Col>
            <Col lg={7} xs={12}>
              <Row>
                <Col lg={6} xs={12}>
                  <Widget
                    title={<h5>Apex <span className="fw-semi-bold">Monochrome Pie</span></h5>}
                    close collapse
                  >
                    <ApexChart 
                      className="sparkline-chart"
                      type={"pie"} 
                      height={200} 
                      series={cd.apex.pie.series}
                      options={cd.apex.pie.options}
                    />
                  </Widget>
                </Col>
                <Col lg={6} xs={12}>
                  <Widget
                    title={<h5>Chart <span className="fw-semi-bold">Donut Chart</span></h5>}
                    close collapse
                  >
                    <ReactEchartsCore
                      echarts={echarts}
                      option={cd.echarts.donut}
                      opts={initEchartsOptions}
                      style={{height: "170px"}}
                    />
                  </Widget>
                </Col>
                <Col lg={12} xs={12}>
                  <Widget
                    title={<h5>Highcharts <span className="fw-semi-bold">Live Chart</span></h5>}
                    close collapse
                  >
                    <HighchartsReact options={ld} />
                  </Widget>
                </Col>
              </Row>
            </Col>
            <Col lg={12} xs={12}>
              <Widget
                title={<h5>Echarts <span className="fw-semi-bold">River Chart</span></h5>}
                close collapse
              >
                <ReactEchartsCore
                  echarts={echarts}
                  option={cd.echarts.river}
                  opts={initEchartsOptions}
                  style={{height: "350px"}}
                />
              </Widget>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)