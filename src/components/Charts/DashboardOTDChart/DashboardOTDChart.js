import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import ApexChart from 'react-apexcharts';

//import s from './Charts.module.scss';
import s from './DashboardOTDChart.module.scss';

import Widget from '../../Widget/Widget';

import { selectSupplier } from '../../../actions/change_supplier';
import { displaySupplier } from '../../../actions/selected_supplier';
import { selectMonths } from '../../../actions/dashboard_otd_chart_months';

//import cloud from "../../images/cloud.svg";
// import download from "../../images/cloud.png";
import chartOptions from './chartOptions';
import config from './config';

const colors = config.chartColors;

let columnColors = [colors.blue, colors.green, colors.orange, colors.red, colors.default, colors.gray, colors.teal, colors.pink];
//let lineColors = [colors.blue, colors.green, colors.orange];

const mapStateToProps = (state) => {
  return {
//    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    displayedMonths: state.dashboard_otd_chart_months.months,
    // isSupplierSelected: state.change_supplier.isSupplierSelected,
    // selectedSupplier: state.selected_supplier.selectedSupplier,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSupplier: () => dispatch(selectSupplier()),
    onDisplaySupplier: (event) => dispatch(displaySupplier(event.target.innerText)),
    onSelectMonths: (event) => dispatch(selectMonths(event.target.value)),
  }
}

const chartData = {
    apex: {
      column: {
        series: [{
          data: [21, 22, 10, 28, 16, 21, 13, 30]
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: '<img src="/static/media/cloud.809bd319.svg" height="30" width="30"/>' | true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                customIcons: []
              }
            }
          },
          colors: columnColors,
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true
            }
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            categories: ['John', 'Joe', 'Jake', 'Amber', 'Peter', 'Mary', 'David', 'Lily'],
            labels: {
              style: {
                colors: columnColors,
                fontSize: '14px'
              }
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            }
          },
          yaxis: {
            labels: {
              style: {
                color: colors.textColor,
              }
            }
          },
          tooltip: {
            theme: 'dark'
          },
          grid: {
            borderColor: colors.gridLineColor
          }
        }
      },
      pie: {
        series: [25, 15, 44, 55, 41, 17],
        options: {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          theme: {
            monochrome: {
              enabled: true,
              color: colors.blue,
            }
          },
          stroke: {
            show: false,
            width: 0
          },
          legend: false,
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
      }
    },
}

const months = [
    "Past 3 Months",
    "Past 6 Months",
    "Past 9 Months",
    "Past 12 Months",
    // "Past 24 Months",
    // "Past 36 Months",
    // "Past 48 Months",
    // "Past 60 Months"
];

class DashboardOTDChart extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
        dropdownOpen: false,
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  select(event) {
    // this.props.onSelectSupplier();
    this.props.onSelectMonths(event);
    this.setState({
        dropdownOpen: !this.state.dropdownOpen,
    });
  }

  drawChart(supplierName, months) {
    if (supplierName !== '') {

    }
  }

  render() {
//    console.log(cloud);
    const { isPending, selectedSupplier, displayedMonths } = this.props;
    //const { suppliers, isPending, isSupplierSelected, selectedSupplier } = this.props;

    // let initialSupplierName = isPending ? '' : suppliers[0].supplier_name;

    // let supplierList = isPending ? [] : suppliers.map((supplier, i) => {
    //   return (
    //     <DropdownItem key={i} onClick={this.select}>{supplier.supplier_name}</DropdownItem>
    //   )
    // });

    let monthList = months.map((month, i) => {
        return (
          <DropdownItem key={i} value={month} onClick={this.select}>{month}</DropdownItem>
        )
    });

    return isPending ? 
      <div> </div> :
      (
        <Widget>
            <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <h3 className="page-title"><span className="fw-semi-bold">On-Time Delivery (%)</span></h3>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft: "40px", alignItems: "stretch"}}>
                    <DropdownToggle caret className="fw-semi-bold text-inverse">
                        {displayedMonths}
                    </DropdownToggle>
                    <DropdownMenu>
                        {monthList}
                    </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            {this.drawChart(selectedSupplier, displayedMonths)}
            <ApexChart 
                className="sparkline-chart" 
                height={350} 
                series={chartData.apex.column.series}
                options={chartOptions()}
                type={"line"}
            />
        </Widget>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOTDChart);