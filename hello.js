if (Meteor.isClient) {

  var matrix = new ReactiveDict;

  Template.grid.helpers({
    getGridValues: function () {
      return ReactiveMethod.call("serverUpdateGridNode", matrix.get('node'));
    }
  });

  Template.grid.events({
    'click .ATK': function (e) {

      if(this.val === 0){
        return false;
      }

      var node = {
        id : this.id,
        val: this.val -1
      };

      console.log(node);

      matrix.set('node', node);

    },
    'click #DEF': function (e) {

    }
  });
}

gridStore = new Meteor.Collection('gridStore');


if (Meteor.isServer) {
  Meteor.startup(function () {
    gridStore.remove({});

    var id = Random.id();
    gridStore.insert({grid: id, val: 10, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 10, deps: ['x','y']});

    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});

    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 60, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});

    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 20, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});

    gridStore.insert({grid: id, val: 10, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 15, deps: ['x','y']});
    gridStore.insert({grid: id, val: 10, deps: ['x','y']});

  });

  Meteor.methods({
    'serverUpdateGridNode':function(node){
      if(node){
        gridStore.update({_id: node.id}, node);
      }
     return gridStore.find({}).fetch();
    }
  })


}
