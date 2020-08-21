import React from 'react';
import { connect } from 'react-redux';

import {
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from 'reactstrap';

//import s from './Charts.module.scss';
import s from '../../ItemSelection/ItemSelection.module.scss';

import { selectItem } from '../../../actions/change_item_for_cost_reduction_line_chart';
import { displayItem } from '../../../actions/selected_cost_reduction_item';
// import { requestData } from '../../actions/dashboard_otd_chart_data';

const mapStateToProps = (state) => {
  return {
    items: state.items.items,
    isPending: state.items.isPending,
    isItemSelected: state.change_cost_reduction_item.isItemSelected,
    selectedItem: state.selected_cost_reduction_item.selectedItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectItem: () => dispatch(selectItem()),
    onDisplayItem: (event) => dispatch(displayItem(event.target.value)),
    // onRequestData: (event) => dispatch(requestData(event.target.value)),
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
    // this.props.onRequestData(event);
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    const { items, isPending, isItemSelected, selectedItem } = this.props;

    const initialItem = 'ALL ITEMS';

    const getItemList = () => {
      let tempList = items.map((item) => item.item_num);
      tempList.unshift('ALL ITEMS');
      return tempList;
    };

    const itemNameList = getItemList();

    const getDropdownList = (itemNames) => {
      let itemDropdownList = itemNames.map((itemName, i) => {
        return (
          <DropdownItem key={i} value={i} onClick={this.select}>{itemName}</DropdownItem>
        )
      });
      return itemDropdownList;
    }

    return isPending ? 
      <h1>Loading...</h1> :
      (
      <div className={s.root}>
        <div style={{display: "flex", justifyContent: 'flex-end', alignItems: "center"}}>
          <h6 className="page-title"><span style={{fontWeight: "bold"}}>Select an Item # :</span></h6>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} style={{marginLeft: "10px", alignItems: "stretch"}}>
            <DropdownToggle caret className="fw-semi-bold text-inverse">
              {isItemSelected ? itemNameList[selectedItem] : initialItem}
            </DropdownToggle>
            <DropdownMenu>
              {isPending ? [] : getDropdownList(itemNameList)}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemSelection);