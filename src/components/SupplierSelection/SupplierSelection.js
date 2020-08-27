import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import s from './SupplierSelection.module.scss';

import { selectSupplier } from '../../actions/change_supplier';
import { displaySupplier } from '../../actions/selected_supplier';

const mapStateToProps = (state) => {
  return {
    suppliers: state.suppliers.suppliers,
    isPending: state.suppliers.isPending,
    isSupplierSelected: state.change_supplier.isSupplierSelected,
    selectedSupplier: state.selected_supplier.selectedSupplier,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectSupplier: () => dispatch(selectSupplier()),
    onDisplaySupplier: (event) => dispatch(displaySupplier(event.target.value)),
  }
}

class SupplierSelection extends React.Component {

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
    this.props.onSelectSupplier();
    this.props.onDisplaySupplier(event);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { suppliers, isPending, isSupplierSelected, selectedSupplier } = this.props;

    let initialSupplier = isPending ? '' : suppliers[0];

    let supplierList = isPending ? [] : suppliers.map((supplier, i) => {
      return (
        <DropdownItem key={i} value={i} onClick={this.select}>{supplier.supplier_name}</DropdownItem>
      )
    });

    return isPending ? 
      <h1>Loading...</h1> :
      (
      <div className={s.root}>
        <div style={{display: "flex", alignItems: "center"}}>
          <h1 className="page-title"><span className="fw-semi-bold">{isSupplierSelected ? suppliers[selectedSupplier].supplier_name : initialSupplier.supplier_name}</span></h1>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft: "40px", alignItems: "stretch"}}>
            <DropdownToggle caret className="fw-semi-bold text-inverse">
              {isSupplierSelected ? suppliers[selectedSupplier].supplier_name : initialSupplier.supplier_name}
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

export default connect(mapStateToProps, mapDispatchToProps)(SupplierSelection);