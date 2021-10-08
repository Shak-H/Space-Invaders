# Space-Invaders

SPACE-INVADERS - this is my first project from the General Assembly course SEI-59

My psuedo code for the game

<!-- HTML -->
<!-- div with flex box that contains everything -->
  <!-- div with flex box that contains score board div and lives div -->
   <!-- score board div has a <p> with a <span> that needs to be edited when a 'alien' is hit -->
   <!-- lives div has a flex box with a <p> with a <span> that needs to be edited if 'aliens' reach 'planets surface' -->

    <!-- lives div has 3 divs with a class that has a background image representing a life - the class should change when a life is taken -->

  <!-- div with a class ='grid' containing 100 divs-->

    <!-- 100 divs to represent each cell-->

  <!-- div flex with reset button -->

<!-- CSS -->
<!-- .grid 'class' -->
 <!-- .grid {display: grid, grid-template-column/row: repeat(10, 1fr), background: black}  -->
<!-- .alien 'class' -->
 <!-- .grid .alien {background: url('alien.img') } (R - may need to use ::before and :: after)-->
<!-- .empty/free cell 'class' -->
 <!-- may not need this - if do - .grid .free {(bacgkround:black)} -->
<!-- .bullet 'class' -->
 <!-- .grid .bullet {background: url('bullet.img')}(R*) -->
<!-- .player 'class' -->
 <!-- .grid .player {background: url('player.img')} -->
<!-- .explosian 'class' (may not need)(R*) -->
<!-- .life 'class' x3(background: url('life.img')) -->

<!-- JS -->
<!-- variable with an array of ALL .grid divs -->
<!-- // initialise aliens -->
<!-- function randomisedClass setting out which cells in the top 3 rows have aliens (maybe set the other sells to be 'free')-->
<!-- (if need free cells) const setting the remaning cells in grid to have a class of 'free/empmty' -->
<!-- // initialise player -->
<!-- variable with an array of all cells in bottom row of grid -->
<!-- variable to randomly select cell from bottom row of grid -->
<!-- variable of player index to set what cell the player starts in -->
<!-- // move player -->
<!-- document.addEventlistner('keydown') with function with swtich statement that calls function for player movement dependant on key pressed -->
<!-- function for move in certain direction depending on which key pressed -->
 <!-- needs to add and remove alien class -->
 <!-- player index needs to change with each move -->
 <!-- needs to know if player at edge -->
<!-- function to stop players moving off edge -->
<!-- // move aliens -->
<!-- function with setInterval to move aliens (difficulty - getting groups to move in formation)-->
<!-- aliens need to move left (function)  -->
 <!-- need a variable to hold 'alienIndex' -->
 <!-- need a variable for 'newIndex' -->
 <!-- need to add and remove alien class to corresponding index -->
 <!-- needs to check if at edge -->
 <!-- if true etc -->
<!-- then move down (function) when alien furthest to left hits edge  -->
 <!-- needs to call on ifAtEdge function ?? -->
<!-- then move right (function)  -->
<!-- then down when alien furthest to right hits edge -->
<!-- needs a function to check (if at left edge) and (if at right edge)-->
 <!-- needs to call moveDown() ??-->
<!-- cell index of EACH alien needs to change each time they move -->
<!-- // initialise bullet(s) -->
<!-- first 'bullet' cell index dependent on 'playerIndex' -->
 <!-- this needs to be stored in a variable 'bulletIndex' -->
<!-- function for moving bullet -->
 <!-- bullets will move UP (-10) Y axis-->
 <!-- need to add and remove 'bullet' class -->
 <!-- need a variable for new cell and cell index needs to become variable 'bulletIndex'-->
  <!-- needs to check if new cell contains alien class and if not needs to add class to new cell -->
  <!-- need to remove 'bullet' class from 'bulletIndex' -->
 <!-- need to change index each time moves a cell -->
<!-- // bullet hits alien -->
<!-- function isThereAnAlien (index) - return allTheCells[index].classList.contains('alien') -->
<!-- function hitAlien -->
 <!-- if statement using the return value from isThereAnAlien OR filter to find if cell has alien -->
  <!-- if true - score++ -->
  <!-- remove 'alien' class from CORRECT alienIndex --> .
  <!-- remove bullet 'class' from bulletIndex -->
  <!-- MAYBE have explosion class apear with set(timeout) equal to set interval time -->
<!-- // alien hits 'planets surface' -->
<!-- function checking if alien is on bottom edge -->
<!-- function checking if alient hits cell which is player index -->
<!-- function for if alien is on bottom edge -->
 <!-- lives--, remove life 'class' from one of lives divs -->
 <!-- needs to call initialise aliens again -->
<!-- // reset game -->
 <!-- need a variable isGameRunning = fales -->
 <!-- variable that holds the reset 'button' -->
 <!-- this needs to turn to true when initialising players/bullets/aliens -->
 <!-- function endGame needs-->
  <!-- must turn isGameRunning back to false -->
  <!-- must reset score -->
  <!-- must reset lives -->
  <!-- need a event listener on reset button variable that passes endGame function --
  

<!-- EXTRAS -->
<!-- start button -->
<!-- new level - when all aliens removed - level intensity increases -->
<!-- function to save players progress (leaderBoard) -->
<!-- sound plays when alien hit -->
<!-- sound plays when all aliens removed  -->
