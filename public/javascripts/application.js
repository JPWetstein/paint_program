/**
 * @author McTighe-Wetstein, J. Paul
 */
var color;
var size;
var ctx;

$(document).ready(function () {
	var canvas = $('#myCanvas');
	size = 5;
	ctx=canvas[0].getContext("2d");
	color = getColor();
	ctx.strokeStyle = color;
	var dominoList = new Array();
	//calculate position of the canvas DOM element on the page	
	var canvasPosition = 
	{
	    x: canvas.offset().left,
	    y: canvas.offset().top
	};
	var first = true;
	var clicking = false;
	var current_mouse;
	var tool = $("#toolPicker option:selected").val();
	
	canvas.on('mousedown', function(e)
	{
		current_mouse = 
	    {
	        x: e.pageX - canvasPosition.x - (size/2),
	        y: e.pageY - canvasPosition.y - (size/2)
	    }
		clicking = true;
	});
	
	canvas.on('mousemove', function(e)
	{
		if(clicking)
		{
			if(tool == "paintbrush")
			{
				current_mouse = line(current_mouse, e, canvasPosition);
			}
			else if(tool == "eraser")
			{
				current_mouse = erase(current_mouse, e, canvasPosition);
			}
		}
	});
	
	canvas.on('mouseup', function(e)
	{
		clicking = false;
		current_mouse = null;
	});
	
	$( "#slider" ).slider({
  	  min:1,
  	  max:100,
  	  value: size,
	  change: function( event, ui ) 
	  {
	  	size = ui.value;
	  	$( "#amount" ).val( ui.value )
	  }
	});
	
	$( "#amount" ).val($( "#slider" ).slider( "value" ));
	
	$("#toolPicker").change(function(){
		tool = $("#toolPicker option:selected").val();
		
	});
});

function line(old_mouse, e, canvasPosition)
{
	ctx.beginPath();
	ctx.lineWidth = size;
	ctx.lineCap = "round";
	var mouse = 
    {
        x: e.pageX - canvasPosition.x - (size/2),
        y: e.pageY - canvasPosition.y - (size/2)
    }
    
    ctx.moveTo(old_mouse.x, old_mouse.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    ctx.closePath();
	
	return mouse;
}

function erase(old_mouse, e, canvasPosition)
{
	var old_color = ctx.strokeStyle;
	ctx.strokeStyle = "#FFF";
	// change_color("FFF");
	var mouse = line(old_mouse, e, canvasPosition);
	ctx.strokeStyle = old_color;
	return mouse;
}

function change_color(color)
{
	this.color = color;
	ctx.strokeStyle = "#"+color;
}

function getColor()
{
	return "#"+$("#colorpicker").attr('value');
}

function getSize()
{
	return size;
}


/**
 * Not too useful at this point, because it "skips" but maybe in the future. Stamps or something?
 * @param {Object} e
 * @param {Object} canvasPosition
 * @param {Object} ctx
 */
function pencil(e, canvasPosition, ctx)
{
	e.preventDefault();
	    
    var mouse = 
    {
        x: e.pageX - canvasPosition.x - getSize()/2,
        y: e.pageY - canvasPosition.y - getSize()/2
    }
    ctx.fillRect(mouse.x, mouse.y, getSize(), getSize());
    
    return mouse;
}
