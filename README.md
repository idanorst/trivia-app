# The Trivia Quiz App
Following the tutorial called 'React Course - Beginner's Tutorial for React JavaScript Library [2022]' from 'freeCodeCamp.org', I made this app as the final solo project of Section 4 in the tutorial. 

The app is using the api of 'Open Trivia DB' to get the questions to use in the app. I also added some extra functionality where the player can choose the category and the difficulty of the quiz, inspired by the choices that I could make getting a url from 'Open Trivia DB'. 

## Structure
The app includes three pages; a start page, a settings page and the quiz page it self. After completing the quiz, the player is presented with the result at the bottom of the quiz page. 

## Added functionality
The tutorial from freeCodeCamp.org, gave an example for the design, and gave some requirements on the functionality. The first version was just a copy of the design and funcitonality given in the tutorial, but the latest version has some added functionality. 
Beside the requirements from the tutorial I've added: 
* My own desgin to the whole app
* A settings page where the user can choose the amount of questions, the category and the difficulty of the quiz
The choices can be made by clicking the different custom made dropdowns on the page, and the choices are kept and added to the url used in the API call. All the choices are inspired by the choices possible on the Open Triva Database website, but just some of them is chosen. 

## Bugs
I decided to use base64 as the encoding style, and used atob to encode the data. This solves the most common cases of special characters, but some are still left, and I haven't been able to figure out a solution to get rid of the last ones. 
