SPACE INVADERS - GA PROJECT 1

![image](https://user-images.githubusercontent.com/81522060/151714445-47aa67ff-cc23-4104-9b87-ed6c5c4849db.png)

TABLE OF CONTENTS

Overview

Technologies Used

Deployment

Brief

Development Process

Planning

Reaching MVP

Stretch Goals

Wins & Challenges

Bugs & Known Errors

Future Improvements

Key Learnings

OVERVIEW

My first dev project for the Software Engineering Immersive course and also my first ever project using JavaScript.

TECHNOLOGIES USED 

HTML5

CSS3

JavaScript

GitHub

DEPLOYED PROJECT LINK

The game has been deployed in GitHub pages and is available [here](https://shak-h.github.io/Space-Invaders/).

BRIEF

We were briefed with creating a game using JS grids. I decided to create the game Space Invaders, with a Star Wars theme. Where players would be able to play the part of Han Solo, fighting a fleet of TIE fighters, in the iconic Millennium Falcon.

Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada, before it reaches the planet's surface using a mounted gun turret.

The player can only move left or right. The aliens also move from left to right, and also down each time they reach the side of the screen. The aliens also periodically drop bombs towards the player.

Once the player has destroyed a wave of aliens, the game starts again. The aim is to achieve the highest score possible before either being destroyed by the aliens, or allowing them to reach the planet's surface.

DEVELOPMENT PROCESS

PLANNING

My initial research for the game started when I was around 12 years old and first played Space Invaders on my fathers PC, the first video game I ever played. So when the opportunity came to create a grid based game, choosing Space Invaders was an easy decision.

I started developing the game by sketching out a wireframe to help visualise how the game would look, along with some of the HTML and CSS that would be required.

![image](https://user-images.githubusercontent.com/81522060/151721980-1e6493b2-0ac2-447f-a6df-f04342f6bc7e.png)

I then listed the functionality I wanted to include before deciding which would be part of the MVP and which would be my stretch goals.

Using the wireframe and planned functionality, I wrote pseudocode for the MVP, breaking it down into bite size chunks to allow me to think through all the necessary steps that were required. Here’s an example of pseudocode for the player movement logic:


REACHING THE MVP

Building the grid

The first step was creating the grid. I did this using a combination of HTML and CSS. I created a div with a class of “grid”, which contained separate divs for each cell and then styled the grid using CSS. 

![image](https://user-images.githubusercontent.com/81522060/151722045-7c97fa8a-e458-4088-8471-fb6eef6360b5.png)

Aliens

I decided early on that I wanted the aliens to start in random cells on the grid (a decision that in hindsight I would not have made), and I suspected having them move in unison, in particular when moving down together, would be one of the more challenging aspects of the project. I first wrote functions to allow the aliens to randomly appear on the first 3 rows. 



I then wrote functions to; find the indexes of the aliens, check if they were at the edge of the grid, and then move down, which would also check to see if the aliens had reached the bottom row of the grid. 




Finally, I wrote a function to move the aliens across the grid at a set interval, and calling the other functions where appropriate.



Player start position and movement

I had my aliens, now I needed my player. Again, I wanted the player to appear in a random cell on the bottom row of the grid. 



I wrote a function to find the index of the player to allow for movement and then added event listeners and functions to handle left and right arrow keydowns, including logic to check if the player had reached the edge of the grid.


Lasers

With the aliens and player now moving (somewhat) correctly, I now needed to give the player the ability to shoot the aliens. I added a keydown event listener for the ‘F’ key, which would call a function to generate a laser to appear directly above the players current index, as well as, a sound effect on a timeout to go with it, as well as, calling another function to move up the grid at a set interval. 


If it hits the alien, it calls a function which would remove the alien, add an explosion and sound effect, and add to the players score. 



Design and audio

I really wanted a theme for the game, rather than copying the original Space Invaders, and Star Wars was a perfect fit.  

STRETCH GOALS

Once my MVP was complete I was able to start working on some of my stretch goals. 

The first was adding sound effects. I wanted the user to have as many of their senses stimulated as possible, as well as, giving them the full Star Wars experience. This meant using appropriate sound effects where possible. I did this by not only adding lazer and explosion sounds using set Timeouts to make them smooth, but also by adding the rolling text and Star Wars theme tune as soon as the page was clicked on.



I also wanted to add levels with increasing difficulty by making the speed of the alien movement increase. I was able to add the increasing levels with faster movement, however, the randomised initialisation of the aliens caused a bug, where the number of aliens on each wave decreased, so that by the third wave no aliens appeared.

WINS & CHALLENGES

I was really happy with how the game looked and sounded. The theme was very clear and there were lots of aspects that supported the theme, from graphics to sounds. While I would not choose to have randomly appearing aliens again, due to the complications it caused, I was still happy I was able to make the MVP work with this feature included.

I was most challenged by the alien movement - getting them to move in sync, in the right direction, and drop when any one alien hit the barrier was a challenge. Also, as my first programming project, I was challenged by the intensity of concentration and the frustration that can be experienced when your code does not quite work the way you want it to. I had my first trip to the dreaded JS valley of despair, but came out all the better for it.

KNOWN BUGS & ERRORS



FUTURE IMPROVEMENTS

High Scores scoreboard using local storage.
Fixed bug for when levels increase.
Add the ability for aliens to fire lasers.
Different types of aliens with different points, including bonus UFO.
Adding responsive design.

KEY LEARNINGS

Prioritising my time was a big take away, I realised I probably spent too much time on styling, that could have been used to improve the functionality of the game. 

JavaScript fundamentals. This was my first JavaScript project and no frameworks were used so it really solidified the JS concepts, methods, and DOM manipulation I’d learnt so far.

Planning! Resisting the urge to start coding immediately was difficult, but writing detailed pseudocode made the development process much easier, particularly for the more challenging logic.

Four weeks into a career switch bootcamp, I absolutely loved building this project. It made me certain that software engineering is the right path for me.
