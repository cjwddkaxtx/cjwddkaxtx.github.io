var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = new Float32Array([
		 1.0, -1.0, 1.0, 1.0, 0.0, 1.0,
		-1.0, -1.0, 0.0, 1.0, 1.0, 1.0,
         0.0,  1.0, 1.0, 0.0, 1.0, 1.0
	]);

	var size = vertices.BYTES_PER_ELEMENT;

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram( program );
	
	// Load the data into the GPU
	var bufferId = gl.createBuffer();
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
	gl.bufferData( gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW );
	
	
	// Associate external shader variables with data buffer
	//var vPosition = gl.getAttribLocation( program, "vPosition" );
	//gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
	//gl.enableVertexAttribArray( vPosition );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, size * 6, 0);
	gl.enableVertexAttribArray( vPosition );
	
	var aColor = gl.getAttribLocation( program, "aColor" );
	gl.vertexAttribPointer( aColor, 4, gl.FLOAT, false, size * 6, size * 2); 
	gl.enableVertexAttribArray( aColor );

	render();
}

function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );
	//gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
	//gl.drawArrays( gl.TRIANGLE_FANS, 3, 6 );
}