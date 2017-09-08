$(document).ready(function()
{
	var total_width = 960;
	var nav_num = $("#nav li").length;
	var nav_width = total_width/nav_num;
	$("#nav li").width(nav_width-1);
	$("#nav li:last-child").width(nav_width-1);

	var currentPosition = 0;
	var slideWidth = 960;
	var slides = $('.slide');
	var numberOfSlides = slides.length;

	// Remove scrollbar in JS
	$('#slidesContainer').css('overflow', 'hidden');

	// Wrap all .slides with #slideInner div
	slides
	.wrapAll('<div id="slideInner"></div>')
	// Float left to display horizontally, readjust .slides width
	.css({
	  'float' : 'left',
	  'width' : slideWidth
	});

	// Set #slideInner width equal to total width of all slides
	$('#slideInner').css('width', slideWidth * numberOfSlides);

	// Insert controls in the DOM
	$('#carousel')
	.prepend('<span class="control" id="leftControl">Clicking moves left</span>')
	.append('<span class="control" id="rightControl">Clicking moves right</span>');

	// Create event listeners for .controls clicks
	$('.control').bind('click', function()
	{
		// Determine new position
		currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;

		// Move slideInner using margin-left
		if (currentPosition == -1)
			currentPosition = numberOfSlides-1;
		else if (currentPosition == numberOfSlides)
			currentPosition = 0;
		$('#slideInner').animate({
		  'marginLeft' : slideWidth*(-currentPosition)
		});
	});

	$(document).keydown(function(e)
	{
		var time = 400;
	    if (e.keyCode == 39) //Right arrow
	    	currentPosition++;
	    else if  (e.keyCode == 37) //Left arrow
	    	currentPosition--;

	    if (currentPosition == -1)
			currentPosition = numberOfSlides-1;
		else if (currentPosition == numberOfSlides)
			currentPosition = 0;

		$('#slideInner').stop(false, true).animate({
		  'marginLeft' : slideWidth*(-currentPosition)
		});
	});
});