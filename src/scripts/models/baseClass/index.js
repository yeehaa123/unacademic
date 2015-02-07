import _ from 'lodash';

export default InitBaseClass;

function InitBaseClass($q, DataStore, utilities, dispatcher){
  class BaseClass {

    constructor(data){
      let instance = data || {};

      let schema = this.constructor.schema;
      let props = _.keys(schema.properties);

      if(!instance.id){
        instance.id = utilities.generateUID();
      }

      _.each(props, (prop) => { this[prop] = instance[prop]; });

      if(!this.curator || this.curator === 'general'){
        this.curator = dispatcher.getState().user;
      }
    }

    get url(){
      return utilities.createUrl(this);
    }

    get resourceName(){
      return this.constructor.name.toLowerCase();
    }

    save(){
      let schema = this.constructor.schema;
      let props = _.keys(schema.properties);


      let required = _.select(props, function(prop){
        return schema.properties[prop].required;
      });

      let valid = true;

      _.each(required, (field) => {
        valid = !this[field] ? false : valid;
      });


      if(valid){
        let url = this.url;
        let model = JSON.stringify(this);
        return DataStore.save(url, this);
      }

      return $q.reject();

    }

    static get(userId, id){
      let extractData = _.bind(_extractData, this);
      console.log(this.name.toLowerCase());

      return DataStore.get(this.name, userId, id)
        .then(extractData);
    }

    static initialize({schema, initData}){
      this.schema = schema;
      this.initData = initData;
    }

    static getAll(userId){
      let extractUserData = _.bind(_extractUserData, this);
      let extractObjects = _.bind(_extractObjects, this);

      if(!userId){
        return DataStore.get(this.name)
          .then(extractUserData)
          .then(removeClones);
      } else {
        return DataStore.get(this.name, userId)
          .then(extractObjects);
      }
    }

    static clone(userId, instance){
      return $q((resolve, reject) => {
        let clone = new this(instance);
        clone.curator = userId; 
        clone.clonedFrom = instance.curator;

        instance.clones = instance.clones || [];
        instance.clones.push(clone.curator);

        let promises = [
          clone.save(),
          instance.save()
        ];

        $q.all(promises).then((data) => {
          let savedClone = new this(data[0].data);
          resolve(savedClone);
        });
      });
    }
  }

  function removeClones(data){
    let cloneLess = _.reject(data, 'clonedFrom');
    return cloneLess;
    
  }

  function _extractData(data){
    if(!data){
      return;
    }
    if( _.isArray(data)){
      let collection = _.map(data, (item) => { 
        return new this(item) 
      }, this);
      return collection;
    }
    return new this(data);
  };

  function _extractUserData(data){
    let extractObjects = _.bind(_extractObjects, this);
    if(data){
      let names = _.keys(data);
      let users = _.map(names, (name) => data[name]);
      let objects = _.map(users, (user) => extractObjects(user));
      return _.flatten(objects);
    }
  }

  function _extractObjects(data){
    if(data){
      let keys = _.keys(data);
      return _.map(keys, (key) => {
        data[key].id = `${data[key].id}`;
        return new this(data[key]);
      });
    }
  };

  return BaseClass
};
