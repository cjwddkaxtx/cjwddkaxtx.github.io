"use strict";

var canvas;
var gl;
var theta = 0.0;
var thetaLoc;
var n=36;
var vertices = [];
var speed;
var direction=1;

function inittriggle(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		-1.0, -1.0, 
		 0.0,  1.0, 
		 1.0, -1.0, 
		/*0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0*/
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render1();
}


function initsquare(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		/*-1.0, -1.0,
		 0.0,  1.0, 
		 1.0, -1.0,   三个点
		*/
		-1.0, -1.0, 
		-1.0,  1.0, 
		 1.0, -1.0, 
		-1.0,  1.0,
		 1.0,  1.0,
		 1.0, -1.0, //两个三角形
		/*0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0*/
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( vPosition );

	render2();
}


function initcircle(){

    initAngles();
    
	rander();
}	


function initAngles(){
    var step = 360 / n;

    for( var i = 0; i < n; i++ ){
        vertices.push( step * i );
    }

    canvas = document.getElementById( "triangle-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if( !gl ){
        alert( "WebGL isn't available" );
    }

    gl.viewport( 0, 0, canvas.width, canvas.height);
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    thetaLoc = gl.getUniformLocation( program, "theta" );
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vertexBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );

    var aAngle = gl.getAttribLocation( program, "aAngle" );
	gl.vertexAttribPointer( aAngle, 3, gl.FLOAT, false, 0, 0 );
	gl.enableVertexAttribArray( aAngle );

    return n;
}
function render1(){
	gl.clear( gl.COLOR_BUFFER_BIT );

	gl.drawArrays( gl.TRIANGLES, 0, 3 );

}
function render2(){
	gl.clear( gl.COLOR_BUFFER_BIT );

	gl.drawArrays( gl.TRIANGLES, 0, 6 );//六个点

}
function rander(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	gl.uniform1f( thetaLoc, theta );
	gl.drawArrays( gl.TRIANGLE_FAN, 0, n );
}
