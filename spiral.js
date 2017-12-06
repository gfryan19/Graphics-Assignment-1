// Greg Ryan
// September 15, 2017
// Assignment 1
var gl;
var points = [];

var NumPoints = 5000;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	spiral();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function spiral() {
	var numVec = 1000; //number of vertices
	var alpha = 0;     //initial angle, first point on the spiral
	var incA = 10;     //amount to increment alpha
	var radius = .01;  //initial radius, first vertex 
	var incR = .001;   //amount to increment radius
	var xcenter = 0;   //initial x center of the spiral
	var ycenter = 0;   //initial y center of the spiral
	var vertices = [];
	
	for (var i = 0; i < numVec; i++){
		var radAlpha = alpha*(Math.PI/180.0); //converts alpha to radians
		var x = xcenter + (radius * Math.cos(radAlpha)); //generates x coordinate of a point
		var y = ycenter + (radius * Math.sin(radAlpha)); //generates y coordinate of a point
		
		points.push(vec2(x,y)); //adds coordinates to points array 
		alpha += incA; //increment alpha
		radius += incR; //increment radius
	}
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, points.length );
}
