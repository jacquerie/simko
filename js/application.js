var margin = { top: 30, right: 20, bottom: 20, left: 80 },
    width = 960 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

var x = d3.scale.linear()
  .rangeRound( [ 0, width ] );

var y = d3.scale.ordinal()
  .rangeRoundBands( [ height, 0 ], 0.1 );

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "top" )
    .tickFormat( d3.format( ".2s" ) );

var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" );

var svg = d3.select( "svg" )
    .attr( "width", width + margin.left + margin.right )
    .attr( "height", height + margin.top + margin.bottom )
  .append( "g" )
    .attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

var updateLead = function() {
  d3.select( ".lead" )
    .html( function() {
      return Math.random() > 0.001 ? "Less is more." : "My way, or fuck you!"
    } );
};

var updateSuggestions = function( toAdd, toRemove ) {
  d3.select( ".to-add" )
    .selectAll( "li" )
      .data( toAdd )
    .enter()
      .append( "li" )
      .html( function( d ) { return d.File; } );

  d3.select( ".to-remove" )
    .selectAll( "li" )
      .data( toRemove )
    .enter()
      .append( "li" )
      .html( function( d ) { return d.File; } );
};

d3.csv( "data/tibor-mock.csv?" + Math.floor( 1000 * Math.random() ), function( error, data ) {
  color.domain( d3.keys( data[0] ).filter( function( key ) {
    return key !== "File";
  } ) );

  data.forEach( function( d ) {
    var x0 = 0;

    d.hits = color.domain().map( function( name ) {
      return { "name": name, "x0": x0, "x1": x0 += +d[name] };
    } );

    d.total = d.hits[d.hits.length - 1].x1;
  } );

  data.sort( function( a, b ) { return a.total - b.total; } );

  var totals = data.map( function( d ) { return d.total; } ),
      median = d3.median( totals ),
      toAdd = data.filter( function( d ) { return d.total > median && d.L1 == 0; } ),
      toRemove = data.filter( function( d ) { return d.total < median && d.L1 > 0; } );

  updateSuggestions(toAdd, toRemove);

  x.domain( [ 0, d3.max( totals ) ] );
  y.domain( data.map( function( d ) { return d.File; } ) );

  svg.append( "g" )
      .attr( "class", "x axis" )
      .call( xAxis );

  svg.append( "g" )
      .attr( "class", "y axis" )
      .call( yAxis )
    .append( "text" )
      .attr( "transform", "rotate(-90)" )
      .attr( "y", 6 )
      .attr( "dy", ".71em" )
      .style( "text-anchor", "end" );

  var file = svg.selectAll( ".file" )
      .data( data )
    .enter().append( "g" )
      .attr( "class", "g" )
      .attr( "transform", function( d ) { return "translate(0, " + y( d.File ) + ")"; } );

  file.selectAll( "rect" )
      .data( function( d ) { return d.hits; } )
    .enter().append( "rect" )
      .attr( "height", y.rangeBand() )
      .attr( "x", function( d ) { return x( d.x0 ); } )
      .attr( "width", function( d ) { return x( d.x1 ) - x( d.x0 ); } )
      .style( "fill", function( d ) { return color( d.name ); } );

  var legend = svg.selectAll( ".legend" )
      .data( color.domain().slice() )
    .enter().append( "g" )
      .attr( "class", "legend" )
      .attr( "transform", function( d, i ) { return "translate(0," + i * 20 + ")"; } );

  legend.append( "rect" )
      .attr( "x", width - 39 )
      .attr( "y", height - 57 )
      .attr( "width", 18 )
      .attr( "height", 18 )
      .style( "fill", color );

  legend.append( "text" )
      .attr( "x", width - 48 )
      .attr( "y", height - 48 )
      .attr( "dy", ".35em" )
      .style( "text-anchor", "end" )
      .text( function( d ) { return d; } );

} );
