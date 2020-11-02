import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  ButtonGroup,
  Button,
} from 'reactstrap';

import { logoutUser } from '../../actions/user';
import { openSidebar, closeSidebar, changeSidebarPosition, changeSidebarVisibility } from '../../actions/navigation';

import avatar from '../../images/people/profile.jpg';

import s from './Header.module.scss';
import 'animate.css'

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
      notificationsOpen: false
    };
  }

  toggleNotifications = () => {
    this.setState({
      notificationsOpen: !this.state.notificationsOpen,
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props
      .dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar())
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    return (
      <div>
        <header className={s.logo}><span style={{fontSize: "3em", fontWeight: "bold"}}><span style={{color: "#00CED1" }}>S</span><span style={{color: "#00CED1" }}>P</span><span style={{color: "#00CED1" }}>A</span><span style={{color: "#00CED1" }}>R</span></span> <span style={{fontSize: "1.5em" }}>-<span style={{color: "#00CED1", fontWeight: "bold"}}>S</span>upplier <span style={{color: "#00CED1", fontWeight: "bold"}}>P</span>erformance <span style={{color: "#00CED1", fontWeight: "bold"}}>A</span>nalysis <span style={{color: "#00CED1", fontWeight: "bold"}}>R</span>epository-</span></header>
        <div style={{display: "flex", justifyContent: "flex-end", alignItems: "right"}}>

          <Navbar className={`d-print-none ${s.root}`}>
            <span className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}>
              <img src={avatar} alt="..."/>
            </span>40E0D0
            <span className={`small ${s.accountCheck}`}>Taka Watanabe</span>
            <Nav className="ml-md-0 d-flex nav-responsive">
              <NavItem className={`${s.divider} text-white`} />
              <Dropdown nav isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown}>
                <DropdownToggle nav className={`${s.navItem} text-white`}>
                  <i className="glyphicon glyphicon-cog" />
                </DropdownToggle>
                <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
                  <h6>Sidebar on the</h6>
                  <ButtonGroup size="sm">
                    <Button color="primary" onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
                    <Button color="primary" onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
                  </ButtonGroup>
                  <h6 className="mt-2">Sidebar</h6>
                  <ButtonGroup size="sm">
                    <Button color="primary" onClick={() => this.toggleVisibilitySidebar('show')} className={this.props.sidebarVisibility === 'show' ? 'active' : ''}>Show</Button>
                    <Button color="primary" onClick={() => this.toggleVisibilitySidebar('hide')} className={this.props.sidebarVisibility === 'hide' ? 'active' : ''}>Hide</Button>
                  </ButtonGroup>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <NavLink onClick={this.doLogout} className={`${s.navItem} text-white`} href="#">
                  <i className="glyphicon glyphicon-off" />
                </NavLink>
              </NavItem>
              <NavItem className="d-md-none">
                <NavLink onClick={this.toggleSidebar} className={`${s.navItem} text-white`} href="#">
                  <i className="fa fa-bars" />
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
