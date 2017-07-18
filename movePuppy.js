window.onload = function(e) {

  var startx = 0;
  var starty = 0;
  var offsetx = 0;
  var offsety = 0;
  //move is set to true after a mousedown, and set to false following a mouseup
  var move = false;

  //use three event listeners to register downclick, moving of cursor, and release of cursor

  puppy.addEventListener("mousedown",function(e) {

      e.preventDefault();
      //on downclick of mouse, register the click
      move = true;

      //get initial positions of image
      startx = parseInt(puppy.style.left) || 0;
      starty = parseInt(puppy.style.top) || 0;
      //register offsets
      offsetx = e.clientX;
      offsety = e.clientY;

  }, false);

  document.addEventListener("mousemove", function(e) {

      //when mouse is moving after a downclick, update image position
      if(move) {
          var leftPosition = startx - offsetx + e.clientX;
          var rightPosition = starty - offsety + e.clientY;
          puppy.style.left = leftPosition + "px";
          puppy.style.top = rightPosition + "px";
      }

  }, false);

  document.addEventListener("mouseup", function(e) {
      //if mouse is released, stop moving image
      move = false;
  }, false);

}
