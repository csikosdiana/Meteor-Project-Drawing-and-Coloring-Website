points = new Meteor.Collection('pointsCollection');
background = new Meteor.Collection("backgroundimg");

Meteor.methods({
  'clear': function () {
    points.remove({});
  },
  
  'erase': function(myerase){
	  for (var i = 0; i < myerase.length; i++){
		  points.remove({'_id': myerase[i]});
	  }
  }
  
});
