import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import change_supplier from './change_supplier';
import selected_supplier from './selected_supplier';
import items from './items';
import change_item_for_dashboard_spending_chart from './change_item_for_dashboard_spending_chart';
import change_item_for_otd_line_chart from './change_item_for_otd_line_chart';
import change_item_for_otd_pie_chart from './change_item_for_otd_pie_chart';
import change_item_for_cost_reduction_line_chart from './change_item_for_cost_reduction_line_chart';
import change_item_for_cost_reduction_pie_chart from './change_item_for_cost_reduction_pie_chart';
import change_item_for_cost_reduction_table from './change_item_for_cost_reduction_table';
import change_item_for_quality_management_line_chart from './change_item_for_quality_management_line_chart';
import change_item_for_quality_management_pie_chart from './change_item_for_quality_management_pie_chart';
import selected_dashboard_spending_chart_item from './selected_dashboard_spending_chart_item';
import selected_otd_line_chart_item from './selected_otd_line_chart_item';
import selected_otd_pie_chart_item from './selected_otd_pie_chart_item';
import selected_cost_reduction_line_chart_item from './selected_cost_reduction_line_chart_item';
import selected_cost_reduction_pie_chart_item from './selected_cost_reduction_pie_chart_item';
import selected_cost_reduction_table_item from './selected_cost_reduction_table_item';
import selected_quality_management_line_chart_item from './selected_quality_management_line_chart_item';
import selected_quality_management_pie_chart_item from './selected_quality_management_pie_chart_item';
import dashboard_spending_chart_months from './dashboard_spending_chart_months';
import dashboard_spending_table_months from './dashboard_spending_table_months';
import otd_line_chart_months from './otd_line_chart_months';
import otd_pie_chart_months from './otd_pie_chart_months';
import otd_best_table_months from './otd_best_table_months';
import otd_worst_table_months from './otd_worst_table_months';
import cost_reduction_line_chart_months from './cost_reduction_line_chart_months';
import cost_reduction_pie_chart_months from './cost_reduction_pie_chart_months';
import quality_management_line_chart_months from './quality_management_line_chart_months';
import quality_management_pie_chart_months from './quality_management_pie_chart_months';
import quality_best_table_months from './quality_best_table_months';
import quality_worst_table_months from './quality_worst_table_months';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  change_supplier,
  selected_supplier,
  items,
  change_item_for_dashboard_spending_chart,
  change_item_for_otd_line_chart,
  change_item_for_otd_pie_chart,
  change_item_for_cost_reduction_line_chart,
  change_item_for_cost_reduction_pie_chart,
  change_item_for_cost_reduction_table,
  change_item_for_quality_management_line_chart,
  change_item_for_quality_management_pie_chart,
  selected_dashboard_spending_chart_item,
  selected_otd_line_chart_item,
  selected_otd_pie_chart_item,
  selected_cost_reduction_line_chart_item,
  selected_cost_reduction_pie_chart_item,
  selected_cost_reduction_table_item,
  selected_quality_management_line_chart_item,
  selected_quality_management_pie_chart_item,
  dashboard_spending_chart_months,
  dashboard_spending_table_months,
  otd_line_chart_months,
  otd_pie_chart_months,
  otd_best_table_months,
  otd_worst_table_months,
  cost_reduction_line_chart_months,
  cost_reduction_pie_chart_months,
  quality_management_line_chart_months,
  quality_management_pie_chart_months,
  quality_best_table_months,
  quality_worst_table_months,
});