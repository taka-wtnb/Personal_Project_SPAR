import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import s from './DashboardSpendingTable.module.scss';

import Widget from '../../Widget/Widget';

import { selectSupplier } from '../../../actions/change_supplier';
import { displaySupplier } from '../../../actions/selected_supplier';
import { selectMonths } from '../../../actions/dashboard_spending_table_months';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    displayedMonths: state.dashboard_spending_table_months.months,
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

class DashboardSpendingTable extends React.Component {

  _isUnmounted = false;
  _isFirstRender = true;
  _curSupplier = 0;
  _multipleTies = false;
  _singleTie = false;
  _orderAmount = -1;

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
        dropdownOpen: false,
        isStillFetching: true,
        dataForTable: [],
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

  getDataForTable(supplier, eventOrMonth) {
    if (supplier.supplier_name !== '') {
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

      let url = new URL("https://protected-fortress-25524.herokuapp.com/dashboardspendingtable");
      let params = {supplierId: supplier.id, start: startDate, end: endDate};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      fetch(url)
      .then(response => response.json())
      .then(data => !this._isUnmounted ? this.setState({ dataForTable: data, isStillFetching: false }) : null)
      .catch(err => console.log(err));
    }
  }

  render() {
    const { suppliers, isPending, selectedSupplier, displayedMonths } = this.props;

    let monthList = months.map((month, i) => {
        return (
          <DropdownItem key={i} value={month} onClick={(event) => {this.select(event); this.getDataForTable(suppliers[selectedSupplier], event);}}>{month}</DropdownItem>
        )
    });

    const createTableRows = () => {
      this._multipleTies = false;
      this._singleTie = false;

      let sortedItems = [];
      let itemList = [];
      if (this.state.dataForTable.length > 0) {
        itemList = this.state.dataForTable.map((data, i) => {
          let totalAmount = parseInt(data.total);
          return({
            itemNum: data.item_num,
            itemName: data.item_name,
            amount: totalAmount,
          });
        });
        
        itemList = itemList.sort(function (a, b) {
          return b.amount - a.amount;
        });          
      }

      for (let i=0; i<3; i++) {
        sortedItems.push(
          <tr key={i}>
            <td style={{ color:'#DDDDDD'}}>{(i > 0 && itemList.length > i+1 && itemList[i].amount === itemList[i-1].amount) ? (i === 2  && itemList[2].amount === itemList[0].amount? 1 : i) : i+1}</td>
            <td style={{ color:'#DDDDDD'}}>{(itemList.length > i+1) ? itemList[i].itemNum : 'N/A'}</td>
            <td style={{ color:'#DDDDDD'}}>{(itemList.length > i+1) ? itemList[i].itemName : 'N/A'}</td>
            <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{(itemList.length > i+1) ? itemList[i].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'N/A'}</td>
          </tr>
        );
      }

      if (itemList.length >= 5 && itemList[4].amount === itemList[2].amount) {
        this._multipleTies = true;
        this._orderAmount = itemList[4].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else if  (itemList.length >= 4 && itemList[3].amount === itemList[2].amount) {
        this._singleTie = true;
        this._orderAmount = itemList[3].amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

      return sortedItems;
    }

    return isPending ? 
      <div> </div> :
      (
        <Widget>
          <div className={s.root}>
              <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                  <h3 className="page-title"><span className="fw-semi-bold">Most Ordered Items (Top 3)</span></h3>
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
          <h5 style={{fontWeight: 'bold'}}>(By Total Ordered Amount)</h5>
          {(this._isFirstRender || this.didSupplierChange(selectedSupplier)) ? this.getDataForTable(suppliers[selectedSupplier], displayedMonths) : null }
          {this.detectFirstRender()}
          <div className={s.root}>
            <Widget>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th style={{ color:'#EEEEEE'}}>#</th>
                      <th style={{ color:'#EEEEEE'}}>Item Number</th>
                      <th style={{ color:'#EEEEEE'}}>Item Name</th>
                      <th style={{ color:'#EEEEEE',textAlign: 'center'}}>Amount <br /> ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.isStillFetching ? null : createTableRows()}
                  </tbody>
                </Table>
                { this._singleTie ? <div>Note: There is another item with the total amount of ${this._orderAmount} not displayed here.</div> : 
                  (this._multipleTies ? <div>Note: There are more items with the total amount of ${this._orderAmount} not displayed here.</div> : <div></div>) 
                }   
              </div>
            </Widget>
          </div>   
                                                                                                                                                                                                                                                                                                                     
        </Widget>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardSpendingTable);