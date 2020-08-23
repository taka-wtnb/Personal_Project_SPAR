import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

import s from '../../ItemSelection/ItemSelection.module.scss';

import { selectItem } from '../../../actions/change_item_for_cost_reduction_table';
import { displayItem } from '../../../actions/selected_cost_reduction_table_item';

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    isPending: state.items.isPending,
    isItemSelected: state.change_item_for_cost_reduction_table.isItemSelected,
    selectedItem: state.selected_cost_reduction_table_item.selectedItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: () => dispatch(selectItem()),
    onDisplayItem: (event) => dispatch(displayItem(event.target.value)),
  }
}

class ItemSelection extends React.Component {

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
    this.props.onSelectItem();
    this.props.onDisplayItem(event);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { items, isPending, isItemSelected, selectedItem } = this.props;

    let initialItem = isPending ? '' : items[0];

    let itemList = isPending ? [] : items.map((item, i) => {
      return (
        <DropdownItem key={i} value={i} onClick={this.select}>{item.item_num}</DropdownItem>
      )
    });

    return isPending ? 
      <h1>Loading...</h1> :
      (
      <div className={s.root}>
        <div style={{display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
          <h6 className="page-title"><span style={{fontWeight: "bold"}}>Select an Item # :</span></h6>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft: "10px", alignItems: "stretch"}}>
            <DropdownToggle caret className="fw-semi-bold text-inverse">
              {isItemSelected ? items[selectedItem].item_num : initialItem.item_num}
            </DropdownToggle>
            <DropdownMenu>
              {itemList}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);