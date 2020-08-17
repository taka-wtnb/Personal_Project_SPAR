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
import chartData from './chartData';
import chartOptions from './chartOptions';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    displayedMonths: state.dashboard_otd_chart_months.months,
    // isSupplierSelected: state.change_supplier.isSupplierSelected,
    selectedSupplier: state.selected_supplier.selectedSupplier,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSupplier: () => dispatch(selectSupplier()),
    onDisplaySupplier: (event) => dispatch(displaySupplier(event.target.innerText)),
    onSelectMonths: (event) => dispatch(selectMonths(event.target.value)),
  }
}

const months = [
    "Past 3 Months",
    "Past 6 Months",
    "Past 9 Months",
    "Past 12 Months",
];

class DashboardOTDChart extends React.Component {

  _isMounted = true;

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
        dropdownOpen: false,
        dataForChart: [],
    }
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggle = () => {
    if (this._isMounted) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  }

  select(event) {
    // this.props.onSelectSupplier();
    if (this._isMounted) {
      this.props.onSelectMonths(event);
      this.setState({
          dropdownOpen: !this.state.dropdownOpen,
      });
    }
  }

  getDataForChart(supplier, months) {
    if (supplier.supplier_name !== '') {

      let startDate, endDate;

      let date = new Date();
      date.setDate(0);
      endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let today = new Date();

      switch (months) {
        case "Past 3 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 3 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
        case "Past 6 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 6 > 0 ? 0 : 1), (today.getMonth() - 6 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
        case "Past 9 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 9 > 0 ? 0 : 1), (today.getMonth() - 9 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
        case "Past 12 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 12 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
        default:
          startDate = new Date(today.getFullYear() - (today.getMonth() - 3 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
      }

      let url = new URL("http://localhost:3002/otdchart");
      let params = {supplierId: supplier.id, start: startDate, end: endDate};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      fetch(url)
      .then(response => response.json())
      .then(this._isMounted ? (data => this.setState({ dataForChart: data })) : console.log(''))
      .catch(err => console.log(err));
    }
  }

  drawChart(data) {
    if (data.length > 0) {
      return(
        <ApexChart 
          className="sparkline-chart" 
          height={350} 
          series={chartData(data)}
          options={chartOptions(data)}
          type={"line"}
        />
      );
    }

  }

  render() {
//    console.log(cloud);
    const { suppliers, isPending, selectedSupplier, displayedMonths } = this.props;
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
                    <h3 className="page-title"><span className="fw-semi-bold">On-Time Delivery Performance</span></h3>
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
            {this.getDataForChart(suppliers[selectedSupplier], displayedMonths)}
            {this.drawChart(this.state.dataForChart)}
        </Widget>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOTDChart);