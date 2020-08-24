import React from 'react';
import { connect } from 'react-redux';

import {
  Row,
  Col,
  Table,
} from 'reactstrap';

import s from './CostReductionTables.module.scss';

import Widget from '../../Widget/Widget';

import { selectSupplier } from '../../../actions/change_supplier';
import { displaySupplier } from '../../../actions/selected_supplier';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    selectedSupplier: state.selected_supplier.selectedSupplier,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSupplier: () => dispatch(selectSupplier()),
    onDisplaySupplier: (event) => dispatch(displaySupplier(event.target.innerText)),
  }
}


class CostReductionBestTable extends React.Component {

  _isUnmounted = false;
  _isFirstRender = true;
  _curSupplier = 0;
  _multipleTies = false;
  _singleTie = false;
  _otdNum = -1;
  _multipleTiesReversed = false;
  _singleTieReversed = false;
  _otdNumReversed = -1;

  constructor(props) {
    super(props);
    this.state = {
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

  getDataForTable(supplier) {
    if (supplier.supplier_name !== '') {

      let today = new Date();

      let startDateOld = new Date(today.getFullYear() - (today.getMonth() - 5 > 0 ? 0 : 1), (today.getMonth() - 6 + 12) % 12, 1);
      startDateOld = startDateOld.getFullYear() + "-" + (startDateOld.getMonth() + 1) + "-" + startDateOld.getDate();

      let startDateNew = new Date(today.getFullYear() - (today.getMonth() - 2 > 0 ? 0 : 1), (today.getMonth() - 3 + 12) % 12, 1);
      startDateNew = startDateNew.getFullYear() + "-" + (startDateNew.getMonth() + 1) + "-" + startDateNew.getDate();

      let date = new Date();
      date.setDate(0);
      let endDateNew = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

      let url = new URL("http://localhost:3002/costreductionbestworsttable");
      let params = {supplierId: supplier.id, oldStart: startDateOld, newStart: startDateNew, newEnd: endDateNew, };
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      fetch(url)
      .then(response => response.json())
      .then(data => !this._isUnmounted ? this.setState({ dataForTable: data, isStillFetching: false }) : null)
      .catch(err => console.log(err));
    }
  }

  render() {
    const { suppliers, isPending, selectedSupplier } = this.props;

    const createTableRows = () => {

      this._multipleTies = false;
      this._singleTie = false;
      this._multipleTiesReversed = false;
      this._singleTieReversed = false;

      let tableRowsArray = [];
      let sortedItems = [];
      let reversedSortedItems = [];
      let baseItemList = [];
      let itemList = [];
      let reversedItemList = [];

      if (this.state.dataForTable.length > 0) {
        
        this.state.dataForTable.forEach(element => {
          if(element.oldid === element.newid) {
            let vwapOld = parseFloat(element.oldvwap);
            let vwapNew = parseFloat(element.newvwap);
            let changeRate = (((vwapNew - vwapOld) / vwapOld) * 100).toFixed(2);

            baseItemList.push({
              itemNum: element.item_num,
              itemName: element.item_name,
              change: changeRate,
            });
          }
        });

        if (baseItemList.length > 0) {
          itemList = baseItemList.sort(function (a, b) {
            return b.change - a.change;
          });
          

        }
      }

      for (let i=0; i<3; i++) {
        sortedItems.push(
          <tr key={i}>
            <td style={{ color:'#DDDDDD'}}>{(i > 0 && itemList.length > i+1 && itemList[i].change === itemList[i-1].change) ? (i === 2  && itemList[2].change === itemList[0].change? 1 : i) : i+1}</td>
            <td style={{ color:'#DDDDDD'}}>{(itemList.length > i+1) ? itemList[i].itemNum : 'N/A'}</td>
            <td style={{ color:'#DDDDDD'}}>{(itemList.length > i+1) ? itemList[i].itemName : 'N/A'}</td>
            <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{(itemList.length > i+1) ? itemList[i].change : 'N/A'}</td>
          </tr>
          );
      }

      if (itemList.length >= 5 && itemList[4].change === itemList[2].change) {
        this._multipleTies = true;
        this._otdNum = itemList[4].change;
      } else if  (itemList.length >= 4 && itemList[3].change === itemList[2].change) {
        this._singleTie = true;
        this._otdNum = itemList[3].change;
      }

      reversedItemList = baseItemList.reverse();

      for (let i=0; i<3; i++) {
        reversedSortedItems.push(
          <tr key={i}>
            <td style={{ color:'#DDDDDD'}}>{(i > 0 && reversedItemList.length > i+1 && reversedItemList[i].change === reversedItemList[i-1].change) ? (i === 2  && reversedItemList[2].change === reversedItemList[0].change? 1 : i) : i+1}</td>
            <td style={{ color:'#DDDDDD'}}>{(reversedItemList.length > i+1) ? reversedItemList[i].itemNum : 'N/A'}</td>
            <td style={{ color:'#DDDDDD'}}>{(reversedItemList.length > i+1) ? reversedItemList[i].itemName : 'N/A'}</td>
            <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{(reversedItemList.length > i+1) ? reversedItemList[i].change : 'N/A'}</td>
          </tr>
          );
      }

      if (reversedItemList.length >= 5 && reversedItemList[4].change === reversedItemList[2].change) {
        this._multipleTiesReversed = true;
        this._otdNumReversed = reversedItemList[4].change;
      } else if  (reversedItemList.length >= 4 && reversedItemList[3].change === reversedItemList[2].change) {
        this._singleTieReversed = true;
        this._otdNumReversed = reversedItemList[3].change;
      }

      tableRowsArray.push(sortedItems);
      tableRowsArray.push(reversedSortedItems);

      return tableRowsArray;
    }

    return isPending ? 
      <div> </div> :
      (
        <Row>
          <Col xl={6} xs={12}>
            <Widget>
              <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                  <h3 className="page-title"><span className="fw-semi-bold">Top 3 <span style={{ color:'#F45722' }}>Price-Increase</span> Items <p style={{ fontSize: '0.65em', fontWeight:'normal', color:'#AAAAAA' }}>(Value-Weighted Average Price (VWAP) Base)</p><p style={{ fontSize: '0.75em', fontWeight:'normal'}}>Most Recent 3-month VWAP <span style={{ color:'#1870DC' }}>vs.</span> Previous 3-month VWAP</p></span></h3>
                </div>
              </div>
              {(this._isFirstRender || this.didSupplierChange(selectedSupplier)) ? this.getDataForTable(suppliers[selectedSupplier]) : null }
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
                          <th style={{ color:'#F45722'}}>Price Change (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.isStillFetching ? null : createTableRows()[0]}
                      </tbody>
                    </Table>
                    { this._singleTie ? <div>Note: There is another item with the Price Change of {this._otdNum} % not displayed here.</div> : 
                      (this._multipleTies ? <div>Note: There are more items with the Price Change of {this._otdNum} % not displayed here.</div> : <div></div>) 
                    }  
                  </div>
                </Widget>
              </div>                                                                                                                                                                                                                                                                                                                            
            </Widget>
          </Col>
          <Col xl={6} xs={12}>
            <Widget>
              <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                  <h3 className="page-title"><span className="fw-semi-bold">Top 3 <span style={{ color:'#58D777' }}>Price-Down</span> Items <p style={{ fontSize: '0.65em', fontWeight:'normal', color:'#AAAAAA' }}>(Value-Weighted Average Price (VWAP) Base)</p><p style={{ fontSize: '0.75em', fontWeight:'normal'}}>Most Recent 3-month VWAP <span style={{ color:'#1870DC' }}>vs.</span> Previous 3-month VWAP</p></span></h3>
                </div>
              </div>
              {(this._isFirstRender || this.didSupplierChange(selectedSupplier)) ? this.getDataForTable(suppliers[selectedSupplier]) : null }
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
                          <th style={{ color:'#58D777'}}>Price Change (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.isStillFetching ? null : createTableRows()[1]}
                      </tbody>
                    </Table>
                    { this._singleTieReversed ? <div>Note: There is another item with the Price Change of {this._otdNumReversed} % not displayed here.</div> : 
                      (this._multipleTiesReversed ? <div>Note: There are more items with the Price Change of {this._otdNumReversed} % not displayed here.</div> : <div></div>) 
                    }  
                  </div>
                </Widget>
              </div>                                                                                                                                                                                                                                                                                                                            
            </Widget>  
          </Col>
        </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CostReductionBestTable);