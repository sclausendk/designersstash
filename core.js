
var didRun = false
document.addEventListener('DOMContentLoaded', function(event) {
	var containerPalette = document.getElementsByClassName("three")[0],
	containerPhone = document.getElementsByClassName("two")[0],
	container,
	inner


	if(didRun == false){
		initialize(containerPalette, document.getElementsByClassName("color-palette")[0]);
		initialize(containerPhone, document.getElementsByClassName("phone")[0]);
	}


	function initialize(container, inner){
		  // Init
		  container = container,
	      inner = inner;

		  // Mouse
		  var mouse = {
		    _x: 0,
		    _y: 0,
		    x: 0,
		    y: 0,
		    updatePosition: function(event) {
		      var e = event || window.event;
		      this.x = e.clientX - this._x;
		      this.y = (e.clientY - this._y) * -1;
		    },
		    setOrigin: function(e) {
		      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
		      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
		    },
		    show: function() {
		      return "(" + this.x + ", " + this.y + ")";
		    }
		  };

		  // Track the mouse position relative to the center of the container.
		  mouse.setOrigin(container);

		  //----------------------------------------------------

			var counter = 0;
			var refreshRate = 10;
			var isTimeToUpdate = function() {
			return counter++ % refreshRate === 0;
			};

			//----------------------------------------------------

			var onMouseEnterHandler = function(event) {
				update(event);
			};

			var onMouseMoveHandler = function(event) {
				if (isTimeToUpdate()) {
				  update(event);
				}
			};

			//----------------------------------------------------

			var update = function(event) {
			mouse.updatePosition(event);
			updateTransformStyle(
			  (mouse.y / inner.offsetHeight * 4).toFixed(2),
			  (mouse.x / inner.offsetWidth * 4).toFixed(2)
			);
			};

			var updateTransformStyle = function(x, y) {
			var style
			if(inner.classList.contains('phone') == true){
				style = "perspective(800px) rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(-15deg) scale(1.2)";
			}else{
				style = "perspective(800px) rotateX(" + x + "deg) rotateY(" + y + "deg) rotateZ(5deg) scale(1)";
			}

			inner.style.transform = style;
			inner.style.webkitTransform = style;
			inner.style.mozTranform = style;
			inner.style.msTransform = style;
			inner.style.oTransform = style;
			};

			//--------------------------------------------------------

			container.onmousemove = onMouseMoveHandler;
			container.onmouseenter = onMouseEnterHandler;
	}
})



//Switching and recoloring
function switchModeOnSwitch(el, arg){
	var tab = el
	var currentTab = getSiblings(el);
	var page = document.getElementsByTagName('html')[0]

	if(arg === 'light'){
		window.currentMode = 'light'
		currentTab.classList.remove('active')
		tab.classList.add('active')
		page.classList.remove('darkui')
		page.classList.add('lightui')
	}else if (arg === 'dark'){
		window.currentMode = 'dark'
		currentTab.classList.remove('active')
		tab.classList.add('active')
		page.classList.remove('lightui')
		page.classList.add('darkui')
	}
}


//Find element siblings
var getSiblings = function (elem) {
	// Setup siblings array and get the first sibling
	var siblings = null;
	var sibling = elem.parentNode.firstChild;
	// Loop through each sibling and push to the array
	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings = sibling
		}
		sibling = sibling.nextSibling
	}
	return siblings;
};

// Setup isScrolling variable
var isScrolling;

// Listen for scroll events
window.addEventListener('scroll', function ( event ) {
	var hint = document.getElementsByClassName('hint')[0]
	hint.classList.add('hide')

	// Clear our timeout throughout the scroll
	window.clearTimeout( isScrolling );

	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(function() {
		// Run the callback
		hint.classList.remove('hide')

	}, 1000);

}, false);