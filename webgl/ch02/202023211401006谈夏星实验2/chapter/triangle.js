"use strict";

var gl;
var points;
const t=0.3819660112501;

window.onload = function init(){
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
		/*-1.0, -1.0, 
		-1.0,  1.0, 
		 1.0, -1.0, 
		-1.0,  1.0,
		 1.0,  1.0,
		 1.0, -1.0, //两个三角形
		 */
		0.0 , 1.0,
		t*Math.cos(18*Math.PI/180),-t*Math.sin(18*Math.PI/180),//2.2
		-Math.cos(54*Math.PI/180),-Math.sin(54*Math.PI/180),
		
		Math.cos(18*Math.PI/180),Math.sin(18*Math.PI/180),
		-Math.cos(18*Math.PI/180),Math.sin(18*Math.PI/180),
		0,-t,
		
		0.0 , 1.0,
		Math.cos(54*Math.PI/180),-Math.sin(54*Math.PI/180),  //1.2
		-t*Math.cos(18*Math.PI/180),-t*Math.sin(18*Math.PI/180), //2.3
		
		
		
		 -t*Math.cos(18*Math.PI/180)/2,-t*Math.sin(18*Math.PI/180), //3
		 -t*Math.cos(54*Math.PI/180)/2, t*Math.sin(54*Math.PI/180), //4
		  t*Math.cos(54*Math.PI/180)/2, t*Math.sin(54*Math.PI/180), //1
		  t*Math.cos(18*Math.PI/180)/2,-t*Math.sin(18*Math.PI/180), //2
		 
		 
		 /*（0、50）
		 （47,5528、15,4508）
		 （38,3022、-40,4508）
		 （-38,3022、-40,4508）
		 （-47,5528、-15,4508）
		 */


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

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 9 );
	//gl.drawArrays( gl.TRIANGLES, 0, 3 );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 10 );//六个点
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}