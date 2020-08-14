import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

//import s from './Charts.module.scss';
import s from './SupplierSelection.module.scss';

import { requestSuppliers } from '../../actions/suppliers';
import { withRouter } from 'react-router';


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

class SupplierSelection extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.select = this.select.bind(this);
    this.state = {
      isFirstRender: true,
      supplierName: '',
      dropdownOpen: false,
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

  render() {
    const { suppliers, isPending } = this.props;

    let initialSupplierName = isPending ? '' : suppliers[0].supplier_name;

    let supplierList = isPending ? [] : suppliers.map((supplier, i) => {
      return (
        <DropdownItem key={i} onClick={this.select}>{supplier.supplier_name}</DropdownItem>
      )
    });

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
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierSelection));