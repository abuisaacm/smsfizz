'use strict';
(function($) {
    /**
      * Function written to load simple line chartist chart.
    **/
    if ($(".demo1").length > 0){
      new Chartist.Line('.demo1', {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
          [12, 9, 7, 8, 5],
          [2, 1, 3.5, 7, 3],
          [1, 3, 4, 5, 6]
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      });
    }
    /**
      * Function written to load only whole numbers chartist chart.
    **/
    if ($(".demo4").length > 0){
      new Chartist.Line('.demo4', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [1, 2, 3, 1, -2, 0, 1, 0],
          [-2, -1, -2, -1, -3, -1, -2, -1],
          [0, 0, 0, 1, 2, 3, 2, 1],
          [3, 2, 1, 0.5, 1, 0, -1, -3]
        ]
      }, {
        high: 3,
        low: -3,
        fullWidth: true,
        // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
          onlyInteger: true,
          offset: 20
        }
      });
    }

    /**
      * Function written to line scatter diagram with resposive settings chartist chart.
    **/
	if ($(".demo5").length > 0){
		var times = function(n) {
		  return Array.apply(null, new Array(n));
		};
		
		var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
		  data.labels.push(index + 1);
		  data.series.forEach(function(series) {
			 series.push(Math.random() * 100)
		  });
		
		  return data;
		}, {
		  labels: [],
		  series: times(4).map(function() { return new Array() })
		});
		var options = {
		  showLine: false,
		  axisX: {
			 labelInterpolationFnc: function(value, index) {
				return index % 13 === 0 ? 'W' + value : null;
			 }
		  }
		};
		var responsiveOptions = [
		  ['screen and (min-width: 640px)', {
			 axisX: {
				labelInterpolationFnc: function(value, index) {
				  return index % 4 === 0 ? 'W' + value : null;
				}
			 }
		  }]
		];		
		new Chartist.Line('.demo5', data, options, responsiveOptions);		 
	}

    /**
      * Function written to load line chart with area chartist chart.
    **/
    if ($(".demo6").length > 0){
      new Chartist.Line('.demo6', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [5, 9, 7, 8, 5, 3, 5, 4]
        ]
      }, {
        low: 0,
        showArea: true
      });
    }

    /**
      * Function written to load bi-polar line chart with area chartist chart.
    **/
    if ($(".demo7").length > 0){
      new Chartist.Line('.demo7', {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        series: [
          [1, 2, 3, 1, -2, 0, 1, 0],
          [-2, -1, -2, -1, -2.5, -1, -2, -1],
          [0, 0, 0, 1, 2, 2.5, 2, 1],
          [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
        ]
      }, {
        high: 3,
        low: -3,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
          showLabel: false,
          showGrid: false
        }
      });
    }

    /**
      * Function written to load events to replace graphics chartist chart.
    **/
    if ($(".demo8").length > 0){
      var chart = new Chartist.Line('.demo8', {
        labels: [1, 2, 3, 4, 5],
        series: [
          [12, 9, 7, 8, 5]
        ]
      });

      // Listening for draw events that get emitted by the Chartist chart
      chart.on('draw', function(data) {
        // If the draw event was triggered from drawing a point on the line chart
        if(data.type === 'point') {
          // We are creating a new path SVG element that draws a triangle around the point coordinates
          var triangle = new Chartist.Svg('path', {
            d: ['M',
              data.x,
              data.y - 15,
              'L',
              data.x - 15,
              data.y + 8,
              'L',
              data.x + 15,
              data.y + 8,
              'z'].join(' '),
            style: 'fill-opacity: 1'
          }, 'ct-area');

          // With data.element we get the Chartist SVG wrapper and we can replace the original point drawn by Chartist with our newly created triangle
          data.element.replace(triangle);
        }
      });
  }

    /**
      * Function written to load advanced smil animations chartist chart.
    **/
    if ($(".demo9").length > 0){
        var chart = new Chartist.Line('.demo9', {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          series: [
            [12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
            [4,  5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
            [5,  3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
            [3,  4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
          ]
        }, {
          low: 0
        });

        // Let's put a sequence number aside so we can use it in the event callbacks
        var seq = 0,
          delays = 80,
          durations = 500;

        // Once the chart is fully created we reset the sequence
        chart.on('created', function() {
          seq = 0;
        });

        // On each drawn element by Chartist we use the Chartist.Svg API to trigger SMIL animations
        chart.on('draw', function(data) {
          seq++;

          if(data.type === 'line') {
            // If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
            data.element.animate({
              opacity: {
                // The delay when we like to start the animation
                begin: seq * delays + 1000,
                // Duration of the animation
                dur: durations,
                // The value where the animation should start
                from: 0,
                // The value where it should end
                to: 1
              }
            });
          } else if(data.type === 'label' && data.axis === 'x') {
            data.element.animate({
              y: {
                begin: seq * delays,
                dur: durations,
                from: data.y + 100,
                to: data.y,
                // We can specify an easing function from Chartist.Svg.Easing
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'label' && data.axis === 'y') {
            data.element.animate({
              x: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 100,
                to: data.x,
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'point') {
            data.element.animate({
              x1: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              x2: {
                begin: seq * delays,
                dur: durations,
                from: data.x - 10,
                to: data.x,
                easing: 'easeOutQuart'
              },
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'easeOutQuart'
              }
            });
          } else if(data.type === 'grid') {
            // Using data.axis we get x or y which we can use to construct our animation definition objects
            var pos1Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '1'] - 30,
              to: data[data.axis.units.pos + '1'],
              easing: 'easeOutQuart'
            };

            var pos2Animation = {
              begin: seq * delays,
              dur: durations,
              from: data[data.axis.units.pos + '2'] - 100,
              to: data[data.axis.units.pos + '2'],
              easing: 'easeOutQuart'
            };

            var animations = {};
            animations[data.axis.units.pos + '1'] = pos1Animation;
            animations[data.axis.units.pos + '2'] = pos2Animation;
            animations['opacity'] = {
              begin: seq * delays,
              dur: durations,
              from: 0,
              to: 1,
              easing: 'easeOutQuart'
            };

            data.element.animate(animations);
          }
        });

        // For the sake of the example we update the chart every time it's created with a delay of 10 seconds
        chart.on('created', function() {
          if(window.__exampleAnimateTimeout) {
            clearTimeout(window.__exampleAnimateTimeout);
            window.__exampleAnimateTimeout = null;
          }
          window.__exampleAnimateTimeout = setTimeout(chart.update.bind(chart), 12000);
        });
    }

    /**
      * Function written to load svg path animation chartist chart.
    **/
    if ($(".demo10").length > 0){
        var chart = new Chartist.Line('.demo10', {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          series: [
            [1, 5, 2, 5, 4, 3],
            [2, 3, 4, 8, 1, 2],
            [5, 4, 3, 2, 1, 0.5]
          ]
        }, {
          low: 0,
          showArea: true,
          showPoint: false,
          fullWidth: true
        });

        chart.on('draw', function(data) {
          if(data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 2000 * data.index,
                dur: 2000,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          }
        });
    }

    /**
      * Function written to load line interpolation chartist chart.
    **/
    if ($(".demo11").length > 0){
      var chart = new Chartist.Line('.demo11', {
        labels: [1, 2, 3, 4, 5],
        series: [
          [1, 5, 10, 0, 1],
          [10, 15, 0, 1, 2]
        ]
      }, {
        // Remove this configuration to see that chart rendered with cardinal spline interpolation
        // Sometimes, on large jumps in data values, it's better to use simple smoothing.
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 2
        }),
        fullWidth: true,
        chartPadding: {
          right: 20
        },
        low: 0
      });
    }

    /**
      * Function written to load series overrides chartist chart.
    **/
    if ($(".demo12").length > 0){
        var chart = new Chartist.Line('.demo12', {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
          // Naming the series with the series object array notation
          series: [{
            name: 'series-1',
            data: [5, 2, -4, 2, 0, -2, 5, -3]
          }, {
            name: 'series-2',
            data: [4, 3, 5, 3, 1, 3, 6, 4]
          }, {
            name: 'series-3',
            data: [2, 4, 3, 1, 4, 5, 3, 2]
          }]
        }, {
          fullWidth: true,
          // Within the series options you can use the series names
          // to specify configuration that will only be used for the
          // specific series.
          series: {
            'series-1': {
              lineSmooth: Chartist.Interpolation.step()
            },
            'series-2': {
              lineSmooth: Chartist.Interpolation.simple(),
              showArea: true
            },
            'series-3': {
              showPoint: false
            }
          }
        }, [
          // You can even use responsive configuration overrides to
          // customize your series configuration even further!
          ['screen and (max-width: 320px)', {
            series: {
              'series-1': {
                lineSmooth: Chartist.Interpolation.none()
              },
              'series-2': {
                lineSmooth: Chartist.Interpolation.none(),
                showArea: false
              },
              'series-3': {
                lineSmooth: Chartist.Interpolation.none(),
                showPoint: true
              }
            }
          }]
        ]);
    }

	/**
	* Function written to load bi-polar bar chartist chart.
	**/
	if ($(".demo13").length){
		var data = {
			labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
			series: [
			  [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
			]
		};
		
		var options = {
			high: 10,
			low: -10,
			axisX: {
			  labelInterpolationFnc: function(value, index) {
				 return index % 2 === 0 ? value : null;
			  }
			}
		};
		new Chartist.Bar('.demo13', data, options);
    }

    /**
      * Function written to load overlapping bars chartist chart.
    **/
		if ($(".demo14").length > 0){
		 var data = {
			  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			  series: [
				 [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
				 [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
			  ]
			};
			
			var options = {
			  seriesBarDistance: 10
			};
			
			var responsiveOptions = [
			  ['screen and (max-width: 640px)', {
				 seriesBarDistance: 5,
				 axisX: {
					labelInterpolationFnc: function (value) {
					  return value[0];
					}
				 }
			  }]
			];
		
			new Chartist.Bar('.demo14', data, options, responsiveOptions);
		}

    /**
      * Function written to load bi-polar bar chartist chart.
    **/
    if ($(".demo15").length > 0){
        var chart = new Chartist.Bar('.demo15', {
          labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
          series: [
            [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
          ]
        }, {
          high: 10,
          low: -10,
          axisX: {
            labelInterpolationFnc: function(value, index) {
              return index % 2 === 0 ? value : null;
            }
          }
        });

        // Listen for draw events on the bar chart
        chart.on('draw', function(data) {
          // If this draw event is of type bar we can use the data to create additional content
          if(data.type === 'bar') {
            // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
            data.group.append(new Chartist.Svg('circle', {
              cx: data.x2,
              cy: data.y2,
              r: Math.abs(Chartist.getMultiValue(data.value)) * 2 + 5
            }, 'ct-slice-pie'));
          }
        });
    }

    /**
      * Function written to load multi-line labels chartist chart.
    **/
    if ($(".demo16").length > 0){
        new Chartist.Bar('.demo16', {
          labels: ['First quarter of the year', 'Second quarter of the year', 'Third quarter of the year', 'Fourth quarter of the year'],
          series: [
            [60000, 40000, 80000, 70000],
            [40000, 30000, 70000, 65000],
            [8000, 3000, 10000, 6000]
          ]
        }, {
          seriesBarDistance: 10,
          axisX: {
            offset: 60
          },
          axisY: {
            offset: 80,
            labelInterpolationFnc: function(value) {
              return value + ' CHF'
            },
            scaleMinSpace: 15
          }
        });
    }

    /**
      * Function written to load stacked bar chart chartist chart.
    **/
    if ($(".demo17").length > 0){
        new Chartist.Bar('.demo17', {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          series: [
            [800000, 1200000, 1400000, 1300000],
            [200000, 400000, 500000, 300000],
            [100000, 200000, 400000, 600000]
          ]
        }, {
          stackBars: true,
          axisY: {
            labelInterpolationFnc: function(value) {
              return (value / 1000) + 'k';
            }
          }
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 30px'
            });
          }
        });
    }

    /**
      * Function written to load horizontol chartist chart.
    **/
    if ($(".demo18").length > 0){
        new Chartist.Bar('.demo18', {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          series: [
            [5, 4, 3, 7, 5, 10, 3],
            [3, 2, 9, 5, 4, 6, 4]
          ]
        }, {
          seriesBarDistance: 10,
          reverseData: true,
          horizontalBars: true,
          axisY: {
            offset: 70
          }
        });
    }

    /**
      * Function written to load extreme responsive chartist chart.
    **/
    if ($(".demo19").length > 0){
        new Chartist.Bar('.demo19', {
          labels: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'],
          series: [
            [5, 4, 3, 7],
            [3, 2, 9, 5],
            [1, 5, 8, 4],
            [2, 3, 4, 6],
            [4, 1, 2, 1]
          ]
        }, {
          // Default mobile configuration
          stackBars: true,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value.split(/\s+/).map(function(word) {
                return word[0];
              }).join('');
            }
          },
          axisY: {
            offset: 20
          }
        }, [
          // Options override for media > 400px
          ['screen and (min-width: 400px)', {
            reverseData: true,
            horizontalBars: true,
            axisX: {
              labelInterpolationFnc: Chartist.noop
            },
            axisY: {
              offset: 60
            }
          }],
          // Options override for media > 800px
          ['screen and (min-width: 800px)', {
            stackBars: false,
            seriesBarDistance: 10
          }],
          // Options override for media > 1000px
          ['screen and (min-width: 1000px)', {
            reverseData: false,
            horizontalBars: false,
            seriesBarDistance: 15
          }]
        ]);
    }

    /**
      * Function written to load distributed series chartist chart.
    **/
    if ($(".demo20").length > 0){
        new Chartist.Bar('.demo20', {
          labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          series: [20, 60, 120, 200, 180, 20, 10]
        }, {
          distributeSeries: true
        });
    }

    /**
      * Function written to load label placement chartist chart.
    **/
    if ($(".demo21").length > 0){
        new Chartist.Bar('.demo21', {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          series: [
            [5, 4, 3, 7, 5, 10, 3],
            [3, 2, 9, 5, 4, 6, 4]
          ]
        }, {
          axisX: {
            // On the x-axis start means top and end means bottom
            position: 'start'
          },
          axisY: {
            // On the y-axis start means left and end means right
            position: 'end'
          }
        });
    }

    /**
      * Function written to load pie chart with custom labels chartist chart.
    **/
    var data = {
      labels: ['Bananas', 'Apples', 'Grapes'],
      series: [20, 15, 40]
    };

    var options = {
      labelInterpolationFnc: function(value) {
        return value[0]
      }
    };

    var responsiveOptions = [
      ['screen and (min-width: 640px)', {
        chartPadding: 30,
        labelOffset: 100,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value) {
          return value;
        }
      }],
      ['screen and (min-width: 1024px)', {
        labelOffset: 80,
        chartPadding: 20
      }]
    ];

    if ($(".demo23").length > 0){
      new Chartist.Pie('.demo23', data, options, responsiveOptions);
    }

    /**
      * Function written to load animating a donut chartist chart.
    **/
    if ($(".demo25").length > 0){
      var chart = new Chartist.Pie('.demo25', {
        series: [10, 20, 50, 20, 5, 50, 15],
        labels: [1, 2, 3, 4, 5, 6, 7]
      }, {
        donut: true,
        showLabel: false
      });

      chart.on('draw', function(data) {
        if(data.type === 'slice') {
          // Get the total path length in order to use for dash array animation
          var pathLength = data.element._node.getTotalLength();

          // Set a dasharray that matches the path length as prerequisite to animate dashoffset
          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
          });

          // Create animation definition while also assigning an ID to the animation for later sync usage
          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 1000,
              from: -pathLength + 'px',
              to:  '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
              fill: 'freeze'
            }
          };

          // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
          if(data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
          }

          // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
          data.element.attr({
            'stroke-dashoffset': -pathLength + 'px'
          });

          // We can't use guided mode as the animations need to rely on setting begin manually
          // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
          data.element.animate(animationDefinition, false);
        }
      });

      // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
      chart.on('created', function() {
        if(window.__anim21278907124) {
          clearTimeout(window.__anim21278907124);
          window.__anim21278907124 = null;
        }
        window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
      });
    }
})(jQuery);
//--------- D3 charts js -----------//

'use strict';
(function($) {
	d3_area_chart();
	d3_stacked_area_chart();
	d3_bar_chart();
	d3_group_bar();
	d3_multi_series();
	d3_line_chart();
	d3_stacked_bar();
})(jQuery);

function d3_area_chart(){
	if($('#d3-area-chart').length > 0){
		var svg1 = d3.select("#d3-area-chart"),
			 margin = {top: 20, right: 20, bottom: 30, left: 50},
			 width = +svg1.attr("width") - margin.left - margin.right,
			 height = +svg1.attr("height") - margin.top - margin.bottom,
			 g1 = svg1.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		var parseTime = d3.timeParse("%d-%b-%y");
	
		var x = d3.scaleTime()
			 .rangeRound([0, width]);
	
		var y = d3.scaleLinear()
			 .rangeRound([height, 0]);
	
		var area = d3.area()
			 .x(function(d) { return x(d.date); })
			 .y1(function(d) { return y(d.close); });
	
		d3.tsv("assets/js/data/area-data.tsv", function(d) {
		  d.date = parseTime(d.date);
		  d.close = +d.close;
		  return d;
		}, function(error, data) {
		  if (error) throw error;
	
		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain([0, d3.max(data, function(d) { return d.close; })]);
		  area.y0(y(0));
	
		  g1.append("path")
				.datum(data)
				.attr("fill", "#5e6db3")
				.attr("d", area);
	
		  g1.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
	
		  g1.append("g")
				.call(d3.axisLeft(y))
			 .append("text")
				.attr("fill", "#000")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text("Price ($)");
		});
	}
}
function d3_stacked_area_chart(){
	if($("#d3-stacked-area").length > 0){
		var svg2 = d3.select("#d3-stacked-area"),
			 margin = {top: 20, right: 20, bottom: 30, left: 50},
			 width = svg2.attr("width") - margin.left - margin.right,
			 height = svg2.attr("height") - margin.top - margin.bottom;
	
		var parseDate = d3.timeParse("%Y %b %d");
	
		var x = d3.scaleTime().range([0, width]),
			 y = d3.scaleLinear().range([height, 0]),
			 z = d3.scaleOrdinal(d3.schemeCategory10);
	
		var stack = d3.stack();
	
		var area = d3.area()
			 .x(function(d, i) { return x(d.data.date); })
			 .y0(function(d) { return y(d[0]); })
			 .y1(function(d) { return y(d[1]); });
	
		var g2 = svg2.append("g")
			 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		d3.tsv("assets/js/data/stacked-area-data.tsv", type, function(error, data) {
			if (error) throw error;
	
			var keys = data.columns.slice(1);
			
			x.domain(d3.extent(data, function(d) { return d.date; }));
			z.domain(keys);
			stack.keys(keys);
	
			var layer = g2.selectAll(".layer")
				.data(stack(data))
				.enter().append("g")
				.attr("class", "layer")
				.attr("fill", "#fff");
			
			layer.append("path")
				.attr("class", "area")
				.style("fill", function(d) { return z(d.key); })
				.attr("d", area);
			
			layer.filter(function(d) { return d[d.length - 1][1] - d[d.length - 1][0] > 0.01; })
				.append("text")
				.attr("x", width - 6)
				.attr("y", function(d) { return y((d[d.length - 1][0] + d[d.length - 1][1]) / 2); })
				.attr("dy", ".35em")
				.style("font", "10px sans-serif")
				.style("text-anchor", "end")
				.text(function(d) { return d.key; });
				
			g2.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
			g2.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10, "%"));
		});
	
		function type(d, i, columns) {
			d.date = parseDate(d.date);
			for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]] / 100;
			return d;
		}
	}
}
	
	/*-------- d3 bar chart ---------*/
function d3_bar_chart(){
	if($("#d3-bar-chart").length > 0){
		var svg3 = d3.select("#d3-bar-chart"),
			 margin = {top: 20, right: 20, bottom: 30, left: 40},
			 width = +svg3.attr("width") - margin.left - margin.right,
			 height = +svg3.attr("height") - margin.top - margin.bottom;
	
		var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
			 y = d3.scaleLinear().rangeRound([height, 0]);
	
		var g3 = svg3.append("g")
			 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		d3.tsv("assets/js/data/bar-data.tsv", function(d) {
		  d.frequency = +d.frequency;
		  return d;
		}, function(error, data) {
		  if (error) throw error;
	
		  x.domain(data.map(function(d) { return d.letter; }));
		  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
	
		  g3.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
	
		  g3.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y).ticks(10, "%"))
			 .append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text("Frequency");
	
		  g3.selectAll(".bar")
			 .data(data)
			 .enter().append("rect")
				.attr("class", "bar")
				.attr("x", function(d) { return x(d.letter); })
				.attr("y", function(d) { return y(d.frequency); })
				.attr("width", x.bandwidth())
				.attr("height", function(d) { return height - y(d.frequency); });
		});
	}
}

function d3_group_bar(){
	if($("#d3-group-bar").length > 0){
		var svg4 = d3.select("#d3-group-bar"),
			 margin = {top: 20, right: 20, bottom: 30, left: 40},
			 width = +svg4.attr("width") - margin.left - margin.right,
			 height = +svg4.attr("height") - margin.top - margin.bottom,
			 g4 = svg4.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		var x0 = d3.scaleBand()
			 .rangeRound([0, width])
			 .paddingInner(0.1);
	
		var x1 = d3.scaleBand()
			 .padding(0.05);
	
		var y = d3.scaleLinear()
			 .rangeRound([height, 0]);
	
		var z = d3.scaleOrdinal()
			 .range(["#99ead5", "#33d5aa", "#00ca95", "#adecfd", "#5ad9fa", "#31cff9", "#0bc9fb"]);
	
		d3.csv("assets/js/data/group-bar-data.csv", function(d, i, columns) {
			for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
			return d;
		}, function(error, data) {
			if (error) throw error;
			var keys = data.columns.slice(1);	
			x0.domain(data.map(function(d) { return d.State; }));
			x1.domain(keys).rangeRound([0, x0.bandwidth()]);
			y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
	
			g4.append("g")
				.selectAll("g")
				.data(data)
				.enter().append("g")
				.attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; })
				.selectAll("rect")
				.data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
				.enter().append("rect")
				.attr("x", function(d) { return x1(d.key); })
				.attr("y", function(d) { return y(d.value); })
				.attr("width", x1.bandwidth())
				.attr("height", function(d) { return height - y(d.value); })
				.attr("fill", function(d) { return z(d.key); });
	
		  g4.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x0));
	
		  g4.append("g")
				.attr("class", "axis")
				.call(d3.axisLeft(y).ticks(null, "s"))
			 	.append("text")
				.attr("x", 2)
				.attr("y", y(y.ticks().pop()) + 0.5)
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "start")
				.text("Population");
	
		  var legend = g4.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
				.attr("text-anchor", "end")
			 	.selectAll("g")
			 	.data(keys.slice().reverse())
			 	.enter().append("g")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	
		  legend.append("rect")
				.attr("x", width - 19)
				.attr("width", 19)
				.attr("height", 19)
				.attr("fill", z);
	
		  legend.append("text")
				.attr("x", width - 24)
				.attr("y", 9.5)
				.attr("dy", "0.32em")
				.text(function(d) { return d; });
		});
	}
}

function d3_stacked_bar(){
	if($("#d3-stacked-bar").length > 0){
		var svg5 = d3.select("#d3-stacked-bar"),
			 margin = {top: 20, right: 20, bottom: 30, left: 40},
			 width = +svg5.attr("width") - margin.left - margin.right,
			 height = +svg5.attr("height") - margin.top - margin.bottom,
			 g5 = svg5.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		var x = d3.scaleBand()
			 .rangeRound([0, width])
			 .paddingInner(0.05)
			 .align(0.1);
	
		var y = d3.scaleLinear()
			 .rangeRound([height, 0]);
	
		var z = d3.scaleOrdinal()
			 .range(["#fecac4", "#fd9589", "#fd7b6c", "#bfc5e1", "#7e8ac2", "#5e6db3", "#5b6dc2"]);
	
		d3.csv("assets/js/data/stacked-bar-data.tsv", function(d, i, columns) {
			var t= 0;
		  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
		  d.total = t;
		  return d;
		}, function(error, data) {
		  if (error) throw error;
	
		  var keys = data.columns.slice(1);
	
		  data.sort(function(a, b) { return b.total - a.total; });
		  x.domain(data.map(function(d) { return d.State; }));
		  y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
		  z.domain(keys);
	
		  g5.append("g")
			 .selectAll("g")
			 .data(d3.stack().keys(keys)(data))
			 .enter().append("g")
				.attr("fill", function(d) { return z(d.key); })
			 .selectAll("rect")
			 .data(function(d) { return d; })
			 .enter().append("rect")
				.attr("x", function(d) { return x(d.data.State); })
				.attr("y", function(d) { return y(d[1]); })
				.attr("height", function(d) { return y(d[0]) - y(d[1]); })
				.attr("width", x.bandwidth());
	
		  g5.append("g")
				.attr("class", "axis")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
	
		  g5.append("g")
				.attr("class", "axis")
				.call(d3.axisLeft(y).ticks(null, "s"))
			 .append("text")
				.attr("x", 2)
				.attr("y", y(y.ticks().pop()) + 0.5)
				.attr("dy", "0.32em")
				.attr("fill", "#000")
				.attr("font-weight", "bold")
				.attr("text-anchor", "start")
				.text("Population");
	
		  var legend = g5.append("g")
				.attr("font-family", "sans-serif")
				.attr("font-size", 10)
				.attr("text-anchor", "end")
			 .selectAll("g")
			 .data(keys.slice().reverse())
			 .enter().append("g")
				.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
	
		  legend.append("rect")
				.attr("x", width - 19)
				.attr("width", 19)
				.attr("height", 19)
				.attr("fill", z);
	
		  legend.append("text")
				.attr("x", width - 24)
				.attr("y", 9.5)
				.attr("dy", "0.32em")
				.text(function(d) { return d; });
		});
	}
}
	
	/*------ d3 line charts -------*/
function d3_line_chart(){
	if($("#d3-line-chart").length > 0){
		var svg6 = d3.select("#d3-line-chart"),
			 margin = {top: 20, right: 20, bottom: 30, left: 50},
			 width = +svg6.node().getBoundingClientRect().width - margin.left - margin.right,
			 height = +svg6.attr("height") - margin.top - margin.bottom,
			 g6 = svg6.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		var parseTime = d3.timeParse("%d-%b-%y");
	
		var x = d3.scaleTime().rangeRound([0, width]);
	
		var y = d3.scaleLinear().rangeRound([height, 0]);
	
		var line = d3.line().x(function(d) { return x(d.date); }).y(function(d) { return y(d.close); });
	
		d3.tsv("assets/js/data/line-data.tsv", function(d) {
			d.date = parseTime(d.date);
			d.close = +d.close;
			return d;
		}, function(error, data) {
			if (error) throw error;
	
		  x.domain(d3.extent(data, function(d) { return d.date; }));
		  y.domain(d3.extent(data, function(d) { return d.close; }));
	
		  g6.append("g")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x))
			 .select(".domain")
				.remove();
	
		  g6.append("g")
				.call(d3.axisLeft(y))
			 .append("text")
				.attr("fill", "#000")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("text-anchor", "end")
				.text("Price ($)");
	
		  g6.append("path")
				.datum(data)
				.attr("fill", "none")
				.attr("stroke", "#00ca85")
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round")
				.attr("stroke-width", 2)
				.attr("d", line);
		});
	}
}
	
	
	//------------ Multi series line chart js --------------//
function d3_multi_series(){
	if($("#d3-multi-series").length > 0){
		var svg7 = d3.select("#d3-multi-series"),
			 margin = {top: 20, right: 80, bottom: 30, left: 50},
			 width = svg7.attr("width") - margin.left - margin.right,
			 height = svg7.attr("height") - margin.top - margin.bottom,
			 g7 = svg7.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
		var parseTime = d3.timeParse("%Y%m%d");
	
		var x = d3.scaleTime().range([0, width]),
			 y = d3.scaleLinear().range([height, 0]),
			 z = d3.scaleOrdinal(d3.schemeCategory10);
	
		var line = d3.line()
			 .curve(d3.curveBasis)
			 .x(function(d) { return x(d.date); })
			 .y(function(d) { return y(d.temperature); });
	
		d3.tsv("assets/js/data/multi-data.tsv", type, function(error, data) {
		  if (error) throw error;
	
		  var cities = data.columns.slice(1).map(function(id) {
			 return {
				id: id,
				values: data.map(function(d) {
				  return {date: d.date, temperature: d[id]};
				})
			 };
		  });
	
		  x.domain(d3.extent(data, function(d) { return d.date; }));
	
		  y.domain([
			 d3.min(cities, function(c) { return d3.min(c.values, function(d) { return d.temperature; }); }),
			 d3.max(cities, function(c) { return d3.max(c.values, function(d) { return d.temperature; }); })
		  ]);
	
		  z.domain(cities.map(function(c) { return c.id; }));
	
		  g7.append("g")
				.attr("class", "axis axis--x")
				.attr("transform", "translate(0," + height + ")")
				.call(d3.axisBottom(x));
	
		  g7.append("g")
				.attr("class", "axis axis--y")
				.call(d3.axisLeft(y))
			 .append("text")
				.attr("transform", "rotate(-90)")
				.attr("y", 6)
				.attr("dy", "0.71em")
				.attr("fill", "#000")
				.text("Temperature, ºF");
	
		  var city = g7.selectAll(".city")
			 .data(cities)
			 .enter().append("g")
				.attr("class", "city");
	
		  city.append("path")
				.attr("class", "line")
				.attr("fill", "none")
				.attr("stroke-width", 2)
				.attr("d", function(d) { return line(d.values); })
				.style("stroke", function(d) { return z(d.id); });
	
		  city.append("text")
				.datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
				.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")"; })
				.attr("x", 3)
				.attr("dy", "0.35em")
				.style("font", "10px sans-serif")
				.text(function(d) { return d.id; });
		});
	
		var type = function(d, _, columns) {
		  d.date = parseTime(d.date);
		  for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
		  return d;
		}
	}
}
//--------- Dimple charts js -----------//
'use strict';
(function($){
	dimple_line_chart();
	dimple_line_group();
	dimple_line_multiple();
	dimple_line_group_multiple();
	dimple_line_curve();
	dimple_dual_measure();
	dimple_line_vetical();
	dimple_vert_multiple();
	dimple_vert_group();
	dimple_vert_group_multiple();
	dimple_horz_bar();
	dimple_horz_stacked();
	dimple_full_horizontal();
	dimple_horz_grouped();
	dimple_horz_group();
	dimple_horz_full();
	dimple_vertical_bar();
	dimple_vertical_stacked();
	dimple_vert_full();
	dimple_vert_grouped();
	dimple_vertical_group();
	dimple_vertical_full();
	dimple_pie_chart();
	dimple_pie_matrix();
	dimple_lollypop_group_pie();
	dimple_lollypop_pie();
	dimple_vertical_stack_area();
	dimple_vertical_area();
	dimple_full_vertical();
	dimple_vert_group_area();
	dimple_areachart();
	dimple_stacked_area();
	dimple_full_stacked_area();
	dimple_group_area();
})(jQuery);

function resize(myChart) {
	setTimeout(function() {
		myChart.draw(0, true);
	}, 100);
}
function dimple_line_chart(){
	if($("#chartContainer").length > 0){
		var svg = dimple.newSvg("#chartContainer", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 505, 305);
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries(null, dimple.plot.line);
			myChart.draw();
		});
	}
}

function dimple_line_group(){
	if($("#horizontal-group").length > 0){
		var svg = dimple.newSvg("#horizontal-group", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, "100%", "100%");
			var x = myChart.addCategoryAxis("x", ["Owner", "Month"]);
			x.addGroupOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries("Owner", dimple.plot.line);
			s.barGap = 0.05;
			myChart.draw();
		});
	}
}
function dimple_line_multiple(){
	if($("#dimple-multiple-line").length > 0){
		var svg = dimple.newSvg("#dimple-multiple-line", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 505, 305);
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addSeries("Channel", dimple.plot.line);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_line_group_multiple(){	
	if($("#group-multiple-line").length > 0){
		var svg = dimple.newSvg("#group-multiple-line", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 430, 330);
			var x = myChart.addCategoryAxis("x", ["Owner", "Month"]);
			x.addGroupOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries(["Brand"], dimple.plot.line);
			s.barGap = 0.05;
			myChart.addLegend(510, 20, 100, 300, "left");
			myChart.draw();
		});
	}
}

function dimple_line_curve(){	
	if($("#curvy-line").length > 0){
		var svg = dimple.newSvg("#curvy-line", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, "100%", "100%");
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries("Channel", dimple.plot.line);
			s.interpolation = "cardinal";
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_dual_measure(){	
	if($("#dual-measure").length > 0){
		var svg = dimple.newSvg("#dual-measure", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(50, 55, 500, 310)
			var x = myChart.addMeasureAxis("x", "Distribution");
			x.overrideMin = 20;
			var y = myChart.addMeasureAxis("y", "Price");
			y.overrideMin = 50
			var s = myChart.addSeries(["Month", "Owner"], dimple.plot.line);
			s.addOrderRule("Date");
			s.aggregate = dimple.aggregateMethod.avg;
			myChart.addLegend(130, 10, 400, 35, "right");
			myChart.draw();
		});
	}
}

function dimple_line_vetical(){
	if($("#single-vertical").length > 0){
		var svg = dimple.newSvg("#single-vertical", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 485, 330);
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			var s = myChart.addSeries(null, dimple.plot.line);
			myChart.draw();
		});
	}
}

