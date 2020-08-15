import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import change_supplier from './change_supplier';
import selected_supplier from './selected_supplier';
import default_supplier from './default_supplier';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  change_supplier,
  selected_supplier,
  default_supplier,
});