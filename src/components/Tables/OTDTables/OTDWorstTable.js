import React from 'react';
import { connect } from 'react-redux';

import {
  Table,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import s from './OTDTables.module.scss';

import Widget from '../../Widget/Widget';

import { selectSupplier } from '../../../actions/change_supplier';
import { displaySupplier } from '../../../actions/selected_supplier';
import { selectMonths } from '../../../actions/otd_worst_table_months';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    displayedMonths: state.otd_worst_table_months.months,
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

class OTDWorstTable extends React.Component {

  _isUnmounted = false;
  _isFirstRender = true;
  _curSupplier = 0;

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
          startDate = new Date(today.getFullYear() - (today.getMonth() - 12 > 0 ? 0 : 1), (today.getMonth() - 12 + 12) % 12, 1);
          startDate= startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();
          break;
      }

      let url = new URL("http://localhost:3002/otdtable");
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
        let sortedItems = [];
        let itemList = this.state.dataForTable.map((data, i) => {
            let otds = parseInt(data.otds);
            let total = parseInt(data.total);
            let otdRate = ((otds / total) * 100).toFixed(2);
            return({
                itemNum: data.item_num,
                itemName: data.item_name,
                rate: otdRate,
            });
        });
        
        itemList = itemList.sort(function (a, b) {
            return a.rate - b.rate;
        });

        for (let i=0; i<3; i++) {
            sortedItems.push(
                <tr key={i}>
                    <td style={{ color:'#DDDDDD'}}>{i+1}</td>
                    <td style={{ color:'#DDDDDD'}}>{itemList[i].itemNum}</td>
                    <td style={{ color:'#DDDDDD'}}>{itemList[i].itemName}</td>
                    <td style={{ color:'#DDDDDD', fontWeight:'bold', textAlign: 'center' }}>{itemList[i].rate}</td>
                </tr>
            );
        }
        return sortedItems;
    }

    return isPending ? 
      <div> </div> :
      (
        <Widget>
            <div className={s.root}>
                <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
                    <h3 className="page-title"><span className="fw-semi-bold">Worst OTD Performance Items <p style={{ fontWeight:'normal'}}>(Top 3)</p></span></h3>
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
                        <th style={{ color:'#EEEEEE'}}>OTD Rate (%)</th>
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

export default connect(mapStateToProps, mapDispatchToProps)(OTDWorstTable);