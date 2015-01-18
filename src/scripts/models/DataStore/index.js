import DataStore from './DataStore';
import utilities from './utilities';

let app = angular.module('unacademic.DataStore', []);

app.factory('DataStore', DataStore);
app.factory('utilities', utilities);
