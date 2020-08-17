import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import change_supplier from './change_supplier';
import selected_supplier from './selected_supplier';
import dashboard_otd_chart_months from './dashboard_otd_chart_months';
import dashboard_otd_chart_data from './dashboard_otd_chart_data';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  change_supplier,
  selected_supplier,
  dashboard_otd_chart_months,
  dashboard_otd_chart_data,
});