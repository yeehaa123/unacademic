import card from './card';
import CardCtrl from './CardCtrl';

let app = angular.module('unacademic.cards', []);

app.directive('card', card);
app.controller('CardCtrl', CardCtrl);
