import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import change_supplier from './change_supplier';
import selected_supplier from './selected_supplier';
import otd_line_chart_months from './otd_line_chart_months';
import otd_pie_chart_months from './otd_pie_chart_months';
import otd_table_months from './otd_table_months';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  change_supplier,
  selected_supplier,
  otd_line_chart_months,
  otd_pie_chart_months,
  otd_table_months,
});