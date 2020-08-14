import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import register from './register';
import suppliers from './suppliers';
import first_render from './first_render';

export default combineReducers({
  alerts,
  auth,
  navigation,
  register,
  suppliers,
  first_render,
});