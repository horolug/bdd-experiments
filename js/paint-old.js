var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');

//var paper = Raphael(document.getElementById('myCanvas'), 960, 960);
var paper = Raphael(100, 100, 960, 960);
/*
var path = paper.path("M300 300L400 400");
path.attr("stroke", "orange");
path.attr("stroke-width", "6px");

var circuitNode =  paper.circle(65, 44, 7);
circuitNode.attr("stroke", "orange");
circuitNode.attr("stroke-width", "3px");
*/

//Create microchips
var Chip = function ( size, position, content, type ) {

    this.sizeW = size[0];
    this.sizeH = size[1];
    this.positionX = position[0];
    this.positionY = position[1];
    this.content = content;
    this.type = type;
    this.horisontalLegs = (this.sizeW / 20)-1;
    this.verticalLegs = (this.sizeH / 20)-1;
    this.legPosition = [];

    var _self = this;

    var content = paper.set();

    this.storeLeg = function (legNumber, x, y) {
      _self.legPosition.push(
          {
            legNumber : legNumber,
            legX: x,
            LegY: y
          }
      );

    }

    this.paint = function () {

        // Chip legs
        _self.k = 0;
        for (i = 0; i < _self.horisontalLegs; i++) {
          _self.k++;

          var verticalLegThick =  paper.rect( _self.positionX+(i+_self.k)*10, _self.positionY-5, 10, _self.sizeH+10, 4);
          verticalLegThick.attr("fill", "#ccc");
          verticalLegThick.attr("stroke", "#000");

          var verticalLegThin =  paper.rect( (_self.positionX+(i+_self.k)*10)+2, _self.positionY-12, 6, _self.sizeH+24, 4);
          verticalLegThin.attr("fill", "#ccc");
          verticalLegThin.attr("stroke", "#000");

          //North plane
          _self.storeLeg( _self.k, (_self.positionX+(i+_self.k)*10)+2, _self.positionY-12 );

          //South plane
          _self.storeLeg( _self.k+14, (_self.positionX+(i+_self.k)*10)+2, _self.positionY-12+_self.sizeH+24 );

          if ( _self.type === "full" ){
            var horisontallLegThick =  paper.rect( _self.positionX-5, _self.positionY+(i+_self.k)*10, _self.sizeW+10, 10, 4);
            horisontallLegThick.attr("fill", "#ccc");
            horisontallLegThick.attr("stroke", "#000");

            var horisontallLegThin =  paper.rect( _self.positionX-12, (_self.positionY+(i+_self.k)*10)+2, _self.sizeW+24, 6, 4);
            horisontallLegThin.attr("fill", "#ccc");
            horisontallLegThin.attr("stroke", "#000");

            //East plane
            _self.storeLeg( _self.k+8, _self.positionX-12, (_self.positionY+(i+_self.k)*10)+2 );

            //West plane
            _self.storeLeg( _self.k+21, _self.positionX-12+_self.sizeW+24, (_self.positionY+(i+_self.k)*10)+2 );
          }
        }

        var outerShape = paper.rect(_self.positionX, _self.positionY, _self.sizeW, _self.sizeH,  4);
        outerShape.attr("fill", "#555");

        var innerShape = paper.rect(_self.positionX+10, _self.positionY+10, _self.sizeW-20, _self.sizeH-20,  4);
        innerShape.attr("fill", "#444");
        innerShape.attr("stroke", "#000");

        // Text
        var chipName = paper.text(_self.positionX+(_self.sizeW/2), (_self.positionY+(_self.sizeH/2)), _self.content);

        chipName.attr("font", "Arial");
        chipName.attr("font-size", "20px");
        chipName.attr("fill", "#fff");

      //  console.log(chipName.attr("width"));
    }
}

var html = new Chip( [150, 150], [400, 50], "HTML", "full" );
html.paint();

var css = new Chip( [150, 150], [50, 50], "CSS", "full" );
css.paint();

var less = new Chip( [120, 120], [50, 500], "LESS", "full");
less.paint();

var js = new Chip( [150, 150], [550, 350], "JavaScript", "full" );
js.paint();

var grunt = new Chip( [195, 80], [50, 320], "Grunt", "semi");
grunt.paint();

var jasmine = new Chip( [150, 80], [300, 550], "Jasmine", "semi");
jasmine.paint();

var svg = new Chip( [112, 80], [350, 250], "SVG", "semi");
svg.paint();

var jquery = new Chip( [192, 80], [600, 150], "jQuery", "semi");
jquery.paint();

var circuitConnection = function (pair, path, connection) {
    //
    this.source = pair[0];        // object
    this.destination = pair[1];   // object
    this.path = path;             // ?
    this.connection = connection; // array

    var _self = this;

    //var circle = paper.circle(x, y, radius);

    this.con = function (){

      for (i = 0; i < _self.connection.length; i++) {
        console.log("chip one leg", _self.connection[i][0]);
        console.log("chip two leg", _self.connection[i][1]);

        var coords = _self.source.legPosition.filter( function(element) {
          return ( element.legNumber === _self.connection[i][0] );
        });

        console.log( coords );
      }
    }
}

var con = new circuitConnection(
  [html, svg],
  ["dummypath"],
  [[1, 5], [2, 6], [3, 7]]
);
con.con();
