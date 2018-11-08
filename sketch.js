var data = [];
var ready = false;
var slider;

function setup() {
  createCanvas(900, 900);

  noLoop();
  projection = d3.geoMercator() //Projektionsart, Auflistung von Projektionen:https://github.com/d3/d3-geo#projections
    .center([-100.1123143, 37.0702112]) //Kartenmittelpunkt
    .translate([width / 2, height / 2]) //Screen Position des Kartenmittelpunktes
    .scale(900);
  d3.csv("gun-violence4.csv", function (d) {

    return {
      lat: +d.Lat,
      lng: +d.Lng,
      state: d.State,
      year: d.Year,
      ageGroup: d.AgeGroup,
      killed: +d.Killed,
      injured: +d.Injured

    };
  }).then(function (csv) {
    data = csv;
    ready = true;
    console.log(data);
    redraw();
  });

  // creat slider
  slider = createSlider(2014, 2016);
  slider.position(100, 100);

  slider.elt.addEventListener("input", function () {
    redraw();
  });

}

function draw() {


  if (!ready) {
    background(255, 0, 0);
    return;

  } else {
    background(255);
  }

  text(slider.value(), 200, 200)
  var threshold = slider.value();

  var selection = data.filter(function (d) {
    return d.year == threshold;
  });

  for (var i = 0; i < selection.length; i++) {
    var d = selection[i];
    var lon = d.lng
    var lat = d.lat;

    //console.log('coord: ' + lon + ',' + lat);

    var pos = projection([lon, lat]);

    noStroke();
    if (d.killed > 0) {
      fill(0);
    }
    else {
      fill(0, 255, 0);
    }

    if (d.ageGroup == "Adult") {
      ellipse(pos[0], pos[1], 5, 5)
    }
    if (d.ageGroup == "Child" || d.ageGroup == "Teen") {
      rect(pos[0], pos[1], 5, 5)
    };


  };
}