function dimple_vert_multiple(){	
	if($("#multiple-vertical").length > 0){
		var svg = dimple.newSvg("#multiple-vertical", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 480, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries("Channel", dimple.plot.line);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}
	
function dimple_vert_group(){
	if($("#grouped-multiple").length > 0){
		var svg = dimple.newSvg("#grouped-multiple", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(90, 30, 470, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", ["Owner", "Month"]);
			y.addGroupOrderRule("Date");
			var s = myChart.addSeries("Owner", dimple.plot.line);
			s.barGap = 0.05;
			myChart.draw();
		});
	}
}

function dimple_vert_group_multiple(){	
	if($("#vert-grouped-multi").length > 0){
		var svg = dimple.newSvg("#vert-grouped-multi", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(90, 30, 400, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", ["Owner", "Month"]);
			y.addGroupOrderRule("Date");
			var s = myChart.addSeries(["Brand"], dimple.plot.line);
			s.barGap = 0.05;
			myChart.addLegend(510, 20, 100, 300, "left");
			myChart.draw();
		});
	}
}

function dimple_horz_bar(){	
	if($("#horizontal-bar").length > 0){
		var svg = dimple.newSvg("#horizontal-bar", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 480, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries(null, dimple.plot.bar);
			myChart.draw();
		});
	}
}

function dimple_horz_stacked(){
	if($("#horizontal-stacked-bar").length > 0){
		var svg = dimple.newSvg("#horizontal-stacked-bar", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 480, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(60, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_full_horizontal(){	
	if($("#horizontal-full").length > 0){
		var svg = dimple.newSvg("#horizontal-full", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 480, 330)
			myChart.addPctAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(60, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_horz_grouped(){	
	if($("#horizontal-grouped").length > 0){
		var svg = dimple.newSvg("#horizontal-grouped", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(80, 30, 480, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			myChart.addCategoryAxis("y", ["Price Tier", "Channel"]);
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(60, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_horz_group(){	
	if($("#horiz-group").length > 0){
		var svg = dimple.newSvg("#horiz-group", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(80, 30, 480, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			myChart.addCategoryAxis("y", ["Price Tier", "Channel"]);
			myChart.addSeries("Owner", dimple.plot.bar);
			myChart.addLegend(200, 10, 380, 20, "right");
			myChart.draw();
		});
	}
}
	
function dimple_horz_full(){
	if($("#horiz-full").length > 0){
		var svg = dimple.newSvg("#horiz-full", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(80, 30, 480, 330)
			myChart.addPctAxis("x", "Unit Sales");
			myChart.addCategoryAxis("y", ["Price Tier", "Channel"]);
			myChart.addSeries("Owner", dimple.plot.bar);
			myChart.addLegend(200, 10, 380, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vertical_bar(){	
	if($("#vertical-bar").length > 0){
		var svg = dimple.newSvg("#vertical-bar", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 510, 305)
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addSeries(null, dimple.plot.bar);
			myChart.draw();
		});
	}
}

function dimple_vertical_stacked(){
	if($("#vertical-stacked").length > 0){
		var svg = dimple.newSvg("#vertical-stacked", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 510, 305)
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(60, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vert_full(){	
	if($("#vertical-full").length > 0){
		var svg = dimple.newSvg("#vertical-full", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(65, 30, 505, 305)
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addPctAxis("y", "Unit Sales");
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(60, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vert_grouped(){
	if($("#vertical-grouped").length > 0){
		var svg = dimple.newSvg("#vertical-grouped", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 510, 330)
			myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addSeries("Channel", dimple.plot.bar);
			myChart.addLegend(65, 10, 510, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vertical_group(){	
	if($("#vert-group").length > 0){
		var svg = dimple.newSvg("#vert-group", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 45, 510, 315)
			myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addSeries("Owner", dimple.plot.bar);
			myChart.addLegend(200, 10, 380, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vertical_full(){
	if($("#vert-full").length > 0){
		var svg = dimple.newSvg("#vert-full", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(65, 45, 505, 315)
			myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
			myChart.addPctAxis("y", "Unit Sales");
			myChart.addSeries("Owner", dimple.plot.bar);
			myChart.addLegend(200, 10, 380, 20, "right");
			myChart.draw();
		});
	}
}
function dimple_pie_chart(){	
	if($("#dimple-pie-chart").length > 0){
		var svg = dimple.newSvg("#dimple-pie-chart", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(20, 20, 460, 360)
			myChart.addMeasureAxis("p", "Unit Sales");
			myChart.addSeries("Owner", dimple.plot.pie);
			myChart.addLegend(500, 20, 90, 300, "left");
			myChart.draw();
		});
	}
}
function dimple_pie_matrix(){	
	if($("#pie-matrix").length > 0){
		var svg = dimple.newSvg("#pie-matrix", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(95, 25, 475, 335)
			myChart.addCategoryAxis("x", "Price Tier");
			myChart.addCategoryAxis("y", "Pack Size");
			myChart.addMeasureAxis("p", "Unit Sales");
			var pies = myChart.addSeries("Channel", dimple.plot.pie);
			pies.radius = 25;
			myChart.addLegend(240, 10, 330, 20, "right");
			myChart.draw();
		});
	}
}
function dimple_lollypop_pie(){	
	if($("#lollipop-pie").length > 0){
		var svg = dimple.newSvg("#lollipop-pie", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Date", [
			"01/07/2012", "01/08/2012", "01/09/2012",
			"01/10/2012", "01/11/2012", "01/12/2012"]);
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 500, 330)
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addMeasureAxis("p", "Unit Sales");
			var pies = myChart.addSeries("Channel", dimple.plot.pie);
			pies.radius = 20;
			myChart.addLegend(140, 10, 360, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_lollypop_group_pie(){	
	if($("#group-lollipop-pie").length > 0){
		var svg = dimple.newSvg("#group-lollipop-pie", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(65, 50, 505, 310)
			myChart.addCategoryAxis("x", ["Price Tier", "Channel"]);
			myChart.addMeasureAxis("y", "Unit Sales");
			myChart.addMeasureAxis("p", "Unit Sales");
			var pies = myChart.addSeries("Owner", dimple.plot.pie);
			pies.radius = 20;
			myChart.addLegend(170, 10, 410, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_vertical_area(){	
	if($("#vertical-area").length > 0){
		var svg = dimple.newSvg("#vertical-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"]);
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 485, 330);
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			var s = myChart.addSeries(null, dimple.plot.area);
			myChart.draw();
		});
	}
}

function dimple_vertical_stack_area(){	
	if($("#vertical-stack-area").length > 0){
		var svg = dimple.newSvg("#vertical-stack-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"]);
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 485, 330);
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries("Channel", dimple.plot.area);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}
function dimple_full_vertical(){	
	if($("#full-vertical-stack").length > 0){
		var svg = dimple.newSvg("#full-vertical-stack", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"]);
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(75, 30, 485, 330);
			myChart.addPctAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", "Month");
			y.addOrderRule("Date");
			myChart.addSeries("Channel", dimple.plot.area);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}
function dimple_vert_group_area(){	
	if($("#vt-group-area").length > 0){
		var svg = dimple.newSvg("#vt-group-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(90, 30, 470, 330)
			myChart.addMeasureAxis("x", "Unit Sales");
			var y = myChart.addCategoryAxis("y", ["Owner", "Month"]);
			y.addGroupOrderRule("Date");
			var s = myChart.addSeries("Owner", dimple.plot.area);
			s.lineWeight = 1;
			s.barGap = 0.05;
			myChart.draw();
		});
	}
}

function dimple_areachart(){
	if($("#dimple-areachart").length > 0){
		var svg = dimple.newSvg("#dimple-areachart", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 505, 305);
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries(null, dimple.plot.area);
			myChart.draw();
		});
	}
}
function dimple_stacked_area(){	
	if($("#stacked-area").length > 0){
		var svg = dimple.newSvg("#stacked-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 505, 305);
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries("Channel", dimple.plot.area);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}

function dimple_full_stacked_area(){	
	if($("#full-stacked-area").length > 0){
		var svg = dimple.newSvg("#full-stacked-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(65, 30, 505, 305);
			var x = myChart.addCategoryAxis("x", "Month");
			x.addOrderRule("Date");
			myChart.addPctAxis("y", "Unit Sales");
			myChart.addSeries("Channel", dimple.plot.area);
			myChart.addLegend(60, 10, 500, 20, "right");
			myChart.draw();
		});
	}
}
function dimple_group_area(){	
	if($("#group-area").length > 0){
		var svg = dimple.newSvg("#group-area", "100%", 400);
		d3.tsv("assets/js/data/dimple_data.tsv", function (data) {
			data = dimple.filterData(data, "Owner", ["Aperture", "Black Mesa"])
			var myChart = new dimple.chart(svg, data);
			myChart.setBounds(60, 30, 500, 330)
			var x = myChart.addCategoryAxis("x", ["Owner", "Month"]);
			x.addGroupOrderRule("Date");
			myChart.addMeasureAxis("y", "Unit Sales");
			var s = myChart.addSeries("Owner", dimple.plot.area);
			s.lineWeight = 1;
			s.barGap = 0.05;
			myChart.draw();
		});
	}
}
'use strict';
/**
  * Function written to load pie flotchart.
**/
function prtm_pie_chart(){
	var data = [];
	var series = Math.floor(Math.random() * 10) + 1;
	series = series < 5 ? 5 : series;
    var colors =['#5e6db3','#00ca95','#31cff9','#f17316','#fd7b6c','#d24636','#7e8ac2']
	for (var i = 0; i < series; i++) {
		data[i] = {
			label: "Series" + (i + 1),
			color: colors[i],
			data: Math.floor(Math.random() * 100) + 1
		};
	}

	// GRAPH 1
	if ($('.pie_chart_1').length > 0) {
		$.plot($(".pie_chart_1"), data, {
			series: {
				pie: {
					show: true
				}
			},
			legend: {
				show: false
			}
		});
	}

	// GRAPH 2
	if ($('.pie_chart_2').length > 0) {
		$.plot($(".pie_chart_2"), data, {
			series: {
				pie: {
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 1,
						formatter: function(label, series) {
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
						},
						background: {
							opacity: 0.8
						}
					}
				}
			},
			legend: {
				show: false
			}
		});
	}

	// GRAPH 3
	if ($('.pie_chart_3').length > 0) {
		$.plot($(".pie_chart_3"), data, {
			series: {
				pie: {
					show: true,
					radius: 1,
					label: {
						show: true,
						radius: 3 / 4,
						formatter: function(label, series) {
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
						},
						background: {
							opacity: 0.5
						}
					}
				}
			},
			legend: {
				show: false
			}
		});
	}

	// GRAPH 5
	if ($('.pie_chart_4').length > 0) {
		$.plot($(".pie_chart_4"), data, {
			series: {
				pie: {
					show: true,
					radius: 3 / 4,
					label: {
						show: true,
						radius: 3 / 4,
						formatter: function(label, series) {
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
						},
						background: {
							opacity: 0.5,
							color: '#000'
						}
					}
				}
			},
			legend: {
				show: false
			}
		});
	}

	// GRAPH 9
	if ($('.pie_chart_5').length > 0) {
		$.plot($(".pie_chart_5"), data, {
			series: {
				pie: {
					show: true,
					radius: 1,
					tilt: 0.5,
					label: {
						show: true,
						radius: 1,
						formatter: function(label, series) {
							return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
						},
						background: {
							opacity: 0.8
						}
					},
					combine: {
						color: '#999',
						threshold: 0.1
					}
				}
			},
			legend: {
				show: false
			}
		});
	}

	// DONUT
	if ($('#donut').length > 0) {
		$.plot($("#donut"), data, {
			series: {
				pie: {
					innerRadius: 0.5,
					show: true
				}
			}
		});
	}

	// INTERACTIVE
	if ($('.interactive').length > 0) {
		$.plot($(".interactive"), data, {
			series: {
				pie: {
					show: true
				}
			},
			grid: {
				hoverable: true,
				clickable: true
			}
		});
		$(".interactive").bind("plothover", pieHover);
		$(".interactive").bind("plotclick", pieClick);
	}

	function pieHover(event, pos, obj) {
		if (!obj)
			return;
		percent = parseFloat(obj.series.percent).toFixed(2);
		$("#hover").html('<span style="font-weight: bold; color: ' + obj.series.color + '">' + obj.series.label + ' (' + percent + '%)</span>');
	}

	function pieClick(event, pos, obj) {
		if (!obj)
			return;
		percent = parseFloat(obj.series.percent).toFixed(2);
		alert('' + obj.series.label + ': ' + percent + '%');
	}
}

/**
  * Function written to load image plots flotchart.
**/
function prtm_error_bars(){
	function drawArrow(ctx, x, y, radius){
		ctx.beginPath();
		ctx.moveTo(x + radius, y + radius);
		ctx.lineTo(x, y);
		ctx.lineTo(x - radius, y + radius);
		ctx.stroke();
	}

	function drawSemiCircle(ctx, x, y, radius){
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI, false);
		ctx.moveTo(x - radius, y);
		ctx.lineTo(x + radius, y);
		ctx.stroke();
	}

	var data1 = [
		[1,1,.5,.1,.3],
		[2,2,.3,.5,.2],
		[3,3,.9,.5,.2],
		[1.5,-.05,.5,.1,.3],
		[3.15,1.,.5,.1,.3],
		[2.5,-1.,.5,.1,.3]
	];

	var data1_points = {
		show: true,
		radius: 5,
		fillColor: "blue", 
		errorbars: "xy", 
		xerr: {show: true, asymmetric: true, upperCap: "-", lowerCap: "-"}, 
		yerr: {show: true, color: "red", upperCap: "-"}
	};

	var data2 = [
		[.7,3,.2,.4],
		[1.5,2.2,.3,.4],
		[2.3,1,.5,.2]
	];

	var data2_points = {
		show: true,
		radius: 5,
		errorbars: "y", 
		yerr: {show:true, asymmetric:true, upperCap: drawArrow, lowerCap: drawSemiCircle}
	};

	var data3 = [
		[1,2,.4],
		[2,0.5,.3],
		[2.7,2,.5]
	];

	var data3_points = {
		//do not show points
		radius: 0,
		errorbars: "y", 
		yerr: {show:true, upperCap: "-", lowerCap: "-", radius: 5}
	};

	var data4 = [
		[1.3, 1],
		[1.75, 2.5],
		[2.5, 0.5]
	];

	var data4_errors = [0.1, 0.4, 0.2];
	for (var i = 0; i < data4.length; i++) {
		data4_errors[i] = data4[i].concat(data4_errors[i])
	}

	var data = [
		{color: "#5e6db3", points: data1_points, data: data1, label: "data1"}, 
		{color: "#d24636",  points: data2_points, data: data2, label: "data2"},
		{color: "#00ca95", lines: {show: true}, points: data3_points, data: data3, label: "data3"},
		// bars with errors
		{color: "#fd7b6c", bars: {show: true, align: "center", barWidth: 0.25}, data: data4, label: "data4"},
		{color: "#fd7b6c", points: data3_points, data: data4_errors}
	];
	if($(".error-bars").length > 0){
		$.plot($(".error-bars"), data , {
			legend: {
				position: "sw",
				show: true
			},
			series: {
				lines: {
					show: false
				}
			},
			xaxis: {
				min: 0.6,
				max: 3.1
			},
			yaxis: {
				min: 0,
				max: 3.5
			},
			zoom: {
				interactive: true
			},
			pan: {
				interactive: true
			},
            grid: {
				borderWidth: 0
			}
		});
	}
}

/**
  * Function written to load stacking flotchart.
**/
function prtm_stacking(){
	var d1 = [];
	for (var i = 0; i <= 10; i += 1) {
		d1.push([i, parseInt(Math.random() * 30,30)]);
	}

	var d2 = [];
	for (var i = 0; i <= 10; i += 1) {
		d2.push([i, parseInt(Math.random() * 30,30)]);
	}

	var d3 = [];
	for (var i = 0; i <= 10; i += 1) {
		d3.push([i, parseInt(Math.random() * 30,30)]);
	}

	var stack = 0,
		bars = true,
		lines = false,
		steps = false;
    var data = [
        {color:'#5e6db3', data: d1},
        {color:'#00ca95', data: d2},
        {color:'#31cff9', data: d3},
    ];
	function plotWithOptions() {
		if ($(".stacking").length > 0){
			$.plot(".stacking", data, {
				series: {
					stack: stack,
					lines: {
						show: lines,
						fill: true,
						steps: steps
					},
					bars: {
						show: bars,
						barWidth: 0.6
					}
				},
                grid: {
				borderWidth: 0
			    }
			});
		}
	}

	plotWithOptions();

	$(".stackControls button").on('click',function (e) {
		e.preventDefault();
		stack = $(this).text() == "With stacking" ? true : null;
		plotWithOptions();
	});

	$(".graphControls button").on('click',function (e) {
		e.preventDefault();
		bars = $(this).text().indexOf("Bars") != -1;
		lines = $(this).text().indexOf("Lines") != -1;
		steps = $(this).text().indexOf("steps") != -1;
		plotWithOptions();
	});
}

/**
  * Function written to load toggling series flotchart.
**/
function prtm_toggling_series(){
var datasets = {
		"usa": {
			label: "USA",
			color: '#f17316',
			data: [[1988, 483994], [1989, 479060], [1990, 457648], [1991, 401949], [1992, 424705], [1993, 402375], [1994, 377867], [1995, 357382], [1996, 337946], [1997, 336185], [1998, 328611], [1999, 329421], [2000, 342172], [2001, 344932], [2002, 387303], [2003, 440813], [2004, 480451], [2005, 504638], [2006, 528692]]
		},        
		"russia": {
			label: "Russia",
			color: '#00ca85',
			data: [[1988, 218000], [1989, 203000], [1990, 171000], [1992, 42500], [1993, 37600], [1994, 36600], [1995, 21700], [1996, 19200], [1997, 21300], [1998, 13600], [1999, 14000], [2000, 19100], [2001, 21300], [2002, 23600], [2003, 25100], [2004, 26100], [2005, 31100], [2006, 34700]]
		},
		"uk": {
			label: "UK",
			color: '#d24636',
			data: [[1988, 183994], [1989, 147900], [1990, 145748], [1991, 141949], [1992, 142405], [1993, 140275], [1994, 137787], [1995, 135382], [1996, 133946], [1997, 133685], [1998, 32611], [1999, 132941], [2000, 134172], [2001, 134432], [2002, 138303], [2003, 144083], [2004, 148041], [2005, 150438], [2006, 1152892]]
		},
		"germany": {
			label: "Germany",
			color: '#fd7b6c',
			data: [[1988, 155627], [1989, 155475], [1990, 158464], [1991, 155134], [1992, 152436], [1993, 147139], [1994, 143962], [1995, 143238], [1996, 142395], [1997, 140854], [1998, 140993], [1999, 141822], [2000, 141147], [2001, 140474], [2002, 140604], [2003, 140044], [2004, 138816], [2005, 138060], [2006, 136984]]
		},
		"sweden": {
			label: "Sweden",
			color: '#5e6db3',
			data: [[1988, 896402], [1989, 896474], [1990, 896605], [1991, 896209], [1992, 896035], [1993, 896020], [1994, 896000], [1995, 896018], [1996, 893958], [1997, 895780], [1998, 895954], [1999, 896178], [2000, 6411], [2001, 5993], [2002, 5833], [2003, 5791], [2004, 5450], [2005, 5521], [2006, 5271]]
		},
		"norway": {
			label: "Norway",
			color: '#31cff9',
			data: [[1988, 494382], [1989, 594498], [1990, 294535], [1991, 194398], [1992, 594766], [1993, 694441], [1994, 894670], [1995, 794217], [1996, 894275], [1997, 894203], [1998, 894482], [1999, 294506], [2000, 894358], [2001, 894385], [2002, 895269], [2003, 895066], [2004, 895194], [2005, 894887], [2006, 894891]]
		}
	};

	// hard-code color indices to prevent them from shifting as
	// countries are turned on/off
	var i = 0;
	$.each(datasets, function(key, val) {
		val.color = i;
		++i;
	});
	// insert checkboxes 
	var choiceContainer = $(".choices");
	$.each(datasets, function(key, val) {
		choiceContainer.append("<br/><input type='checkbox' name='" + key +
			"' checked='checked' id='id" + key + "'></input>" +
			"<label for='id" + key + "'>"
			+ val.label + "</label>");
	});
	choiceContainer.find("input").on('click',plotAccordingToChoices);
	function plotAccordingToChoices() {
		var data = [];
		choiceContainer.find("input:checked").each(function () {
			var key = $(this).attr("name");
			if (key && datasets[key]) {
				data.push(datasets[key]);
			}
		});
		if ($(".toggling-series").length > 0){
			if (data.length > 0) {
				$.plot(".toggling-series", data, {
					yaxis: {
						min: 0
					},
					xaxis: {
						tickDecimals: 0
					},
                    grid: {
						borderWidth: 0
					},
					colors: ["#f17316","#00ca85","#d24636","#fd7b6c","#5e6db3","#31cff9"],
				});
			}
		}
	}
	plotAccordingToChoices();
}

/**
  * Function written to load ajax flotchart.
**/
function prtm_real_time_update(){
	if($(".real-timeupdate").length > 0){
		var data = [],
		totalPoints = 300;
		var getRandomData = function() {
			if (data.length > 0)
				data = data.slice(1);
			// Do a random walk
			while (data.length < totalPoints) {
				var prev = data.length > 0 ? data[data.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}
				data.push(y);
			}
	
			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}
			return res;
		}
	
		// Set up the control widget
		var updateInterval = 30;
			var v = 30;
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
                var data=[{color: '#F8B98B',data:getRandomData()}];
                var plot = $.plot(".real-timeupdate", data, {
                    series: {
                        shadowSize: 0	// Drawing is faster without shadows
                    },
                    yaxis: {
                        min: 0,
                        max: 100
                    },
                    xaxis: {
                        show: false
                    },
                    grid: {
                        borderWidth: 0,
                    },
                    colors: ["#fb9678"],
                });
            var update = function() {
              plot.setData([getRandomData()]);
             // Since the axes don't change, we don't need to call plot.setupGrid()
            plot.draw();
            setTimeout(update, updateInterval);
            }
         update();
	}
}
function getRandomData() {
	if (data.length > 0)
		data = data.slice(1);

	// Do a random walk
	while (data.length < totalPoints) {
		var prev = data.length > 0 ? data[data.length - 1] : 50,
			y = prev + Math.random() * 10 - 5;

		if (y < 0) {
			y = 0;
		} else if (y > 100) {
			y = 100;
		}

		data.push(y);
	}

	// Zip the generated y values with the x values

	var res = [];
	for (var i = 0; i < data.length; ++i) {
		res.push([i, data[i]])
	}
	return res;
}

/**
  * Function written to load adding annotations flotchart.
**/
function prtm_adding_annotations(){
	if ($(".adding-annotations").length > 0){
		var d1 = [];
		for (var i = 0; i < 20; ++i) {
			d1.push([i, Math.sin(i)]);
		}

		var data = [{ data: d1, label: "Pressure", color: "#31CFF9" }];

		var markings = [
			{ color: "#ffffff", yaxis: { from: 1 } },
			{ color: "#ffffff", yaxis: { to: -1 } },
			{ color: "#ffffff", lineWidth: 1, xaxis: { from: 1, to: 1 } },
			{ color: "#ffffff", lineWidth: 1, xaxis: { from: 9, to: 9 } }
		];

		var placeholder = $(".adding-annotations");

		var plot = $.plot(placeholder, data, {
			bars: { show: true, barWidth: 0.7, fill: 1 },
			xaxis: { ticks: [], autoscaleMargin: 0.02 },
			yaxis: { min: -2, max: 2 },
			grid: { markings: markings, borderWidth: 0 }
            
		});

		var o = plot.pointOffset({ x: 2, y: -1.2});

		// Append it to the placeholder that Flot already uses for positioning

		placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Warming up</div>");

		o = plot.pointOffset({ x: 8, y: -1.2});
		placeholder.append("<div style='position:absolute;left:" + (o.left + 4) + "px;top:" + o.top + "px;color:#666;font-size:smaller'>Actual measurements</div>");

		// Draw a little arrow on top of the last label to demonstrate canvas
		// drawing
		var ctx = plot.getCanvas().getContext("2d");
		ctx.beginPath();
		o.left += 4;
		ctx.moveTo(o.left, o.top);
		ctx.lineTo(o.left, o.top - 10);
		ctx.lineTo(o.left + 10, o.top - 5);
		ctx.lineTo(o.left, o.top);
		ctx.fillStyle = "#5e6db3";
		ctx.fill();
	}
}


/**
  * Function written to load categories flotchart.
**/
function prtm_categories(){
	if ($(".categories").length > 0){
		var data = {color: '#5e6db3',data:[["January", 25], ["February", 8], ["March", 4], ["April", 13], ["May", 17], ["June", 9] ]};
		$.plot(".categories", [ data ], {
			series: {
				bars: {
					show: true,
					barWidth: 0.8,
					align: "center",
                    fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
				}
			},
			xaxis: {
				mode: "categories",
				tickLength: 0
			},
            grid: {
	        	borderWidth: 0,
	       	},
		});
	}
}

/**
  * Function written to load basic flotchart.
**/
function prtm_basic_chart(){
	if ($(".basic-chart").length > 0){
		var d1 = [];
		for (var i = 0; i < 14; i += 0.5) {
			d1.push([i, Math.sin(i)]);
		}
		var d2 =  {color:'#fd7b6c', data: [[0, 3], [4, 8], [8, 5], [9, 13]]};
		var d3 = {color:'#00ca85' , data: [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]]};
		$.plot(".basic-chart", [ d1, d2, d3 ], {
			grid: {
	        	borderWidth: 0,
	       	},
	       	bars: {
			    show: true,
			    lineWidth: 0,
			    fill: true,
			    fillColor: { colors: [ { opacity: 1 }, { opacity: 1 } ] }
			}	
		});
	}
}
function prtm_multiple_real_time_update(){
	if($(".multiple-real-timeupdate").length > 0){
		var data = [],
		totalPoints = 300;
		var getRandomData = function() {
			if (data.length > 0)
				data = data.slice(1);
			// Do a random walk
			while (data.length < totalPoints) {
				var prev = data.length > 0 ? data[data.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}
				data.push(y);
			}
	
			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data.length; ++i) {
				res.push([i, data[i]])
			}
			return res;
		}

		var data2 = [],
		totalPoints = 300;
		var getRandomDataTwo = function() {
			if (data2.length > 0)
				data2 = data2.slice(1);
			// Do a random walk
			while (data2.length < totalPoints) {
				var prev = data2.length > 0 ? data2[data2.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
				if (y < 0) {
					y = 0;
				} else if (y > 100) {
					y = 100;
				}
				data2.push(y);
			}
	
			// Zip the generated y values with the x values
			var res = [];
			for (var i = 0; i < data2.length; ++i) {
				res.push([i, data2[i]])
			}
			return res;
		}
	
		// Set up the control widget
		var updateInterval = 30;
			var v = 30;
			if (v && !isNaN(+v)) {
				updateInterval = +v;
				if (updateInterval < 1) {
					updateInterval = 1;
				} else if (updateInterval > 2000) {
					updateInterval = 2000;
				}
				$(this).val("" + updateInterval);
			}
                var d1={color: '#F8B98B',data:getRandomData()};
                var d2={color: '#31CFF9',data:getRandomDataTwo()};
                var plot = $.plot(".multiple-real-timeupdate", [d1,d2], {
                    series: {
                        shadowSize: 0	// Drawing is faster without shadows
                    },
                    yaxis: {
                        min: 0,
                        max: 100
                    },
                    xaxis: {
                        show: false
                    },
                    grid: {
                        borderWidth: 0,
                    },
                    colors: ["#fb9678","#31CFF9"],
                });
            var update = function() {
              plot.setData([getRandomData(),getRandomDataTwo()]);
             // Since the axes don't change, we don't need to call plot.setupGrid()
            plot.draw();
            setTimeout(update, updateInterval);
            }
         update();
	}
}


/**
  * Function written to intialized all the functions.
**/
(function($) {
	prtm_basic_chart();
	prtm_categories();
	prtm_adding_annotations();
	prtm_real_time_update();
	prtm_toggling_series();
	prtm_stacking();
	prtm_error_bars();
	prtm_pie_chart();
	prtm_multiple_real_time_update();
})(jQuery);
'use strict';
var ChartsFlowchart = function() {
    /**
      * Function written to load basic flowchart.
    **/
    var basiceg = function() {
        if($("#basic-eg").length > 0){
        	var flow = '';

        	flow += 'st=>start: Start:>http://keenthemes.com[blank]' + "\n";
    		flow += 'e=>end:>http://keenthemes.com' + "\n";
    		flow += 'op1=>operation: My Operation' + "\n";
    		flow += 'sub1=>subroutine: My Subroutine' + "\n";;
    		flow += 'cond=>condition: Yes' + "\n";
    		flow += 'or No?:>http://keenthemes.com' + "\n";
    		flow += 'io=>inputoutput: catch something...' + "\n";
    		flow += 'st->op1->cond' + "\n";
    		flow += 'cond(yes)->io->e' + "\n"; 
    		flow += 'cond(no)->sub1(right)->op1';

            var diagram = flowchart.parse(flow);

            diagram.drawSVG('basic-eg', {
                'x': 0,
                'y': 0,
                'line-width': 3,
                'line-length': 50,
                'text-margin': 10,
                'font-size': 14,
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                'fill': 'white',
                'yes-text': 'yes',
                'no-text': 'no',
                'arrow-end': 'block',
                'scale': 1,
            });
        }
    }
    /**
      * Function written to load advanced flowchart.
    **/
    var advancedeg = function() {
        if ($("#advanced-eg").length > 0){
        	var flow = '';
        	flow += 'st=>start: Start:>http://keenthemes.com[blank]' + "\n";
    		flow += 'st=>start: Start|past:>http://keenthemes.com[blank]' + "\n";
    		flow += 'e=>end: End|future:>http://keenthemes.com' + "\n";
    		flow += 'op1=>operation: My Operation|past' + "\n";
    		flow += 'op2=>operation: Stuff|current' + "\n";
    		flow += 'sub1=>subroutine: My Subroutine|invalid' + "\n";
    		flow += 'cond=>condition: Yes' + "\n";
    		flow += 'or No?|approved:>http://keenthemes.com' + "\n";
    		flow += 'c2=>condition: Good idea|rejected' + "\n";
    		flow += 'io=>inputoutput: catch something...|future' + "\n";
    		flow += 'st->op1(right)->cond' + "\n";
    		flow += 'cond(yes, right)->c2' + "\n";
    		flow += 'cond(no)->sub1(left)->op1' + "\n";
    		flow += 'c2(yes)->io->e' + "\n";
    		flow += 'c2(no)->op2->e' + "\n";
            var diagram = flowchart.parse(flow);
            diagram.drawSVG('advanced-eg', {
                'x': 0,
                'y': 0,
                'line-width': 3,
                'line-length': 50,
                'text-margin': 10,
                'font-size': 14,
                'font-color': 'black',
                'line-color': 'black',
                'element-color': 'black',
                'fill': 'white',
                'yes-text': 'yes',
                'no-text': 'no',
                'arrow-end': 'block',
                'scale': 1,
                // style symbol types
                'symbols': {
                    'start': {
                        'font-color': '#00ca95',
                        'element-color': '#00ca95',
                        'fill': '#758494'
                    },
                    'end': {
                        'font-color': '#00ca95',
                        'element-color': '#00ca95',
                        'fill': '#758494'
                    }
                },
                // even flowstate support ;-)
                'flowstate': {
                    'past': {
                        'fill': '#CCCCCC',
                        'font-size': 12
                    },
                    'current': {
                        'fill': '#f17316',
                        'font-color': '#ffffff',
                        'font-weight': 'bold'
                    },
                    'future': {
                        'fill': '#FFFF99'
                    },
                    'request': {
                        'fill': 'blue'
                    },
                    'invalid': {
                        'fill': '#d24636'
                    },
                    'approved': {
                        'fill': '#00ca95',
                        'font-size': 12,
                        'yes-text': 'APPROVED',
                        'no-text': 'n/a'
                    },
                    'rejected': {
                        'fill': '#fd7b6c',
                        'font-size': 12,
                        'yes-text': 'n/a',
                        'no-text': 'REJECTED'
                    }
                }
            });
        }
    }
    return {
        init: function() {
            basiceg();
            advancedeg();
        }
    };
}();
(function($) {
    ChartsFlowchart.init();
})(jQuery);

google.charts.load('current', {packages: ['corechart', 'bar', 'line', 'orgchart', 'treemap', 'table', 'timeline', 'gauge','geochart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

	/**
	  * Function written to load column google chart.
	**/
	if ($("#column-chart-1").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Year', 'Sales', 'Expenses', 'Profit'],
			['2014', 1000, 400, 200],
			['2015', 1170, 460, 250],
			['2016', 660, 1120, 300],
			['2017', 1030, 540, 350]
		]);

		var options = {
			chart: {
				title: 'Company Performance',
				subtitle: 'Sales, Expenses, and Profit: 2014-2017',
			},
			bars: 'vertical',
			vAxis: {format: 'decimal'},
			height: 400,
			colors: ['#00ca95', '#f17316', '#5e6db3']
		};
		var chart = new google.charts.Bar(document.getElementById('column-chart-1'));

		chart.draw(data, google.charts.Bar.convertOptions(options));
	}
     
    /**
	  * Function written to load column google chart.
	**/
    if ($("#column-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
	        ["Element", "Density", { role: "style" } ],
	        ["Copper", 8.94, "#b87333"],
	        ["Silver", 10.49, "silver"],
	        ["Gold", 19.30, "gold"],
	        ["Platinum", 21.45, "color: #e5e4e2"]
	      ]);

	      var view = new google.visualization.DataView(data);
	      view.setColumns([0, 1,
	                       { calc: "stringify",
	                         sourceColumn: 1,
	                         type: "string",
	                         role: "annotation" },
	                       2]);

	      var options = {
	        title: "Density of Precious Metals, in g/cm^3",
	        width: 400,
	        height: 400,
	        bar: {groupWidth: "95%"},
	        legend: { position: "none" },
	      };
	      var chart = new google.visualization.ColumnChart(document.getElementById("column-chart-2"));
	      chart.draw(view, options);
	}
	
	/**
	  * Function written to load bar google chart.
	**/
	if ($("#bar-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Year', 'Sales', 'Expenses', 'Profit'],
			['2014', 1000, 400, 200],
			['2015', 1170, 460, 250],
			['2016', 660, 1120, 300],
			['2017', 1030, 540, 350]
		]);

		var options = {
			chart: {
				title: 'Company Performance',
				subtitle: 'Sales, Expenses, and Profit: 2014-2017',
			},
			bars: 'horizontal', // Required for Material Bar Charts.
			hAxis: {format: 'decimal'},
			height: 400,
			colors: ['#00ca95', '#f17316', '#5e6db3']
		};
		var chart = new google.charts.Bar(document.getElementById('bar-chart-1'));
		chart.draw(data, google.charts.Bar.convertOptions(options));
	}
		
	/**
	  * Function written to load bar google chart.
	**/
	if ($("#bar-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			["Element", "Density", { role: "style" } ],
			["Copper", 8.94, "#b87333"],
			["Silver", 10.49, "silver"],
			["Gold", 19.30, "gold"],
			["Platinum", 21.45, "color: #e5e4e2"]
		]);

		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1,{
			calc: "stringify",
			sourceColumn: 1,
			type: "string",
			role: "annotation" },2]);

		var options = {
			title: "Density of Precious Metals, in g/cm^3",
			width: 400,
			height: 400,
			bar: {groupWidth: "95%"},
			legend: { position: "none" },
		};
		var chart = new google.visualization.BarChart(document.getElementById("bar-chart-2"));
		chart.draw(view, options);
	}
	
	/**
	  * Function written to load line google chart.
	**/
	if ($("#line-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Year', 'Sales', 'Expenses'],
			['2004',  1000,      400],
			['2005',  1170,      460],
			['2006',  660,       1120],
			['2007',  1030,      540]
		]);
		var options = {
			title: 'Company Performance',
			subtitle: 'Sales and Expenses: 2004-2007',
			curveType: 'function',
			height: 400,
			colors: ['#00ca95', '#f17316'],
			legend: { position: 'bottom' }
		};
		var chart = new google.visualization.LineChart(document.getElementById('line-chart-1'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load line google chart.
	**/
	if ($("#line-chart-2").length > 0){ 
		var data = new google.visualization.DataTable();
		data.addColumn('number', 'Day');
		data.addColumn('number', 'Guardians of the Galaxy');
		data.addColumn('number', 'The Avengers');
		data.addColumn('number', 'Transformers: Age of Extinction');

		data.addRows([
			[1,  37.8, 80.8, 41.8],
			[2,  30.9, 69.5, 32.4],
			[3,  25.4,   57, 25.7],
			[4,  11.7, 18.8, 10.5],
			[5,  11.9, 17.6, 10.4],
			[6,   8.8, 13.6,  7.7],
			[7,   7.6, 12.3,  9.6],
			[8,  12.3, 29.2, 10.6],
			[9,  16.9, 42.9, 14.8],
			[10, 12.8, 30.9, 11.6],
			[11,  5.3,  7.9,  4.7],
			[12,  6.6,  8.4,  5.2],
			[13,  4.8,  6.3,  3.6],
			[14,  4.2,  6.2,  3.4]
		]);
		var options = {
			chart: {
				title: 'Box Office Earnings in First Two Weeks of Opening',
				subtitle: 'in millions of dollars (USD)'
			},
			height: 400,
			colors: ['#00ca95', '#f17316', '#5e6db3'],
			axes: {
				x: {
					0: {side: 'top'}
				}
			}
		};
		var chart = new google.charts.Line(document.getElementById('line-chart-2'));
		chart.draw(data, options);
	}

	/**
	  * Function written to load combo google chart.
	**/	
	if ($("#combo-chart").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
			['2004/05',  165,      938,         522,             998,           450,      614.6],
			['2005/06',  135,      1120,        599,             1268,          288,      682],
			['2006/07',  157,      1167,        587,             807,           397,      623],
			['2007/08',  139,      1110,        615,             968,           215,      609.4],
			['2008/09',  136,      691,         629,             1026,          366,      569.6]
		]);
		var options = {
			title : 'Monthly Coffee Production by Country',
			vAxis: {title: 'Cups'},
			hAxis: {title: 'Month'},
			seriesType: 'bars',
			height:500,
			colors: ['#00ca95', '#f17316', '#5e6db3', '#fd7b6c', '#d24636'],
			series: {5: {type: 'line'}}
		};
		var chart = new google.visualization.ComboChart(document.getElementById('combo-chart'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load area google chart.
	**/
	if ($("#area-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Year', 'Sales', 'Expenses'],
			['2013',  1000,      400],
			['2014',  1170,      460],
			['2015',  660,       1120],
			['2016',  1030,      540]
		]);

		var options = {
			title: 'Company Performance',
			hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
			vAxis: {minValue: 0},
			height:400,
			colors: ['#00ca95', '#f17316'],	
		};

		var chart = new google.visualization.AreaChart(document.getElementById('area-chart-1'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load area google chart.
	**/
	if ($("#area-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Year', 'Car', 'Trucks', 'Drones', 'Segways'],
			['2013',  870,   460,     540,    600],
			['2014',  460,   720,     720,    900],
			['2015',  930,   540,     1200,   840],
			['2016',  1030,  800,     1250,   1200]
		]);

		var options = {
			isStacked: false,
			height: 400,
			colors: ['#00ca95', '#f17316', '#5e6db3', '#fd7b6c'],
			legend: {position: 'top', maxLines: 3},
			vAxis: {minValue: 0}
		};

		var chart = new google.visualization.AreaChart(document.getElementById('area-chart-2'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load stepped area google chart.
	**/
	if ($("#stepped-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Director (Year)',  'Rotten Tomatoes', 'IMDB'],
			['Alfred Hitchcock (1935)', 8.4,         7.9],
			['Ralph Thomas (1959)',     6.9,         6.5],
			['Don Sharp (1978)',        6.5,         6.4],
			['James Hawes (2008)',      4.4,         6.2]
		]);
		var options = {
			title: 'The decline of \'The 39 Steps\'',
			vAxis: {title: 'Accumulated Rating'},
			isStacked: true,
			height:400,
			colors: ['#00ca95', '#f17316'],
		};
		var chart = new google.visualization.SteppedAreaChart(document.getElementById('stepped-chart-1'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load stepped area google chart.
	**/
	if ($("#stepped-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Year', 'Colonial' ,'Victorian', 'Modern', 'Contemporary'],
			['2013',  5.2,         3.6,        2.8,         2.0],
			['2014',  5.6,         4.0,        2.8,         3.0],
			['2015',  7.2,         2.2,        2.2,         6.0],
			['2016',  8.0,         1.7,        0.8,         4.0]
		]);
		var options = {
			isStacked: true,
			height: 400,
			colors: ['#00ca95', '#f17316', '#5e6db3', '#fd7b6c'],
			legend: {position: 'bottom', maxLines: 3},
			vAxis: {minValue: 0}
		};
		var chart = new google.visualization.SteppedAreaChart(document.getElementById('stepped-chart-2'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load pie google chart.
	**/
	if ($("#pie-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work',     11],
			['Eat',      4],
			['Commute',  9],
			['Watch TV', 5],
			['Sleep',    7]
		]);
		var options = {
			title: 'My Daily Activities',
			height:400,
			colors: ['#00ca95', '#f17316', '#5e6db3', '#fd7b6c', '#d24636'],
		};
		var chart = new google.visualization.PieChart(document.getElementById('pie-chart-1'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load pie google chart.
	**/
	if ($("#pie-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work',     11],
			['Eat',      2],
			['Commute',  2],
			['Watch TV', 2],
			['Sleep',    7]
		]);
		var options = {
			title: 'My Daily Activities',
			is3D: true,
			height:400,
			colors:['#00ca95', '#f17316', '#5e6db3', '#fd7b6c', '#d24636'],
		};
		var chart = new google.visualization.PieChart(document.getElementById('pie-chart-2'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load pie google chart.
	**/
	if ($("#pie-chart-3").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Language', 'Speakers (in millions)'],
			['Assamese', 13], ['Bengali', 83], ['Bodo', 1.4],
			['Dogri', 2.3], ['Gujarati', 46], ['Hindi', 300],
			['Kannada', 38], ['Kashmiri', 5.5], ['Konkani', 5],
			['Maithili', 20], ['Malayalam', 33], ['Manipuri', 1.5],
			['Marathi', 72], ['Nepali', 2.9], ['Oriya', 33],
			['Punjabi', 29], ['Sanskrit', 0.01], ['Santhali', 6.5],
			['Sindhi', 2.5], ['Tamil', 61], ['Telugu', 74], ['Urdu', 52]
		]);
		var options = {
			title: 'Indian Language Use',
			legend: 'none',
			pieSliceText: 'label',
			height:400,
			colors:['#00ca95', '#f17316', '#5e6db3', '#fd7b6c', '#d24636','#7e8ac2','#33d5aa','#5ad9fa','#fd9589'],
			slices: {  4: {offset: 0.2},
				12: {offset: 0.3},
				14: {offset: 0.4},
				15: {offset: 0.5},
			},
		};
		var chart = new google.visualization.PieChart(document.getElementById('pie-chart-3'));
		chart.draw(data, options);
	}

	/**
	  * Function written to load pie google chart.
	**/
	if ($("#pie-chart-4").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['Task', 'Hours per Day'],
			['Work',     11],
			['Eat',      2],
			['Commute',  2],
			['Watch TV', 2],
			['Sleep',    7]
		]);
		var options = {
			title: 'My Daily Activities',
			pieHole: 0.4,
			height:400,
			colors:['#00ca95', '#f17316', '#5e6db3', '#fd7b6c', '#d24636'],
		};
		var chart = new google.visualization.PieChart(document.getElementById('pie-chart-4'));
		chart.draw(data, options);
	}

	/**
	  * Function written to load bubble google chart.
	**/
	if ($("#bubble-chart-1").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['ID', 'X', 'Y', 'Temperature'],
			['',   80,  167,      120],
			['',   79,  136,      130],
			['',   78,  184,      50],
			['',   72,  278,      230],
			['',   81,  200,      210],
			['',   72,  170,      100],
			['',   68,  477,      80]
		]);
		var options = {
			colorAxis: {colors: ['#00ca95', '#f17316']},
			height:400,

		};
		var chart = new google.visualization.BubbleChart(document.getElementById('bubble-chart-1'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load bubble goole chart.
	**/
	if ($("#bubble-chart-2").length > 0){ 
		var data = google.visualization.arrayToDataTable([
			['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
			['CAN',    80.66,              1.67,      'North America',  33739900],
			['DEU',    79.84,              1.36,      'Europe',         81902307],
			['DNK',    78.6,               1.84,      'Europe',         5523095],
			['EGY',    72.73,              2.78,      'Middle East',    79716203],
			['GBR',    80.05,              2,         'Europe',         61801570],
			['IRN',    72.49,              1.7,       'Middle East',    73137148],
			['IRQ',    68.09,              4.77,      'Middle East',    31090763],
			['ISR',    81.55,              2.96,      'Middle East',    7485600],
			['RUS',    68.6,               1.54,      'Europe',         141850000],
			['USA',    78.09,              2.05,      'North America',  307007000]
		]);

		var options = {
			title: 'Correlation between life expectancy, fertility rate ' +
			'and population of some world countries (2010)',
			hAxis: {title: 'Life Expectancy'},
			vAxis: {title: 'Fertility Rate'},
			height:400,
			colors:['#00ca95', '#f17316', '#5e6db3'],
			bubble: {textStyle: {fontSize: 11}}
		};
		var chart = new google.visualization.BubbleChart(document.getElementById('bubble-chart-2'));
		chart.draw(data, options);
	}
	
	/**
	  * Function written to load tree google chart.
	**/
	if ($("#tree-chart").length > 0){ 
		 var data = google.visualization.arrayToDataTable([
			  ['Location', 'Parent', 'Market trade volume (size)', 'Market increase/decrease (color)'],
			  ['Global',    null,                 0,                               0],
			  ['America',   'Global',             0,                               0],
			  ['Europe',    'Global',             0,                               0],
			  ['Asia',      'Global',             0,                               0],
			  ['Australia', 'Global',             0,                               0],
			  ['Africa',    'Global',             0,                               0],
			  ['Brazil',    'America',            11,                              10],
			  ['USA',       'America',            52,                              31],
			  ['Mexico',    'America',            24,                              12],
			  ['Canada',    'America',            16,                              -23],
			  ['France',    'Europe',             42,                              -11],
			  ['Germany',   'Europe',             31,                              -2],
			  ['Sweden',    'Europe',             22,                              -13],
			  ['Italy',     'Europe',             17,                              4],
			  ['UK',        'Europe',             21,                              -5],
			  ['China',     'Asia',               36,                              4],
			  ['Japan',     'Asia',               20,                              -12],
			  ['India',     'Asia',               40,                              63],
			  ['Laos',      'Asia',               4,                               34],
			  ['Mongolia',  'Asia',               1,                               -5],
			  ['Israel',    'Asia',               12,                              24],
			  ['Iran',      'Asia',               18,                              13],
			  ['Pakistan',  'Asia',               11,                              -52],
			  ['Egypt',     'Africa',             21,                              0],
			  ['S. Africa', 'Africa',             30,                              43],
			  ['Sudan',     'Africa',             12,                              2],
			  ['Congo',     'Africa',             10,                              12],
			  ['Zaire',     'Africa',             8,                               10]
		]);
		
		tree = new google.visualization.TreeMap(document.getElementById('tree-chart'));

		tree.draw(data, {
			minColor: '#f00',
			midColor: '#ddd',
			maxColor: '#0d0',
			headerHeight: 15,
			fontColor: 'black',
			height:400,
			showScale: true,
		});
	}

	/**
	  * Function written to load table google chart.
	**/
	if ($("#table-chart").length > 0){ 
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Name');
		data.addColumn('number', 'Salary');
		data.addColumn('boolean', 'Full Time Employee');
		data.addRows([
			['Mike',  {v: 10000, f: '$10,000'}, true],
			['Jim',   {v:8000,   f: '$8,000'},  false],
			['Alice', {v: 12500, f: '$12,500'}, true],
			['Bob',   {v: 7000,  f: '$7,000'},  true]
		]);
		var table = new google.visualization.Table(document.getElementById('table-chart'));
		table.draw(data, {showRowNumber: true, width: '100%', height: '400'});
	}
	
	/**
	  * Function written to load timeline google chart.
	**/
	if ($("#timeline-chart").length > 0){ 
		var container = document.getElementById('timeline-chart');
	    var chart = new google.visualization.Timeline(container);
	    var dataTable = new google.visualization.DataTable();
	    dataTable.addColumn({ type: 'string', id: 'Room' });
	    dataTable.addColumn({ type: 'string', id: 'Name' });
	    dataTable.addColumn({ type: 'date', id: 'Start' });
	    dataTable.addColumn({ type: 'date', id: 'End' });
	    dataTable.addRows([
			[ 'Magnolia Room',  'CSS Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,14,0,0) ],
			[ 'Magnolia Room',  'Intro JavaScript',    new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
			[ 'Magnolia Room',  'Advanced JavaScript', new Date(0,0,0,16,30,0), new Date(0,0,0,19,0,0) ],
			[ 'Gladiolus Room', 'Intermediate Perl',   new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
			[ 'Gladiolus Room', 'Advanced Perl',       new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
			[ 'Gladiolus Room', 'Applied Perl',        new Date(0,0,0,16,30,0), new Date(0,0,0,18,0,0) ],
			[ 'Petunia Room',   'Google Charts',       new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
			[ 'Petunia Room',   'Closure',             new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
			[ 'Petunia Room',   'App Engine',          new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ]]);
	    var options = {
			timeline: { colorByRowLabel: true },
			backgroundColor: '#ffd',
			height:400,
	    };
	    chart.draw(dataTable, options);
	}
	
	/**
	  * Function written to load org google chart.
	**/
	if ($("#org-chart").length > 0){ 
		var data = new google.visualization.DataTable();
		data.addColumn('string', 'Name');
		data.addColumn('string', 'Manager');
		data.addColumn('string', 'ToolTip');
		data.addRows([
			[{v:'Mike', f:'Mike<div style="color:red; font-style:italic">President</div>'},
			'', 'The President'],
			[{v:'Jim', f:'Jim<div style="color:red; font-style:italic">Vice President</div>'},
			'Mike', 'VP'],
			['Alice', 'Mike', ''],
			['Bob', 'Jim', 'Bob Sponge'],
			['Carol', 'Bob', ''],
			['Carol', 'Bob', ''],
			['Jack', 'Mike', ''],
			['rock', 'Jack', ''],
		]);
		var chart = new google.visualization.OrgChart(document.getElementById('org-chart'));
		chart.draw(data, {allowHtml:true});
	}

	/**
	  * Function written to load gauge google chart.
	**/
	if ($("#gauge-chart").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Label', 'Value'],
			['Memory', 80],
			['CPU', 55],
			['Network', 68]
		]);

		var options = {
			width: 400, height: 400,
			redFrom: 90, redTo: 100,
			yellowFrom:75, yellowTo: 90,
			minorTicks: 5
		};
		var chart = new google.visualization.Gauge(document.getElementById('gauge-chart'));
		chart.draw(data, options);
		setInterval(function() {
			data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
			chart.draw(data, options);
		}, 13000);
		setInterval(function() {
			data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
			chart.draw(data, options);
		}, 5000);
		setInterval(function() {
			data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
			chart.draw(data, options);
		}, 26000);
	}
		
	/**
	  * Function written to load candlestick google chart.
	**/
	if ($("#candlestick-chart").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Mon', 20, 28, 38, 45],
			['Tue', 31, 38, 55, 66],
			['Wed', 50, 55, 77, 80],
			['Thu', 77, 77, 66, 50],
			['Fri', 68, 66, 22, 15]
		], true);
		var options = {
			legend:'none',
			height:400,
			colors:['#5e6db3'],
		};
		var chart = new google.visualization.CandlestickChart(document.getElementById('candlestick-chart'));
		chart.draw(data, options);
	}
    
	/**
	  * Function written to load geo google chart.
	**/
	if ($("#geo-chart").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Country', 'Popularity'],
			['Germany', 200],
			['United States', 300],
			['Brazil', 400],
			['Canada', 500],
			['France', 600],
			['RU', 700]
		]);
		var options = {height:400, colors:['#00ca95'],};
		var chart = new google.visualization.GeoChart(document.getElementById('geo-chart'));
		chart.draw(data, options);
	}

	/**
	  * Function written to load scattered google chart.
	**/
	if ($("#scattered-chart").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Age', 'Weight'],
			[ 8,      12],
			[ 4,      5.5],
			[ 11,     14],
			[ 4,      5],
			[ 3,      3.5],
			[ 6.5,    12],
			[ 15,      30],
			[ 18,      36],
			[ 20,     40],
			[ 24,      28],
			[ 13,      26],
			[ 9.5,    18]
		]);
		var options = {
			title: 'Age vs. Weight comparison',
			hAxis: {title: 'Age', minValue: 0, maxValue: 15},
			vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
			legend: 'none',
			height:400
		};
		var chart = new google.visualization.ScatterChart(document.getElementById('scattered-chart'));
		chart.draw(data, options);
	}

	/**
	  * Function written to load histogram google chart.
	**/
	if ($("#histogram-chart-1").length > 0){
		var data = google.visualization.arrayToDataTable([
	          ['Dinosaur', 'Length'],
	          ['Acrocanthosaurus (top-spined lizard)', 12.2],
	          ['Albertosaurus (Alberta lizard)', 9.1],
	          ['Allosaurus (other lizard)', 12.2],
	          ['Apatosaurus (deceptive lizard)', 22.9],
	          ['Archaeopteryx (ancient wing)', 0.9],
	          ['Argentinosaurus (Argentina lizard)', 36.6],
	          ['Baryonyx (heavy claws)', 9.1],
	          ['Brachiosaurus (arm lizard)', 30.5],
	          ['Ceratosaurus (horned lizard)', 6.1],
	          ['Coelophysis (hollow form)', 2.7],
	          ['Compsognathus (elegant jaw)', 0.9],
	          ['Deinonychus (terrible claw)', 2.7],
	          ['Diplodocus (double beam)', 27.1],
	          ['Dromicelomimus (emu mimic)', 3.4],
	          ['Gallimimus (fowl mimic)', 5.5],
	          ['Mamenchisaurus (Mamenchi lizard)', 21.0],
	          ['Megalosaurus (big lizard)', 7.9],
	          ['Microvenator (small hunter)', 1.2],
	          ['Ornithomimus (bird mimic)', 4.6],
	          ['Oviraptor (egg robber)', 1.5],
	          ['Plateosaurus (flat lizard)', 7.9],
	          ['Sauronithoides (narrow-clawed lizard)', 2.0],
	          ['Seismosaurus (tremor lizard)', 45.7],
	          ['Spinosaurus (spiny lizard)', 12.2],
	          ['Supersaurus (super lizard)', 30.5],
	          ['Tyrannosaurus (tyrant lizard)', 15.2],
	          ['Ultrasaurus (ultra lizard)', 30.5],
	          ['Velociraptor (swift robber)', 1.8]]);

	        var options = {
	          title: 'Lengths of dinosaurs, in meters',
	          legend: { position: 'none' },
	          height:400,
	          colors:['#5e6db3'],
	        };

	        var chart = new google.visualization.Histogram(document.getElementById('histogram-chart-1'));
	        chart.draw(data, options);
	}
		
	/**
	  * Function written to load histogram google chart.
	**/
	if ($("#histogram-chart-2").length > 0){
		var data = google.visualization.arrayToDataTable([
			['Quarks', 'Leptons', 'Gauge Bosons', 'Scalar Bosons'],
			[2/3, -1, 0, 0],
			[2/3, -1, 0, null],
			[2/3, -1, 0, null],
			[-1/3, 0, 1, null],
			[-1/3, 0, -1, null],
			[-1/3, 0, null, null],
			[-1/3, 0, null, null]
		]);

		var options = {
			title: 'Charges of subatomic particles',
			legend: { position: 'top', maxLines: 2 },
			colors:['#00ca95', '#f17316', '#5e6db3', '#fd7b6c'],
			interpolateNulls: false,
			height:400
		};
		var chart = new google.visualization.Histogram(document.getElementById('histogram-chart-2'));
        chart.draw(data, options);
    }
}

'use strict';
(function($) {
	Highcharts.setOptions({
		tooltip: {useHTML: true,},
		legend: {useHTML: true,},
		chart:{
			backgroundColor: null,
		},
		xAxis:{
			labels: {useHTML: true,}
		},
		yAxis:{
			labels: {useHTML: true,}
		},
		plotOptions: {
			area: {
				dataLabels: { useHTML: true,}
			},
			bar: {
				dataLabels: { useHTML: true,}
			},
			pie: {
				dataLabels: { useHTML: true,}
			},
			line: {
				dataLabels: { useHTML: true,}
			},
			series: {
				dataLabels: { useHTML: true,}
			},
			scatter: {
				dataLabels: { useHTML: true,}
			},
			column: {
				dataLabels: { useHTML: true,}
			},
			columnrange: {
				dataLabels: { useHTML: true,}
			},
			spline: {
				dataLabels: { useHTML: true,}
			},
		},
		credits: {
			enabled: false
		},
    });
	
	/**
      * Function written to load line highchart.
    **/
    if ($(".line-chart").length > 0){
        $('.line-chart').highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Tokyo',
                color: '#5e6db3',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                name: 'New York',
                color: '#00ca95',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                color: '#31cff9',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                color: '#fd7b6c',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    }
	 
	/**
	* Function written to load spline highchart.
	**/
    if ($(".spline-chart").length > 0){
        $('.spline-chart').highcharts({
            chart: {
                type: 'spline',
                inverted: true
            },
            title: {
                text: 'Atmosphere Temperature by Altitude'
            },
            subtitle: {
                text: 'According to the Standard Atmosphere Model'
            },
            xAxis: {
                reversed: false,
                title: {
                    enabled: true,
                    text: 'Altitude'
                },
                labels: {
                    formatter: function () {
                        return this.value + 'km';
                    }
                },
                maxPadding: 0.05,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Temperature'
                },
                labels: {
                    formatter: function () {
                        return this.value + '°';
                    }
                },
                lineWidth: 2
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br/>',
                pointFormat: '{point.x} km: {point.y}°C'
            },
            plotOptions: {
                spline: {
                    marker: {
                        enable: false
                    }
                }
            },
            series: [{
                name: 'Temperature',
                color: '#5e6db3',
                data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                    [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]]
            }]
        });
    }
	 
	/**
	* Function written to load time series and zoomable highchart.
	**/
	if ($(".timeseries-chart").length > 0){
      var chart = {
          zoomType: 'x'
       }; 
       var title = {
          text: 'USD to EUR exchange rate from 2006 through 2008'   
       };
       var subtitle = {
          text: document.ontouchstart === undefined ?
                        'Click and drag in the plot area to zoom in' :
                        'Pinch the chart to zoom in'
       };
       var xAxis = {
          type: 'datetime',
          minRange: 14 * 24 * 3600000 // fourteen days
       };
       var yAxis = {
          title: {
             text: 'Exchange rate'
          }
       };
       var legend = {
          enabled: false 
       };
       var plotOptions = {
          area: {
             fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                   [0, '#5e6db3'],
                   [1, Highcharts.Color('#5e6db3').setOpacity(0).get('rgba')]
                ]
             },
             marker: {
                radius: 2
             },
             lineWidth: 1,
             states: {
                hover: {
                   lineWidth: 1
                }
             },
             threshold: null
          }
       };
       var series= [{
          type: 'area',
          name: 'USD to EUR',
          color: '#5e6db3',
          pointInterval: 24 * 3600 * 1000,
          pointStart: Date.UTC(2006, 0, 1),
          data: [
             0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
             0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
             0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269,
             0.8269, 0.8258, 0.8247, 0.8286,    0.8289, 0.8316,    0.832, 0.8333,    0.8352, 0.8357,
             0.8355, 0.8354, 0.8403, 0.8403,    0.8406, 0.8403,    0.8396, 0.8418,    0.8409, 0.8384,
             0.8386, 0.8372, 0.839, 0.84, 0.8389, 0.84, 0.8423, 0.8423, 0.8435, 0.8422,
             0.838, 0.8373, 0.8316, 0.8303,    0.8303, 0.8302,    0.8369, 0.84, 0.8385, 0.84,
             0.8401, 0.8402, 0.8381, 0.8351,    0.8314, 0.8273,    0.8213, 0.8207,    0.8207, 0.8215,
             0.8242, 0.8273, 0.8301, 0.8346,    0.8312, 0.8312,    0.8312, 0.8306,    0.8327, 0.8282,
             0.824, 0.8255, 0.8256, 0.8273, 0.8209, 0.8151, 0.8149, 0.8213, 0.8273, 0.8273,
             0.8261, 0.8252, 0.824, 0.8262, 0.8258, 0.8261, 0.826, 0.8199, 0.8153, 0.8097,
             0.8101, 0.8119, 0.8107, 0.8105,    0.8084, 0.8069,    0.8047, 0.8023,    0.7965, 0.7919,
             0.7921, 0.7922, 0.7934, 0.7918,    0.7915, 0.787, 0.7861, 0.7861, 0.7853, 0.7867,
             0.7827, 0.7834, 0.7766, 0.7751, 0.7739, 0.7767, 0.7802, 0.7788, 0.7828, 0.7816,
             0.7829, 0.783, 0.7829, 0.7781, 0.7811, 0.7831, 0.7826, 0.7855, 0.7855, 0.7845,
             0.7798, 0.7777, 0.7822, 0.7785, 0.7744, 0.7743, 0.7726, 0.7766, 0.7806, 0.785,
             0.7907, 0.7912, 0.7913, 0.7931, 0.7952, 0.7951, 0.7928, 0.791, 0.7913, 0.7912,
             0.7941, 0.7953, 0.7921, 0.7919, 0.7968, 0.7999, 0.7999, 0.7974, 0.7942, 0.796,
             0.7969, 0.7862, 0.7821, 0.7821, 0.7821, 0.7811, 0.7833, 0.7849, 0.7819, 0.7809,
             0.7809, 0.7827, 0.7848, 0.785, 0.7873, 0.7894, 0.7907, 0.7909, 0.7947, 0.7987,
             0.799, 0.7927, 0.79, 0.7878, 0.7878, 0.7907, 0.7922, 0.7937, 0.786, 0.787,
             0.7838, 0.7838, 0.7837, 0.7836, 0.7806, 0.7825, 0.7798, 0.777, 0.777, 0.7772,
             0.7793, 0.7788, 0.7785, 0.7832, 0.7865, 0.7865, 0.7853, 0.7847, 0.7809, 0.778,
             0.7799, 0.78, 0.7801, 0.7765, 0.7785, 0.7811, 0.782, 0.7835, 0.7845, 0.7844,
             0.782, 0.7811, 0.7795, 0.7794, 0.7806, 0.7794, 0.7794, 0.7778, 0.7793, 0.7808,
             0.7824, 0.787, 0.7894, 0.7893, 0.7882, 0.7871, 0.7882, 0.7871, 0.7878, 0.79,
             0.7901, 0.7898, 0.7879, 0.7886, 0.7858, 0.7814, 0.7825, 0.7826, 0.7826, 0.786,
             0.7878, 0.7868, 0.7883, 0.7893, 0.7892, 0.7876, 0.785, 0.787, 0.7873, 0.7901,
             0.7936, 0.7939, 0.7938, 0.7956, 0.7975, 0.7978, 0.7972, 0.7995, 0.7995, 0.7994,
             0.7976, 0.7977, 0.796, 0.7922, 0.7928, 0.7929, 0.7948, 0.797, 0.7953, 0.7907,
             0.7872, 0.7852, 0.7852, 0.786, 0.7862, 0.7836, 0.7837, 0.784, 0.7867, 0.7867,
             0.7869, 0.7837, 0.7827, 0.7825, 0.7779, 0.7791, 0.779, 0.7787, 0.78, 0.7807,
             0.7803, 0.7817, 0.7799, 0.7799, 0.7795, 0.7801, 0.7765, 0.7725, 0.7683, 0.7641,
             0.7639, 0.7616, 0.7608, 0.759, 0.7582, 0.7539, 0.75, 0.75, 0.7507, 0.7505,
             0.7516, 0.7522, 0.7531, 0.7577, 0.7577, 0.7582, 0.755, 0.7542, 0.7576, 0.7616,
             0.7648, 0.7648, 0.7641, 0.7614, 0.757, 0.7587, 0.7588, 0.762, 0.762, 0.7617,
             0.7618, 0.7615, 0.7612, 0.7596, 0.758, 0.758, 0.758, 0.7547, 0.7549, 0.7613,
             0.7655, 0.7693, 0.7694, 0.7688, 0.7678, 0.7708, 0.7727, 0.7749, 0.7741, 0.7741,
             0.7732, 0.7727, 0.7737, 0.7724, 0.7712, 0.772, 0.7721, 0.7717, 0.7704, 0.769,
             0.7711, 0.774, 0.7745, 0.7745, 0.774, 0.7716, 0.7713, 0.7678, 0.7688, 0.7718,
             0.7718, 0.7728, 0.7729, 0.7698, 0.7685, 0.7681, 0.769, 0.769, 0.7698, 0.7699,
             0.7651, 0.7613, 0.7616, 0.7614, 0.7614, 0.7607, 0.7602, 0.7611, 0.7622, 0.7615,
             0.7598, 0.7598, 0.7592, 0.7573, 0.7566, 0.7567, 0.7591, 0.7582, 0.7585, 0.7613,
             0.7631, 0.7615, 0.76, 0.7613, 0.7627, 0.7627, 0.7608, 0.7583, 0.7575, 0.7562,
             0.752, 0.7512, 0.7512, 0.7517, 0.752, 0.7511, 0.748, 0.7509, 0.7531, 0.7531,
             0.7527, 0.7498, 0.7493, 0.7504, 0.75, 0.7491, 0.7491, 0.7485, 0.7484, 0.7492,
             0.7471, 0.7459, 0.7477, 0.7477, 0.7483, 0.7458, 0.7448, 0.743, 0.7399, 0.7395,
             0.7395, 0.7378, 0.7382, 0.7362, 0.7355, 0.7348, 0.7361, 0.7361, 0.7365, 0.7362,
             0.7331, 0.7339, 0.7344, 0.7327, 0.7327, 0.7336, 0.7333, 0.7359, 0.7359, 0.7372,
             0.736, 0.736, 0.735, 0.7365, 0.7384, 0.7395, 0.7413, 0.7397, 0.7396, 0.7385,
             0.7378, 0.7366, 0.74, 0.7411, 0.7406, 0.7405, 0.7414, 0.7431, 0.7431, 0.7438,
             0.7443, 0.7443, 0.7443, 0.7434, 0.7429, 0.7442, 0.744, 0.7439, 0.7437, 0.7437,
             0.7429, 0.7403, 0.7399, 0.7418, 0.7468, 0.748, 0.748, 0.749, 0.7494, 0.7522,
             0.7515, 0.7502, 0.7472, 0.7472, 0.7462, 0.7455, 0.7449, 0.7467, 0.7458, 0.7427,
             0.7427, 0.743, 0.7429, 0.744, 0.743, 0.7422, 0.7388, 0.7388, 0.7369, 0.7345,
             0.7345, 0.7345, 0.7352, 0.7341, 0.7341, 0.734, 0.7324, 0.7272, 0.7264, 0.7255,
             0.7258, 0.7258, 0.7256, 0.7257, 0.7247, 0.7243, 0.7244, 0.7235, 0.7235, 0.7235,
             0.7235, 0.7262, 0.7288, 0.7301, 0.7337, 0.7337, 0.7324, 0.7297, 0.7317, 0.7315,
             0.7288, 0.7263, 0.7263, 0.7242, 0.7253, 0.7264, 0.727, 0.7312, 0.7305, 0.7305,
             0.7318, 0.7358, 0.7409, 0.7454, 0.7437, 0.7424, 0.7424, 0.7415, 0.7419, 0.7414,
             0.7377, 0.7355, 0.7315, 0.7315, 0.732, 0.7332, 0.7346, 0.7328, 0.7323, 0.734,
             0.734, 0.7336, 0.7351, 0.7346, 0.7321, 0.7294, 0.7266, 0.7266, 0.7254, 0.7242,
             0.7213, 0.7197, 0.7209, 0.721, 0.721, 0.721, 0.7209, 0.7159, 0.7133, 0.7105,
             0.7099, 0.7099, 0.7093, 0.7093, 0.7076, 0.707, 0.7049, 0.7012, 0.7011, 0.7019,
             0.7046, 0.7063, 0.7089, 0.7077, 0.7077, 0.7077, 0.7091, 0.7118, 0.7079, 0.7053,
             0.705, 0.7055, 0.7055, 0.7045, 0.7051, 0.7051, 0.7017, 0.7, 0.6995, 0.6994,
             0.7014, 0.7036, 0.7021, 0.7002, 0.6967, 0.695, 0.695, 0.6939, 0.694, 0.6922,
             0.6919, 0.6914, 0.6894, 0.6891, 0.6904, 0.689, 0.6834, 0.6823, 0.6807, 0.6815,
             0.6815, 0.6847, 0.6859, 0.6822, 0.6827, 0.6837, 0.6823, 0.6822, 0.6822, 0.6792,
             0.6746, 0.6735, 0.6731, 0.6742, 0.6744, 0.6739, 0.6731, 0.6761, 0.6761, 0.6785,
             0.6818, 0.6836, 0.6823, 0.6805, 0.6793, 0.6849, 0.6833, 0.6825, 0.6825, 0.6816,
             0.6799, 0.6813, 0.6809, 0.6868, 0.6933, 0.6933, 0.6945, 0.6944, 0.6946, 0.6964,
             0.6965, 0.6956, 0.6956, 0.695, 0.6948, 0.6928, 0.6887, 0.6824, 0.6794, 0.6794,
             0.6803, 0.6855, 0.6824, 0.6791, 0.6783, 0.6785, 0.6785, 0.6797, 0.68, 0.6803,
             0.6805, 0.676, 0.677, 0.677, 0.6736, 0.6726, 0.6764, 0.6821, 0.6831, 0.6842,
             0.6842, 0.6887, 0.6903, 0.6848, 0.6824, 0.6788, 0.6814, 0.6814, 0.6797, 0.6769,
             0.6765, 0.6733, 0.6729, 0.6758, 0.6758, 0.675, 0.678, 0.6833, 0.6856, 0.6903,
             0.6896, 0.6896, 0.6882, 0.6879, 0.6862, 0.6852, 0.6823, 0.6813, 0.6813, 0.6822,
             0.6802, 0.6802, 0.6784, 0.6748, 0.6747, 0.6747, 0.6748, 0.6733, 0.665, 0.6611,
             0.6583, 0.659, 0.659, 0.6581, 0.6578, 0.6574, 0.6532, 0.6502, 0.6514, 0.6514,
             0.6507, 0.651, 0.6489, 0.6424, 0.6406, 0.6382, 0.6382, 0.6341, 0.6344, 0.6378,
             0.6439, 0.6478, 0.6481, 0.6481, 0.6494, 0.6438, 0.6377, 0.6329, 0.6336, 0.6333,
             0.6333, 0.633, 0.6371, 0.6403, 0.6396, 0.6364, 0.6356, 0.6356, 0.6368, 0.6357,
             0.6354, 0.632, 0.6332, 0.6328, 0.6331, 0.6342, 0.6321, 0.6302, 0.6278, 0.6308,
             0.6324, 0.6324, 0.6307, 0.6277, 0.6269, 0.6335, 0.6392, 0.64, 0.6401, 0.6396,
             0.6407, 0.6423, 0.6429, 0.6472, 0.6485, 0.6486, 0.6467, 0.6444, 0.6467, 0.6509,
             0.6478, 0.6461, 0.6461, 0.6468, 0.6449, 0.647, 0.6461, 0.6452, 0.6422, 0.6422,
             0.6425, 0.6414, 0.6366, 0.6346, 0.635, 0.6346, 0.6346, 0.6343, 0.6346, 0.6379,
             0.6416, 0.6442, 0.6431, 0.6431, 0.6435, 0.644, 0.6473, 0.6469, 0.6386, 0.6356,
             0.634, 0.6346, 0.643, 0.6452, 0.6467, 0.6506, 0.6504, 0.6503, 0.6481, 0.6451,
             0.645, 0.6441, 0.6414, 0.6409, 0.6409, 0.6428, 0.6431, 0.6418, 0.6371, 0.6349,
             0.6333, 0.6334, 0.6338, 0.6342, 0.632, 0.6318, 0.637, 0.6368, 0.6368, 0.6383,
             0.6371, 0.6371, 0.6355, 0.632, 0.6277, 0.6276, 0.6291, 0.6274, 0.6293, 0.6311,
             0.631, 0.6312, 0.6312, 0.6304, 0.6294, 0.6348, 0.6378, 0.6368, 0.6368, 0.6368,
             0.636, 0.637, 0.6418, 0.6411, 0.6435, 0.6427, 0.6427, 0.6419, 0.6446, 0.6468,
             0.6487, 0.6594, 0.6666, 0.6666, 0.6678, 0.6712, 0.6705, 0.6718, 0.6784, 0.6811,
             0.6811, 0.6794, 0.6804, 0.6781, 0.6756, 0.6735, 0.6763, 0.6762, 0.6777, 0.6815,
             0.6802, 0.678, 0.6796, 0.6817, 0.6817, 0.6832, 0.6877, 0.6912, 0.6914, 0.7009,
             0.7012, 0.701, 0.7005, 0.7076, 0.7087, 0.717, 0.7105, 0.7031, 0.7029, 0.7006,
             0.7035, 0.7045, 0.6956, 0.6988, 0.6915, 0.6914, 0.6859, 0.6778, 0.6815, 0.6815,
             0.6843, 0.6846, 0.6846, 0.6923, 0.6997, 0.7098, 0.7188, 0.7232, 0.7262, 0.7266,
             0.7359, 0.7368, 0.7337, 0.7317, 0.7387, 0.7467, 0.7461, 0.7366, 0.7319, 0.7361,
             0.7437, 0.7432, 0.7461, 0.7461, 0.7454, 0.7549, 0.7742, 0.7801, 0.7903, 0.7876,
             0.7928, 0.7991, 0.8007, 0.7823, 0.7661, 0.785, 0.7863, 0.7862, 0.7821, 0.7858,
             0.7731, 0.7779, 0.7844, 0.7866, 0.7864, 0.7788, 0.7875, 0.7971, 0.8004, 0.7857,
             0.7932, 0.7938, 0.7927, 0.7918, 0.7919, 0.7989, 0.7988, 0.7949, 0.7948, 0.7882,
             0.7745, 0.771, 0.775, 0.7791, 0.7882, 0.7882, 0.7899, 0.7905, 0.7889, 0.7879,
             0.7855, 0.7866, 0.7865, 0.7795, 0.7758, 0.7717, 0.761, 0.7497, 0.7471, 0.7473,
             0.7407, 0.7288, 0.7074, 0.6927, 0.7083, 0.7191, 0.719, 0.7153, 0.7156, 0.7158,
             0.714, 0.7119, 0.7129, 0.7129, 0.7049, 0.7095
             ]
          }
       ];
       
       var json = {};
       json.chart = chart;
       json.title = title;
       json.subtitle = subtitle;
       json.legend = legend;
       json.xAxis = xAxis;
       json.yAxis = yAxis;  
       json.series = series;
       json.plotOptions = plotOptions;
       $('.timeseries-chart').highcharts(json);
    }
	 
	  /**
      * Function written to load basic area highchart.
    **/
    if ($(".area-chart").length > 0){
        $('.area-chart').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'US and USSR nuclear stockpiles'
            },
            subtitle: {
                text: 'Source: <a href="http://thebulletin.metapress.com/content/c4120650912x74k7/fulltext.pdf">' +
                    'thebulletin.metapress.com</a>'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Nuclear weapon states'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'USA',
                color: '#fd7b6c',
                data: [null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                    1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                    27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                    26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                    24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                    22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                    10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104]
            }, {
                name: 'USSR/Russia',
                color: '#5e6db3',
                data: [null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                    33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                    35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000]
            }]
        });
    }
	 
	 /**
      * Function written to load area highchart.
    **/
    if ($(".area-negtivevals-chart").length > 0){
        $('.area-negtivevals-chart').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Area chart with negative values'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'John',
                color:'#5e6db3',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                color: '#fd7b6c',
                data: [2, -2, -3, 2, 1]
            }, {
                name: 'Joe',
                color: '#00ca95',
                data: [3, 4, 4, -2, 5]
            }]
        });
    }
	 
	 /**
      * Function written to load stacked area highchart.
    **/
    if ($(".stacked-chart").length > 0){
        $('.stacked-chart').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Historic and Estimated Worldwide Population Growth by Region'
            },
            subtitle: {
                text: 'Source: Wikipedia.org'
            },
            xAxis: {
                categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
                tickmarkPlacement: 'on',
                title: {
                    enabled: false
                }
            },
            yAxis: {
                title: {
                    text: 'Billions'
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000;
                    }
                }
            },
            tooltip: {
                split: true,
                valueSuffix: ' millions'
            },
            plotOptions: {
                area: {
                    stacking: 'normal',
                    lineColor: '#666666',
                    lineWidth: 1,
                    marker: {
                        lineWidth: 1,
                        lineColor: '#666666'
                    }
                }
            },
            series: [{
                name: 'Asia',
                color: '#5e6db3',
                data: [502, 635, 809, 947, 1402, 3634, 5268]
            }, {
                name: 'Africa',
                color: '#fd7b6c',
                data: [106, 107, 111, 133, 221, 767, 1766]
            }, {
                name: 'Europe',
                color: '#00ca95',
                data: [163, 203, 276, 408, 547, 729, 628]
            }, {
                name: 'America',
                color: '#31cff9',
                data: [18, 31, 54, 156, 339, 818, 1201]
            }, {
                name: 'Oceania',
                color: '#d24636',
                data: [2, 2, 2, 6, 13, 30, 46]
            }]
        });
    }
	 
	 
	 /**
      * Function written to load bar highchart.
    **/
    if ($(".bar-chart").length > 0){
    	$('.bar-chart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                color: '#5e6db3',
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                color: '#fd7b6c',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2012',
                color: '#00ca95',
                data: [1052, 954, 4250, 740, 38]
            }]
        });
    }
	 /**
      * Function written to load stacked bar highchart.
    **/
    if ($(".stacked-bar-chart").length > 0){
        $('.stacked-bar-chart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Stacked bar chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'John',
                color: '#5e6db3',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                color: '#fd7b6c',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                color: '#00ca95',
                data: [3, 4, 4, 2, 5]
            }]
        });
    }
	 
	 /**
      * Function written to load bar with negative stack highchart.
    **/
    if ($(".negtive-stacked-bar-chart").length > 0){
        var categories = ['0-4', '5-9', '10-14', '15-19',
                '20-24', '25-29', '30-34', '35-39', '40-44',
                '45-49', '50-54', '55-59', '60-64', '65-69',
                '70-74', '75-79', '80-84', '85-89', '90-94',
                '95-99', '100 + '];
            $('.negtive-stacked-bar-chart').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Population pyramid for Germany, 2015'
                },
                subtitle: {
                    text: 'Source: <a href="http://populationpyramid.net/germany/2015/">Population Pyramids of the World from 1950 to 2100</a>'
                },
                xAxis: [{
                    categories: categories,
                    reversed: false,
                    labels: {
                        step: 1
                    }
                }, { // mirror axis on right side
                    opposite: true,
                    reversed: false,
                    categories: categories,
                    linkedTo: 0,
                    labels: {
                        step: 1
                    }
                }],
                yAxis: {
                    title: {
                        text: null
                    },
                    labels: {
                        formatter: function () {
                            return Math.abs(this.value) + '%';
                        }
                    }
                },

                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },

                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                    }
                },

                series: [{
                    name: 'Male',
                    color: '#5e6db3',
                    data: [-2.2, -2.2, -2.3, -2.5, -2.7, -3.1, -3.2,
                        -3.0, -3.2, -4.3, -4.4, -3.6, -3.1, -2.4,
                        -2.5, -2.3, -1.2, -0.6, -0.2, -0.0, -0.0]
                }, {
                    name: 'Female',
                    color: '#fd7b6c',
                    data: [2.1, 2.0, 2.2, 2.4, 2.6, 3.0, 3.1, 2.9,
                        3.1, 4.1, 4.3, 3.6, 3.4, 2.6, 2.9, 2.9,
                        1.8, 1.2, 0.6, 0.1, 0.0]
                }]
            });
        }
	 
	 /**
      * Function written to load column with negative values highchart.
    **/
    if ($(".column-with-negative-vals").length > 0){
        $('.column-with-negative-vals').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Column chart with negative values'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'John',
                color: '#5e6db3',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                color: '#fd7b6c',
                data: [2, -2, -3, 2, 1]
            }, {
                name: 'Joe',
                color: '#00ca95',
                data: [3, 4, 4, -2, 5]
            }]
        });
    }
	 
	 /**
      * Function written to load fixed placement highchart.
    **/
    if ($(".fixed-placement-columns").length > 0){
        $('.fixed-placement-columns').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Efficiency Optimization by Branch'
            },
            xAxis: {
                categories: [
                    'Seattle HQ',
                    'San Francisco',
                    'Tokyo'
                ]
            },
            yAxis: [{
                min: 0,
                title: {
                    text: 'Employees'
                }
            }, {
                title: {
                    text: 'Profit (millions)'
                },
                opposite: true
            }],
            legend: {
                shadow: false
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                column: {
                    grouping: false,
                    shadow: false,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Employees',
                color: 'rgba(165,170,217,1)',
                data: [150, 73, 20],
                pointPadding: 0.3,
                pointPlacement: -0.2
            }, {
                name: 'Employees Optimized',
                color: 'rgba(126,86,134,.9)',
                data: [140, 90, 40],
                pointPadding: 0.4,
                pointPlacement: -0.2
            }, {
                name: 'Profit',
                color: 'rgba(248,161,63,1)',
                data: [183.6, 178.8, 198.5],
                tooltip: {
                    valuePrefix: '$',
                    valueSuffix: ' M'
                },
                pointPadding: 0.3,
                pointPlacement: 0.2,
                yAxis: 1
            }, {
                name: 'Profit Optimized',
                color: 'rgba(186,60,61,.9)',
                data: [203.6, 198.8, 208.5],
                tooltip: {
                    valuePrefix: '$',
                    valueSuffix: ' M'
                },
                pointPadding: 0.4,
                pointPlacement: 0.2,
                yAxis: 1
            }]
        });
    }
	 
	 /**
      * Function written to load column with rotating labels highchart.
    **/
    if ($(".column-rotating-lables").length > 0){
        $('.column-rotating-lables').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'World\'s largest cities per 2014'
            },
            subtitle: {
                text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population">Wikipedia</a>'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Population in 2008: <b>{point.y:.1f} millions</b>'
            },
            series: [{
                name: 'Population',
                color: '#5e6db3',
                data: [
                    ['Shanghai', 23.7],
                    ['Lagos', 16.1],
                    ['Istanbul', 14.2],
                    ['Karachi', 14.0],
                    ['Mumbai', 12.5],
                    ['Moscow', 12.1],
                    ['São Paulo', 11.8],
                    ['Beijing', 11.7],
                    ['Guangzhou', 11.1],
                    ['Delhi', 11.1],
                    ['Shenzhen', 10.5],
                    ['Seoul', 10.4],
                    ['Jakarta', 10.0],
                    ['Kinshasa', 9.3],
                    ['Tianjin', 9.3],
                    ['Tokyo', 9.0],
                    ['Cairo', 8.9],
                    ['Dhaka', 8.9],
                    ['Mexico City', 8.9],
                    ['Lima', 8.9]
                ],
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    format: '{point.y:.1f}', // one decimal
                    y: 10, // 10 pixels down from the top
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }
	 
	 /**
      * Function written to load stacked columns highchart.
    **/
    if ($(".stacked-column").length > 0){
        $('.stacked-column').highcharts({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Stacked column chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total fruit consumption'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            legend: {
                align: 'right',
                x: -30,
                verticalAlign: 'top',
                y: 25,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
                borderColor: '#CCC',
                borderWidth: 1,
                shadow: false
            },
            tooltip: {
                headerFormat: '<b>{point.x}</b><br/>',
                pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                }
            },
            series: [{
                name: 'John',
                color: '#5e6db3',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                color: '#fd7b6c',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                color: '#00ca95',
                data: [3, 4, 4, 2, 5]
            }]
        });
    }
	 /**
      * Function written to load column range highchart.
    **/
    if ($(".column-range").length > 0){
        $('.column-range').highcharts({
            chart: {
                type: 'columnrange',
                inverted: true
            },

            title: {
                text: 'Temperature variation by month'
            },

            subtitle: {
                text: 'Observed in Vik i Sogn, Norway'
            },

            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            yAxis: {
                title: {
                    text: 'Temperature ( °C )'
                }
            },

            tooltip: {
                valueSuffix: '°C'
            },

            plotOptions: {
                columnrange: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '°C';
                        }
                    }
                }
            },

            legend: {
                enabled: false
            },

            series: [{
                name: 'Temperatures',
                color: '#5e6db3',
                data: [
                    [-9.7, 9.4],
                    [-8.7, 6.5],
                    [-3.5, 9.4],
                    [-1.4, 19.9],
                    [0.0, 22.6],
                    [2.9, 29.5],
                    [9.2, 30.7],
                    [7.3, 26.5],
                    [4.4, 18.0],
                    [-3.1, 11.4],
                    [-5.2, 10.4],
                    [-13.5, 9.8]
                ]
            }]

        });
    }
	 
	 /**
      * Function written to load pie highchart.
    **/
    if ($(".pie-chart").length > 0){
        $('.pie-chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Browser market shares January, 2015 to May, 2015'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'IE',
                    color: '#5e6db3',
                    y: 56.33
                }, {
                    name: 'Chrome',
                    color: '#fd7b6c',
                    y: 24.03,
                    sliced: true,
                    selected: true
                }, {
                    name: 'Firefox',
                    color: '#00ca95',
                    y: 10.38
                }, {
                    name: 'Safari',
                    color: '#31cff9',
                    y: 4.77
                }, {
                    name: 'Opera',
                    color: '#33d5aa',
                    y: 0.91
                }, {
                    name: 'Proprietary or Undetectable',
                    color: '#d24636',
                    y: 0.2
                }]
            }]
        });
    }
	 /**
      * Function written to pie chart with legend highchart.
    **/
	if ($(".pie-legend-chart").length > 0){
    	$('.pie-legend-chart').highcharts({
    		chart: {
    			plotBackgroundColor: null,
    			plotBorderWidth: null,
    			plotShadow: false,
    			type: 'pie'
    		},
    		title: {
    			text: 'Browser market shares January, 2015 to May, 2015'
    		},
    		tooltip: {
    			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    		},
    		plotOptions: {
    			pie: {
    				allowPointSelect: true,
    				cursor: 'pointer',
    				dataLabels: {
    					enabled: false
    				},
    				showInLegend: true
    			}
    		},
    		series: [{
    			name: 'Brands',
    			colorByPoint: true,
    			data: [{
    				name: 'IE',
                    color: '#5e6db3',
    				y: 56.33
    			}, {
    				name: 'Chrome',
                    color: '#fd7b6c',
    				y: 24.03,
    				sliced: true,
    				selected: true
    			}, {
    				name: 'Firefox',
                    color: '#00ca95',
    				y: 10.38
    			}, {
    				name: 'Safari',
                    color: '#31cff9',
    				y: 4.77
    			}, {
    				name: 'Opera',
                    color: '#33d5aa',
    				y: 0.91
    			}, {
    				name: 'Proprietary or Undetectable',
                    color: '#d24636',
    				y: 0.2
    			}]
    		}]
    	});
    }
	 /**
      * Function written to load semi circle donut highchart.
    **/
    if ($(".semi-circle-donut").length > 0){
        $('.semi-circle-donut').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: 'Browser<br>shares<br>2015',
                align: 'center',
                verticalAlign: 'middle',
                y: 40
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '75%']
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                innerSize: '50%',
                data: [
                    {name:'Firefox',color:'#5e6db3', y: 10.38},
                    {name:'IE', color:'#fd7b6c', y:56.33},
                    {name:'Chrome',color:'#00ca95',y:24.03},
                    {name:'Safari',color:'#31cff9',y:4.77},
                    {name:'Opera',color:'#d24636',y: 0.91},
                    {
                        name: 'Proprietary or Undetectable',
                        color: '#f17316',
                        y: 0.2,
                        dataLabels: {
                            enabled: false
                        }
                    }
                ]
            }]
        });
    }
	 
	 /**
      * Function written to load donut highchart.
    **/
    if ($(".donut-chart").length > 0){
        var colors = Highcharts.getOptions().colors,
            categories = ['MSIE', 'Firefox', 'Chrome', 'Safari', 'Opera'],
            data = [{
                y: 56.33,
                color: '#5e6db3',
                drilldown: {
                    name: 'MSIE versions',
                    categories: ['MSIE 6.0', 'MSIE 7.0', 'MSIE 8.0', 'MSIE 9.0', 'MSIE 10.0', 'MSIE 11.0'],
                    data: [1.06, 0.5, 17.2, 8.11, 5.33, 24.13],
                    color: '#5e6db3',
                }
            }, {
                y: 10.38,
                color: '#fd7b6c',
                drilldown: {
                    name: 'Firefox versions',
                    categories: ['Firefox v31', 'Firefox v32', 'Firefox v33', 'Firefox v35', 'Firefox v36', 'Firefox v37', 'Firefox v38'],
                    data: [0.33, 0.15, 0.22, 1.27, 2.76, 2.32, 2.31, 1.02],
                    color: '#fd7b6c',
                }
            }, {
                y: 24.03,
                color: '#00ca95',
                drilldown: {
                    name: 'Chrome versions',
                    categories: ['Chrome v30.0', 'Chrome v31.0', 'Chrome v32.0', 'Chrome v33.0', 'Chrome v34.0',
                        'Chrome v35.0', 'Chrome v36.0', 'Chrome v37.0', 'Chrome v38.0', 'Chrome v39.0', 'Chrome v40.0', 'Chrome v41.0', 'Chrome v42.0', 'Chrome v43.0'
                        ],
                    data: [0.14, 1.24, 0.55, 0.19, 0.14, 0.85, 2.53, 0.38, 0.6, 2.96, 5, 4.32, 3.68, 1.45],
                    color: '#00ca95',
                }
            }, {
                y: 4.77,
                color: '#31cff9',
                drilldown: {
                    name: 'Safari versions',
                    categories: ['Safari v5.0', 'Safari v5.1', 'Safari v6.1', 'Safari v6.2', 'Safari v7.0', 'Safari v7.1', 'Safari v8.0'],
                    data: [0.3, 0.42, 0.29, 0.17, 0.26, 0.77, 2.56],
                    color: '#31cff9',
                }
            }, {
                y: 0.91,
                color: '#d24636',
                drilldown: {
                    name: 'Opera versions',
                    categories: ['Opera v12.x', 'Opera v27', 'Opera v28', 'Opera v29'],
                    data: [0.34, 0.17, 0.24, 0.16],
                    color: '#d24636',
                }
            }, {
                y: 0.2,
                color: '#f17316',
                drilldown: {
                    name: 'Proprietary or Undetectable',
                    categories: [],
                    data: [],
                    color: '#f17316',
                }
            }],
            browserData = [],
            versionsData = [],
            i,
            j,
            dataLen = data.length,
            drillDataLen,
            brightness;


        // Build the data arrays
        for (i = 0; i < dataLen; i += 1) {

            // add browser data
            browserData.push({
                name: categories[i],
                y: data[i].y,
                color: data[i].color
            });

            // add version data
            drillDataLen = data[i].drilldown.data.length;
            for (j = 0; j < drillDataLen; j += 1) {
                brightness = 0.2 - (j / drillDataLen) / 5;
                versionsData.push({
                    name: data[i].drilldown.categories[j],
                    y: data[i].drilldown.data[j],
                    color: Highcharts.Color(data[i].color).brighten(brightness).get()
                });
            }
        }
		  // Create the chart
        $('.donut-chart').highcharts({
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Browser market share, January, 2015 to May, 2015'
            },
            subtitle: {
                text: 'Source: <a href="http://netmarketshare.com/">netmarketshare.com</a>'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false,
                    center: ['50%', '50%']
                }
            },
            tooltip: {
                valueSuffix: '%'
            },
            series: [{
                name: 'Browsers',
                data: browserData,
                size: '60%',
                color: '#5e6db3',
                dataLabels: {
                    formatter: function () {
                        return this.y > 5 ? this.point.name : null;
                    },
                    color: '#ffffff',
                    distance: -30
                }
            }, {
                name: 'Versions',
                data: versionsData,
                size: '80%',
                color: '#fd7b6c',
                innerSize: '60%',
                dataLabels: {
                    formatter: function () {
                        // display only if larger than 1
                        return this.y > 1 ? '<b>' + this.point.name + ':</b> ' + this.y + '%' : null;
                    }
                }
            }]
        });
    }
	 /**
      * Function written to load scattered highchart.
    **/
    if ($(".scatter-chart").length > 0){
        $('.scatter-chart').highcharts({
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Height Versus Weight of 507 Individuals by Gender'
            },
            subtitle: {
                text: 'Source: Heinz  2003'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Height (cm)'
                },
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Weight (kg)'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
                borderWidth: 1
            },
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x} cm, {point.y} kg'
                    }
                }
            },
            series: [{
                name: 'Female',
                color: 'rgba(223, 83, 83, .5)',
                data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                    [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                    [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                    [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                    [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                    [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                    [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                    [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                    [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                    [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                    [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                    [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                    [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                    [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                    [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                    [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                    [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                    [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                    [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                    [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                    [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                    [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                    [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                    [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                    [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                    [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                    [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                    [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                    [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                    [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                    [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                    [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                    [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                    [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                    [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                    [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                    [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                    [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                    [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                    [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                    [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                    [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                    [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                    [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                    [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                    [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                    [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                    [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                    [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                    [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                    [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                    [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]]

            }, {
                name: 'Male',
                color: 'rgba(119, 152, 191, .5)',
                data: [[174.0, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
                    [181.5, 74.8], [184.0, 86.4], [184.5, 78.4], [175.0, 62.0], [184.0, 81.6],
                    [180.0, 76.6], [177.8, 83.6], [192.0, 90.0], [176.0, 74.6], [174.0, 71.0],
                    [184.0, 79.6], [192.7, 93.8], [171.5, 70.0], [173.0, 72.4], [176.0, 85.9],
                    [176.0, 78.8], [180.5, 77.8], [172.7, 66.2], [176.0, 86.4], [173.5, 81.8],
                    [178.0, 89.6], [180.3, 82.8], [180.3, 76.4], [164.5, 63.2], [173.0, 60.9],
                    [183.5, 74.8], [175.5, 70.0], [188.0, 72.4], [189.2, 84.1], [172.8, 69.1],
                    [170.0, 59.5], [182.0, 67.2], [170.0, 61.3], [177.8, 68.6], [184.2, 80.1],
                    [186.7, 87.8], [171.4, 84.7], [172.7, 73.4], [175.3, 72.1], [180.3, 82.6],
                    [182.9, 88.7], [188.0, 84.1], [177.2, 94.1], [172.1, 74.9], [167.0, 59.1],
                    [169.5, 75.6], [174.0, 86.2], [172.7, 75.3], [182.2, 87.1], [164.1, 55.2],
                    [163.0, 57.0], [171.5, 61.4], [184.2, 76.8], [174.0, 86.8], [174.0, 72.2],
                    [177.0, 71.6], [186.0, 84.8], [167.0, 68.2], [171.8, 66.1], [182.0, 72.0],
                    [167.0, 64.6], [177.8, 74.8], [164.5, 70.0], [192.0, 101.6], [175.5, 63.2],
                    [171.2, 79.1], [181.6, 78.9], [167.4, 67.7], [181.1, 66.0], [177.0, 68.2],
                    [174.5, 63.9], [177.5, 72.0], [170.5, 56.8], [182.4, 74.5], [197.1, 90.9],
                    [180.1, 93.0], [175.5, 80.9], [180.6, 72.7], [184.4, 68.0], [175.5, 70.9],
                    [180.6, 72.5], [177.0, 72.5], [177.1, 83.4], [181.6, 75.5], [176.5, 73.0],
                    [175.0, 70.2], [174.0, 73.4], [165.1, 70.5], [177.0, 68.9], [192.0, 102.3],
                    [176.5, 68.4], [169.4, 65.9], [182.1, 75.7], [179.8, 84.5], [175.3, 87.7],
                    [184.9, 86.4], [177.3, 73.2], [167.4, 53.9], [178.1, 72.0], [168.9, 55.5],
                    [157.2, 58.4], [180.3, 83.2], [170.2, 72.7], [177.8, 64.1], [172.7, 72.3],
                    [165.1, 65.0], [186.7, 86.4], [165.1, 65.0], [174.0, 88.6], [175.3, 84.1],
                    [185.4, 66.8], [177.8, 75.5], [180.3, 93.2], [180.3, 82.7], [177.8, 58.0],
                    [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 116.4], [163.8, 72.2],
                    [188.0, 83.6], [198.1, 85.5], [175.3, 90.9], [166.4, 85.9], [190.5, 89.1],
                    [166.4, 75.0], [177.8, 77.7], [179.7, 86.4], [172.7, 90.9], [190.5, 73.6],
                    [185.4, 76.4], [168.9, 69.1], [167.6, 84.5], [175.3, 64.5], [170.2, 69.1],
                    [190.5, 108.6], [177.8, 86.4], [190.5, 80.9], [177.8, 87.7], [184.2, 94.5],
                    [176.5, 80.2], [177.8, 72.0], [180.3, 71.4], [171.4, 72.7], [172.7, 84.1],
                    [172.7, 76.8], [177.8, 63.6], [177.8, 80.9], [182.9, 80.9], [170.2, 85.5],
                    [167.6, 68.6], [175.3, 67.7], [165.1, 66.4], [185.4, 102.3], [181.6, 70.5],
                    [172.7, 95.9], [190.5, 84.1], [179.1, 87.3], [175.3, 71.8], [170.2, 65.9],
                    [193.0, 95.9], [171.4, 91.4], [177.8, 81.8], [177.8, 96.8], [167.6, 69.1],
                    [167.6, 82.7], [180.3, 75.5], [182.9, 79.5], [176.5, 73.6], [186.7, 91.8],
                    [188.0, 84.1], [188.0, 85.9], [177.8, 81.8], [174.0, 82.5], [177.8, 80.5],
                    [171.4, 70.0], [185.4, 81.8], [185.4, 84.1], [188.0, 90.5], [188.0, 91.4],
                    [182.9, 89.1], [176.5, 85.0], [175.3, 69.1], [175.3, 73.6], [188.0, 80.5],
                    [188.0, 82.7], [175.3, 86.4], [170.5, 67.7], [179.1, 92.7], [177.8, 93.6],
                    [175.3, 70.9], [182.9, 75.0], [170.8, 93.2], [188.0, 93.2], [180.3, 77.7],
                    [177.8, 61.4], [185.4, 94.1], [168.9, 75.0], [185.4, 83.6], [180.3, 85.5],
                    [174.0, 73.9], [167.6, 66.8], [182.9, 87.3], [160.0, 72.3], [180.3, 88.6],
                    [167.6, 75.5], [186.7, 101.4], [175.3, 91.1], [175.3, 67.3], [175.9, 77.7],
                    [175.3, 81.8], [179.1, 75.5], [181.6, 84.5], [177.8, 76.6], [182.9, 85.0],
                    [177.8, 102.5], [184.2, 77.3], [179.1, 71.8], [176.5, 87.9], [188.0, 94.3],
                    [174.0, 70.9], [167.6, 64.5], [170.2, 77.3], [167.6, 72.3], [188.0, 87.3],
                    [174.0, 80.0], [176.5, 82.3], [180.3, 73.6], [167.6, 74.1], [188.0, 85.9],
                    [180.3, 73.2], [167.6, 76.3], [183.0, 65.9], [183.0, 90.9], [179.1, 89.1],
                    [170.2, 62.3], [177.8, 82.7], [179.1, 79.1], [190.5, 98.2], [177.8, 84.1],
                    [180.3, 83.2], [180.3, 83.2]]
            }]
        });
    }
	 
	 /**
      * Function written to load scattered highchart.
    **/
    if ($(".bubble-chart").length > 0){ 
        $('.bubble-chart').highcharts({
            chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy'
            },
            legend: {enabled: false},
            title: {text: 'Sugar and fat intake per country'},
            subtitle: {
                text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
            },
            xAxis: {
                gridLineWidth: 1,
                title: {
                    text: 'Daily fat intake'
                },
                labels: {
                    format: '{value} gr'
                },
                plotLines: [{
                    color: 'black',
                    dashStyle: 'dot',
                    width: 2,
                    value: 65,
                    label: {
                        rotation: 0,
                        y: 15,
                        style: {
                            fontStyle: 'italic'
                        },
                        text: 'Safe fat intake 65g/day'
                    },
                    zIndex: 3
                }]
            },
            yAxis: {
                startOnTick: false,
                endOnTick: false,
                title: {
                    text: 'Daily sugar intake'
                },
                labels: {
                    format: '{value} gr'
                },
                maxPadding: 0.2,
                plotLines: [{
                    color: 'black',
                    dashStyle: 'dot',
                    width: 2,
                    value: 50,
                    label: {
                        align: 'right',
                        style: {
                            fontStyle: 'italic'
                        },
                        text: 'Safe sugar intake 50g/day',
                        x: -10
                    },
                    zIndex: 3
                }]
            },
            tooltip: {
                useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
                    '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
                    '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
                    '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',
                footerFormat: '</table>',
                followPointer: true
            },

            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                data: [
                    { x: 95, y: 95, z: 13.8, name: 'BE', color:'#5e6db3', country: 'Belgium' },
                    { x: 86.5, y: 102.9, z: 14.7, name: 'DE',color:'#5e6db3', country: 'Germany' },
                    { x: 80.8, y: 91.5, z: 15.8, name: 'FI',color:'#5e6db3', country: 'Finland' },
                    { x: 80.4, y: 102.5, z: 12, name: 'NL',color:'#5e6db3', country: 'Netherlands' },
                    { x: 80.3, y: 86.1, z: 11.8, name: 'SE',color:'#5e6db3', country: 'Sweden' },
                    { x: 78.4, y: 70.1, z: 16.6, name: 'ES',color:'#5e6db3', country: 'Spain' },
                    { x: 74.2, y: 68.5, z: 14.5, name: 'FR',color:'#5e6db3', country: 'France' },
                    { x: 73.5, y: 83.1, z: 10, name: 'NO',color:'#5e6db3', country: 'Norway' },
                    { x: 71, y: 93.2, z: 24.7, name: 'UK',color:'#5e6db3', country: 'United Kingdom' },
                    { x: 69.2, y: 57.6, z: 10.4, name: 'IT',color:'#5e6db3', country: 'Italy' },
                    { x: 68.6, y: 20, z: 16, name: 'RU',color:'#5e6db3', country: 'Russia' },
                    { x: 65.5, y: 126.4, z: 35.3, name: 'US',color:'#5e6db3', country: 'United States' },
                    { x: 65.4, y: 50.8, z: 28.5, name: 'HU',color:'#5e6db3', country: 'Hungary' },
                    { x: 63.4, y: 51.8, z: 15.4, name: 'PT',color:'#5e6db3', country: 'Portugal' },
                    { x: 64, y: 82.9, z: 31.3, name: 'NZ',color:'#5e6db3', country: 'New Zealand' }
                ]
            }]

        });
    }
	 
	 /**
      * Function written to load column,line and pie combination highchart.
    **/
    if ($(".combination-chart").length > 0){ 
        $('.combination-chart').highcharts({
            title: {
                text: 'Combination chart'
            },
            xAxis: {
                categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
            },
            labels: {

                items: [{
                    html: 'Total fruit consumption',
                    style: {
                        left: '50px',
                        top: '18px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }]
            },
            series: [{
                type: 'column',
                name: 'Jane',
                color: '#5e6db3',
                data: [3, 2, 1, 3, 4]
            }, {
                type: 'column',
                name: 'John',
                color: '#fd9589',
                data: [2, 3, 5, 7, 6]
            }, {
                type: 'column',
                name: 'Joe',
                color: '#00ca95',
                data: [4, 3, 3, 9, 0]
            }, {
                type: 'spline',
                name: 'Average',
                data: [3, 2.67, 3, 6.33, 3.33],
                marker: {
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[3],
                    fillColor: 'white'
                }
            }, {
                type: 'pie',
                name: 'Total consumption',
                data: [{
                    name: 'Jane',
                    y: 13,
                    color: '#5e6db3', // Jane's color
                }, {
                    name: 'John',
                    y: 23,
                    color: '#fd9589', // John's color
                }, {
                    name: 'Joe',
                    y: 19,
                    color: '#00ca95', // Joe's color
                }],
                center: [100, 80],
                size: 100,
                showInLegend: false,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    }
	 
	 /**
      * Function written to load dual axes line and column highchart.
    **/
    if ($(".dual-axes-chart").length > 0){ 
        $('.dual-axes-chart').highcharts({
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Average Monthly Temperature and Rainfall in Tokyo'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: [{
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Temperature',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Rainfall',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} mm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            series: [{
                name: 'Rainfall',
                type: 'column',
                color: '#5e6db3',
                yAxis: 1,
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                tooltip: {
                    valueSuffix: ' mm'
                }
            }, {
                name: 'Temperature',
                type: 'spline',
                color: '#fd7b6c',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                tooltip: {
                    valueSuffix: '°C'
                }
            }]
        });
    } 
})(jQuery);
'use strict';
(function($){
	var color = Chart.helpers.color;
	var barChartData1 = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			type: 'bar',
			label: 'Dataset 1',
			backgroundColor: '#d24636',
			borderColor: '#d24636',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(),
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			type: 'line',
			label: 'Dataset 2',
			backgroundColor: '#5e6db3',
			borderColor: '#5e6db3',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(),
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			type: 'bar',
			label: 'Dataset 3',
			backgroundColor: '#00ca95',
			borderColor: '#00ca95',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(),
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]
	};

	// Define a plugin to provide data labels
	
	if($('#data-labelling').length >0){
		var ctx = document.getElementById("data-labelling").getContext("2d");
			window.myBar = new Chart(ctx, {
				 type: 'bar',
				 data: barChartData1,
				 options: {
					  responsive: true,
					  title: {
							display: true,
							text: 'Chart.js Combo Bar Line Chart'
					  },
				 }
			});
	  }
})(jQuery);
(function($){
	var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
	};

	var config = {
		type: 'doughnut',
		data: {
			datasets: [{
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					'#d24636',
					'#fd7b6c',
					'#fd9589',
					'#00ca95',
					'#5e6db3',
				],
				label: 'Dataset 1'
			}],
			labels: [
				"Red",
				"Orange",
				"Yellow",
				"Green",
				"Blue"
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Doughnut Chart'
			},
			animation: {
				animateScale: true,
				animateRotate: true
			}
		}
	};
	if($('#doughnut-chart').length >0){
		var ctx = document.getElementById("doughnut-chart").getContext("2d");
		window.myDoughnut = new Chart(ctx, config);
	}
})(jQuery);

/**
* Function written to load pie chartjs.
**/
(function($){
	var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
	};

	var config = {
		type: 'pie',
		data: {
			datasets: [{
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					'#d24636',
					'#fd7b6c',
					'#fd9589',
					'#00ca95',
					'#5e6db3',
				],
				label: 'Dataset 1'
			}],
			labels: [
				"Red",
				"Orange",
				"Yellow",
				"Green",
				"Blue"
			]
		},
		options: {
			responsive: true
		}
	};
	if($('#pie-chart').length >0){
		var ctx = document.getElementById("pie-chart").getContext("2d");
		window.myPie = new Chart(ctx, config);
	}
})(jQuery);
	
/**
 * Function written to load polar area chartjs.
**/
(function($){
	var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
	};

	var chartColors = window.chartColors;
	var color = Chart.helpers.color;
	var config = {
		data: {
			datasets: [{
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					color('#d24636').alpha(0.5).rgbString(),
					color('#fd7b6c').alpha(0.5).rgbString(),
					color('#fd9589').alpha(0.5).rgbString(),
					color('#00ca95').alpha(0.5).rgbString(),
					color('#5e6db3').alpha(0.5).rgbString(),
				],
				label: 'My dataset' // for legend
			}],
			labels: [
				"Red",
				"Orange",
				"Yellow",
				"Green",
				"Blue"
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'right',
			},
			title: {
				display: true,
				text: 'Chart.js Polar Area Chart'
			},
			scale: {
			  ticks: {
				beginAtZero: true
			  },
			  reverse: false
			},
			animation: {
				animateRotate: false,
				animateScale: true
			}
		}
	};
	if($('#polar-area-chart').length >0){
		var ctx = document.getElementById("polar-area-chart");
		window.myPolarArea = Chart.PolarArea(ctx, config);
	}
})(jQuery);

/**
 * Function written to load bubble chartjs.
**/
(function($){
	var DEFAULT_DATASET_SIZE = 7;
	var addedCount = 0;
	var color = Chart.helpers.color;
	var bubbleChartData = {
		animation: {
			duration: 10000
		},
		datasets: [{
			label: "My First dataset",
			backgroundColor: color('#d24636').alpha(0.5).rgbString(),
			borderColor: '#d24636',
			borderWidth: 1,
			data: [{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}]
		}, {
			label: "My Second dataset",
			backgroundColor: color('#5e6db3').alpha(0.5).rgbString(),
			borderColor: '#5e6db3',
			borderWidth: 1,
			data: [{
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}, {
				x: randomScalingFactor(),
				y: randomScalingFactor(),
				r: Math.abs(randomScalingFactor()) / 5,
			}]
		}]
	};

	if($('#bubble-chart').length >0){
		var ctx = document.getElementById("bubble-chart").getContext("2d");
			window.myChart = new Chart(ctx, {
				 type: 'bubble',
				 data: bubbleChartData,
				 options: {
					  responsive: true,
					  title:{
							display:true,
							text:'Chart.js Bubble Chart'
					  },
					  tooltips: {
							mode: 'point'
					  }
				 }
			});
	}
})(jQuery);
		
/**
* Function written to load combo line and bar chart.
**/
(function($){
	var chartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			type: 'line',
			label: 'Dataset 1',
			borderColor: '#5e6db3',
			borderWidth: 2,
			fill: false,
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			type: 'bar',
			label: 'Dataset 2',
			backgroundColor: '#d24636',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			],
			borderColor: 'white',
			borderWidth: 2
		}, {
			type: 'bar',
			label: 'Dataset 3',
			backgroundColor: '#00ca95',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]
	};

	if($('#combo-chartjs').length >0){
		var ctx = document.getElementById("combo-chartjs").getContext("2d");
			window.myMixedChart = new Chart(ctx, {
				 type: 'bar',
				 data: chartData,
				 options: {
					  responsive: true,
					  title: {
							display: true,
							text: 'Chart.js Combo Bar Line Chart'
					  },
					  tooltips: {
							mode: 'index',
							intersect: true
					  }
				 }
			});
	  }
})(jQuery);

/**
 * Function written to load suggested min/max settings chartjs.
**/
(function($){
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: '#d24636',
				borderColor: '#d24636',
				data: [10, 30, 39, 20, 25, 34, -10],
				fill: false,
			}, {
				label: "My Second dataset",
				fill: false,
				backgroundColor: '#5e6db3',
				borderColor: '#5e6db3',
				data: [18, 33, 22, 19, 11, 39, 30],
			}]
		},
		options: {
			responsive: true,
			title:{
				display: true,
				text: 'Grid Line Settings'
			},
			scales: {
				yAxes: [{
					gridLines: {
						drawBorder: false,
						color: ['pink', 'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple']
					},
					ticks: {
						min: 0,
						max: 100,
						stepSize: 10
					}
				}]
			}
		}
	};

	if($('#min-max-settings').length >0){
		var ctx = document.getElementById("min-max-settings").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);
		
/**
  * Function written to load xaxies filtering chartjs.
 **/
(function($){
	var randomScalingFactor = function() {
		return Math.round(Math.random() * 50 * (Math.random() > 0.5 ? 1 : 1)) + 50;
	};

	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				fill: false,
				borderColor: '#d24636',
				backgroundColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			}, {
				label: "My Second dataset",
				fill: false,
				borderColor: '#5e6db3',
				backgroundColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:"Chart.js Line Chart - X-Axis Filter"
			},
			scales: {
				xAxes: [{
					display: true,
					ticks: {
						callback: function(dataLabel, index) {
							// Hide the label of every 2nd dataset. return null to hide the grid line too
							return index % 2 === 0 ? dataLabel : '';
						}
					}
				}],
				yAxes: [{
					display: true,
					beginAtZero: false
				}]
			}
		}
	};

	if($('#chart-with-xaxis-filter').length >0){
		var ctx = document.getElementById("chart-with-xaxis-filter").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);

/**
  * Function written to load radar chart chart.
**/
(function($){
	var randomScalingFactor = function() {
		return Math.round(Math.random() * 100);
	};
	var color = Chart.helpers.color;
	var config = {
		type: 'radar',
		data: {
			labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: color('#d24636').alpha(0.5).rgbString(),
				borderColor: '#d24636',
				pointBackgroundColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			}, {
				label: "My Second dataset",
				backgroundColor: color('#5e6db3').alpha(0.5).rgbString(),
				borderColor: '#5e6db3',
				pointBackgroundColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			},]
		},
		options: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Radar Chart'
			},
			scale: {
			  ticks: {
				beginAtZero: true
			  }
			}
		}
	};

	if($('#radar-chart').length >0){
		window.myRadar = new Chart(document.getElementById("radar-chart"), config);
	}
})(jQuery);

/**
  * Function written to load line styles chartjs.
**/
(function($){
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "Unfilled",
				fill: false,
				backgroundColor: '#5e6db3',
				borderColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}, {
				label: "Dashed",
				fill: false,
				backgroundColor: '#00ca95',
				borderColor: '#00ca95',
				borderDash: [5, 5],
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}, {
				label: "Filled",
				backgroundColor: '#d24636',
				borderColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				fill: true,
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:'Chart.js Line Chart'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};

	if($('#line-styles').length >0){
		var ctx = document.getElementById("line-styles").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);

/**
  * Function written to load stepped line chartjs.
 **/
(function($){
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				borderColor: '#d24636',
				backgroundColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				fill: false,
				steppedLine: true,
			}, {
				label: "My Second dataset",
				steppedLine: true,
				borderColor: '#5e6db3',
				backgroundColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				fill: false,
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:'Chart.js Line Chart'
			},
			tooltips: {
				mode: 'index',
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					},
				}]
			}
		}
	};

	if($('#stepped-line-chart').length >0){
		var ctx = document.getElementById("stepped-line-chart").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);
		
/**
  * Function written to load line stacked bar chartjs.
 **/
(function($){
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				borderColor: '#d24636',
				backgroundColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}, {
				label: "My Second dataset",
				borderColor: '#5e6db3',
				backgroundColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}, {
				label: "My Third dataset",
				borderColor: '#00ca95',
				backgroundColor: '#00ca95',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}, {
				label: "My Third dataset",
				borderColor: '#31cff9',
				backgroundColor: '#31cff9',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:"Chart.js Line Chart - Stacked Area"
			},
			tooltips: {
				mode: 'index',
			},
			hover: {
				mode: 'index'
			},
			scales: {
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					stacked: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};

	if($('#line-stacked-bar-chart').length >0){
		var ctx = document.getElementById("line-stacked-bar-chart").getContext("2d");
		window.myLine = new Chart(ctx, config);
	}
})(jQuery);
		
/**
  * Function written to load line chartjs.
 **/
(function($){
	var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "My First dataset",
				backgroundColor: '#d24636',
				borderColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				fill: false,
			}, {
				label: "My Second dataset",
				fill: false,
				backgroundColor: '#5e6db3',
				borderColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
			}]
		},
		options: {
			responsive: true,
			title:{
				display:true,
				text:'Chart.js Line Chart'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};

	if($('#line-chart').length >0){
		var ctx = document.getElementById("line-chart").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);

/**
  * Function written to load area different point positions chartjs.
 **/
(function($){
	var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				label: "dataset - big points",
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				backgroundColor: '#d24636',
				borderColor: '#d24636',
				fill: false,
				borderDash: [5, 5],
				pointRadius: 15,
				pointHoverRadius: 10,
			}, {
				label: "dataset - individual point sizes",
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				backgroundColor: '#5e6db3',
				borderColor: '#5e6db3',
				fill: false,
				borderDash: [5, 5],
				pointRadius: [2, 4, 6, 18, 0, 12, 20],
			}, {
				label: "dataset - large pointHoverRadius",
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				backgroundColor: '#00ca95',
				borderColor: '#00ca95',
				fill: false,
				pointHoverRadius: 30,
			}, {
				label: "dataset - large pointHitRadius",
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				],
				backgroundColor: '#31cff9',
				borderColor: '#31cff9',
				fill: false,
				pointHitRadius: 20,
			}]
		},
		options: {
			responsive: true,
			legend: {
				position: 'bottom',
			},
			hover: {
				mode: 'index'
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			},
			title: {
				display: true,
				text: 'Chart.js Line Chart - Different point sizes'
			}
		}
	};

	if($('#different-points').length >0){
		var ctx = document.getElementById("different-points").getContext("2d");
			window.myLine = new Chart(ctx, config);
	  }
})(jQuery);
		
/**
  * Function written to load legend normal and pointstyle chartjs.
 **/
(function($){
	if($('#chart-legend-normal').length >0){
		var color = Chart.helpers.color;
		var createConfig = function(colorName) {
			return {
				type: 'line',
				data: {
					labels: ["January", "February", "March", "April", "May", "June", "July"],
					datasets: [{
						label: "My First dataset",
						data: [
							randomScalingFactor(), 
							randomScalingFactor(), 
							randomScalingFactor(), 
							randomScalingFactor(), 
							randomScalingFactor(), 
							randomScalingFactor(), 
							randomScalingFactor()
						],
						backgroundColor: color('#5e6db3').alpha(0.5).rgbString(),
						borderColor: '#5e6db3',
						borderWidth: 1,
						pointStyle: 'rectRot',
						pointRadius: 5,
						pointBorderColor: 'rgb(0, 0, 0)'
					}]
				},
				options: {
					responsive: true,
					legend: {
						labels: {
							usePointStyle: false
						}
					},
					scales: {
						xAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Month'
							}
						}],
						yAxes: [{
							display: true,
							scaleLabel: {
								display: true,
								labelString: 'Value'
							}
						}]
					},
					title: {
						display: true,
						text: 'Normal Legend'
					}
				}
			};
		}

		var createPointStyleConfig = function(colorName) {
			var config = createConfig(colorName);
			config.options.legend.labels.usePointStyle = true;
			config.options.title.text = 'Point Style Legend';
			return config;
		}
		var config = createConfig(color);
	                var ctx = document.getElementById('chart-legend-normal').getContext('2d');
	                new Chart(ctx,config)
	  }
})(jQuery);

/**
  * Function written to load stacked bar chartjs.
 **/
(function($){
	var barChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: '#d24636',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: '#5e6db3',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			label: 'Dataset 3',
			backgroundColor: '#00ca95',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]

	};

	if($('#stacked-bar-chart').length >0){
		var ctx = document.getElementById("stacked-bar-chart").getContext("2d");
			window.myBar = new Chart(ctx, {
				 type: 'bar',
				 data: barChartData,
				 options: {
					  title:{
							display:true,
							text:"Chart.js Bar Chart - Stacked"
					  },
					  tooltips: {
							mode: 'index',
							intersect: false
					  },
					  responsive: true,
					  scales: {
							xAxes: [{
								 stacked: true,
							}],
							yAxes: [{
								 stacked: true
							}]
					  }
				 }
			});
	  }
})(jQuery);

/**
  * Function written to load bar multi axix chartjs.
 **/
(function($){
	var barChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: [
				'#d24636',
			],
			yAxisID: "y-axis-1",
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: '#5e6db3',
			yAxisID: "y-axis-2",
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]
	};

	if($('#bar-chart-multi-axis').length >0){
		var ctx = document.getElementById("bar-chart-multi-axis").getContext("2d");
		window.myBar = new Chart(ctx, {
			type: 'bar',
			data: barChartData, 
			options: {
				responsive: true,
				title:{
					display:true,
					text:"Chart.js Bar Chart - Multi Axis"
				},
				tooltips: {
					mode: 'index',
					intersect: true
				},
				scales: {
					yAxes: [{
						type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: "left",
						id: "y-axis-1",
					}, {
						type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
						display: true,
						position: "right",
						id: "y-axis-2",
						gridLines: {
							drawOnChartArea: false
						}
					}],
				}
			}
		});
	}
})(jQuery);

/**
  * Function written to load horizontal bar chart.
 **/
(function($){
	var color = Chart.helpers.color;
	var horizontalBarChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: '#d24636',
			borderColor: '#d24636',
			borderWidth: 1,
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: '#5e6db3',
			borderColor: '#5e6db3',
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]
	};

	if($('#hori-bar-chart').length >0){
		var ctx = document.getElementById("hori-bar-chart").getContext("2d");
			window.myHorizontalBar = new Chart(ctx, {
				 type: 'horizontalBar',
				 data: horizontalBarChartData,
				 options: {
					  // Elements options apply to all of the options unless overridden in a dataset
					  // In this case, we are setting the border of each horizontal bar to be 2px wide
					  elements: {
							rectangle: {
								 borderWidth: 2,
							}
					  },
					  responsive: true,
					  legend: {
							position: 'right',
					  },
					  title: {
							display: true,
							text: 'Chart.js Horizontal Bar Chart'
					  }
				 }
			});
	  }
})(jQuery);

		/**
	     * Function written to load progress bar chartjs.
	    **/
(function($){
	var progress = document.getElementById('animationProgress');
	var config1 = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
				fill: false,
				borderColor: '#d24636',
				backgroundColor: '#d24636',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			}, {
				label: "My Second dataset ",
				fill: false,
				borderColor: '#5e6db3',
				backgroundColor: '#5e6db3',
				data: [
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor(), 
					randomScalingFactor()
				]
			}]
		},
		options: {
			title:{
				display:true,
				text: "Chart.js Line Chart - Animation Progress Bar"
			},
			animation: {
				duration: 2000,
				onProgress: function(animation) {
					progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
				},
				onComplete: function(animation) {
					window.setTimeout(function() {
						progress.value = 0;
					}, 2000);
				}
			}
		}
	};

	if($('#canvas').length >0){
		var ctx1 = document.getElementById("canvas").getContext("2d");
		window.myLine = new Chart(ctx1, config1);
	}
})(jQuery);

		/**
	     * Function written to load bar chartjs.
	    **/
(function($){
	var color = Chart.helpers.color;
	var barChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: '#d24636',
			borderColor: '#d24636',
			borderWidth: 1,
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: '#5e6db3',
			borderColor: '#5e6db3',
			borderWidth: 1,
			data: [
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor(), 
				randomScalingFactor()
			]
		}]

	};

	if($('#bar-chart').length >0){
		var ctx = document.getElementById("bar-chart").getContext("2d");
		window.myBar = new Chart(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Bar Chart'
				}
			}
		});
	}
})(jQuery);
'use strict';
(function($) {
	/**
	  * Function written to load area hart behaving like line chart morris chart.
	**/
	if ($(".area-chart-morris").length > 0){
		Morris.Area({
		  element: $('.area-chart-morris'),
		  behaveLikeLine: true,
		  data: [
			{x: '2011 Q1', y: 3, z: 3},
			{x: '2011 Q2', y: 2, z: 1},
			{x: '2011 Q3', y: 2, z: 4},
			{x: '2011 Q4', y: 3, z: 3}
		  ],
		  xkey: 'x',
		  lineColors:['#7e8ac2','#5e6db3'],
		  ykeys: ['y', 'z'],
		  labels: ['Y', 'Z']
		});
	}

	/**
	  * Function written to load line morris chart.
	**/
	if ($(".line-chart-morris").length > 0){
		Morris.Line({
		  element: $('.line-chart-morris'),
		  data: [
			{ y: '2006', a: 100, b: 90 },
			{ y: '2007', a: 75,  b: 65 },
			{ y: '2008', a: 50,  b: 40 },
			{ y: '2009', a: 75,  b: 65 },
			{ y: '2010', a: 50,  b: 40 },
			{ y: '2011', a: 75,  b: 65 },
			{ y: '2012', a: 100, b: 90 }
		  ],
		  xkey: 'y',
		  ykeys: ['a', 'b'],
		  lineColors:['#7e8ac2','#5e6db3'],
		  labels: ['Series A', 'Series B']
		});
	}

	/**
	  * Function written to load simple bar morris chart.
	**/
	if ($(".simple-bar-chart-morris").length > 0){
		Morris.Bar({
		  element: $('.simple-bar-chart-morris'),
		  data: [
			{x: '2011 Q1', y: 3, z: 2, a: 3},
			{x: '2011 Q2', y: 2, z: null, a: 1},
			{x: '2011 Q3', y: 0, z: 2, a: 4},
			{x: '2011 Q4', y: 2, z: 4, a: 3}
		  ],
		  xkey: 'x',
		  ykeys: ['y', 'z', 'a'],
		  barColors:['#7e8ac2','#5e6db3','#00ca95'],
		  labels: ['Y', 'Z', 'A']
		}).on('click', function(i, row){
		  console.log(i, row);
		});
	}

	/**
	  * Function written to load bar morris chart.
	**/
	if ($(".bar-chart-morris").length > 0){
		Morris.Bar({
		  element: $('.bar-chart-morris'),
		  data: [
			{x: '2011 Q1', y: 0},
			{x: '2011 Q2', y: 1},
			{x: '2011 Q3', y: 2},
			{x: '2011 Q4', y: 3},
			{x: '2012 Q1', y: 4},
			{x: '2012 Q2', y: 5},
			{x: '2012 Q3', y: 6},
			{x: '2012 Q4', y: 7},
			{x: '2013 Q1', y: 8}
		  ],
		  xkey: 'x',
		  ykeys: ['y'],
		  labels: ['Y'],
		  barColors:['#5e6db3'],
		});
	}

	/**
	  * Function written to load displaying x_lables digonally morris chart.
	**/
	if ($(".bar-diagonal-morris").length > 0){	
		var day_data = [
		  {"period": "2012-10-01", "licensed": 3407, "sorned": 660},
		  {"period": "2012-09-30", "licensed": 3351, "sorned": 629},
		  {"period": "2012-09-29", "licensed": 3269, "sorned": 618},
		  {"period": "2012-09-20", "licensed": 3246, "sorned": 661},
		  {"period": "2012-09-19", "licensed": 3257, "sorned": 667},
		  {"period": "2012-09-18", "licensed": 3248, "sorned": 627},
		  {"period": "2012-09-17", "licensed": 3171, "sorned": 660},
		  {"period": "2012-09-16", "licensed": 3171, "sorned": 676},
		  {"period": "2012-09-15", "licensed": 3201, "sorned": 656},
		  {"period": "2012-09-10", "licensed": 3215, "sorned": 622}
		];
		Morris.Bar({
		  element: $('.bar-diagonal-morris'),
		  data: day_data,
		  barColors:['#5e6db3', '#7e8ac2'],
		  xkey: 'period',
		  ykeys: ['licensed', 'sorned'],
		  labels: ['Licensed', 'SORN'],
		  xLabelAngle: 60
		});
	}

	/**
	  * Function written to load decimal data morris chart.
	**/
	if ($(".decimal-data-morris").length > 0){	
		var decimal_data = [];
	    for (var x = 0; x <= 360; x += 10) {
	      decimal_data.push({
	        x: x,
	        y: 1.5 + 1.5 * Math.sin(Math.PI * x / 180).toFixed(4)
	      });
	    }
	    window.m = Morris.Line({
	      element: $('.decimal-data-morris'),
	      data: decimal_data,
	      xkey: 'x',
	      ykeys: ['y'],
	      labels: ['sin(x)'],
	      parseTime: false,
	      lineColors:['#5e6db3'],
	      hoverCallback: function (index, options, default_content, row) {
	        return default_content.replace("sin(x)", "1.5 + 1.5 sin(" + row.x + ")");
	      },
	      xLabelMargin: 10,
	      integerYLabels: true
	    });
	}

    /**
	  * Function written to load displaying x-labels diagonally morris chart.
	**/
    if ($(".x-labels-morris").length > 0){	
	    var day_data = [
		  {"period": "2012-10-30", "licensed": 3407, "sorned": 660},
		  {"period": "2012-09-30", "licensed": 3351, "sorned": 629},
		  {"period": "2012-09-29", "licensed": 3269, "sorned": 618},
		  {"period": "2012-09-20", "licensed": 3246, "sorned": 661},
		  {"period": "2012-09-19", "licensed": 3257, "sorned": 667},
		  {"period": "2012-09-18", "licensed": 3248, "sorned": 627},
		  {"period": "2012-09-17", "licensed": 3171, "sorned": 660},
		  {"period": "2012-09-16", "licensed": 3171, "sorned": 676},
		  {"period": "2012-09-15", "licensed": 3201, "sorned": 656},
		  {"period": "2012-09-10", "licensed": 3215, "sorned": 622}
		];
		Morris.Line({
		  element: $('.x-labels-morris'),
		  data: day_data,
		  xkey: 'period',
		  lineColors:['#7e8ac2','#5e6db3'],
		  ykeys: ['licensed', 'sorned'],
		  labels: ['Licensed', 'SORN'],
		  xLabelAngle: 60
		});
	}

	/**
	  * Function written to load formatting dates morris chart.
	**/
	if ($(".formatting-dates-morris").length > 0){	
	    var day_data = [
		  {"period": "2012-10-01", "licensed": 3407, "sorned": 660},
		  {"period": "2012-09-30", "licensed": 3351, "sorned": 629},
		  {"period": "2012-09-29", "licensed": 3269, "sorned": 618},
		  {"period": "2012-09-20", "licensed": 3246, "sorned": 661},
		  {"period": "2012-09-19", "licensed": 3257, "sorned": 667},
		  {"period": "2012-09-18", "licensed": 3248, "sorned": 627},
		  {"period": "2012-09-17", "licensed": 3171, "sorned": 660},
		  {"period": "2012-09-16", "licensed": 3171, "sorned": 676},
		  {"period": "2012-09-15", "licensed": 3201, "sorned": 656},
		  {"period": "2012-09-10", "licensed": 3215, "sorned": 622}
		];
		Morris.Line({
		  element: $('.formatting-dates-morris'),
		  data: day_data,
		  xkey: 'period',
		  lineColors:['#7e8ac2','#5e6db3'],
		  ykeys: ['licensed', 'sorned'],
		  labels: ['Licensed', 'SORN']
		});
	}

    /**
	  * Function written to load donut color morris chart.
	**/
    if ($(".donut-color-chart-morris").length > 0){
	    Morris.Donut({
	      element: $('.donut-color-chart-morris'),
	        data: [
			{value: 70, label: 'foo'},
			{value: 15, label: 'bar'},
			{value: 10, label: 'baz'},
			{value: 5, label: 'A really really long label'}
		  ],
		  backgroundColor: '#ccc',
		  labelColor: '#060',
		  colors:['#7e8ac2','#5e6db3','#fd7b6c','#31cff9'],
		  formatter: function (x) { return x + "%"}
	    }).on('click', function(i, row){
	      console.log(i, row);
	    });
	}
	/**
	  * Function written to load updating data morris chart.
	**/
	if ($(".updating-data-morris").length > 0){
		var nReloads = 0;
		var data = function(offset) {
		  var ret = [];
		  for (var x = 0; x <= 360; x += 10) {
			var v = (offset + x) % 360;
			ret.push({
			  x: x,
			  y: Math.sin(Math.PI * v / 180).toFixed(4),
			  z: Math.cos(Math.PI * v / 180).toFixed(4)
			});
		  }
		  return ret;
		}
		var graph = Morris.Line({
			element: $('.updating-data-morris'),
			data: data(0),
			xkey: 'x',
			ykeys: ['y', 'z'],
			labels: ['sin()', 'cos()'],
			parseTime: false,
			ymin: -1.0,
			ymax: 1.0,
			hideHover: true,
			lineColors:['#7e8ac2','#5e6db3'],
		});
		var update = function() {
		  nReloads++;
		  graph.setData(data(5 * nReloads));
		  $('.reloadStatus').text(nReloads + ' reloads');
		}
		setInterval(update, 100);
	}

	/**
	  * Function written to load stacked bar morris chart.
	**/
	if ($(".stacked-bar-chart-morris").length > 0){
		Morris.Bar({
		  element: $('.stacked-bar-chart-morris'),
		  data: [
			{x: '2011 Q1', y: 3, z: 2, a: 3},
			{x: '2011 Q2', y: 2, z: null, a: 1},
			{x: '2011 Q3', y: 0, z: 2, a: 4},
			{x: '2011 Q4', y: 2, z: 4, a: 3}
		  ],
		  xkey: 'x',
		  ykeys: ['y', 'z', 'a'],
		  labels: ['Y', 'Z', 'A'],
		  barColors:['#7e8ac2','#5e6db3','#00ca95'],
		  stacked: true
		});
	}
})(jQuery);
'use strict';
(function($) {
	/**
	  * Function written to load sparkline chart based on data attributes.
	**/
	var PrtmSparkline = function(){
		if($('[data-chart="sparkline"]').length > 0 ){
			$('[data-chart="sparkline"]').each(function(){
				var values = $(this).data('values');
				var type = $(this).data('type') ? $(this).data('type') : 'bar';
				var width = $(this).data('width');
				var height = $(this).data('height');
				var range = $(this).data('range');
				var linecolor = $(this).data('linecolor');
				var fillcolor = $(this).data('fillcolor');
				var hllcolor = $(this).data('hllcolor');
				var hlscolor = $(this).data('hlscolor');
				var slicecolors = $(this).data('slicecolors');
				var barwidth = $(this).data('barwidth');
				var barspacing = $(this).data('barspacing');
				var barcolor = $(this).data('barcolor');
				var negcolor = $(this).data('negcolor');
				var poscolor = $(this).data('poscolor');
				var tarcolor = $(this).data('tarcolor');
				var percolor = $(this).data('percolor');
				var medcolor = $(this).data('medcolor');
				var boxfcolor = $(this).data('boxfcolor');
				var linewidth = $(this).data('linewidth');
				var minSpotColor = $(this).data('minSpotColor');
				$(this).sparkline($(this).data('values'), {
					type: type, 
					height: height, 
					width: width, 
					chartRangeMax: range,
					lineColor: linecolor,
						fillColor: fillcolor,
						highlightLineColor: hllcolor,
						highlightSpotColor: hlscolor, 
						sliceColors: ['#5e6db3', '#00ca95','#fd7b6c'],
						lineWidth: linewidth,
						barWidth: barwidth,
						barSpacing: barspacing,
						barColor: barcolor,
						negBarColor: negcolor,
						posBarColor: poscolor,
						targetColor: tarcolor,
						performanceColor: percolor,
						boxFillColor: boxfcolor,
						 medianColor: medcolor,
							  minSpotColor: minSpotColor,
						disableHiddenCheck: true
				});
			});
		}
	}

	/**
	  * Function written to load easypie chart based on data attributes.
	**/
	if($('[data-chart="easypie"]').length > 0){
		$('[data-chart="easypie"]').each(function(){
			var animateValue = $(this).data('animate') ? $(this).data('animate') : '2000';
			var sizeValue = $(this).data('size') ? $(this).data('size') : '200';
			var linewidth = $(this).data('linewidth') ? $(this).data('linewidth') : '5' ;
			var barcolor = $(this).data('barcolor') ? $(this).data('barcolor') : '#f44236' ;
			var trackcolor = $(this).data('trackcolor') ? $(this).data('trackcolor') : '#ddd' ;
			var scale = $(this).data('scale');
			var update = $(this).data('update');
	
			$(this).easyPieChart({
				  animate: animateValue,
				  size: sizeValue,
				  lineWidth: linewidth,
				  barColor: barcolor,
				  trackColor: trackcolor,
				  scaleColor: scale,
				  onStep: function(from, to, percent) {
						$(this.el).find('.percent').text(Math.round(percent));
				}
			 });
			 if(update){
				 var chart = window.chart = $(this).data('easyPieChart');
				 $('.easydemo_update').on('click', function() {
					  chart.update(Math.random()*200-100);
				 });
			}
		});
	}

	/**
	  * Function written to load peity charts based on data attributes.
	**/
	if($('[data-chart="peity"]').length > 0){
		$('[data-chart="peity"]').each(function(){
			var type = $(this).data('type') ? $(this).data('type') : 'pie';
			var update = $(this).data('update');
			var updatingChart=$(this).peity(type,{});
			if(update){
				 setInterval(function() {
					  var random = Math.round(Math.random() * 10)
					  var values = updatingChart.text().split(",")
					  values.shift()
					  values.push(random)
	
					  updatingChart
					  .text(values.join(","))
					  .change()
				 }, 1000);
			}
		});
	}
	PrtmSparkline();
	$(window).resize(function(){
		PrtmSparkline();
	});
})(jQuery);
'use strict';
(function($) {
	var PrtmComponent = {
		NotificationToaster:function(){
		    toastr.success('Page Loaded!');
		    toastr.options.fadeIn = 300,
		    toastr.options.fadeOut = 1000,
		    toastr.options.timeOut = 2000, // 1.5s
		    $('.toastrInfo').on('click',function() {
		    	toastr.info('info messages');
		    });
		    $('.toastrWarning').on('click',function() {
		    	toastr.warning('warning messages');
		    });
		    $('.toastrSuccess').on('click',function() {
		    	toastr.success('Success messages');
		    });
		    $('.toastrError').on('click',function() {
		    	toastr.error('Danger messages');
		    });

		    var i = -1;
		    var toastCount = 0;
		    var $toastlast;

		    var getMessage = function () {
		     var msgs = ['My name is Inigo Montoya. You killed my father. Prepare to die!',
		            '<div><input class="input-small form-control mrgn-b-sm" value="textbox"/>&nbsp;<a class="mrgn-b-sm display-ib" href="http://johnpapa.net" target="_blank">This is a hyperlink</a></div><div><button type="button" id="okBtn" class="btn btn-primary">Close me</button><button type="button" id="surpriseBtn" class="btn btn-inverse" style="margin: 0 8px 0 8px">Surprise me</button></div>',
		            'Are you the six fingered man?',
		            'Inconceivable!',
		            'I do not think that means what you think it means.',
		            'Have fun storming the castle!'
		        ];
		        i++;
		        if (i === msgs.length) {
		            i = 0;
		        }

		        return msgs[i];
		    };

		    var getMessageWithClearButton = function (msg) {
		        msg = msg ? msg : 'Clear itself?';
		        msg += '<br /><br /><button type="button" class="btn clear">Yes</button>';
		        return msg;
		    };

		    $('.showtoast').on('click',function () {
		        var shortCutFunction = $(".toastTypeGroup input:radio:checked").val();
		        var msg = $('.message').val();
		        var title = $('.title').val() || '';
		        var $showDuration = $('.showDuration');
		        var $hideDuration = $('.hideDuration');
		        var $timeOut = $('.timeOut');
		        var $extendedTimeOut = $('.extendedTimeOut');
		        var $showEasing = $('.showEasing');
		        var $hideEasing = $('.hideEasing');
		        var $showMethod = $('.showMethod');
		        var $hideMethod = $('.hideMethod');
		        var toastIndex = toastCount++;
		        var addClear = $('#addClear').prop('checked');

		        toastr.options = {
		            closeButton: $('.closeButton').prop('checked'),
		            debug: $('.debugInfo').prop('checked'),
		            newestOnTop: $('#newestOnTop').prop('checked'),
		            progressBar: $('#progressBar').prop('checked'),
		            positionClass: $('.positionGroup input:radio:checked').val() || 'toast-top-right',
		            preventDuplicates: $('#preventDuplicates').prop('checked'),
		            onclick: null
		        };

		        if ($('.addBehaviorOnToastClick').prop('checked')) {
		            toastr.options.onclick = function () {
		                alert('You can perform some custom action after a toast goes away');
		            };
		        }

		        if ($showDuration.val().length) {
		            toastr.options.showDuration = $showDuration.val();
		        }

		        if ($hideDuration.val().length) {
		            toastr.options.hideDuration = $hideDuration.val();
		        }

		        if ($timeOut.val().length) {
		            toastr.options.timeOut = addClear ? 0 : $timeOut.val();
		        }

		        if ($extendedTimeOut.val().length) {
		            toastr.options.extendedTimeOut = addClear ? 0 : $extendedTimeOut.val();
		        }

		        if ($showEasing.val().length) {
		            toastr.options.showEasing = $showEasing.val();
		        }

		        if ($hideEasing.val().length) {
		            toastr.options.hideEasing = $hideEasing.val();
		        }

		        if ($showMethod.val().length) {
		            toastr.options.showMethod = $showMethod.val();
		        }

		        if ($hideMethod.val().length) {
		            toastr.options.hideMethod = $hideMethod.val();
		        }

		        if (addClear) {
		            msg = getMessageWithClearButton(msg);
		            toastr.options.tapToDismiss = false;
		        }
		        if (!msg) {
		            msg = getMessage();
		        }

		        $('#toastrOptions').text('Command: toastr["'
		                + shortCutFunction
		                + '"]("'
		                + msg
		                + (title ? '", "' + title : '')
		                + '")\n\ntoastr.options = '
		                + JSON.stringify(toastr.options, null, 2)
		        );

		        var $toast = toastr[shortCutFunction](msg, title); // Wire up an event handler to a button in the toast, if it exists
		        $toastlast = $toast;

		        if(typeof $toast === 'undefined'){
		            return;
		        }

		        if ($toast.find('#okBtn').length) {
		            $toast.delegate('#okBtn', 'click', function () {
		                alert('you clicked me. i was toast #' + toastIndex + '. goodbye!');
		                $toast.remove();
		            });
		        }
		        if ($toast.find('#surpriseBtn').length) {
		            $toast.delegate('#surpriseBtn', 'click', function () {
		                alert('Surprise! you clicked me. i was toast #' + toastIndex + '. You could perform an action here.');
		            });
		        }
		        if ($toast.find('.clear').length) {
		            $toast.delegate('.clear', 'click', function () {
		                toastr.clear($toast, { force: true });
		            });
		        }
		    });

		    function getLastToast(){
		        return $toastlast;
		    }
		    $('#clearlasttoast').on('click',function () {
		        toastr.clear(getLastToast());
		    });
		    $('.cleartoasts').on('click',function () {
		        toastr.clear();
		    });
		},
		SweetAlert:function(){
			/*------------------ Sweet Alerts ----------------*/
		    if($('.sweet-1').length > 0 ) {
		        document.querySelector('.sweet-1').onclick = function(){
		            swal({
		              title: "Are you sure?",
		              text: "this imaginary file!",
		              type: "info",
		              showCancelButton: true,
		              confirmButtonClass: 'btn-primary',
		              confirmButtonText: 'Primary!',
                      cancelButtonClass: 'btn-inverse'
		            });
		        };
		    }
		    if($('.sweet-2').length > 0 ) {
		        document.querySelector('.sweet-2').onclick = function(){
		            swal({
		                title: "Good job!",
		                text: "You clicked the button!",
		                type: "success",
		                showCancelButton: true,
		                confirmButtonClass: 'btn-success',
                        cancelButtonClass: 'btn-inverse',
		            });
		        };
		    }
		    if($('.sweet-3').length > 0 ) {
		        document.querySelector('.sweet-3').onclick = function(){
		            swal({
		              title: "Are you sure?",
		              text: "this imaginary file!",
		              type: "warning",
		              showCancelButton: true,
		              confirmButtonClass: 'btn-warning',
		              confirmButtonText: 'warning!',
                      cancelButtonClass: 'btn-inverse'
		            });
		        };
		    }
		    if($('.sweet-4').length > 0 ) {
		        document.querySelector('.sweet-4').onclick = function(){
		            swal({
		              title: "Are you sure?",
		              text: "this imaginary file!",
		              type: "info",
		              showCancelButton: true,
		              confirmButtonClass: 'btn-info',
		              confirmButtonText: 'info!',
                      cancelButtonClass: 'btn-inverse'
		            });
		        };
		    }
		    if($('.sweet-5').length > 0 ) {
		        document.querySelector('.sweet-5').onclick = function(){ 
		            swal({
		            title: "Are you sure?",
		            text: "Your will not be able to recover this imaginary file!",
		            type: "warning",
		            showCancelButton: true,
		            confirmButtonClass: "btn-warning",
		            confirmButtonText: "Yes, delete it!",
		            closeOnConfirm: false
		            },
		            function(){
		              swal("Deleted!", "Your imaginary file has been deleted.", "success");
		            });
		        };
		    }
		    if($('.sweet-6').length > 0 ) {
		        document.querySelector('.sweet-6').onclick = function(){
		            swal({
		                title: "An input!",
		                text: "Write something interesting:",
		                type: "input",
		                showCancelButton: true,
		                closeOnConfirm: false,
		                inputPlaceholder: "Write something",
                        cancelButtonClass: 'btn-inverse'
		                }, function (inputValue) {
		                if (inputValue === false) return false;
		                if (inputValue === "") {
		                swal.showInputError("You need to write something!");
		                return false
		                }
		                swal("Nice!", "You wrote: " + inputValue, "success");
		            });   
		        };
		    } 
		},
		MultiSelect:function(){
			/*------------- Bootstrap multiselect -------------*/
			if($('.selectstyle').length > 0) {
		    $('.selectstyle').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.inverse-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-inverse',
		    });
		    $('.primary-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-primary',
		    });
		    $('.success-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-success',
		    });
		    $('.warning-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-warning',
		    });
		    $('.danger-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-danger',
		    });
		    $('.info-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-info',
		    });
		    $('.inverse-outline-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.primary-outline-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-primary',
		    });
		    $('.success-outline-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-success',
		    });
		    $('.warning-outline-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-warning',
		    });
		    $('.danger-outline-select-box').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-danger',
		    });
		    $('.info-outline-select-box').multiselect({
		       buttonClass: 'btn btn-outline-info',
		       buttonWidth: '100%',
		    });
		    $('.inverse-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-inverse btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.primary-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-primary btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.success-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-success btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.warning-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-warning btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.danger-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-danger btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.info-rounded-select-box').multiselect({
		       buttonClass: 'btn btn-info btn-rounded',
		       buttonWidth: '100%', 
		    });
		    $('.filter-dropdown').multiselect({
		        enableClickableOptGroups: true,
		        enableCollapsibleOptGroups: true,
		        enableFiltering: true,
		        includeSelectAllOption: true,
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.select-group').multiselect({
		        enableClickableOptGroups: true,
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.clickable-filter').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		        enableFiltering: true, 
		    });
		    $('.dropright').multiselect({
		        dropRight: true,
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.fixedDropdown').multiselect({
		        buttonWidth: '80%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.fixedHight').multiselect({
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		        maxHeight: 200,
		    });
		    $('.onDropdownShow').multiselect({
		            onDropdownShow: function(event) {
		            alert('Dropdown shown.');
		        },
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		        maxHeight: 200,
		    });
		    $('.onDropdownHide').multiselect({
		            onDropdownHide: function(event) {
		            alert('Dropdown closed.');
		        },
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
		    $('.onchange').multiselect({
		        onChange: function(option, checked, select) {
		        alert('Changed option ' + $(option).val() + '.');
		        },
		        buttonWidth: '100%',
		        buttonClass: 'btn btn-outline-inverse',
		    });
			}
		},
		Init:function(){
			this.NotificationToaster();
			this.SweetAlert();
			this.MultiSelect();
		},
	};
	PrtmComponent.Init();
	if($('#fileupload').length > 0){
		$('#fileupload').fileupload({
			// Uncomment the following to send cross-domain cookies:
			//xhrFields: {withCredentials: true},
			url: 'server/php/'
		});
	}
})(jQuery);
'use strict';
(function($) {
	var PrtmElement = {
		/**
		  * Function written to load UI slider based on data attributes.
		**/
		FormSliders:function(){
			$('[data-slider="form"]').each(function(){
				var min = $(this).data('min');
				var max = $(this).data('max');
				var value = $(this).data('value');
				var step = $(this).data('step');
				var orientation = $(this).data('orientation');
				var tooltip = $(this).data('tooltip');
				var toolposition = $(this).data('toolposition');
			    $(this).slider({
			    	range:"min",
			        min: min,
			        max: max,
			        value: value,
			        step: step,
			        orientation: orientation,
			        tooltip_position: toolposition,
			        tooltip: tooltip,
			    });
			});
		},
		/**
		  * Function written to load Datepickers.
		**/
		DatePickers:function(){
				$('.datepicker').datepicker();
		    var startDate = new Date(2012,1,20);
		    var endDate = new Date(2012,1,25);
		    $('.datepicker-start-date').datepicker()
		        .on('changeDate', function(ev){
		            if (ev.date.valueOf() > endDate.valueOf()){
		                $('#alert').show().find('strong').text('The start date can not be greater then the end date');
		            } else {
		                $('#alert').hide();
		                startDate = new Date(ev.date);
		                $('#startDate').text($('.datepicker-start-date').data('date'));
		            }
		            $('.datepicker-start-date').datepicker('hide');
		        });
		    $('.datepicker-end-date').datepicker()
		        .on('changeDate', function(ev){
		            if (ev.date.valueOf() < startDate.valueOf()){
		                $('#alert').show().find('strong').text('The end date can not be less then the start date');
		            } else {
		                $('#alert').hide();
		                endDate = new Date(ev.date);
		                $('#endDate').text($('.datepicker-end-date').data('date'));
		            }
		        $('.datepicker-end-date').datepicker('hide');
		    });

		    // Disabling dates
		    var nowTemp = new Date();
		    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

		    var checkin = $('.datepicker-disable-date').datepicker({
		      onRender: function(date) {
		        return date.valueOf() < now.valueOf() ? 'disabled' : '';
		    }
		    }).on('changeDate', function(ev) {
		      if (ev.date.valueOf() > checkout.date.valueOf()) {
		        var newDate = new Date(ev.date)
		        newDate.setDate(newDate.getDate() + 1);
		        checkout.setValue(newDate);
		      }
		      checkin.hide();
		    }).data('datepicker');
		},
		/**
		  * Function to load  Date and Time picker
		**/
		DateTimePickers:function(){
		    $('.datetimepicker').datetimepicker({
		        weekStart: 1,
		        todayBtn:  1,
		        autoclose: 1,
		        todayHighlight: 1,
		        startView: 2,
		        forceParse: 0,
		        showMeridian: 1
		    });
		    $('.datetimepicker-date').datetimepicker({
		        weekStart: 1,
		        todayBtn:  1,
		        autoclose: 1,
		        todayHighlight: 1,
		        startView: 2,
		        minView: 2,
		        forceParse: 0
		    });
		    $('.datetimepicker-time').datetimepicker({
		        weekStart: 1,
		        todayBtn:  1,
		        autoclose: 1,
		        todayHighlight: 1,
		        startView: 1,
		        minView: 0,
		        maxView: 1,
		        forceParse: 0
		    });
		},
		/**
		  * Function to load Timepickers
		**/
		TimePickers:function(){
		//-------------- Time picker -----------------*/
		$('.timepicker-default').timepicker({
		        showInputs: false,
		    });
		    $('.timepicker-seconds').timepicker({
		        disableFocus: true,
		        showInputs: false,
		        showSeconds: true,
		        defaultValue: '12:45:30'
		    });
		    $('.timepicker-24').timepicker({
		        maxHours: 24,
		        showInputs: false,
		        showMeridian: false,
		    });
		    $('.timepicker').parent('.input-group').on('click', '.input-group-addon', function(e){
		        e.preventDefault();
		        $(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
		    });
		},
		/**
		  * Function to load  Datepicker between ranges
		**/
		DateRangePickers:function(){
			/*------------- Date range Picker ----------------*/
		$('input[name="daterange"]').daterangepicker();
		    $('.dateTimerange').daterangepicker({
		        timePicker: true,
		        timePickerIncrement: 30,
		        locale: {
		            format: 'MM/DD/YYYY h:mm A'
		        }
		    });
		    var start = moment().subtract(29, 'days');
		    var end = moment();

		    function cb(start, end) {
		        $('.reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
		    }

		    $('.reportrange').daterangepicker({
		        startDate: start,
		        endDate: end,
		        ranges: {
		           'Today': [moment(), moment()],
		           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
		           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
		           'This Month': [moment().startOf('month'), moment().endOf('month')],
		           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		        }
		    }, cb);
		    cb(start, end);
		},
		/**
		  * Function to load  Clockface picker
		**/
		ClockFace:function(){
        $('.clockface-default').clockface();  
		    $('.clockface-toggle').clockface({
		        format: 'HH:mm',
		        trigger: 'manual'
		    });
		    $('#toggle-btn').on('click',function(e){   
		        e.stopPropagation();
		        $('.clockface-toggle').clockface('toggle');
		    }); 
		    $('.clockface-inline').clockface({
		        format: 'H:mm'
		    }).clockface('show', '14:30');
		},
		/**
		  * Function to load  Colorpicker
		**/
		ColorPicker:function(){
			/*-------------- Color Picker ---------------------*/
		    $('.colorpicker').each( function() {
		        $(this).minicolors({
		            control: $(this).attr('data-control') || 'hue',
		            defaultValue: $(this).attr('data-defaultValue') || '',
		            format: $(this).attr('data-format') || 'hex',
		            keywords: $(this).attr('data-keywords') || '',
		            inline: $(this).attr('data-inline') === 'true',
		            letterCase: $(this).attr('data-letterCase') || 'lowercase',
		            opacity: $(this).attr('data-opacity'),
		            position: $(this).attr('data-position') || 'bottom left',
		            swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
		            change: function(value, opacity) {
		                if( !value ) return;
		                if( opacity ) value += ', ' + opacity;
		                if( typeof console === 'object' ) {
		                    console.log(value);
		                }
		            },
		            theme: 'bootstrap'
		        });
		    });
		},
		Init:function(){
			if($('.FormSliders').length > 0){
				this.FormSliders();
			}
			if($('.datepicker').length > 0){
				this.DatePickers();
			}
			if($('.datetimepicker').length > 0){
				this.DateTimePickers();
			}
			if($('.timepicker-default').length > 0){
				this.TimePickers();
			}
			if($('.dateTimerange').length > 0){
				this.DateRangePickers();
			}
			if($('.clockface-default').length > 0){
				this.ClockFace();
			}
			if($('.colorpicker').length > 0){
				this.ColorPicker();
			}
		},
	};
	PrtmElement.Init();
})(jQuery);


$(function(){
	function initToolbarBootstrapBindings() {
	var fonts = ['Serif', 'Sans', 'Arial', 'Arial Black', 'Courier', 
			'Courier New', 'Comic Sans MS', 'Helvetica', 'Impact', 'Lucida Grande', 'Lucida Sans', 'Tahoma', 'Times',
			'Times New Roman', 'Verdana'],
			fontTarget = $('[title=Font]').siblings('.dropdown-menu');
	$.each(fonts, function (idx, fontName) {
		 fontTarget.append($('<li><a data-edit="fontName ' + fontName +'" style="font-family:\''+ fontName +'\'">'+fontName + '</a></li>'));
	});
	$('a[title]').tooltip({container:'body'});
	$('.dropdown-menu input').click(function() {return false;})
		 .change(function () {$(this).parent('.dropdown-menu').siblings('.dropdown-toggle').dropdown('toggle');})
	  .keydown('esc', function () {this.value='';$(this).change();});
	
	$('[data-role=magic-overlay]').each(function () { 
	  var overlay = $(this), target = $(overlay.data('target')); 
	  overlay.css('opacity', 0).css('position', 'absolute').offset(target.offset()).width(target.outerWidth()).height(target.outerHeight());
	});
	if ("onwebkitspeechchange"  in document.createElement("input")) {
	  var editorOffset = $('.prtm-editor').offset();
	  $('#voiceBtn').css('position','absolute').offset({top: editorOffset.top, left: editorOffset.left+$('.prtm-editor').innerWidth()-35});
	} else {
	  $('#voiceBtn').hide();
	}
	};
	function showErrorAlert (reason, detail) {
	var msg='';
	if (reason==='unsupported-file-type') { msg = "Unsupported format " +detail; }
	else {
		console.log("error uploading file", reason, detail);
	}
	$('<div class="alert"> <button type="button" class="close" data-dismiss="alert">&times;</button>'+ 
	 '<strong>File upload error</strong> '+msg+' </div>').prependTo('#alerts');
	};
	initToolbarBootstrapBindings(); 
	if($('.prtm-editor').length > 0){ 
		$('.prtm-editor').wysiwyg({ fileUploadError: showErrorAlert} );
	}
});
'use strict';
(function($) {
  /**
    * Function to load simple google map
  **/
  if ($(".gmap_basic").length > 0){
    new GMaps({
    		div: '.gmap_basic',
    		lat: -12.043333,
    		lng: -77.028333
  	});
  }
  /**
    * Function to load events google map
  **/
  if ($(".map_event").length > 0){
    var map = new GMaps({
      div: '.map_event',
      zoom: 16,
      lat: -12.043333,
      lng: -77.028333,
      click: function(e) {
        alert('click');
      },
      dragend: function(e) {
        alert('dragend');
      }
    });
  }

  /**
    * Function to load markers google map
  **/
  if ($(".map_marker").length > 0){
    	var mapmarker = new GMaps({
    		div: '.map_marker',
    	  	zoom: 16,
    	  	lat: -12.043333,
    	  	lng: -77.028333,
    	});
    	mapmarker.addMarker({
    	 	lat: -12.043333,
    	  	lng: -77.028333,
    	  	title: 'Lima',
    	  	click: function(e) {
    	    	alert('You clicked in this marker');
    	  	},
    	});
  }

  /**
    * Function to load geolocation google map
  **/
  if ($(".map_gl").length > 0){
    	var mapgl = new GMaps({
    		div: '.map_gl',
    	  	zoom: 16,
    	  	lat: -12.043333,
    	  	lng: -77.028333,
    	});
  }

  /**
    * Function to load geocoding google map
  **/
  if ($(".map_geo").length > 0){
    	var mapgeo = new GMaps({
            div: '.map_geo',
            lat: -12.043333,
            lng: -77.028333
        });
		$('#geocoding_form').submit(function(e){
		e.preventDefault();
			GMaps.geocode({
				address: $('#address').val().trim(),
				callback: function(results, status){
				 if(status=='OK'){
					var latlng = results[0].geometry.location;
					mapgeo.setCenter(latlng.lat(), latlng.lng());
					mapgeo.addMarker({
					  lat: latlng.lat(),
					  lng: latlng.lng()
					});
				 }
				}
			});
		});
	}

	/**
	  * Function to load polylines google map
	**/
	if ($(".map_pol").length > 0){
		var path = [[-12.044012922866312, -77.02470665341184], [-12.05449279282314, -77.03024273281858], [-12.055122327623378, -77.03039293652341], [-12.075917129727586, -77.02764635449216], [-12.07635776902266, -77.02792530422971], [-12.076819390363665, -77.02893381481931], [-12.088527520066453, -77.0241058385925], [-12.090814532191756, -77.02271108990476]];
		var mappol = new GMaps({
			 div: '.map_pol',
			 lat: -12.043333,
			 lng: -77.028333
		});
		mappol.drawPolyline({
			path: path,
			strokeColor: '#131540',
			strokeOpacity: 0.6,
			strokeWeight: 6
		});
	}

	/**
	  * Function to load overlays google map
	**/
	if ($(".map_over").length > 0){
		var mapover = new GMaps({
				 div: '.map_over',
				 lat: -12.043333,
				 lng: -77.028333
			});
		 mapover.drawOverlay({
				 lat: mapover.getCenter().lat(),
				 lng: mapover.getCenter().lng(),
				 content: '<div class="overlay">Lima<div class="overlay_arrow above"></div></div>',
				 verticalAlign: 'top',
				 horizontalAlign: 'center'
		 });
	}

	/**
	  * Function to load polygons google map
	**/
	if ($(".map_poly").length > 0){
		 var mappoly = new GMaps({
			  div: '.map_poly',
			  lat: -12.043333,
			  lng: -77.028333
		 });
	
		  var path =  [[-12.040397656836609,-77.03373871559225],
					[-12.040248585302038,-77.03993927003302],
					[-12.050047116528843,-77.02448169303511],
					[-12.044804866577001,-77.02154422636042]
					];
		 var polygon = mappoly.drawPolygon({
					paths: path,
					strokeColor: '#BBD8E9',
					strokeOpacity: 1,
					strokeWeight: 3,
					fillColor: '#BBD8E9',
					fillOpacity: 0.6
			});
	}

	/**
	  * Function to load geojson polygons google map
	**/
	if ($(".map_geojson").length > 0){
		 var mapgeojson = new GMaps({
			  div: '.map_geojson',
			  lat: 39.743296277167325,
			  lng: -105.00517845153809
		 });
	
		 var paths = [
					[
					  [
						 [-105.00432014465332, 39.74732195489861],
						 [-105.00715255737305, 39.74620006835170],
						 [-105.00921249389647, 39.74468219277038],
						 [-105.01067161560059, 39.74362625960105],
						 [-105.01195907592773, 39.74290029616054],
						 [-105.00989913940431, 39.74078835902781],
						 [-105.00758171081543, 39.74059036160317],
						 [-105.00346183776855, 39.74059036160317],
						 [-105.00097274780272, 39.74059036160317],
						 [-105.00062942504881, 39.74072235994946],
						 [-105.00020027160645, 39.74191033368865],
						 [-105.00071525573731, 39.74276830198601],
						 [-105.00097274780272, 39.74369225589818],
						 [-105.00097274780272, 39.74461619742136],
						 [-105.00123023986816, 39.74534214278395],
						 [-105.00183105468751, 39.74613407445653],
						 [-105.00432014465332, 39.74732195489861]
					  ],[
						 [-105.00361204147337, 39.74354376414072],
						 [-105.00301122665405, 39.74278480127163],
						 [-105.00221729278564, 39.74316428375108],
						 [-105.00283956527711, 39.74390674342741],
						 [-105.00361204147337, 39.74354376414072]
					  ]
					],[
					  [
						 [-105.00942707061768, 39.73989736613708],
						 [-105.00942707061768, 39.73910536278566],
						 [-105.00685214996338, 39.73923736397631],
						 [-105.00384807586671, 39.73910536278566],
						 [-105.00174522399902, 39.73903936209552],
						 [-105.00041484832764, 39.73910536278566],
						 [-105.00041484832764, 39.73979836621592],
						 [-105.00535011291504, 39.73986436617916],
						 [-105.00942707061768, 39.73989736613708]
					  ]
					]
				 ];
	
			var polygon = mapgeojson.drawPolygon({
				 paths: paths,
				 useGeoJSON: true,
				 strokeColor: '#BBD8E9',
				 strokeOpacity: 1,
				 strokeWeight: 3,
				 fillColor: '#BBD8E9',
				 fillOpacity: 0.6
			});
	}
	
	/**
	  * Function to load routes google map
	**/
	if ($(".map_routes").length > 0){
		 var mapRoutes = new GMaps({
			  div: '.map_routes',
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 mapRoutes.drawRoute({
			  origin: [-12.044012922866312, -77.02470665341184],
			  destination: [-12.090814532191756, -77.02271108990476],
			  travelMode: 'driving',
			  strokeColor: '#131540',
			  strokeOpacity: 0.6,
			  strokeWeight: 6
		 });
	}
	
	/**
	  * Function to load routes(advanced) google map
	**/
	if ($(".map_routesad").length > 0){
		 var mapRoutesAd = new GMaps({
			  div: '.map_routesad',
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 $('#start_travel').on('click',function(e){
			  e.preventDefault();
			  mapRoutesAd.travelRoute({
				 origin: [-12.044012922866312, -77.02470665341184],
				 destination: [-12.090814532191756, -77.02271108990476],
				 travelMode: 'driving',
				 step: function(e){
					$('#instructions').append('<li>'+e.instructions+'</li>');
					$('#instructions li:eq('+e.step_number+')').delay(450*e.step_number).fadeIn(200, function(){
					  mapRoutesAd.setCenter(e.end_location.lat(), e.end_location.lng());
					  mapRoutesAd.drawPolyline({
						 path: e.path,
						 strokeColor: '#131540',
						 strokeOpacity: 0.6,
						 strokeWeight: 6
					  });
					});
				 }
			  });
		 });
	}
	
	/**
	  * Function to load context menu google map
	**/
	if ($(".map_context").length > 0){
		 var mapContext = new GMaps({
			  div: '.map_context',
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 mapContext.setContextMenu({
			  control: 'map',
			  options: [{
				 title: 'Add marker',
				 name: 'add_marker',
				 action: function(e){
					this.addMarker({
					  lat: e.latLng.lat(),
					  lng: e.latLng.lng(),
					  title: 'New marker'
					});
					this.hideContextMenu();
				 }
			  }, {
				 title: 'Center here',
				 name: 'center_here',
				 action: function(e){
					this.setCenter(e.latLng.lat(), e.latLng.lng());
				 }
			  }]
		 });
	}
	
	/**
	  * Function to load geofences google map
	**/
	if ($(".map_geofences").length > 0){
		 var mapGeofences = new GMaps({
			  div: '.map_geofences',
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 var pathGeofences=[];
		 var p = [[-12.040397656836609,-77.03373871559225],[-12.040248585302038,-77.03993927003302],[-12.050047116528843,-77.02448169303511],[-12.044804866577001,-77.02154422636042]];
		 for(var i in p){
			  var latlng = new google.maps.LatLng(p[i][0], p[i][1]);
			  pathGeofences.push(latlng);
		 }
		 var polygon = mapGeofences.drawPolygon({
			  paths: pathGeofences,
			  strokeColor: '#BBD8E9',
			  strokeOpacity: 1,
			  strokeWeight: 3,
			  fillColor: '#BBD8E9',
			  fillOpacity: 0.6
			});
			mapGeofences.addMarker({
			  lat: -12.043333,
			  lng: -77.028333,
			  draggable: true,
			  fences: [polygon],
			  outside: function(m, f){
				 alert('This marker has been moved outside of its fence');
			  }
		 });
	}
	
	/**
	  * Function to load custom control google map
	**/
	if ($(".map_cctrl").length > 0){
		 var mapCustomctrl = new GMaps({
			  div: '.map_cctrl',
			  zoom: 16,
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 mapCustomctrl.addControl({
			  position: 'top_right',
			  content: 'Geolocate',
			  style: {
				 margin: '5px',
				 padding: '1px 6px',
				 border: 'solid 1px #717B87',
				 background: '#fff'
			  },
			  events: {
				 click: function(){
					GMaps.geolocate({
					  success: function(position){
						 mapCustomctrl.setCenter(position.coords.latitude, position.coords.longitude);
					  },
					  error: function(error){
						 alert('Geolocation failed: ' + error.message);
					  },
					  not_supported: function(){
						 alert("Your browser does not support geolocation");
					  }
					});
				 }
			  }
		 });
	}
	
	/**
	  * Function to load fusion table layers google map
	**/
	if ($(".map_ftable").length > 0){
		 var infoWindow = new google.maps.InfoWindow({});
		 var mapFtable = new GMaps({
			  div: '.map_ftable',
			  zoom: 11,
			  lat: 41.850033,
			  lng: -87.6500523
		 });
		 mapFtable.loadFromFusionTables({
			  query: {
				 select: '\'Geocodable address\'',
				 from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
			  },
			  suppressInfoWindows: true,
			  events: {
				 click: function(point){
					infoWindow.setContent('You clicked here!');
					infoWindow.setPosition(point.latLng);
					infoWindow.open(mapFtable.map);
				 }
			  }
		 });
	}
	
	/**
	  * Function to load kml layers google map
	**/
	if ($(".map_kml").length > 0){
		 var infoWindow2 = new google.maps.InfoWindow({});
		 var mapKlayers = new GMaps({
			  div: '.map_kml',
			  zoom: 12,
			  lat: 40.65,
			  lng: -73.95
		 });
		 mapKlayers.loadFromKML({
			  url: 'http://api.flickr.com/services/feeds/geo/?g=322338@N20&lang=en-us&format=feed-georss',
			  suppressInfoWindows: true,
			  events: {
				 click: function(point){
					infoWindow2.setContent(point.featureData.infoWindowHtml);
					infoWindow2.setPosition(point.latLng);
					infoWindow2.open(mapKlayers.map);
				 }
			  }
		 });
	}
	
	/**
	  * Function to load map types google map
	**/
	if ($(".map_mtypes").length > 0){
		var mapTypes = new GMaps({
			  div: '.map_mtypes',
			  lat: -12.043333,
			  lng: -77.028333,
			  mapTypeControlOptions: {
				 mapTypeIds : ["hybrid", "roadmap", "satellite", "terrain", "osm"]
			  }
		 });
		 mapTypes.addMapType("osm", {
			  getTileUrl: function(coord, zoom) {
				 return "https://a.tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
			  },
			  tileSize: new google.maps.Size(256, 256),
			  name: "OpenStreetMap",
			  maxZoom: 18
		 });
		 mapTypes.setMapTypeId("osm");
	}
	
	/**
	  * Function to load overlay map types google map
	**/
	if ($(".map_omtypes").length > 0){
		 var getTile = function(coord, zoom, ownerDocument) {
			 var div = ownerDocument.createElement('div');
			 div.innerHTML = coord;
			 div.style.width = this.tileSize.width + 'px';
			 div.style.height = this.tileSize.height + 'px';
			 div.style.background = 'rgba(250, 250, 250, 0.55)';
			  div.style.fontFamily = 'Monaco, Andale Mono, Courier New, monospace';
			  div.style.fontSize = '10';
			  div.style.fontWeight = 'bolder';
			  div.style.border = 'dotted 1px #aaa';
			  div.style.textAlign = 'center';
			  div.style.lineHeight = this.tileSize.height + 'px';
			  return div;
		 };
	
		 var mapOverlayTypes = new GMaps({
			  el: '.map_omtypes',
			  lat: -12.043333,
			  lng: -77.028333
		 });
		 mapOverlayTypes.addOverlayMapType({
			  index: 0,
			  tileSize: new google.maps.Size(256, 256),
			  getTile: getTile
		 });
	}
	
	/**
	  * Function to load street view google map
	**/
	if ($("#map_street").length > 0){
		 var panorama = GMaps.createPanorama({
			  el: '#map_street',
			  lat : 42.3455,
			  lng : -71.0983
		 });
	}
		 
	/**
	  * Function to load interacting with ui google map
	**/
	if ($(".map_ui").length > 0){
		 var mapUi = new GMaps({
			  div: '.map_ui',
			  lat: -12.043333,
			  lng: -77.028333
		 });
	
			GMaps.on('marker_added', mapUi, function(marker) {
			  $('#markers-with-index').append('<li><a href="#" class="pan-to-marker" data-marker-index="' + mapUi.markers.indexOf(marker) + '">' + marker.title + '</a></li>');
	
			  $('#markers-with-coordinates').append('<li><a href="#" class="pan-to-marker" data-marker-lat="' + marker.getPosition().lat() + '" data-marker-lng="' + marker.getPosition().lng() + '">' + marker.title + '</a></li>');
			});
	
			GMaps.on('click', mapUi.map, function(event) {
			  var index = mapUi.markers.length;
			  var lat = event.latLng.lat();
			  var lng = event.latLng.lng();
	
			  var template = $('#edit_marker_template').text();
	
			  var content = template.replace(/{{index}}/g, index).replace(/{{lat}}/g, lat).replace(/{{lng}}/g, lng);
	
			  mapUi.addMarker({
				 lat: lat,
				 lng: lng,
				 title: 'Marker #' + index,
				 infoWindow: {
					content : content
				 }
			  });
			});
	}
	
	$(document).on('submit', '.edit_marker', function(e) {
      e.preventDefault();
      var $index = $(this).data('marker-index');
      $lat = $('#marker_' + $index + '_lat').val();
      $lng = $('#marker_' + $index + '_lng').val();
      var template = $('#edit_marker_template').text();
      // Update form values
      var content = template.replace(/{{index}}/g, $index).replace(/{{lat}}/g, $lat).replace(/{{lng}}/g, $lng);
      mapUi.markers[$index].setPosition(new google.maps.LatLng($lat, $lng));
      mapUi.markers[$index].infoWindow.setContent(content);
      $marker = $('#markers-with-coordinates').find('li').eq(0).find('a');
      $marker.data('marker-lat', $lat);
      $marker.data('marker-lng', $lng);
	});
	
	// Update center
    $(document).on('click', '.pan-to-marker', function(e) {
      e.preventDefault();

      var lat, lng;

      var $index = $(this).data('marker-index');
      var $lat = $(this).data('marker-lat');
      var $lng = $(this).data('marker-lng');

      if ($index != undefined) {
        // using indices
        var position = mapUi.markers[$index].getPosition();
        lat = position.lat();
        lng = position.lng();
      }
      else {
        // using coordinates
        lat = $lat;
        lng = $lng;
      }

      mapUi.setCenter(lat, lng);
    });
})(jQuery); 
'use strict';
(function($){
	if($('#ukmap').length > 0){
		$('#ukmap').vectorMap({
			map: 'uk_regions_mill',
			backgroundColor: null,
			regionStyle:{
					initial: {
					  fill: '#5e6db3',
					  "fill-opacity": 1,
					  stroke: 'none',
					  "stroke-width": 0,
					  "stroke-opacity": 1
					},
					hover: {
					  "fill-opacity": 0.8,
					  cursor: 'pointer'
					},
					selected: {
					  fill: 'yellow'
					},
					selectedHover: {
					}
			},
		});
	}
  /**
    * Function to load GDP vector map 
  **/
  if ($(".world-map-gdp").length > 0){
      var gdpData = {
              "AF": 16.63,
            "AL": 11.58,
            "DZ": 158.97,
            "AO": 85.81,
            "AG": 1.1,
            "AR": 351.02,
            "AM": 8.83,
            "AU": 1219.72,
            "AT": 366.26,
            "AZ": 52.17,
            "BS": 7.54,
            "BH": 21.73,
            "BD": 105.4,
            "BB": 3.96,
            "BY": 52.89,
            "BE": 461.33,
            "BZ": 1.43,
            "BJ": 6.49,
            "BT": 1.4,
            "BO": 19.18,
            "BA": 16.2,
            "BW": 12.5,
            "BR": 2023.53,
            "BN": 11.96,
            "BG": 44.84,
            "BF": 8.67,
            "BI": 1.47,
            "KH": 11.36,
            "CM": 21.88,
            "CA": 1563.66,
            "CV": 1.57,
            "CF": 2.11,
            "TD": 7.59,
            "CL": 199.18,
            "CN": 5745.13,
            "CO": 283.11,
            "KM": 0.56,
            "CD": 12.6,
            "CG": 11.88,
            "CR": 35.02,
            "CI": 22.38,
            "HR": 59.92,
            "CY": 22.75,
            "CZ": 195.23,
            "DK": 304.56,
            "DJ": 1.14,
            "DM": 0.38,
            "DO": 50.87,
            "EC": 61.49,
            "EG": 216.83,
            "SV": 21.8,
            "GQ": 14.55,
            "ER": 2.25,
            "EE": 19.22,
            "ET": 30.94,
            "FJ": 3.15,
            "FI": 231.98,
            "FR": 2555.44,
            "GA": 12.56,
            "GM": 1.04,
            "GE": 11.23,
            "DE": 3305.9,
            "GH": 18.06,
            "GR": 305.01,
            "GD": 0.65,
            "GT": 40.77,
            "GN": 4.34,
            "GW": 0.83,
            "GY": 2.2,
            "HT": 6.5,
            "HN": 15.34,
            "HK": 226.49,
            "HU": 132.28,
            "IS": 12.77,
            "IN": 1430.02,
            "ID": 695.06,
            "IR": 337.9,
            "IQ": 84.14,
            "IE": 204.14,
            "IL": 201.25,
            "IT": 2036.69,
            "JM": 13.74,
            "JP": 5390.9,
            "JO": 27.13,
            "KZ": 129.76,
            "KE": 32.42,
            "KI": 0.15,
            "KR": 986.26,
            "KW": 117.32,
            "KG": 4.44,
            "LA": 6.34,
            "LV": 23.39,
            "LB": 39.15,
            "LS": 1.8,
            "LR": 0.98,
            "LY": 77.91,
            "LT": 35.73,
            "LU": 52.43,
            "MK": 9.58,
            "MG": 8.33,
            "MW": 5.04,
            "MY": 218.95,
            "MV": 1.43,
            "ML": 9.08,
            "MT": 7.8,
            "MR": 3.49,
            "MU": 9.43,
            "MX": 1004.04,
            "MD": 5.36,
            "MN": 5.81,
            "ME": 3.88,
            "MA": 91.7,
            "MZ": 10.21,
            "MM": 35.65,
            "NA": 11.45,
            "NP": 15.11,
            "NL": 770.31,
            "NZ": 138,
            "NI": 6.38,
            "NE": 5.6,
            "NG": 206.66,
            "NO": 413.51,
            "OM": 53.78,
            "PK": 174.79,
            "PA": 27.2,
            "PG": 8.81,
            "PY": 17.17,
            "PE": 153.55,
            "PH": 189.06,
            "PL": 438.88,
            "PT": 223.7,
            "QA": 126.52,
            "RO": 158.39,
            "RU": 1476.91,
            "RW": 5.69,
            "WS": 0.55,
            "ST": 0.19,
            "SA": 434.44,
            "SN": 12.66,
            "RS": 38.92,
            "SC": 0.92,
            "SL": 1.9,
            "SG": 217.38,
            "SK": 86.26,
            "SI": 46.44,
            "SB": 0.67,
            "ZA": 354.41,
            "ES": 1374.78,
            "LK": 48.24,
            "KN": 0.56,
            "LC": 1,
            "VC": 0.58,
            "SD": 65.93,
            "SR": 3.3,
            "SZ": 3.17,
            "SE": 444.59,
            "CH": 522.44,
            "SY": 59.63,
            "TW": 426.98,
            "TJ": 5.58,
            "TZ": 22.43,
            "TH": 312.61,
            "TL": 0.62,
            "TG": 3.07,
            "TO": 0.3,
            "TT": 21.2,
            "TN": 43.86,
            "TR": 729.05,
            "TM": 0,
            "UG": 17.12,
            "UA": 136.56,
            "AE": 239.65,
            "GB": 2258.57,
            "US": 14624.18,
            "UY": 40.71,
            "UZ": 37.72,
            "VU": 0.72,
            "VE": 285.21,
            "VN": 101.99,
            "YE": 30.02,
            "ZM": 15.69,
            "ZW": 5.57
    };
    $('.world-map-gdp').vectorMap({
      map: 'world_mill_en',
		backgroundColor: null,
      regionStyle:{
            initial: {
              fill: '#5e6db3',
              "fill-opacity": 1,
              stroke: 'none',
              "stroke-width": 0,
              "stroke-opacity": 1
            },
            hover: {
              "fill-opacity": 0.8,
              cursor: 'pointer'
            },
            selected: {
              fill: 'yellow'
            },
            selectedHover: {
            }
      },
      series: {
        regions: [{
          values: gdpData,
          scale: ['#5e6db3','#c6c6c6'],
          normalizeFunction: 'polynomial'
        }],

      },
      onRegionTipShow: function(e, el, code){
        el.html(el.html()+' (GDP - '+gdpData[code]+')');
      }
    });
  }
   
/**
  * Function to load markers on vector map 
**/
  if ($(".world-map-markers").length > 0){
     $('.world-map-markers').vectorMap({
      map: 'world_mill_en',
  	 backgroundColor: null,
      normalizeFunction: 'polynomial',
      hoverOpacity: 0.7,
      hoverColor: true,
      markerStyle: {
        initial: {
          fill: '#5e6db3',
          stroke: '#556198'
        },
        selected: {
          fill: '#556198'
        }
      },
      regionStyle: {
        initial: {
          fill: '#e6e9ef'
        },
        selected: {
          fill: '#F4A582'
        }
      },
      markers: [
        {latLng: [41.90, 12.45], name: 'Vatican City'},
        {latLng: [43.73, 7.41], name: 'Monaco'},
        {latLng: [-0.52, 166.93], name: 'Nauru'},
        {latLng: [-8.51, 179.21], name: 'Tuvalu'},
        {latLng: [43.93, 12.46], name: 'San Marino'},
        {latLng: [47.14, 9.52], name: 'Liechtenstein'},
        {latLng: [7.11, 171.06], name: 'Marshall Islands'},
        {latLng: [17.3, -62.73], name: 'Saint Kitts and Nevis'},
        {latLng: [3.2, 73.22], name: 'Maldives'},
        {latLng: [35.88, 14.5], name: 'Malta'},
        {latLng: [12.05, -61.75], name: 'Grenada'},
        {latLng: [13.16, -61.23], name: 'Saint Vincent and the Grenadines'},
        {latLng: [13.16, -59.55], name: 'Barbados'},
        {latLng: [17.11, -61.85], name: 'Antigua and Barbuda'},
        {latLng: [-4.61, 55.45], name: 'Seychelles'},
        {latLng: [7.35, 134.46], name: 'Palau'},
        {latLng: [42.5, 1.51], name: 'Andorra'},
        {latLng: [14.01, -60.98], name: 'Saint Lucia'},
        {latLng: [6.91, 158.18], name: 'Federated States of Micronesia'},
        {latLng: [1.3, 103.8], name: 'Singapore'},
        {latLng: [1.46, 173.03], name: 'Kiribati'},
        {latLng: [-21.13, -175.2], name: 'Tonga'},
        {latLng: [15.3, -61.38], name: 'Dominica'},
        {latLng: [-20.2, 57.5], name: 'Mauritius'},
        {latLng: [26.02, 50.55], name: 'Bahrain'},
        {latLng: [0.33, 6.73], name: 'São Tomé and Príncipe'}
      ]
    });
  }
})(jQuery);
'use strict';
(function($){
	var NoUiSliders = {
		noUiDemo1 : function(){
			if ($("#input-select"). length  > 0){
				var select = document.getElementById('input-select');
				// Append the option elements
				for ( var i = -20; i <= 40; i++ ){
					var option = document.createElement("option");
					option.text = i;
					option.value = i;
					select.appendChild(option);
				}
				var html5Slider = document.getElementById('nouislider');
				noUiSlider.create(html5Slider, {
				    start: [ 10, 30 ],
				    connect: true,
				    range: {
				        'min': -20,
				        'max': 40
				    }
				});

				var inputNumber = document.getElementById('input-number');
				html5Slider.noUiSlider.on('update', function( values, handle ) {
				    var value = values[handle];
				    if ( handle ) {
				        inputNumber.value = value;
				    } else {
				        select.value = Math.round(value);
				    }
				});
				select.addEventListener('change', function(){
				    html5Slider.noUiSlider.set([this.value, null]);
				});
				inputNumber.addEventListener('change', function(){
				    html5Slider.noUiSlider.set([null, this.value]);
				});
			}
		},
		noUiDemo2 : function(){
			if($('#nouislider1').length > 0){
				// Store the locked state and slider values.
				var lockedState = false,
				    lockedSlider = false,
				    lockedValues = [60, 80],
				    slider1 = document.getElementById('nouislider1'),
				    slider2 = document.getElementById('nouislider2'),
				    lockButton = document.getElementById('lockbutton'),
				    slider1Value = document.getElementById('nouislider1-span'),
				    slider2Value = document.getElementById('nouislider2-span');

				// When the button is clicked, the locked
				// state is inverted.
				lockButton.addEventListener('click', function(){
				    lockedState = !lockedState;
				    this.textContent = lockedState ? 'unlock' : 'lock';
				});
				noUiSlider.create(slider1, {
				    start: 60,
				    // Disable animation on value-setting,
				    // so the sliders respond immediately.
				    animate: false,
				    range: {
				        min: 50,
				        max: 100
				    }
				});

				noUiSlider.create(slider2, {
				    start: 80,
				    animate: false,
				    range: {
				        min: 50,
				        max: 100
				    }
				});

				slider1.noUiSlider.on('update', function( values, handle ){
				    slider1Value.innerHTML = values[handle];
				});

				slider2.noUiSlider.on('update', function( values, handle ){
				    slider2Value.innerHTML = values[handle];
				});

				var setLockedValues = function() {
				    lockedValues = [
				        Number(slider1.noUiSlider.get()),
				        Number(slider2.noUiSlider.get())
				    ];
				}

				slider1.noUiSlider.on('change', setLockedValues);
				slider2.noUiSlider.on('change', setLockedValues);

				// The value will be send to the other slider,
				// using a custom function as the serialization
				// method. The function uses the global 'lockedState'
				// variable to decide whether the other slider is updated.
				slider1.noUiSlider.on('slide', function( values, handle ){
				    crossUpdate(values[handle], slider2);
				});

				slider2.noUiSlider.on('slide', function( values, handle ){
				    crossUpdate(values[handle], slider1);
				});

				var crossUpdate = function( value, slider ) {

				    // If the sliders aren't interlocked, don't
				    // cross-update.
				    if ( !lockedState ) return;

				    // Select whether to increase or decrease
				    // the other slider value.
				    var a = slider1 === slider ? 0 : 1, b = a ? 0 : 1;

				    // Offset the slider value.
				    value -= lockedValues[b] - lockedValues[a];

				    // Set the value
				    slider.noUiSlider.set(value);
				}
			}
		},
		noUiDemo3: function(){
			if($('#nouislider3').length > 0){
				var nonLinearSlider = document.getElementById('nouislider3');

				noUiSlider.create(nonLinearSlider, {
				    connect: true,
				    behaviour: 'tap',
				    start: [ 500, 4000 ],
				    range: {
				        // Starting at 500, step the value by 500,
				        // until 4000 is reached. From there, step by 1000.
				        'min': [ 0 ],
				        '10%': [ 500, 500 ],
				        '50%': [ 4000, 1000 ],
				        'max': [ 10000 ]
				    }
				});

				var nodes = [
				    document.getElementById('lower-value'), // 0
				    document.getElementById('upper-value')  // 1
				];

				// Display the slider value and how far the handle moved
				// from the left edge of the slider.
				nonLinearSlider.noUiSlider.on('update', function ( values, handle, unencoded, isTap, positions ) {
				    nodes[handle].innerHTML = values[handle] + ', ' + positions[handle].toFixed(2) + '%';
				});
			}
		},
		noUiDemo4: function(){
			if($('#nouislider4').length > 0){
				var keypressSlider = document.getElementById('nouislider4');
				var input0 = document.getElementById('input-with-keypress-0');
				var input1 = document.getElementById('input-with-keypress-1');
				var inputs = [input0, input1];

				noUiSlider.create(keypressSlider, {
				    start: [20, 80],
				    connect: true,
				    direction: 'rtl',
				    range: {
				        'min': [0],
				        '10%': [10, 10],
				        '50%': [80, 50],
				        '80%': 150,
				        'max': 200
				    }
				});

				keypressSlider.noUiSlider.on('update', function( values, handle ) {
				    inputs[handle].value = values[handle];
				});

				var setSliderHandle = function(i, value) {
				    var r = [null,null];
				    r[i] = value;
				    keypressSlider.noUiSlider.set(r);
				}

				// Listen to keydown events on the input field.
				inputs.forEach(function(input, handle) {

				    input.addEventListener('change', function(){
				        setSliderHandle(handle, this.value);
				    });

				    input.addEventListener('keydown', function( e ) {

				        var values = keypressSlider.noUiSlider.get();
				        var value = Number(values[handle]);

				        // [[handle0_down, handle0_up], [handle1_down, handle1_up]]
				        var steps = keypressSlider.noUiSlider.steps();

				        // [down, up]
				        var step = steps[handle];

				        var position;

				        // 13 is enter,
				        // 38 is key up,
				        // 40 is key down.
				        switch ( e.which ) {

				            case 13:
				                setSliderHandle(handle, this.value);
				                break;

				            case 38:

				                // Get step to go increase slider value (up)
				                position = step[1];

				                // false = no step is set
				                if ( position === false ) {
				                    position = 1;
				                }

				                // null = edge of slider
				                if ( position !== null ) {
				                    setSliderHandle(handle, value + position);
				                }

				                break;

				            case 40:

				                position = step[0];

				                if ( position === false ) {
				                    position = 1;
				                }

				                if ( position !== null ) {
				                    setSliderHandle(handle, value - position);
				                }

				                break;
				        }
				    });
				});
			}
		},
		Init:function(){
			this.noUiDemo1();
			this.noUiDemo2();
			this.noUiDemo3();
			this.noUiDemo4();
		},
	};
	NoUiSliders.Init();
})(jQuery);
'use strict';
(function($) {
	/**
	  * Function written to load data table buttons based on data attributes.
	**/ 
	$('[data-table="table-button"]').each(function(){
		var buttons = $(this).data('buttons');
		$(this).DataTable( {  
			dom: 'Bfrtip',
	        "buttons": buttons,
	    });
	});

	/**
	  * Function written to load data table autofill based on data attributes.
	**/ 
	$('[data-table="table-autofill"]').each(function(){
		var lengthMenu = [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]] ;
		var autofill = ($(this).data('autofill'))?($(this).data('autofill')):'true';
		var ScrollX = $(this).data('scrollX');
		var ScrollY = $(this).data('scrollY');
		var ScrollCollapse = $(this).data('scrollCollapse');
		var paging = ($(this).data('paging'))? ($(this).data('paging')): 'true';
		$(this).DataTable( {
	        "autoFill": autofill,
	        "lengthMenu": lengthMenu,  
	        "scrollY": ScrollY,
	        "scrollX": ScrollX,
	        "scrollCollapse": ScrollCollapse,
	        "paging":paging,
			  responsive: true
	    });
	});

	/**
	  * Function written to load data table fixed column based on data attributes.
	**/ 
	$('[data-table="table-fixed-column"]').DataTable( { 
	        scrollY: 300,
	        scrollX: true,
	        scrollCollapse: true,
	        paging: false,
	        fixedColumns: true,
			  responsive: true
	    });


	/**
	  * Function written to load data table col reorder based on data attributes.
	**/ 
	$('[data-table="table-col-reorder"]').each(function(){
		var lengthMenu = [[5, 15, 20, -1],[5, 15, 20, "All"]] ;
		var colReorder = ($(this).data('colReorder'))?($(this).data('colReorder')):'true';
		var ScrollY = $(this).data('scrollY');
		var paging = ($(this).data('paging'))? ($(this).data('paging')): 'false';
		var temp = $(this);
		var t = $(this).DataTable( {
	        "colReorder": colReorder,
	        "lengthMenu": lengthMenu,  
	        "scrollY": ScrollY,
	        "paging":paging,
			  responsive: true
	    });
	    $('.reset-colreorder').on('click',function (e) {
	        e.preventDefault();    
	        t.colReorder.reset();
	    });
	});

	/**
	  * Function written to load data table row reorder based on data attributes.
	**/
	$('[data-table="table-row-reorder"]').each(function(){
		var lengthMenu = [[5, 15, 20, -1],[5, 15, 20, "All"]] ;
		var rowReorder = ($(this).data('rowReorder'))?($(this).data('rowReorder')):'true';
		var ScrollY = $(this).data('scrollY');
		var paging = ($(this).data('paging'))? ($(this).data('paging')): 'false';
		var temp = $(this);
		var t = $(this).DataTable( {
					  "rowReorder": rowReorder,
					  "lengthMenu": lengthMenu,  
					  "scrollY": ScrollY,
					  "paging":paging,
					  responsive: true
				 });
		$('.reset-rowreorder').on('click',function (e) {
		  e.preventDefault();    
		  t.rowReorder.reset();
		});
	});

	$('[data-filter="true"] tfoot th').each( function () {
		var title = $('[data-filter="true"] thead th').eq( $(this).index() ).text();
		$(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	});

    // Apply the filter
    $("[data-filter='true'] tfoot input").on( 'keyup change', function () {
        $("[data-filter='true']").dataTable().api().column( $(this).parent().index()+':visible' ).search( this.value ).draw();
    });
	$('.dataTables_length select').addClass('selectbox');
	$('.dataTables_filter input').addClass('form-control data-search');
	$('.dataTables_paginate').addClass('paginate-data');
	$('.dataTables_scroll').addClass('mrgn-b-lg');
	$('.dataTables_scrollFootInner input').addClass('form-control');
	 
})(jQuery);
'use strict';
(function($){
	/**
	  * Function written to load slick slider based on data attributes.
	**/
	if($('[data-slider="slick"]').length > 0 ){
		$('[data-slider="slick"]').each(function(){
			var slidestoshow = $(this).data('slidestoshow');
			var slidestoscroll = $(this).data('slidestoscroll');
			var arrows = $(this).data('arrows');
			var autoplay = $(this).data('autoplay');
			var speed = $(this).data('speed');
			$(this).slick({
			  "slidesToShow": slidestoshow,
			  "slidesToScroll": slidestoscroll,
			  "arrows": arrows,
			  "autoplay": autoplay,
			  "autoplaySpeed": speed,
			  prevArrow: '<a class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
			  nextArrow: '<a class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
			  responsive: [
							 {
								breakpoint: 1681,
								settings: {
								  slidesToShow: 1,
								  slidesToScroll: 1,
								}
							 },
									{
								breakpoint: 1367,
								settings: {
								  slidesToShow: 3,
								  slidesToScroll: 1,
								}
							 },
								{
								breakpoint: 1250,
								settings: {
								  slidesToShow: 2,
								  slidesToScroll: 1,
								}
							 },
							{
								breakpoint: 992,
								settings: {
								  slidesToShow: 2,
								  slidesToScroll: 1,
								}
							 },
							 {
								breakpoint: 580,
								settings: {
								  slidesToShow: 1,
								  slidesToScroll: 1,
								}
							 },	            
						  ]
			});
		});
	}
})(jQuery);
'use strict';
(function($) {
      /**
        * Function to load area morris chart
      **/
      if ($(".ecomm-product-detail-morris")[0]){
        Morris.Area({
              element: $('.ecomm-product-detail-morris'),
              behaveLikeLine: true,
              lineColors: ["#5e6db3"],
              data: [
                { y: '2009', a: 0,},
                { y: '2010', a: 50,},
                { y: '2011', a: 100,},
                { y: '2012', a: 80,},
                { y: '2013', a: 170,},
                { y: '2014', a: 190,},
                { y: '2015', a: 160,}
              ],
              xkey: 'y',
              ykeys: ['a'],
              labels: ['Product A'],
              resize: true,
            }).on('click', function(i, row){
              console.log(i, row);
            });
      }

      /**
        * Function to load pie highchart
      **/
      if($(".ecomm-order-pie")[0]){
        $('.ecomm-order-pie').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },

            tooltip: {
                pointFormat: '{point.percentage:.1f}%'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [{
                    name: 'Closed',
                    y: 56.33,
                    color: "#5e6db3"
                }, {
                    name: 'On Hold',
                    y: 24.03,
                    color: "#fd7b6c"
                }, {
                    name: 'Cancelled',
                    y: 10.38,
                    color: "#d24636"
                }]
            }]
        });
    }

    /**
      * Function to load  bar morris chart
    **/
    if($(".ecomm-order-bar")[0]){
      Morris.Bar({
        element: $('.ecomm-order-bar'),
        data: [
          {x: '2011 Q1', y: 3, z: 2, a: 3},
          {x: '2011 Q2', y: 2, z: null, a: 1},
          {x: '2011 Q3', y: 0, z: 2, a: 4},
          {x: '2011 Q4', y: 2, z: 4, a: 3}
        ],
        xkey: 'x',
        ykeys: ['y', 'z', 'a'],
        barColors: ['#5e6db3','#fd7b6c','#00ca95'],
        labels: ['Y', 'Z', 'A']
      }).on('click', function(i, row){
        console.log(i, row);
      });
  }

})(jQuery);
'use strict';
(function($) {
	Highcharts.setOptions({
		tooltip: {useHTML: true,},
		legend: {useHTML: true,},
		chart:{
			backgroundColor: null,
		},
		xAxis:{
			labels: {useHTML: true,},
			tickInterval: 1,
			minPadding: 0,
			maxPadding: 0,
			startOnTick: true,
			endOnTick: true
		},
		yAxis:{
			labels: {useHTML: true,}
		},
		plotOptions: {
			area: {
				dataLabels: { useHTML: true,}
			},
			bar: {
				dataLabels: { useHTML: true,}
			},
			pie: {
				dataLabels: { useHTML: true,}
			},
			line: {
				dataLabels: { useHTML: true,}
			},
			series: {
				dataLabels: { useHTML: true,}
			},
			scatter: {
				dataLabels: { useHTML: true,}
			},
			column: {
				dataLabels: { useHTML: true,}
			},
			columnrange: {
				dataLabels: { useHTML: true,}
			},
			spline: {
				dataLabels: { useHTML: true,}
			},
		},
		credits: {
			enabled: false
		},
    });
	 
	 var categories = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ];
    /**
      * Function to load basic area highchart 
    **/
    if ($(".d-area-chart").length > 0){
        $('.d-area-chart').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 450,
            y: 0,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            labels: {
                enabled: true,
                formatter: function () {
                    return categories[this.value];
                }
            },
            tickInterval: 1,
            minPadding: 0,
            maxPadding: 0,
            startOnTick: true,
            endOnTick: true
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ''
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.8,
                    marker:{
                      enabled: false,
                    },
            }
        },
        series: [{
            name: 'Old users',
            color: '#5e6db3',
            data: [0, 450, 380, 200, 550, 220, 200,200,110,140,180,200]
        },{
            name: 'Returning',
            color: '#31cff9',
            data: [0, 550, 400, 150, 80, 270, 160, 100,200,250,150,190]
        },{
            name: 'New users',
            color: '#00ca85',
            data: [0, 450, 380, 150, 90, 290, 180,110,110,140,160,200]
        }]
    });
    }

    /**
      * Function to load area point highchart 
    **/
    if ($(".d-area-points-chart").length > 0){
        $('.d-area-points-chart').highcharts({
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: ''
            },
            subtitle: {
                text: '',
                floating: true,
                align: 'right',
                verticalAlign: 'bottom',
                y: 15
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
           xAxis: {
               labels: {
						 enabled: true,
						 formatter: function () {
							  return categories[this.value];
						 }
					},
					tickInterval: 1,
					minPadding: 0,
					maxPadding: 0,
					startOnTick: true,
					endOnTick: true
            },
            yAxis: {
					title: {
						 text: ''
					},
					labels: {
					  formatter: function () {
							return this.value;
					  }
					}
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.8,
                    marker:{
                      enabled: true,
                      fillColor: '#5e6db3',
                      radius: 5,
                    },
                },
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Revenue',
                color: '#31cff9',
                data: [1500,1200,2000,1200,1800,1000,2500]
            }]
        });
    }

    /**
      * Function to area point highchart 
    **/
    if ($(".area-point-dashboard").length > 0){
         $('.area-point-dashboard').highcharts({
            chart: {
                type: 'area',
                spacingBottom: 0,
                spacingLeft: -10,
                spacingRight: -10,
                height: 336,
            },
            title: {
                text: ''
            },
            subtitle: {
                text: '',
                floating: true,
                align: 'right',
                verticalAlign: 'bottom',
                y: 15
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                visible: false,
            },
            yAxis: {
                visible: false,
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5,
                    marker:{
                      enabled: true,
                      lineColor: '#31cff9',
                      fillColor: '#31cff9',
                      radius: 8,
                    },
                },
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'New Visitors',
                color: '#31cff9',
                data: [1500,1200,2000,1200,1800,1000,2500]
            }]
        });
    }

    /**
      * Function to load area highchart 
    **/
    if ($(".dasboard2-area-chart").length > 0){
        Morris.Area({
              element: $('.dasboard2-area-chart'),
              behaveLikeLine: true,
              lineColors: ["#5e6db3","#fd7b6c","#00ca95"],
              data: [
                { y: '2010', a: 0, b: 0, c: 0 },
                { y: '2011', a: 50,  b: 5, c: 15 },
                { y: '2012', a: 35,  b: 60, c: 50 },
                { y: '2013', a: 55,  b: 10, c: 20 },
                { y: '2014', a: 30,  b: 110, c: 20 },
                { y: '2015', a: 25,  b: 35, c: 80 },
                { y: '2016', a: 25, b: 27, c: 30 }
              ],
              xkey: 'y',
              ykeys: ['a', 'b', 'c'],
              labels: ['Product A', 'Product B', 'Product C'],
              resize: true,
              pointSize: 0,
            }).on('click', function(i, row){
              console.log(i, row);
            });
    }

    /**
      * Function to load area morris chart 
    **/
    if ($(".d-morris-chart-network").length > 0){

        var day_data = [
            {y:"", c: 20, b:40, a:60},
            {y:"", c: 25, b:45, a:65},
            {y:"", c: 21, b:41, a:61},
            {y:"", c: 24, b:44, a:64},
            {y:"", c: 28, b:48, a:68},
            {y:"", c: 24, b:44, a:64},
            {y:"", c: 21, b:41, a:61},
            {y:"", c: 27, b:47, a:67},
            {y:"", c: 29, b:49, a:69},
            {y:"", c: 25, b: 45, a:65},
            {y:"", c: 30, b: 50, a:70},
            {y:"", c: 28, b: 48, a:68},
            {y:"", c: 35, b: 55, a:75},
            {y:"", c: 31, b:51, a:71},
            {y:"", c: 34, b:54, a:74},
            {y:"", c: 27, b:47, a:67},
            {y:"", c: 25, b:45, a:65},
            {y:"", c: 30, b:50, a:70},
            {y:"", c: 28, b:48, a:68},
            {y:"", c: 35, b:55, a:75},
            {y:"", c: 38, b:58, a:78},
            {y:"", c: 32, b:52, a:72},
            {y:"", c: 24, b: 44, a:64},
            {y:"", c: 29, b: 49, a:69},
            {y:"", c: 25, b: 45, a:65},
            {y:"", c: 30, b: 50, a:70},
            {y:"", c: 33, b:53, a:73},
            {y:"", c: 28, b:48, a:68},
            {y:"", c: 21, b:41, a:61},
            {y:"", c: 29, b:49, a:69},
            {y:"", c: 27, b:47, a:67},
            {y:"", c: 32, b:52, a:72},
            {y:"", c: 38, b:58, a:78},
            {y:"", c: 33, b:53, a:78},
            {y:"", c: 35, b:55, a:75},
            {y:"", c: 28, b: 58, a:74},
            {y:"", c: 24, b: 44, a:64},
            {y:"", c: 29, b: 49, a:69},
            {y:"", c: 35, b: 55, a:75},
            {y:"", c: 40, b: 60, a:80},
            {y:"", c: 34, b:54, a:74},
            {y:"", c: 37, b:57, a:77},
            {y:"", c: 28, b:48, a:68},
            {y:"", c: 24, b:44, a:64},
            {y:"", c: 27, b:47, a:67},
            {y:"", c: 32, b:52, a:72},
            {y:"", c: 25, b:45, a:65},
            {y:"", c: 29, b:49, a:69},
            {y:"", c: 33, b: 53, a:73},
            {y:"", c: 28, b: 48, a:68},
            {y:"", c: 35, b: 55, a:75},
            {y:"", c: 38, b: 58, a:78},
            {y:"", c: 33, b: 53, a:73}
        ];

        var chart = Morris.Area({
            element : $('.d-morris-chart-network'),
            data: day_data,
            xkey: 'y',
            ykeys: ['a', 'b','c'],
            labels: ['CPU', 'RAM', 'Visitors'],
            lineColors: ['#5e6db3','#00ca95','#414658'],
            lineWidth:[0,0,0],
            pointSize:[0,0,0],
            fillOpacity: 1,
            gridTextColor:'#999',
            parseTime: false,
            resize:true,
            behaveLikeLine : true,
            hideHover: 'auto'
        });
    }

    /**
      * Function to load line chartist chart 
    **/
    if ($(".dashboard2-line").length > 0){

        new Chartist.Line('.dashboard2-line', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, 3, 1, 2, 0, 1, 0]
            ]
        }, {
            low: 0,
            showArea: true,
            showPoint: false,
            axisX: {
                showLabel: false,
                showGrid: false
            },
            axisY: {
                showLabel: false,
                showGrid: false
            },
            fullWidth: true,
            chartPadding: {
                right: 0,
                left: -50,
            },
            lineSmooth: Chartist.Interpolation.cardinal({
                fillHoles: true,
            }),
        });
    }

    /**
      * Function to load basic amchart 
    **/
    if ($("#dashboard3-amchart")[0]){
        var chart = AmCharts.makeChart( "dashboard3-amchart", {
          "type": "serial",
          "addClassNames": true,
          "theme": "light",
          "autoMargins": false,
          "marginLeft": 30,
          "marginRight": 8,
          "marginTop": 10,
          "marginBottom": 26,
          "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
          },
          "dataProvider": [ {
            "year": 'Monday',
            "income": 23.5,
            "expenses": 21.1,
            "dashLengthLine": 5
          }, {
            "year": 'Tuesday',
            "income": 26.2,
            "expenses": 30.5,
            "dashLengthLine": 5
          }, {
            "year": 'Wednesday',
            "income": 30.1,
            "expenses": 34.9,
            "dashLengthLine": 5
          }, {
            "year": 'Thursday',
            "income": 29.5,
            "expenses": 31.1,
            "dashLengthLine": 5
          }, {
            "year": 'Friday',
            "income": 30.6,
            "expenses": 26.2,
            "dashLengthLine": 5
          },{
            "year": 'Saturday',
            "income": 32.6,
            "expenses": 28.2,
            "dashLengthLine": 5
          }, {
            "year": 'Sunday',
            "income": 34.1,
            "expenses": 32.9,
            "dashLengthColumn": 5,
            "alpha": 0.2,
            "additional": "(projection)"
          } ],
          "valueAxes": [ {
            "axisAlpha": 0,
            "position": "left"
          } ],
          "startDuration": 1,
          "graphs": [ {
            "alphaField": "alpha",
            "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "fillAlphas": 1,
            "title": "Income",
            "type": "column",
            "fillColors": "#00ca85",
            "valueField": "income",
            "dashLengthField": "dashLengthColumn"
          }, {
            "id": "graph2",
            "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "bullet": "round",
            "lineThickness": 3,
            "bulletSize": 7,
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "useLineColorForBulletBorder": true,
            "bulletBorderThickness": 3,
            "fillAlphas": 0,
            "lineAlpha": 1,
            "title": "Expenses",
            "valueField": "expenses",
            "dashLengthField": "dashLengthLine"
          } ],
          "categoryField": "year",
          "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "tickLength": 0
          },
          "export": {
            "enabled": true
          }
        } );
    }
    
    /**
      * Function to load area morris chart 
    **/
    if ($(".dasboard3-area-chart")[0]){
        Morris.Area({
          element: $('.dasboard3-area-chart'),
          behaveLikeLine: true,
          axes:false,
          lineColors: ["#0c9dc3"],
          fillOpacity: '0.5',
          data: [
            { y: '2010', a: 10,},
            { y: '2011', a: 30,},
            { y: '2012', a: 15,},
            { y: '2013', a: 35,},
            { y: '2014', a: 15,},
            { y: '2015', a: 30,},
            { y: '2016', a: 10,}
          ],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Product A'],
          resize: true,
        }).on('click', function(i, row){
          console.log(i, row);
        });
    }

    /**
      * Function to load Topbar area morris chart 
    **/
    if ($(".dasboard3-top1")[0]){
        Morris.Area({
          element: $('.dasboard3-top1'),
          behaveLikeLine: true,
          axes:false,
          lineColors: ["#0c9dc3"],
          fillOpacity: '0.5',
          data: [
            { y: '2010', a: 30,},
            { y: '2011', a: 50,},
            { y: '2012', a: 35,},
            { y: '2013', a: 55,},
            { y: '2014', a: 30,},
            { y: '2015', a: 25,},
            { y: '2016', a: 25,}
          ],
          xkey: 'y',
          ykeys: ['a'],
          labels: ['Product A'],
          resize: true,
        }).on('click', function(i, row){
          console.log(i, row);
        });
    }

    /**
      * Function to load dont morris chart 
    **/
    if ($(".dashboard3-browser")[0]){
        Morris.Donut({
          defaultLabelColor: '#00ca95',
          element: $('.dashboard3-browser'),
          data: [
            {label: "Firefox", value: 50, labelColor: '#00ca95'},
            {label: "Chrome", value: 25, labelColor: '#5e6db3'},
            {label: "Opera", value: 25, labelColor: '#fd7b6c'}
          ],
        colors: [
            '#00ca95',
            '#5e6db3',
            '#fd7b6c',
          ],
        resize: true,
        });  
    }  

