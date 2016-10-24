points = new Meteor.Collection('pointsCollection');
var canvas;

// we use these for drawing more interesting shapes
var lastX=0;
var lastY=0;
var strokeWidth = 1;
var thickness=1;
var strokeColor = "black";
var drawtype = "line";

Meteor.startup( function() {
  canvas = new Canvas();
  
  Deps.autorun( function() {
    var data = points.find({}).fetch();

    if (canvas) {
		Meteor.call('draw', data, function() {
			canvas.draw(data);
		});	
    }
  });
});

Template.slideshow.rendered = function(){
	$(".owl-carousel").owlCarousel({
		navigation : true,
		singleItem:true,
		items : 1, 
		itemsDesktop : false,
		itemsDesktopSmall : false,
		itemsTablet: false,
		itemsMobile : false
	});
};



Template.navbar1.events({
	'click': function (event) {
		Meteor.call('clear', function() {
			canvas.clear();
		});
		lastX=0;
		lastY=0;
		strokeWidth = 1;
		thickness=1;
		strokeColor = "black";
		drawtype = "line";
		Session.setPersistent("imageid", "");
  }
});

Template.navbar2.events({
	'click': function (event) {
		Meteor.call('clear', function() {
			if (document.getElementById("canvas")){
				document.getElementById("canvas").style.background = "white";
			}
			canvas.clear();
		});
		lastX=0;
		lastY=0;
		strokeWidth = 1;
		thickness=1;
		strokeColor = "black";
		drawtype = "line";
		Session.setPersistent("imageid", "");
  }
});

Template.welcomepage.events({
	'click .starting': function(){
		Meteor.call('clear', function() {
			if (document.getElementById("canvas")){
				document.getElementById("canvas").style.background = "white";
			}
			canvas.clear();
		});
		lastX=0;
		lastY=0;
		strokeWidth = 1;
		thickness=1;
		strokeColor = "black";
		drawtype = "line";
		Session.setPersistent("imageid", "");
	}
});

Template.slideshow.events({
	'click .img': function(event){
		Meteor.call('clear', function() {
			canvas.clear();
		});

		var coverimage = event.target.getAttribute("src");

		document.getElementById("canvas").style.background = "white url(" + event.target.getAttribute("src") + ")no-repeat center center";
		document.getElementById("canvas").style.backgroundSize = "contain";
		imgid = event.target.getAttribute("id");
		Session.setPersistent("imageid", imgid);
		Session.setPersistent("nw", event.target.naturalWidth);
		Session.setPersistent("nh", event.target.naturalHeight);
	}
})

Template.coloring.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function() {
	  document.getElementById("canvas").style.background = "white";
      canvas.clear();
    });
	Session.setPersistent("imageid", "");
  },
  
  "click button.save": function (event) {
		var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;

		var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
		var img = '<img src="'+imgsrc+'">'; 
  
		var canvas = document.querySelector("canvas"),
		context = canvas.getContext("2d");
		context.fillStyle = "white";
		context.fillRect(0, 0, 955, 600);
		if (Session.get("imageid") != ""){
			var bg = document.getElementById(Session.get("imageid"));
			var curr_width = Session.get("nw");
			var curr_height = Session.get("nh");
			var ratio1 = 955 / curr_width;
			var ratio2 = 600 / curr_height;
			var ratio = Math.min(ratio1, ratio2);
			var centerShift_x = (955 - curr_width*ratio) / 2;
			var centerShift_y = (600 - curr_height*ratio) / 2;
			context.drawImage(bg, centerShift_x, centerShift_y, curr_width*ratio, curr_height*ratio);
		}
		
		var image = new Image;

		image.src = imgsrc;
		image.onload = function() {  
		context.drawImage(image, 0, 0);

		var canvasdata = canvas.toDataURL("image/png");

		var pngimg = '<img src="'+canvasdata+'">'; 
		d3.select("#pngdataurl").html(pngimg);

		var a = document.createElement("a");
		a.download = "sample.png";
		a.href = canvasdata;
		a.click();
		};

	},
  
  "click button.eraser": function (event) {
	  lastX=0;
	  lastY=0;
	  strokeColor = "eraser";
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.
  
  "click button.black": function () {
    lastX=0;
    lastY=0;
    strokeColor = "black";
	//console.log("black");
  },
  
  "click button.gray": function () {
    lastX=0;
    lastY=0;
    strokeColor = "gray";
	//console.log("gray");
  },
  
  "click button.DarkRed": function () {
    lastX=0;
    lastY=0;
    strokeColor = "DarkRed";
	//console.log("DarkRed");
  },

  "click button.red": function () {
    lastX=0;
    lastY=0;
    strokeColor = "red";
	//console.log("red");
  },

  "click button.Orange": function () {
    lastX=0;
    lastY=0;
    strokeColor = "Orange";
	//console.log("Orange");
  },
  
  "click button.yellow": function () {
    lastX=0;
    lastY=0;
    strokeColor = "yellow";
	//console.log("yellow");
  },
  
  "click button.green": function () {
    lastX=0;
    lastY=0;
    strokeColor = "green";
	//console.log("green");
  },
  
  "click button.turquoise": function () {
    lastX=0;
    lastY=0;
    strokeColor = "turquoise";
	//console.log("turquoise");
  },
  
  "click button.indigo": function () {
    lastX=0;
    lastY=0;
    strokeColor = "indigo";
	//console.log("indigo");
  },
  
  "click button.purple": function () {
    lastX=0;
    lastY=0;
    strokeColor = "purple";
	//console.log("purple");
  },
  
  "click button.white": function () {
    lastX=0;
    lastY=0;
    strokeColor = "white";
	//console.log("white");
  },
  
  "click button.sienna": function () {
    lastX=0;
    lastY=0;
    strokeColor = "sienna";
	//console.log("sienna");
  },
  
  "click button.pink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "pink";
	//console.log("pink");
  },
  
  "click button.khaki": function () {
    lastX=0;
    lastY=0;
    strokeColor = "khaki";
	//console.log("khaki");
  },
  
  "click button.lawngreen": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lawngreen";
	//console.log("lawngreen");
  },
  
  "click button.blue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "blue";
	//console.log("blue");
  },
  
  "click button.orchid": function () {
    lastX=0;
    lastY=0;
    strokeColor = "orchid";
	//console.log("orchid");
  },
  
  "click button.skyblue": function () {
    lastX=0;
    lastY=0;
    strokeColor = "skyblue";
	//console.log("skyblue");
  },
  
  "click button.olive": function () {
    lastX=0;
    lastY=0;
    strokeColor = "olive";
	//console.log("olive");
  },
  
  "click button.lightgray": function () {
    lastX=0;
    lastY=0;
    strokeColor = "lightgray";
	//console.log("lightgray");
  },
  
  "click button.DeepPink": function () {
    lastX=0;
    lastY=0;
    strokeColor = "DeepPink";
	//console.log("DeepPink");
  },

  "click button.thicker": function () {

    thickness+=1;
	//console.log("thicker");

  },

  "click button.thinner": function () {
    
    if (thickness > 0) {
      thickness-=1;
	  //console.log("thinner");
    }
  },
  
  "click button.line": function () {
    drawtype = "line";
  },
  
  "click button.circle": function () {
    drawtype = "circle";
  },

})

