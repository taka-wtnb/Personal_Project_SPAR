import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Badge,
} from 'reactstrap';

import s from './CostReductionTables.module.scss';

import Widget from '../../Widget/Widget';

import ItemSelection from './ItemSelectionForCostReductionTable';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    selectedSupplier: state.selected_supplier.selectedSupplier,
    items: state.items.items,
    isItemPending: state.items.isPending,
    selectedItem: state.selected_cost_reduction_table_item.selectedItem,
  }
}

class CostReductionTable extends React.Component {

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

  didItemChange(item) {
    if (this._curItem !== item) {
      this._curItem = item;
      return true;
    }
    else {
      return false;
    }
  }

  getDataForTable(supplier, item) {
    if ((supplier.supplier_name !== '') && (item.item_num !== '')) {
      let startDate, endDate;

      let date = new Date();
      date.setDate(0);
      endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let today = new Date();
      startDate = new Date(today.getFullYear() - (today.getMonth() - 12 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
      startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();

      let url = new URL("http://localhost:3002/costreductiontable");
      let params = {supplierId: supplier.id, itemId: item.id, start: startDate, end: endDate};
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      fetch(url)
        .then(response => response.json())
        .then(data => !this._isUnmounted ? this.setState({ dataForTable: data, isStillFetching: false }) : null)
        .catch(err => console.log(err));
    }
  }

  render() {
    const { suppliers, isPending, selectedSupplier, items, isItemPending, selectedItem } = this.props;

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let curDate = new Date();

    let termOneStartMonth = monthNames[(curDate.getMonth() - 12 + 12) % 12];
    let termOneStartYear = (curDate.getFullYear() - (curDate.getMonth() - 11 > 0 ? 0 : 1)).toString().substr(-2);
    let termOneStart =  termOneStartMonth  + " '" + termOneStartYear; 

    let termOneEndMonth = monthNames[(curDate.getMonth() - 10 + 12) % 12];
    let termOneEndYear = (curDate.getFullYear() - (curDate.getMonth() - 9 > 0 ? 0 : 1)).toString().substr(-2);
    let termOneEnd =  termOneEndMonth  + " '" + termOneEndYear; 

    let termTwoStartMonth = monthNames[(curDate.getMonth() - 9 + 12) % 12];
    let termTwoStartYear = (curDate.getFullYear() - (curDate.getMonth() - 8 > 0 ? 0 : 1)).toString().substr(-2);
    let termTwoStart =  termTwoStartMonth  + " '" + termTwoStartYear; 

    let termTwoEndMonth = monthNames[(curDate.getMonth() - 7 + 12) % 12];
    let termTwoEndYear = (curDate.getFullYear() - (curDate.getMonth() - 6 > 0 ? 0 : 1)).toString().substr(-2);
    let termTwoEnd =  termTwoEndMonth  + " '" + termTwoEndYear; 

    let termThreeStartMonth = monthNames[(curDate.getMonth() - 6 + 12) % 12];
    let termThreeStartYear = (curDate.getFullYear() - (curDate.getMonth() - 5 > 0 ? 0 : 1)).toString().substr(-2);
    let termThreeStart =  termThreeStartMonth  + " '" + termThreeStartYear; 

    let termThreeEndMonth = monthNames[(curDate.getMonth() - 4 + 12) % 12];
    let termThreeEndYear = (curDate.getFullYear() - (curDate.getMonth() - 3 > 0 ? 0 : 1)).toString().substr(-2);
    let termThreeEnd =  termThreeEndMonth  + " '" + termThreeEndYear; 

    let termFourStartMonth = monthNames[(curDate.getMonth() - 3 + 12) % 12];
    let termFourStartYear = (curDate.getFullYear() - (curDate.getMonth() - 2 > 0 ? 0 : 1)).toString().substr(-2);
    let termFourStart =  termFourStartMonth  + " '" + termFourStartYear; 

    let termFourEndMonth = monthNames[(curDate.getMonth() - 1 + 12) % 12];
    let termFourEndYear = (curDate.getFullYear() - (curDate.getMonth() - 0 > 0 ? 0 : 1)).toString().substr(-2);
    let termFourEnd =  termFourEndMonth  + " '" + termFourEndYear; 

    const createTableRows = () => {
      
      const itemNum = items[selectedItem].item_num;
      const itemName = items[selectedItem].item_name;

      let tableRow = [];
      let firstTermVWAP = 'No Orders'; 
      let secondTermVWAP = 'No Orders';
      let thirdTermVWAP = 'No Orders';
      let fourthTermVWAP = 'No Orders';

      if (this.state.dataForTable.length > 0) {
        let date = new Date();
        date.setDate(0);
        let endDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        endDate = Date.parse(endDate);
  
        const today = new Date();  
        let firstTermStartDate = new Date(today.getFullYear() - (today.getMonth() - 12 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
        firstTermStartDate = firstTermStartDate.getFullYear() + "-" + (firstTermStartDate.getMonth() + 1) + "-" + firstTermStartDate.getDate();
        firstTermStartDate = Date.parse(firstTermStartDate);
        let secondTermStartDate = new Date(today.getFullYear() - (today.getMonth() - 9 > 0 ? 0 : 1), (today.getMonth() - 9 + 12) % 12, 1);
        secondTermStartDate = secondTermStartDate.getFullYear() + "-" + (secondTermStartDate.getMonth() + 1) + "-" + secondTermStartDate.getDate();
        secondTermStartDate = Date.parse(secondTermStartDate);
        let thirdTermStartDate = new Date(today.getFullYear() - (today.getMonth() - 6 > 0 ? 0 : 1), (today.getMonth() - 6 + 12) % 12, 1);
        thirdTermStartDate = thirdTermStartDate.getFullYear() + "-" + (thirdTermStartDate.getMonth() + 1) + "-" + thirdTermStartDate.getDate();
        thirdTermStartDate = Date.parse(thirdTermStartDate);
        let fourthTermStartDate = new Date(today.getFullYear() - (today.getMonth() - 3 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
        fourthTermStartDate = fourthTermStartDate.getFullYear() + "-" + (fourthTermStartDate.getMonth() + 1) + "-" + fourthTermStartDate.getDate();
        fourthTermStartDate = Date.parse(fourthTermStartDate);
  
        let firstTermOrders = [];
        let secondTermOrders = [];
        let thirdTermOrders = [];
        let fourthTermOrders = [];
  
        this.state.dataForTable.forEach((element) => {
          const orderDate = Date.parse(element.order_date);
          if (firstTermStartDate <= orderDate && orderDate < secondTermStartDate) {
            firstTermOrders.push(element);
          } else if (secondTermStartDate <= orderDate && orderDate < thirdTermStartDate) {
            secondTermOrders.push(element);
          } else if (thirdTermStartDate <= orderDate && orderDate < fourthTermStartDate) {
            thirdTermOrders.push(element);
          } else if (fourthTermStartDate <= orderDate && orderDate <= endDate) {
            fourthTermOrders.push(element);
          }
        });
  
        if (firstTermOrders.length > 0) {
          let firstTermOrderTotal = firstTermOrders.reduce((acc, cur) => {
            return acc + (parseInt(cur.unit_price) * parseInt(cur.qty));
          }, 0);
    
          let firstTermQtyTotal = firstTermOrders.reduce((acc, cur) => {
            return acc + parseInt(cur.qty);
          }, 0);
    
          firstTermVWAP = (firstTermOrderTotal / firstTermQtyTotal).toFixed(2);
        }
  
        if (secondTermOrders.length > 0) {
          let secondTermOrderTotal = secondTermOrders.reduce((acc, cur) => {
            return acc + (parseInt(cur.unit_price) * parseInt(cur.qty));
          }, 0);
    
          let secondTermQtyTotal = secondTermOrders.reduce((acc, cur) => {
            return acc + parseInt(cur.qty);
          }, 0);
    
          secondTermVWAP = (secondTermOrderTotal / secondTermQtyTotal).toFixed(2);
        }
  
        if (thirdTermOrders.length > 0) {
          let thirdTermOrderTotal = thirdTermOrders.reduce((acc, cur) => {
            return acc + (parseInt(cur.unit_price) * parseInt(cur.qty));
          }, 0);
    
          let thirdTermQtyTotal = thirdTermOrders.reduce((acc, cur) => {
            return acc + parseInt(cur.qty);
          }, 0);
    
          thirdTermVWAP = (thirdTermOrderTotal / thirdTermQtyTotal).toFixed(2);
        }
  
        if (fourthTermOrders.length > 0) {
          let fourthTermOrderTotal = fourthTermOrders.reduce((acc, cur) => {
            return acc + (parseInt(cur.unit_price) * parseInt(cur.qty));
          }, 0);
    
          let fourthTermQtyTotal = fourthTermOrders.reduce((acc, cur) => {
            return acc + parseInt(cur.qty);
          }, 0);
    
          fourthTermVWAP = (fourthTermOrderTotal / fourthTermQtyTotal).toFixed(2);
        }
      }

      tableRow.push(
        <tr key={0}>
          <td style={{ color:'#DDDDDD', fontWeight:'normal' }}>{itemNum}</td>
          <td style={{ color:'#DDDDDD', fontWeight:'normal' }}>{itemName}</td>
          <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{firstTermVWAP}</td>
          <td> {secondTermVWAP - firstTermVWAP > 0 ? <Badge color="danger" pill>Up</Badge> : (secondTermVWAP - firstTermVWAP === 0 ? <Badge color="gray" className="text-secondary" pill>No Change</Badge> : <Badge color="success" pill>Down</Badge>)}</td>
          <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{secondTermVWAP}</td>
          <td> {thirdTermVWAP - secondTermVWAP > 0 ? <Badge color="danger" pill>Up</Badge> : (secondTermVWAP - firstTermVWAP === 0 ? <Badge color="gray" className="text-secondary" pill>No Change</Badge> : <Badge color="success" pill>Down</Badge>)}</td>
          <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{thirdTermVWAP}</td>
          <td> {fourthTermVWAP - thirdTermVWAP > 0 ? <Badge color="danger" pill>Up</Badge> : (secondTermVWAP - firstTermVWAP === 0 ? <Badge color="gray" className="text-secondary" pill>No Change</Badge> : <Badge color="success" pill>Down</Badge>)}</td>
          <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{fourthTermVWAP}</td>
        </tr>
      );

      return tableRow;

    }

    return  (isPending || isItemPending) ?
      <div> </div> :
      (
        <Widget>
            <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <h3 className="page-title"><span className="fw-semi-bold">3-month Volume-Weighted Average Price (VWAP) Trend for Last 12 Months (by Item) </span></h3>
                </div>
            </div>
            <ItemSelection />
            {(this._isFirstRender || this.didSupplierChange(selectedSupplier) || this.didItemChange(selectedItem)) ? this.getDataForTable(suppliers[selectedSupplier], items[selectedItem]) : null }
            {this.detectFirstRender()}
            <div className={s.root}>
              <Widget>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        {/* <th style={{ color:'#EEEEEE'}}>#</th> */}
                        <th style={{ color:'#EEEEEE'}}>Item Number</th>
                        <th style={{ color:'#EEEEEE'}}>Item Name</th>
                        <th style={{ textAlign: 'center', color:'#1870DC'}}>{termOneStart} - {termOneEnd} <br /> VWAP ($)</th>
                        <th></th>
                        <th style={{ textAlign: 'center', color:'#14d3d3'}}>{termTwoStart} - {termTwoEnd} <br /> VWAP ($)</th>
                        <th></th>
                        <th style={{ textAlign: 'center', color:'#e671b8'}}>{termThreeStart} - {termThreeEnd} <br /> VWAP ($)</th>
                        <th></th>
                        <th style={{ textAlign: 'center', color:'#f0af03'}}>{termFourStart} - {termFourEnd} <br /> VWAP ($)</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.isStillFetching ? null : createTableRows()}
                    </tbody>
                  </Table>
                </div>
              </Widget>
            </div>                                                                                                                                                                                                                                                                                                                            
        </Widget>
    );
  }
}

export default connect(mapStateToProps)(CostReductionTable);