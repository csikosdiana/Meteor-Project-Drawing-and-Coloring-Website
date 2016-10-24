Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });
Router.route('/', function () {
	//console.log("rendering1");
	/*Meteor.call('clear', function() {
			console.log("start d");
			canvas.clear();
		});*/
    this.render("navbar1", {to:"header"}); 
	this.render("welcomepage", {to:"main"});
  }); 
Router.route('/coloring', function () {
	//console.log("rendering2");
	this.render("navbar2", {to:"header"});
	this.render("coloring", {to:"main",});
});