var markPoint = function() {

  var offset = $('#canvas').offset();

// In the first frame, lastX and lastY are 0.
// This means the line gets drawn to the top left of the screen
// Which is annoying, so we test for this and stop it happening.

      if (lastX==0) {// check that x was something not top-left. should probably set this to -1
        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);
      }
	  
	  if (strokeColor != "eraser"){
		  points.insert({
			//this draws a point exactly where you click the mouse
		  // x: (event.pageX - offset.left),
		  // y: (event.pageY - offset.top)});


			//We can do more interesting stuff
			//We need to input data in the right format
			//Then we can send this to d3 for drawing


			//1) Algorithmic mouse follower
		  // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
		  // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

			//2) draw a line - requires you to change the code in drawing.js
			x: (event.pageX - offset.left),
			y: (event.pageY - offset.top),
			x1: lastX,
			y1: lastY,
			// We could calculate the line thickness from the distance
			// between current position and last position
			//w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
			//  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
			// Or we could just set the line thickness using buttons and variable
			w: thickness,
			// We can also use strokeColor, defined by a selection
			c: strokeColor,
			t: drawtype,


		  }); // end of points.insert()
		  
		}
		else{
			var pointslist = points.find({});
			var x = (event.pageX - offset.left);
			var y = (event.pageY - offset.top);
			myerase = [];
			pointslist.forEach(function(p){
				var x0 = p.x;
				var y0 = p.y;
				var dx = (x - x0);
				var dy = (y - y0);
				var dist = dx*dx + dy*dy;
				if (dist <= 16){
					myerase.push(p._id);
					
				}
			})
			console.log(myerase);
			Meteor.call('erase', myerase, function(){
				var data = points.find({}).fetch();			
				canvas.clear();
				canvas.draw(data);
			});
		}

        lastX = (event.pageX - offset.left);
        lastY = (event.pageY - offset.top);

}

Template.canvas.events({
  'click': function (event) {
    markPoint();
	//console.log("start drawing");
  },
  'mousedown': function (event) {
    Session.set('draw', true);
	//console.log("draw1");
  },
  'mouseup': function (event) {
    Session.set('draw', false);
    lastX=0;
    lasyY=0;
	//console.log("stop draw");
  },
  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint();
	  //console.log("draw2");
    }
  }
});

Template.canvas.rendered = function(){
	var background = Session.get("imageid");
			if (background != ""){
			coverimage = document.getElementById(background).getAttribute("src");
			//console.log(coverimage);
			$("#canvas").css("background", "white url(" + coverimage + ") no-repeat center center");
			document.getElementById("canvas").style.backgroundSize = "contain";
			}
};