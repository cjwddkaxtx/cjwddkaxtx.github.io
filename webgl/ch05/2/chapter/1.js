"use strict";

var gl;
var points;
var scalex;
var vertices = [];
var points = [];
var scalexLoc;

function generate(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	vertices = [];
	scalex= document.getElementById("scalex").value;
	// Three Vertices
	var vertices = [
		-0.5*scalex, -0.5*scalex, 
		 0.0*scalex,  0.5*scalex, 
		 0.5*scalex, -0.5*scalex, 
	];
	document.getElementById("scalex").onchange = function () {
		//vertices = [];
	    scalex = event.target.value;
	}
	//scalex= document.getElementById("scalex").value;
	

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

	scalexLoc = gl.getUniformLocation(program, "scalex");
    gl.uniform1f(scalexLoc, scalex);

	
	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}