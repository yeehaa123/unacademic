import _ from 'lodash';

class MainCtrl {

 constructor(dispatcher, resolver) {
  this.resolver = resolver;
  let updateInfo = _.bind(this._updateInfo, this);
  dispatcher.registerObserverCallback(updateInfo);
 }

 _updateInfo(params){
   this.resolver(params)
     .then(({model, collection}) => {
       this.model          = model;
       this.collection     = collection;
       this.mode           = params.mode;
       this.user           = params.user;
     });
 }
};

export default MainCtrl;
