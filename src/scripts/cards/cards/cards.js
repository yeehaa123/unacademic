export default CardsCtrl;

function CardsCtrl($scope){
  var vm = this;
  $scope.$watch(() => vm.collection, () => {
    vm.cards = vm.collection
  });
}
