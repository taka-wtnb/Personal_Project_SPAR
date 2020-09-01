import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import ApexChart from 'react-apexcharts';

import s from './CostReductionPieChart.module.scss';

import Widget from '../../Widget/Widget';

import { selectMonths } from '../../../actions/cost_reduction_pie_chart_months';

import ItemSelection from './ItemSelectionForCostReductionPieChart';

import chartData from './chartData';
import chartOptions from './chartOptions';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    displayedMonths: state.cost_reduction_pie_chart_months.months,
    selectedSupplier: state.selected_supplier.selectedSupplier,
    items: state.items.items,
    isItemPending: state.items.isPending,
    selectedItem: state.selected_cost_reduction_pie_chart_item.selectedItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectMonths: (event) => dispatch(selectMonths(event.target.value)),
  }
}

const months = [
    "Past 3 Months",
    "Past 6 Months",
    "Past 9 Months",
    "Past 12 Months",
];

class CostReductionPieChart extends React.Component {

  _isUnmounted = false;
  _isFirstRender = true;
  _curSupplier = 0;
  _curItem = 0;

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
        dropdownOpen: false,
        isStillFetching: true,
        dataForChart: [],
    }
  }

  componentDidMount() {
    this._isFirstRender = true;
  }

  componentWillUnmount() {
    this._isUnmounted = true;
  }

  toggle = () => {
    if(!this._isUnmounted) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      });
    }
  }

  select(event) {
    this.props.onSelectMonths(event);
    if(!this._isUnmounted) {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen,
      });
    }
  }

  detectFirstRender() {
    this._isFirstRender = false;
  }

  didSupplierChange(supplier) {
    if (this._curSupplier !== supplier) {
      this._curSupplier = supplier;
      return true;
    }
    else {
      return false;
    }
  }

  didItemChange(item) {
    if (this._curItem !== item) {
      this._curItem = item;
      return true;
    }
    else {
      return false;
    }
  }

  getDataForChart(supplier, itemList, itemIndex, eventOrMonth) {
    if ((supplier.supplier_name !== '') && (itemList.length > 0)) {
      let months = this._isFirstRender ? 'Past 12 Months' : (eventOrMonth.target != null ? eventOrMonth.target.value : eventOrMonth);
      let startDate, endDate;

      let date = new Date();
      date.setDate(0);
      endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let today = new Date();

      switch (months) {
        case "Past 3 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 2 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
          break;
        case "Past 6 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 5 > 0 ? 0 : 1), (today.getMonth() - 6 + 12) % 12, 1);
          break;
        case "Past 9 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 8 > 0 ? 0 : 1), (today.getMonth() - 9 + 12) % 12, 1);
          break;
        case "Past 12 Months":
          startDate = new Date(today.getFullYear() - (today.getMonth() - 11 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
          break;
        default:
          startDate = new Date(today.getFullYear() - (today.getMonth() - 11 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
          break;
      }

      startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();

      let url;
      let params;

      if (parseInt(itemIndex) === 0) {
        url = new URL("http://localhost:3002/costreductionpiechart");
        let params = {supplierId: supplier.id, start: startDate, end: endDate};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }
      else {
        url = new URL("http://localhost:3002/costreductionpiechartbyitem");
        params = {supplierId: supplier.id, itemId: itemList[itemIndex-1].id, start: startDate, end: endDate};
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      }   
      
      fetch(url)
      .then(response => response.json())
      .then(data => !this._isUnmounted ? this.setState({ dataForChart: data, isStillFetching: false }) : null)
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
          type={"pie"}
        />
      );
    }
  }

  render() {
    const { suppliers, isPending, selectedSupplier, displayedMonths, items, isItemPending, selectedItem } = this.props;

    let monthList = months.map((month, i) => {
        return (
          <DropdownItem key={i} value={month} onClick={(event) => {this.select(event); this.getDataForChart(suppliers[selectedSupplier], items, selectedItem, event);}}>{month}</DropdownItem>
        )
    });

    const getTotalCases = () => {
      let totalCases = this.state.dataForChart.map((data) => {
        return(
          parseInt(data.total)
        );
      });

      return totalCases.length > 0 ? totalCases.reduce( (acc, cur) => (acc + cur)) : 0;
    }

    return (isPending || isItemPending) ? 
      <div> </div> :
      (
        <Widget>
            <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <h3 className="page-title"><span className="fw-semi-bold">Price Increase Reasons</span></h3>
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
            <ItemSelection />
            {this.state.isStillFetching ? <div></div> : 
              <div className={s.root}>
                  <div style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
                      <h4 className="page-title"><span style={{color:'#FFFFFF', fontWeight:'bold'}}>Total: {getTotalCases()} Cases</span></h4>
                  </div>
              </div>
            }
            {(this._isFirstRender || this.didSupplierChange(selectedSupplier) || this.didItemChange(selectedItem)) ? this.getDataForChart(suppliers[selectedSupplier], items, selectedItem, displayedMonths) : null }
            {this.detectFirstRender()}
            {(this.state.dataForChart.length > 0) ? this.drawChart(this.state.dataForChart) : (this.state.isStillFetching ? <h1>Loading...</h1> : <h1>No Data</h1>)}
        </Widget>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CostReductionPieChart);