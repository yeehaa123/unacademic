import card from './card/index';
import cards from './cards/index';

let app = angular.module('unacademic.cards', []);

app.directive('card', card);
app.directive('cards', cards);

