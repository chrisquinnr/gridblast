if (Meteor.isClient) {

  var matrix = new ReactiveDict;

  Template.grid.helpers({
    getGridValues: function () {
      return ReactiveMethod.call("serverUpdateGridNode", matrix.get('node'));
    }
  });

  Template.grid.events({
    'click .ATK': function ( e ) {
      console.log(this);
      if (this.val === 0) {
        return false;
      }

      var node = {
        id: this.id,
        val: this.val - 1
      };

      console.log(node);

      matrix.set('node', node);

    },
    'click #DEF': function ( e ) {

    }
  });
}

gridStore = new Meteor.Collection('gridStore');


if (Meteor.isServer) {
  Meteor.startup(function () {
    gridStore.remove({});
    var pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10, pos11, pos12, pos13, pos14, pos15, pos16, pos17, pos18, pos19, pos20, pos21, pos22, pos23, pos24, pos25;

    var id = Random.id();
    var i = 0;
    console.log(i);
    pos1 = gridStore.insert({grid: id, val: 10, index: i++});
    console.log(i);
    pos2 = gridStore.insert({grid: id, val: 15, index: i++});
    console.log(i);
    pos3 = gridStore.insert({grid: id, val: 15, index: i++});
    pos4 = gridStore.insert({grid: id, val: 15, index: i++});
    pos5 = gridStore.insert({grid: id, val: 10, index: i++});

    pos6 = gridStore.insert({grid: id, val: 15, index: i++});
    pos7 = gridStore.insert({grid: id, val: 20, index: i++});
    pos8 = gridStore.insert({grid: id, val: 20, index: i++});
    pos9 = gridStore.insert({grid: id, val: 20, index: i++});
    pos10 = gridStore.insert({grid: id, val: 15, index: i++});

    pos11 = gridStore.insert({grid: id, val: 15, index: i++});
    pos12 = gridStore.insert({grid: id, val: 20, index: i++});
    pos13 = gridStore.insert({grid: id, val: 60, index: i++});
    pos14 = gridStore.insert({grid: id, val: 20, index: i++});
    pos15 = gridStore.insert({grid: id, val: 15, index: i++});

    pos16 = gridStore.insert({grid: id, val: 15, index: i++});
    pos17 = gridStore.insert({grid: id, val: 20, index: i++});
    pos18 = gridStore.insert({grid: id, val: 20, index: i++});
    pos19 = gridStore.insert({grid: id, val: 20, index: i++});
    pos20 = gridStore.insert({grid: id, val: 15, index: i++});

    pos21 = gridStore.insert({grid: id, val: 10, index: i++});
    pos22 = gridStore.insert({grid: id, val: 15, index: i++});
    pos23 = gridStore.insert({grid: id, val: 15, index: i++});
    pos24 = gridStore.insert({grid: id, val: 15, index: i++});
    pos25 = gridStore.insert({grid: id, val: 10, index: i++});

    gridStore.update({_id: pos1}, {$push: {deps: {$each: [pos2, pos6]}}});
    gridStore.update({_id: pos2}, {$push: {deps: {$each: [pos1, pos3, pos7]}}});
    gridStore.update({_id: pos3}, {$push: {deps: {$each: [pos2, pos4, pos8]}}});
    gridStore.update({_id: pos4}, {$push: {deps: {$each: [pos3, pos5, pos9]}}});
    gridStore.update({_id: pos5}, {$push: {deps: {$each: [pos4, pos10]}}});

    gridStore.update({_id: pos6}, {$push: {deps: {$each: [pos1, pos7, pos11]}}});
    gridStore.update({_id: pos7}, {$push: {deps: {$each: [pos2, pos6, pos8, pos12]}}});
    gridStore.update({_id: pos8}, {$push: {deps: {$each: [pos3, pos7, pos9, pos13]}}});
    gridStore.update({_id: pos9}, {$push: {deps: {$each: [pos4, pos8, pos10, pos14]}}});
    gridStore.update({_id: pos10}, {$push: {deps: {$each: [pos5, pos9, pos15]}}});

    gridStore.update({_id: pos11}, {$push: {deps: {$each: [pos6, pos12, pos16]}}});
    gridStore.update({_id: pos12}, {$push: {deps: {$each: [pos7, pos11, pos13, pos17]}}});
    gridStore.update({_id: pos13}, {$push: {deps: {$each: [pos8, pos12, pos14, pos18]}}});
    gridStore.update({_id: pos14}, {$push: {deps: {$each: [pos9, pos13, pos15, pos19]}}});
    gridStore.update({_id: pos15}, {$push: {deps: {$each: [pos10, pos14, pos20]}}});

    gridStore.update({_id: pos16}, {$push: {deps: {$each: [pos11, pos17, pos21]}}});
    gridStore.update({_id: pos17}, {$push: {deps: {$each: [pos12, pos16, pos18, pos22]}}});
    gridStore.update({_id: pos18}, {$push: {deps: {$each: [pos13, pos17, pos19, pos23]}}});
    gridStore.update({_id: pos19}, {$push: {deps: {$each: [pos14, pos18, pos20, pos24]}}});
    gridStore.update({_id: pos20}, {$push: {deps: {$each: [pos15, pos19, pos25]}}});

    gridStore.update({_id: pos21}, {$push: {deps: {$each: [pos16, pos22]}}});
    gridStore.update({_id: pos22}, {$push: {deps: {$each: [pos17, pos21, pos23]}}});
    gridStore.update({_id: pos23}, {$push: {deps: {$each: [pos18, pos22, pos24]}}});
    gridStore.update({_id: pos24}, {$push: {deps: {$each: [pos19, pos23, pos25]}}});
    gridStore.update({_id: pos25}, {$push: {deps: {$each: [pos20, pos24]}}});

    //gridStore.createIndex({index : 1});
  });

  Meteor.methods({
    'serverUpdateGridNode': function ( node ) {
      var newval, newval2;
      if (node) {
        if(node.val === 0){
          var deps = gridStore.find({deps:node.id}).fetch();
          if(deps){
            _.each(deps, function(elem){
              //console.log('reducing dep ' + elem._id + ' by 5');
              elem.val = elem.val - 5;

              if(elem._id !== node.id){
                gridStore.update({_id: elem._id}, elem);
              }

              if(elem.val <= 0){

                _.each(elem.deps, function(elem2){
                  elem2 = elem2.val -5;
                  if(elem._id !== node.id) {
                    gridStore.update({_id: elem2._id}, elem2);
                  }
                });

              }
            });
          }
        }

        gridStore.update({_id: node.id}, {$set: {val: node.val}});
      }

      var grid = gridStore.find({}, {sort:{index: 1}}).fetch();
      //console.log(grid);
      return grid;
    }
  })


}
