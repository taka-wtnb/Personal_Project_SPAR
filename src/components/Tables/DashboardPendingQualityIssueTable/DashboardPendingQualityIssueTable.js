import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
} from 'reactstrap';

import s from './DashboardPendingQualityIssueTable.module.scss';

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


class DashboardPendingQualityIssueTable extends React.Component {

  _isUnmounted = false;
  _isFirstRender = true;
  _curSupplier = 0;

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

      let url = new URL("https://protected-fortress-25524.herokuapp.com/dashboardpendingqualityissuetable");
      let params = {supplierId: supplier.id};
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
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      // let curDate = new Date();

      let tableRows = [];
      let itemList = [];

      if (this.state.dataForTable.length > 0) {
        itemList = this.state.dataForTable.map((data, i) => {

          let parsedReportedDate = new Date(data.date_detected);
          let formattedReportedDate =  monthNames[parsedReportedDate.getMonth()] + " " + parsedReportedDate.getDate() + ", " + parsedReportedDate.getFullYear(); 
          
          return({
            orderNum: data.order_id,
            itemNum: data.item_num,
            itemName: data.item_name,
            issueType: data.category,
            reportDate: formattedReportedDate,
          });
        });

        for (let i=0; i<itemList.length; i++) {
          tableRows.push(
            <tr key={i}>
              <td style={{ color:'#DDDDDD', fontWeight: 'bold' }}>{i+1}</td>
              <td style={{ color:'#DDDDDD'}}>{itemList[i].orderNum}</td>
              <td style={{ color:'#DDDDDD'}}>{itemList[i].itemNum}</td>
              <td style={{ color:'#DDDDDD'}}>{itemList[i].itemName}</td>
              <td style={{ color:'#F45722', fontWeight:'bold' }}>{itemList[i].issueType}</td>
              <td style={{ color:'#f0af03', fontWeight:'bold' }}>{itemList[i].reportDate}</td>
            </tr>
          );
        }
      } else {
        tableRows.push(
          <tr key={0}>
            <td></td>
            <td></td>
            <td></td> 
            <td style={{ fontSize:'1.25em', fontWeight:'bold' }}>No Pending Cases</td>
            <td></td>
            <td></td>
          </tr>
        );
      }

      return tableRows;
    }

    return isPending ? 
      <div> </div> :
      (
        <Widget>
          <div className={s.root}>
              <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                  <h3 className="page-title"><span className="fw-semi-bold">Pending Quality Issue Cases</span></h3>
              </div>
          </div>
          <h5 style={{fontWeight: 'bold'}}>(Up to 5 Cases with the Oldest Reported Date)</h5>
          {(this._isFirstRender || this.didSupplierChange(selectedSupplier)) ? this.getDataForTable(suppliers[selectedSupplier]) : null }
          {this.detectFirstRender()}
          <div className={s.root}>
            <Widget>
              <div className="table-responsive">           
                <Table>
                  <thead>
                    <tr>
                      <th></th>
                      <th style={{ color:'#EEEEEE'}}>Order #</th>
                      <th style={{ color:'#EEEEEE'}}>Item #</th>
                      <th style={{ color:'#EEEEEE'}}>Item Name</th>
                      <th style={{ color:'#EEEEEE'}}>Issue Type</th>
                      <th style={{ color:'#EEEEEE'}}>Reported Date</th>                       
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

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPendingQualityIssueTable);