if (Meteor.isClient) {

  var matrix = new ReactiveDict;

  Template.grid.helpers({
    getGridValues: function () {
      return ReactiveMethod.call("serverUpdateGridNode", matrix.get('grid'));
    }
  });

  Template.grid.events({
    'click .ATK': function (e) {

      var grid = matrix.get('grid')
      var node =_.each(grid, function(elem){
        if(elem._id = e.target.id){
          elem.val = elem.val -1;
          return elem;
        }
      });

    },
    'click #DEF': function (e) {
      console.log('DEF');

      var mutate = _.first(matrix.get('grid'));

      mutate.a1.main = mutate.a1.main + 1;

      var reset = [mutate];
      //reset.push(mutate);

      Meteor.call('serverGetGrid', reset);
      matrix.set('grid', reset);
    }
  });
}

gridStore = new Meteor.Collection('gridStore');


if (Meteor.isServer) {
  Meteor.startup(function () {
    gridStore.remove({});

    var id = Random.id();
    gridStore.insert({grid: id, val: 10});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 10});

    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 15});

    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 60});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 15});

    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 20});
    gridStore.insert({grid: id, val: 15});

    gridStore.insert({grid: id, val: 10});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 15});
    gridStore.insert({grid: id, val: 10});

  });

  Meteor.methods({
    'serverGetGrid': function (grid) {
      if(grid){

      }
      return gridStore.find({}).fetch();
    },
    'serverUpdateGridNode':function(node){
      if(node){
        gridStore.update({_id: node._id}, node);
      }
    }
  })


}
