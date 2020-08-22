import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import change_supplier from './change_supplier';
import selected_supplier from './selected_supplier';
import items from './items';
import change_item_for_otd_line_chart from './change_item_for_otd_line_chart';
import change_item_for_cost_reduction_line_chart from './change_item_for_cost_reduction_line_chart';
import change_item_for_cost_reduction_pie_chart from './change_item_for_cost_reduction_pie_chart';
import selected_otd_line_chart_item from './selected_otd_line_chart_item';
import selected_cost_reduction_line_chart_item from './selected_cost_reduction_line_chart_item';
import selected_cost_reduction_pie_chart_item from './selected_cost_reduction_pie_chart_item';
import otd_line_chart_months from './otd_line_chart_months';
import otd_pie_chart_months from './otd_pie_chart_months';
import otd_best_table_months from './otd_best_table_months';
import otd_worst_table_months from './otd_worst_table_months';
import cost_reduction_line_chart_months from './cost_reduction_line_chart_months';
import cost_reduction_pie_chart_months from './cost_reduction_pie_chart_months';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  change_supplier,
  selected_supplier,
  items,
  change_item_for_otd_line_chart,
  change_item_for_cost_reduction_line_chart,
  change_item_for_cost_reduction_pie_chart,
  selected_otd_line_chart_item,
  selected_cost_reduction_line_chart_item,
  selected_cost_reduction_pie_chart_item,
  otd_line_chart_months,
  otd_pie_chart_months,
  otd_best_table_months,
  otd_worst_table_months,
  cost_reduction_line_chart_months,
  cost_reduction_pie_chart_months,
});