/**
  * Function to load gauge amchart 
 **/
if ($("#dashboard3-email")){
    var gaugeChart = AmCharts.makeChart("dashboard3-email", {
      "type": "gauge",
      "theme": "dark",
      "axes": [{
        "axisAlpha": 0,
        "tickAlpha": 0,
        "labelsEnabled": false,
        "startValue": 0,
        "endValue": 100,
        "startAngle": 0,
        "endAngle": 270,
        "bands": [{
          "color": "#343848",
          "startValue": 0,
          "endValue": 100,
          "radius": "100%",
          "innerRadius": "85%"
        }, {
          "color": "#5e6db3",
          "startValue": 0,
          "endValue": 75,
          "radius": "100%",
          "innerRadius": "85%",
          "balloonText": "75%"
        }, {
          "color": "#343848",
          "startValue": 0,
          "endValue": 100,
          "radius": "80%",
          "innerRadius": "65%"
        }, {
          "color": "#00ca95",
          "startValue": 0,
          "endValue": 85,
          "radius": "80%",
          "innerRadius": "65%",
          "balloonText": "85%"
        }, {
          "color": "#343848",
          "startValue": 0,
          "endValue": 100,
          "radius": "60%",
          "innerRadius": "45%"
        }, {
          "color": "#fd7b6c",
          "startValue": 0,
          "endValue": 30,
          "radius": "60%",
          "innerRadius": "45%",
          "balloonText": "30%"
        }]
      }],
      "allLabels": [{
        "text": "Sent",
        "x": "45%",
        "y": "9%",
        "size": 12,
        "bold": false,
        "color": "#ffffff",
        "align": "right"
      }, {
        "text": "Opened",
        "x": "45%",
        "y": "18%",
        "size": 12,
        "bold": false,
        "color": "#ffffff",
        "align": "right"
      }, {
        "text": "Spam",
        "x": "45%",
        "y": "26%",
        "size": 12,
        "bold": false,
        "color": "#ffffff",
        "align": "right"
      }, ],
      "export": {
        "enabled": true
      }
    });
}

	/**
	  * Function to load full-calendar 
	 **/
	if ($("#full-clndr").length > 0){
	  var currentMonth = moment().format('YYYY-MM');
	  var nextMonth    = moment().add(1,'month').format('YYYY-MM');
	  var thirdMonth    = moment().add(2,'month').format('YYYY-MM');
	  var fourthMonth    = moment().add(3,'month').format('YYYY-MM');
	
	  var events = [
		 { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
		 { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
		 { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
		 { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' },
		 { date: nextMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
		 { date: nextMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
		 { date: thirdMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
		 { date: thirdMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
		 { date: thirdMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
		 { date: fourthMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
		 { date: fourthMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
		 { date: fourthMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
	  ];
	
	  var clndr = $('#full-clndr').clndr({
		 template: $('#full-clndr-template').html(),
		 events: events,
		 forceSixRows: true
	  });
	}
    /*-------- SlimScroll bar -------------*/
    if ($(".slimscrollbar").length > 0){
        $('.slimscrollbar').slimscroll({
          color: '#bbbbbb',
          size: '5px',
          alwaysVisible: true,
          railOpacity: 0.2,
        });
    }
})(jQuery);
'use strict';
(function($) {
  var appid="b1b15e88fa797225412429c1c50c122a1";
  var apikey="69b72ed255ce5efad910bd946685883a";
  var city="Mohali";
  $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="+city+"&cnt=6&units=metric&mode=json&appid="+appid+"&apikey="+apikey,function(result){
       $("#city").append(result.city.name);
       var today = getDateFormat(result.list[0].dt)
       $("#date").append(today);
       $("#current_temp").append(result.list[0].temp.day +' '+result.list[0].weather[0].description );
       $("#curr-temp-only").append(result.list[0].temp.day);
       $('#min-temp').append(result.list[0].temp.min );
       $('#max-temp').append(result.list[0].temp.max);
       $('#morn-temp').append(result.list[0].temp.morn +' '+result.list[0].weather[0].description);
       $('#eve-temp').append(result.list[0].temp.eve +' '+result.list[0].weather[0].description);
       $('#night-temp').append(result.list[0].temp.night +' '+result.list[0].weather[0].description);
       $('#today-temp').append(result.list[0].weather[0].description);
       $('#today-temp-main').append(result.list[0].weather[0].main);

       //week days weather
       $("#second-day-temp").append(result.list[1].temp.day);
       $('#second-day-main').append(result.list[1].weather[0].main);
       var second_day= getDayName(result.list[1].dt);
       $('#second-day-name').append(second_day);

       $("#third-day-temp").append(result.list[2].temp.day);
       $('#third-day-main').append(result.list[2].weather[0].main);
       var third_day= getDayName(result.list[2].dt);
       $('#third-day-name').append(third_day);

       $("#fourth-day-temp").append(result.list[3].temp.day);
       $('#fourth-day-main').append(result.list[3].weather[0].main);
       var fourth_day= getDayName(result.list[3].dt);
       $('#fourth-day-name').append(fourth_day);

       $("#fifth-day-temp").append(result.list[4].temp.day);
       $('#fifth-day-main').append(result.list[4].weather[0].main);
       var fifth_day= getDayName(result.list[4].dt);
       $('#fifth-day-name').append(fifth_day);


       var weather_icon=result.list[0].weather[0].id;
      if((weather_icon >= 200) && (weather_icon <= 232))
       {
          var icon_name='sleet';
       }else if((weather_icon >= 300) && (weather_icon <= 321))
       {
         var icon_name='rain';
       }else if((weather_icon >= 500) && (weather_icon <= 531))
       {
         var icon_name='rain';
       }else if((weather_icon >= 600) && (weather_icon <= 622))
       {
         var icon_name='snow';
       }else if((weather_icon >= 701) && (weather_icon <= 781))
       {
         var icon_name='fog';
       }else if(weather_icon === 800)
       {
         var icon_name='clear-day';
       }else if((weather_icon >= 801) && (weather_icon <= 804))
       {
         var icon_name='cloudy';
       }else if((weather_icon >= 900) && (weather_icon <= 906))
       {
         var icon_name='wind';
       }

       $(".weather-icon").addClass(icon_name);
       var icon_color=$(".weather-icon").data('color');
       if(icon_color){
          icon_color=icon_color;
       }else{
          icon_color='#ffffff';
       }
       prtm_icons.SkyCons(icon_color);
    });
})(jQuery);
function getDateFormat(date) {
  var d = new Date(1000*date.toString()),
      month = '' + (d.getMonth()+1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      switch(month){
        case ('1'):
          month = 'Jan'; break;
        case ('2'):
          month = 'Feb'; break;
        case ('3'):
          month = 'March'; break;
        case ('4'):
          month = 'April'; break;
        case ('5'):
          month = 'May'; break;
        case ('6'):
          month = 'June'; break;
        case ('7'):
          month = 'July'; break;
        case ('8'):
          month = 'Aug'; break;
        case ('9'):
          month = 'Sep'; break;
        case ('10'):
          month = 'Oct'; break;
        case ('11'):
          month = 'Nov'; break;
        default:
          month = 'Dec';
      }
  return [day, month, year].join('-');
}

function getDayName(date) {
  var d = new Date(1000*date.toString()),
  n = d.getDay();
  switch(n){
    case (0):
      var day_name = 'Sun'; break;
    case (1):
      var day_name = 'Mon'; break;
    case (2):
      var day_name = 'Tue'; break;
    case (3):
      var day_name = 'Wed'; break;
    case (4):
      var day_name = 'Thurs'; break;
    case (5):
      var day_name = 'Fri'; break;
    case (6):
      var day_name = 'Sat'; break;
    default:
      var day_name = 'Mon';
  }
  //alert(n);
return (day_name);
}
'use strict';
/* function for typehead */
(function($) {	
   var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        // an array that will be populated with substring matches
        matches = [];
        // regex used to determine if a string contains the substring `q`
        var substrRegex = new RegExp(q, 'i');
        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
        cb(matches);
      };
    };

    var content = ['Aadi theme', 'Photography theme', 'Pratham theme', 'News theme', 'Aadi'];

    if($('.basic-typeahead .typeahead').length > 0){
		 $('.basic-typeahead .typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		 },
		 {
			name: 'basic',
			source: substringMatcher(content)
		 });
	 }

	//Prefetch Auto Complete
	if($('.prefetch-typeahead .typeahead').length > 0){
		var countries = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			// url points to a json file that contains an array of country names, see
			// https://github.com/twitter/typeahead.js/blob/gh-pages/data/countries.json
			prefetch: 'assets/plugins/typeahead/typeahead_countries.json'
		});

		 // passing in `null` for the `options` arguments will result in the default
		 // options being used
	 
		 $('.prefetch-typeahead .typeahead').typeahead(null, {
			name: 'countries',
			source: countries
		 });
	 }
	if($('.typeahead-custom-template .typeahead').lenght > 0){
		 //Custom template view
		 var custom = new Bloodhound({
			datumTokenizer: function(d) { return d.tokens; },
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
			  url: 'assets/plugins/typeahead/typeahead_custom.php?query=%QUERY',
			  wildcard: '%QUERY'
			}
		 });
		  
		$('.typeahead-custom-template .typeahead').typeahead(null, {
			name: 'datypeahead_example_modal_3',
			displayKey: 'value',
			hint: true,
			source: custom,
			templates: {
			  suggestion: Handlebars.compile([
				 '<div class="media">',
						 '<div class="pull-left">',
							  '<div class="media-object">',
									'<img src="{{img}}" width="50" height="50"/>',
							  '</div>',
						 '</div>',
						 '<div class="media-body">',
							  '<h4 class="media-heading">{{value}}</h4>',
							  '<p>{{desc}}</p>',
						 '</div>',
				 '</div>',
			  ].join(''))
			}
		});
	}

	if($('.multiple-typeahead .typeahead').length > 0){
		 //Multiple Datasets
		 var nba = new Bloodhound({
			datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: 'assets/plugins/typeahead/typeahead_nba.json'
		 });
					 
		 var nhl = new Bloodhound({
			datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.team); },
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			prefetch: 'assets/plugins/typeahead/typeahead_nhl.json'
		 });
             
	
		$('.multiple-typeahead .typeahead').typeahead({
			hint: true,
			highlight: true
		},
		{
			name: 'nba',
			displayKey: 'team',
			source: nba,
			templates: {header: '<h3>NBA Teams</h3>'}
		},
		{
			name: 'nhl',
			displayKey: 'team',
			source: nhl,
			templates: {
					header: '<h3>NHL Teams</h3>'
			}
		});
	}
})(jQuery);

/*----- code for summer note -------*/
(function($){
	if($('.summernote').length > 0){
		$('.summernote').summernote({height:300});
	}
	
})(jQuery);
var edit = function() {
  $('.click2edit').summernote({focus: true});
};

var save = function() {
  var makrup = $('.click2edit').summernote('code');
  $('.click2edit').summernote('destroy');
};


/*----- tags input function -------*/
(function($) {
    if($('.demo-tagsinput').length > 0){
		var eltdemo = $('.demo-tagsinput');
			eltdemo.tagsinput({
			itemValue: 'value',
			itemText: 'text',
		});
	}
	if($('.demo-tagsinput-add').length > 0){
		$('.demo-tagsinput-add').on('click', function(){
			eltdemo.tagsinput('add', { 
				"value": $('.demo-tagsinput-value').val(), 
				"text": $('.demo-tagsinput-city').val(), 
				"continent": $('.demo-tagsinput-continent').val()    
			});
		});
	}

	if($('.state-demo-tagsinput').length){
		eltdemo.tagsinput('add', { "value": 1 , "text": "Amsterdam"   , "continent": "Europe"    });
		eltdemo.tagsinput('add', { "value": 4 , "text": "Washington"  , "continent": "America"   });
		eltdemo.tagsinput('add', { "value": 7 , "text": "Sydney"      , "continent": "Australia" });
		eltdemo.tagsinput('add', { "value": 10, "text": "Beijing"     , "continent": "Asia"      });
		eltdemo.tagsinput('add', { "value": 13, "text": "Cairo"       , "continent": "Africa"    });
		var elt = $('.state-demo-tagsinput');
		elt.tagsinput({
		  tagClass: function(item) {
				switch (item.continent) {
					 case 'Europe':
						  return 'label label-primary';
					 case 'America':
						  return 'label label-danger label-important';
					 case 'Australia':
						  return 'label label-success';
					 case 'Africa':
						  return 'label label-default';
					 case 'Asia':
						  return 'label label-warning';
				}
		  },
		  itemValue: 'value',
		  itemText: 'text'
		});
	}

	if($('.state-tagsinput-add').length > 0){
		$('.state-tagsinput-add').on('click', function(){
			elt.tagsinput('add', { 
				"value": $('.state-tagsinput-value').val(), 
				"text": $('.state-tagsinput-city').val(), 
				"continent": $('.state-tagsinput-continent').val()    
			});
		});
    
		elt.tagsinput('add', {
		  "value": 1,
		  "text": "Amsterdam",
		  "continent": "Europe"
		});
		elt.tagsinput('add', {
		  "value": 4,
		  "text": "Washington",
		  "continent": "America"
		});
		elt.tagsinput('add', {
		  "value": 7,
		  "text": "Sydney",
		  "continent": "Australia"
		});
		elt.tagsinput('add', {
		  "value": 10,
		  "text": "Beijing",
		  "continent": "Asia"
		});
		elt.tagsinput('add', {
		  "value": 13,
		  "text": "Cairo",
		  "continent": "Africa"
		});
	}
	
	/*------ code to apply bootstrap switches -----*/
	if($('.pratham-switch').length > 0){
		$('.pratham-switch').bootstrapSwitch();
	}
})(jQuery);

(function($) {
	if($('.selectize-tagging').length > 0){
		$('.selectize-tagging').selectize({
			 delimiter: ',',
			 persist: false,
			 create: function(input) {
				  return {
						value: input,
						text: input
				  }
			 }
		});
	}

	if($('.selectize-select').length > 0){
		//Email Demo
		var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' + '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';
		$('.selectize-select').selectize({
			 persist: false,
			 maxItems: null,
			 valueField: 'email',
			 labelField: 'name',
			 searchField: ['name', 'email'],
			 options: [
				  {email: 'brian@thirdroute.com', name: 'Brian Reavis'},
				  {email: 'nikola@tesla.com', name: 'Nikola Tesla'},
				  {email: 'someone@gmail.com', name: 'Someone'}
			 ],
			 render: {
				  item: function(item, escape) {
						return '<div>' +
							 (item.name ? '<span class="name">' + escape(item.name) + '</span>' : '') +
							 (item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
						'</div>';
				  },
				  option: function(item, escape) {
						var label = item.name || item.email;
						var caption = item.name ? item.email : null;
						return '<div>' +
							 '<span class="label">' + escape(label) + '</span>' +
							 (caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
						'</div>';
				  }
			 },
			 createFilter: function(input) {
				  var match, regex;
	
				  // email@address.com
				  regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
				  match = input.match(regex);
				  if (match) return !this.options.hasOwnProperty(match[0]);
	
				  // name <email@address.com>
				  regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
				  match = input.match(regex);
				  if (match) return !this.options.hasOwnProperty(match[2]);
	
				  return false;
			 },
			 create: function(input) {
				  if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
						return {email: input};
				  }
				  var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
				  if (match) {
						return {
							 email : match[2],
							 name  : $.trim(match[1])
						};
				  }
				  alert('Invalid email address.');
				  return false;
			 }
		});
	}

	if($('.selectize-single-select').length > 0){
		//Single Item Select
		$('.selectize-single-select').selectize({
			 create: true,
			 sortField: 'text'
		});
	}

	if($('.selectize-gear').length > 0){
		//Option Groups 
		$('.selectize-gear').selectize({
			 sortField: 'text'
		});
	}

	if($('.selectize-max-items').length > 0){
		//Max Items
		$('.selectize-max-items').selectize({
			 maxItems: 3
		});
	}
	
	if($('.selectize-country').length > 0){
		//Country Selection
		$('.selectize-country').selectize();
	}
	if($('.selectize-repo').length > 0){
		//Remote Source
		$('.selectize-repo').selectize({
			 valueField: 'url',
			 labelField: 'name',
			 searchField: 'name',
			 create: false,
			 render: {
				  option: function(item, escape) {
						return '<div>' +
							 '<span class="title">' +
								  '<span class="name"><i class="icon ' + (item.fork ? 'fork' : 'source') + '"></i>' + escape(item.name) + '</span>' +
								  '<span class="by">' + escape(item.username) + '</span>' +
							 '</span>' +
							 '<span class="description">' + escape(item.description) + '</span>' +
							 '<ul class="meta">' +
								  (item.language ? '<li class="language">' + escape(item.language) + '</li>' : '') +
								  '<li class="watchers"><span>' + escape(item.watchers) + '</span> watchers</li>' +
								  '<li class="forks"><span>' + escape(item.forks) + '</span> forks</li>' +
							 '</ul>' +
						'</div>';
				  }
			 },
			 score: function(search) {
				  var score = this.getScoreFunction(search);
				  return function(item) {
						return score(item) * (1 + Math.min(item.watchers / 100, 1));
				  };
			 },
			 load: function(query, callback) {
				  if (!query.length) return callback();
				  $.ajax({
						url: 'https://api.github.com/legacy/repos/search/' + encodeURIComponent(query),
						type: 'GET',
						error: function() {
							 callback();
						},
						success: function(res) {
							 callback(res.repositories.slice(0, 10));
						}
				  });
			 }
		});
	}

	if($('.selectize-backspace').length > 0){
		//Restore on Backspace
		$('.selectize-backspace').selectize({
			 plugins: ['restore_on_backspace'],
			 delimiter: ',',
			 persist: false,
			 create: function(input) {
				  return {
						value: input,
						text: input
				  }
			 }
		});
	}
	
	if($('.selectize-remove-btn').length > 0){
		//Remove Button
		$('.selectize-remove-btn').selectize({
			 plugins: ['remove_button'],
			 delimiter: ',',
			 persist: false,
			 create: function(input) {
				  return {
						value: input,
						text: input
				  }
			 }
		});
	}

	if($('.selectize-draggable').length > 0){
		//Drag Drop
		$('.selectize-draggable').selectize({
			 plugins: ['drag_drop'],
			 delimiter: ',',
			 persist: false,
			 create: function(input) {
				  return {
						value: input,
						text: input
				  }
			 }
		});
	}

	if($(".selectize-optgroup").length > 0 ){
		//Optgroup Columns
		$(".selectize-optgroup").selectize({
			 options: [
				  {id: 'avenger', make: 'dodge', model: 'Avenger'},
				  {id: 'caliber', make: 'dodge', model: 'Caliber'},
				  {id: 'caravan-grand-passenger', make: 'dodge', model: 'Caravan Grand Passenger'},
				  {id: 'challenger', make: 'dodge', model: 'Challenger'},
				  {id: 'ram-1500', make: 'dodge', model: 'Ram 1500'},
				  {id: 'viper', make: 'dodge', model: 'Viper'},
				  {id: 'a3', make: 'audi', model: 'A3'},
				  {id: 'a6', make: 'audi', model: 'A6'},
				  {id: 'r8', make: 'audi', model: 'R8'},
				  {id: 'rs-4', make: 'audi', model: 'RS 4'},
				  {id: 's4', make: 'audi', model: 'S4'},
				  {id: 's8', make: 'audi', model: 'S8'},
				  {id: 'tt', make: 'audi', model: 'TT'},
				  {id: 'avalanche', make: 'chevrolet', model: 'Avalanche'},
				  {id: 'aveo', make: 'chevrolet', model: 'Aveo'},
				  {id: 'cobalt', make: 'chevrolet', model: 'Cobalt'},
				  {id: 'silverado', make: 'chevrolet', model: 'Silverado'},
				  {id: 'suburban', make: 'chevrolet', model: 'Suburban'},
				  {id: 'tahoe', make: 'chevrolet', model: 'Tahoe'},
				  {id: 'trail-blazer', make: 'chevrolet', model: 'TrailBlazer'},
			 ],
			 optgroups: [
				  {id: 'dodge', name: 'Dodge'},
				  {id: 'audi', name: 'Audi'},
				  {id: 'chevrolet', name: 'Chevrolet'}
			 ],
			 labelField: 'model',
			 valueField: 'id',
			 optgroupField: 'make',
			 optgroupLabelField: 'name',
			 optgroupValueField: 'id',
			 optgroupOrder: ['chevrolet', 'dodge', 'audi'],
			 searchField: ['model'],
			 plugins: ['optgroup_columns']
		});
	}
})(jQuery);

$(function(){
	if($(".fancytree-default").length > 0 ){
		// Using default options
		$(".fancytree-default").fancytree({source: SOURCE});
	}
	if($(".fancytree-checkbox").length > 0){
		//Using Checkbox
		$(".fancytree-checkbox").fancytree({checkbox:true,selectMode: 3,source:SOURCE});
	}
});

var SOURCE = [
    {title:'Root with some children (expanded on init)',folder: true, key: 'id0', expanded: true,
        children: [
            {title: "Sub-item 0.1",
                children: [
                    {title: "Sub-item 0.1.1", key: "id0.1.1" },
                    {title: "Sub-item 0.1.2", key: "id0.1.2" }
                ]
            },
            {title: "Sub-item 0.2",
                children: [
                    {title: "Sub-item 0.2.1", key: "id0.2.1" },
                    {title: "Sub-item 0.2.2", key: "id0.2.2" }
                ]
            }
        ]
    },
    {title: "item1"},
    {title: "item2"},
    {title: "Folder", folder: true, key: "id3",
        children: [
            {title: "Sub-item 3.1",
                children: [
                    {title: "Sub-item 3.1.1", key: "id3.1.1" },
                    {title: "Sub-item 3.1.2", key: "id3.1.2" }
                ]
            },
            {title: "Sub-item 3.2",
                children: [
                    {title: "Sub-item 3.2.1", key: "id3.2.1" },
                    {title: "Sub-item 3.2.2", key: "id3.2.2" }
                ]
            }
        ]
    },
    {title: "Document with some children (expanded on init)", key: "id4", expanded: true,
        children: [
            {title: "Sub-item 4.1",
                children: [
                    {title: "Sub-item 4.1.1", key: "id4.1.1" },
                    {title: "Sub-item 4.1.2", key: "id4.1.2" }
                ]
            },
            {title: "Sub-item 4.2 (selected on init)", selected: true,
                children: [
                    {title: "Sub-item 4.2.1", key: "id4.2.1" },
                    {title: "Sub-item 4.2.2", key: "id4.2.2" }
                ]
            },
            {title: "Sub-item 4.3", key: "id4.3"},
            {title: "Sub-item 4.4", key: "id4.4"}
        ]
    },
    {title: "Other folder", folder: true, key: "id5",
        children: [
            {title: "Sub-item 5.1",
                children: [
                    {title: "Sub-item 5.1.1", key: "id5.1.1" },
                    {title: "Sub-item 5.1.2", key: "id5.1.2" }
                ]
            }
        ]
    }
];

/*---- code to integrate dargula ------*/
(function($) {
   if($('#dragula-lft-defaults').length > 0){
		// Default Demo
		dragula([document.getElementById('dragula-lft-defaults'), document.getElementById('dragula-rgt-defaults')]);
	}

	if($('#dragula-rgt-event').length > 0){
		//Event Demo
		dragula([document.getElementById('dragula-lft-event'), document.getElementById('dragula-rgt-event')])
			.on('drag', function (el) {
			  el.className = el.className.replace('ex-moved', '');
			}).on('drop', function (el) {
			  el.className += ' ex-moved';
			}).on('over', function (el, container) {
			  container.className += ' ex-over';
			}).on('out', function (el, container) {
			  container.className = container.className.replace('ex-over', '');
			});
	}

	if($('#dragula-lft-remove').length > 0){
		//Remove when out of container
		dragula([document.getElementById('dragula-lft-remove'), document.getElementById('dragula-rgt-remove')], {
			removeOnSpill: true
		});
	}

	if($('#dragula-lft-rollback').length > 0){
		//Rollback
		dragula([document.getElementById('dragula-lft-rollback'), document.getElementById('dragula-rgt-rollback')], {
			revertOnSpill: true
		});
	}

	if($('#dragula-lft-copy-1tomany').length > 0){		
		//Copy 1tomany
		dragula([document.getElementById('dragula-lft-copy-1tomany'), document.getElementById('dragula-rgt-copy-1tomany')], {
			copy: function (el, source) {
			  return source === document.getElementById('dragula-lft-copy-1tomany')
			},
			accepts: function (el, target) {
			  return target !== document.getElementById('dragula-lft-copy-1tomany')
			}
		});
	}

	if($('#dragula-lft-handle').length > 0){
		//Handle Demo
		dragula([document.getElementById('dragula-lft-handle'), document.getElementById('dragula-rgt-handle')], {
			moves: function (el, container, handle) {
			  return handle.className === 'handle';
			}
		});
	}
	if($('#dragula-sortable').length > 0){
		 //Click or Drag
		 dragula([document.getElementById('dragula-sortable')]);
	}
})(jQuery);


/* ------------------------------------------------------------------------------
*
*  # Plupload multiple file uploader
*
* ---------------------------------------------------------------------------- */
(function($) {
	if($(".queue-widget-upload").length > 0){
    	// Setup all runtimes
		$(".queue-widget-upload").pluploadQueue({
		  // General settings
		  runtimes : 'html5,flash,silverlight,html4',
		  url : "/",
		  chunk_size : '1mb',
		  rename : true,
		  dragdrop: true,
		  filters : {
				// Maximum file size
				max_file_size : '10mb',
				// Specify what files to browse for
				mime_types: [
					 {title : "Image files", extensions : "jpg,gif,png"},
					 {title : "Zip files", extensions : "zip"}
				]
		  },
		  // Resize images on clientside if we can
		  resize: {
				width : 200,
				height : 200,
				quality : 90,
				crop: true // crop to exact dimensions
		  },
		  // Flash settings
		  flash_swf_url : 'assets/plugins/plupload/js/Moxie.swf',
		  // Silverlight settings
		  silverlight_xap_url : 'assets/plugins/plupload/js/Moxie.xap'
		});
	}
})(jQuery);

$(function(){
    /**
     * GENERATES THE ICON CODE
     */
	 if($('#glyphs').length > 0){
		 document.getElementById("glyphs").addEventListener("click", function(e) {
			  var target = e.target,
					glyph  = target.getAttribute("data-js-prompt");
			  if (target.tagName === "SPAN") {
					prompt('Please copy the icon code below:', 'data-icon="' +glyph+ '"');
			  }
		 });
	 }
	 
           
	if($('#snazzymap-demo').length > 0){
		// When the window has finished loading create our google map below
		google.maps.event.addDomListener(window, 'load', init);
         var init =	function init() {
			 // Basic options for a simple Google Map
			 var mapOptions = {
				  zoom: 11,
				  center: new google.maps.LatLng(40.6700, -73.9400), // New York
				  // How you would like to style the map. 
				  // This is where you would paste any style found on Snazzy Maps.
				  styles: [{"featureType": "landscape", "stylers": [{"hue": "#FFA800"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]}, {"featureType": "road.highway", "stylers": [{"hue": "#53FF00"}, {"saturation": -73}, {"lightness": 40}, {"gamma": 1}]}, {"featureType": "road.arterial", "stylers": [{"hue": "#FBFF00"}, {"saturation": 0}, {"lightness": 0}, {"gamma": 1}]}, {"featureType": "road.local", "stylers": [{"hue": "#00FFFD"}, {"saturation": 0}, {"lightness": 30}, {"gamma": 1}]}, {"featureType": "water", "stylers": [{"hue": "#00BFFF"}, {"saturation": 6}, {"lightness": 8}, {"gamma": 1}]}, {"featureType": "poi", "stylers": [{"hue": "#679714"}, {"saturation": 33.4}, {"lightness": -25.4}, {"gamma": 1}]}]
			 };
		
			 var mapElement = document.getElementById('snazzymap-demo');
			 // Create the Google Map using our element and options defined above
			 var map = new google.maps.Map(mapElement, mapOptions);
			 // Let's also add a marker while we're at it
			 var marker = new google.maps.Marker({
				  position: new google.maps.LatLng(40.6700, -73.9400),
				  map: map,
				  title: 'Snazzy!'
			 });
		}
	}
});
'use strict';
/* function for typehead */
(function($) {
	if($('#pratham_demo_form1').length > 0){
		var form1 = $('#pratham_demo_form1');
		var error1 = $('.alert-danger', form1);
		var success1 = $('.alert-success', form1);
		form1.validate({
			 errorElement: 'span', //default input error message container
			 errorClass: 'help-block help-block-error', // default input error message class
			 focusInvalid: false, // do not focus the last invalid input
			 ignore: "",  // validate all fields including form hidden input
			 messages: {
				  select_multi: {
						maxlength: jQuery.validator.format("Max {0} items allowed for selection"),
						minlength: jQuery.validator.format("At least {0} items must be selected")
				  }
			 },
			 rules: {
				  name: {
						minlength: 2,
						required: true
				  },
				  input_group: {
						email: true,
						required: true
				  },
				  email: {
						required: true,
						email: true
				  },
				  url: {
						required: true,
						url: true
				  },
				  number: {
						required: true,
						number: true
				  },
				  digits: {
						required: true,
						digits: true
				  },
				  occupation: {
						minlength: 5,
				  },
				  select: {
						required: true
				  },
				  select_multi: {
						required: true,
						minlength: 1,
						maxlength: 3
				  }
			 },
			 invalidHandler: function (event, validator) { //display error alert on form submit              
				  success1.hide();
				  error1.show();
				  // App.scrollTo(error1, -200);
			 },
			 errorPlacement: function (error, element) { // render error placement for each input type
				  var cont = $(element).parent('.input-group');
				  if (cont) {
						cont.after(error);
				  } else {
						element.after(error);
				  }
			 },
			 highlight: function (element) { // hightlight error inputs
				  $(element)
						.closest('.form-group').addClass('has-error'); // set error class to the control group
			 },
			 unhighlight: function (element) { // revert the change done by hightlight
				  $(element)
						.closest('.form-group').removeClass('has-error'); // set error class to the control group
			 },
			 success: function (label) {
				  label
						.closest('.form-group').removeClass('has-error'); // set success class to the control group
			 },
			 submitHandler: function (form) {
				  success1.show();
				  error1.hide();
			 }
		});
	}
})(jQuery);
'use strict';
(function($) {
	var Prtm = {
		Constants: {
			LEFTMARGIN:'315px',
			COLLAPSELEFTMARGIN: '63px',
		},
		MobileBreakPoint : 992,
		SidebarBreakPoint : 992,
		PrtmEle:{
			WINDOW: $(window),
			BODY: $('body'),
			SIDEBAR: $('.prtm-sidebar'),
			SIDENAV: $('.sidebar-nav'),
			MAIN: $('.prtm-main'),
			HEADER: $('.prtm-header'),
			CONTENTWRAP: $('.prtm-content-wrapper'),
			CONTENT: $('.prtm-content'),
			PRTMBLOCK: $('.prtm-block'),
			FOOTER: $('.prtm-footer'),
			HAMBURGER: $('.prtm-bars'),
		},
	   ResizeHandler:function(){
			$(window).resize(function(){
				if(Prtm.IsMobile()){
					$('.prtm-sidebar').addClass('mobile-menu');
				}
				else{
					$('.prtm-sidebar').show();
				}
			});
		},
		BindEvents:function(){
			this.PrtmEle.HAMBURGER.on('click',this.CollapseSidebar.bind(this));
		},
		CollapseSidebar: function(){
			$('.sidebar-nav').css('opacity',0);
			$('.sub-menu').slideUp();
			$('li.has-children').removeClass('opened');
			if(Prtm.IsMobile()){
         	this.PrtmEle.SIDEBAR.toggleClass('mobile-menu-in');      
			}
			if(Prtm.IsMobile()){
				 this.PrtmEle.SIDEBAR.slideToggle();
			}
			else{
				 this.PrtmEle.HAMBURGER.toggleClass("prtm-sidebar-closed is-active");
				 this.PrtmEle.BODY.toggleClass("prtm-sidebar-closed is-active");
				 this.PrtmEle.SIDEBAR.toggleClass('collapse');
			}
			if(this.PrtmEle.SIDEBAR.hasClass('collapse')){
				 setTimeout(function(){ $('.sidebar-nav').css('opacity',1);}, 500);
			}
			else{
				setTimeout(function(){$('.sidebar-nav').css('opacity',1);}, 500);
			}
		},
		IsMobile:function(){
			var mediaQueryString = '(max-width: ' + Prtm.SidebarBreakPoint + 'px)';
            var mediaQueryList = window.matchMedia(mediaQueryString);
			if(mediaQueryList.matches){
				this.PrtmEle.BODY.addClass('mobile').removeClass('desktop');
				return true;
			}
			else{
				this.PrtmEle.BODY.removeClass('mobile').addClass('desktop');
				return false;
			}
		},
		MenuHandler:function(){
			$(".prtm-sidebar .has-children > a").on('click',function (e) {
				e.preventDefault();
				if($("body").hasClass("prtm-sidebar-closed") && !$("body").hasClass("mobile")){
					return false;
				}
				var $parent = $(this).closest('li.has-children').toggleClass('opened')
				$('li.has-children').not($parent).removeClass('opened')
			   var $submenu = $(this).next('.sub-menu');
			   var $parentsubmenu = $(this).closest('.sub-menu');
			   $('.sidebar-menu .sub-menu').not($submenu).not($parentsubmenu).slideUp()
			   $(this).next('.sub-menu').slideToggle();
			});
		},
		RemoveEle:function(){
			$(document).on('click','[data-toggle^="remove"]',function(){
				$(this).closest($('.'+$(this).data('target'))).slideUp(400,function(){
					$(this).remove();
				});
			})
		},
		Modal:function(){
			$('.modal').insertAfter($('body'));
			if($('#draggable').length > 0){
				$("#draggable").draggable({
					 handle: ".modal-header"
				});
			}
		},
		SearchIcon:function(){
			$(".prtm-search-icon").on('click',function () {
        		$(".prtm-search-icon .prtm-navbar-search").addClass("active");
    		});
    		$(document).delegate('.prtm-search-area', 'click', function () {
        		$('.prtm-navbar-search').removeClass('active');
    		});
		},
		Counter:function(){
			/*----------- Counter ----------------*/
			$.each($('.count-item'), function () {
			    var count = $(this).data('count'),
			    numAnim = new CountUp(this, 0, count);
			    numAnim.start();
			});

	        /*----------- Counter down ----------------------*/
		    $('.getting-started').countdown('2017/09/01', function(event) {
		      var $this = $(this).html(event.strftime(''
		        + '<span>%w</span> weeks '
		        + '<span>%d</span> days '
		        + '<span>%H</span> hr '
		        + '<span>%M</span> min '
		        + '<span>%S</span> sec'));
		    });
		},
		BackToTop:function(){
			/*------- code for back to top animation --------*/
		    $("#back-top").hide();
		    $(window).scroll(function () {
		        if ($(this).scrollTop() > 300){
		            $('#back-top').fadeIn(0);
		        } else {
		            $('#back-top').fadeOut(0);
		        }
		    });
		    $('#back-top').on('click',function(e){
		        e.preventDefault();
		        $('body,html').animate({
		            scrollTop: 0
		        }, 1000);
		        return false;
		    });
		},
		RowEqualHeight:function(){
			/*---------- Row equal height -----------*/
		    $('.row-equal-height').each(function(){
		        var highestBox = [];
		        var i=0;
		        $('> div', this).each(function()
		        {
		            highestBox[i] = $(this).outerHeight();
		            i++;
		        });
		        var min_height=Math.min.apply(Math,highestBox);
		        $('> div',this).addClass('overflow-auto').css('max-height', min_height);
		        $('.overflow-auto .prtm-block').css('height', min_height);
		    });
		},
		ShowLoader:function(){
			$('body').append('<div class="prtm-loader-wrap"><div class="showbox"><div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div></div></div>');
		},
		Init:function(){
			this.ShowLoader();
			this.BindEvents();
			this.IsMobile();
			this.ResizeHandler();
			this.MenuHandler();
			this.RemoveEle();
			this.GlobalFeatures();
			this.Modal();
			this.SearchIcon();
			this.Counter();
			this.BackToTop();
			this.RowEqualHeight();
		},
		GlobalFeatures:function(){
			$('[data-toggle="tooltip"]').tooltip();
			/*---- code to initiate progress bars -----*/
			$(window).on('load',function(){
				$('.progress-bar').each(function(){
					$(this).scrollSpy();
					$(this).on('scrollSpy:enter', function () {
						$(this).width($(this).data('width'));
					}).scrollSpy();;
					$(this).scrollSpy();
				});
				$('.prtm-loader-wrap').fadeOut(300);
				$(window).resize();
			});
		},
		InitSliders:function(){
			$('[data-toggle="slider"]').slider({tooltip: 'always'});
		}
	};
	Prtm.Init();
})(jQuery);
$(document).ready(function(){
	$('.prtm-content-wrapper').addClass('loaded-block');	
	if($('#zoom_03').length > 0){
		$("#zoom_03").elevateZoom({
			gallery:'gallery_01', 
			cursor: 'pointer', 
			galleryActiveClass: 'active', 
			imageCrossfade: true, 
		}); 
	}
})