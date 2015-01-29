import card from './card';
import cards from './cards/index';
import CardCtrl from './controllers/CardCtrl';

let app = angular.module('unacademic.cards', []);

app.directive('card', card);
app.directive('cards', cards);
app.controller('CardCtrl', CardCtrl);
