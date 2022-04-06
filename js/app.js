/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


/** 
* @description Build menu.
*/
const listContainer = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
let i;

function createNewElements(){
    for(i = 1; i <= sections.length; i++){
        // Create new elements - <li> and <a>
        const listitems = document.createElement('li');
        const anchor = document.createElement('a');
        
        listitems.innerHTML="Sectiion"+i;
    
        // Add href nad class attribute to <a> element
        anchor.setAttribute("class", "menu__link");
        anchor.setAttribute("href", "#section"+i);
        anchor.setAttribute("id", "ss"+i);
    
        // Add id to each list element to scroll to section on link click - next part
        listitems.setAttribute("id", "s"+i);
    
        anchor.appendChild(listitems);
        listContainer.appendChild(anchor);
    }
}


/** 
* @description Specify that the event is only handled once. 
* This is achieved by passing the property once to the object. 
* If we set once to true, the event will only be fired once.
*/
document.addEventListener('mousemove', function() {
    createNewElements();
},{once : true});


// Scroll to section on link click
document.addEventListener('click', function(event){
    // This line of code will prevent the default action.
    event.preventDefault();

    // Iterate the number of sections & menu items
    for(let i = 0; i <= sections.length; i++){

        // Variable for each section with its id.
        const sec = document.getElementById('section'+i);

        // Used event.target.id to check the current clicked item's id
        // Each list has an id.
        if(event.target.id === "s"+i || event.target.id === "ss"+i){
            // scrollIntoView : this method scrolls an element into the visible area of the browser window.
            // When a link is clicked it has a scroll behavior to the section.
            sec.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }
});


/** 
* @description Set sections as active - add class 'active' to section when near top of viewport.
*/
const anchors = document.getElementsByTagName('a');

function makeActive(){
    for(let n = 0; n < sections.length; n++){
        const box = sections[n].getBoundingClientRect(); // getBoundingClientRect() : to get accurate viewport of the page.

        if(box.top <= 150 && box.bottom >= 150){
            sections[n].classList.add("active");
            anchors[n].classList.add("active_a");
        }else{
            sections[n].classList.remove("active");
            anchors[n].classList.remove("active_a");
        }
    }
}

document.addEventListener('scroll', function(){
    makeActive();
});


/** 
* @description Hide fixed navigation bar while not scrolling (it should still be present on page load).
*/
const menu = document.querySelector(".page__header"); 
let timer = null; // default value

document.addEventListener("scroll", function(){

    if (timer !== null){
        clearTimeout(timer);
        menu.style.display = "block";
    }

    // As the value of timer is null by default, this line will run first.
    timer = setTimeout(hide, 2000); // after 2 seconds no scrolling, hide navigation bar

    function hide(){
        menu.style.display = "none";
    }
});


/** 
* @description Make sections collapsible.
*/
const sectionBox = document.getElementsByClassName('landing__container');
const sectionHeading = document.querySelectorAll('h2');
const contents = document.querySelectorAll('p');
let j;
let firstP = 0;
let secondP = 1;

// Set class name to heading for each section and their content
for(j = 0; j < sections.length; j++){
    const divContainer = document.createElement('div');
    divContainer.setAttribute("class","content");
    sectionHeading[j].setAttribute("class", "collapsible");
    
    // Each section has two paragraphs 
    contents[firstP].setAttribute("class", "content"+firstP);
    contents[secondP].setAttribute("class", "content"+secondP);

    // Add these two <p> element into the <div> element which has class name called 'contect'
    divContainer.appendChild(contents[firstP]);
    divContainer.appendChild(contents[secondP]);

    sectionBox[j].appendChild(sectionHeading[j]);
    sectionBox[j].appendChild(divContainer);

    // Update the values to keep track of each paragraph
    firstP+=2;
    secondP+=2;
}

const coll = document.getElementsByClassName("collapsible");
let k;

for (k = 0; k < coll.length; k++) {
  
    coll[k].addEventListener("click", function() {

        // Toggle between two classes ('collapsible' and 'active') for an element.
        this.classList.toggle("active");

        const content = this.nextElementSibling;
        if (content.style.display === "none") {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
  });
}


/** 
* @description Add a scroll to the top button on the page that’s only visible when the user scrolls below the fold of the page.
*/
const topButton = document.getElementById('topBtn');

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  // When the user scrolls down 20px from the top of the document, show the button
  if (document.body.scrollTop > 2200 || document.documentElement.scrollTop > 2200) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

/** 
* @description When the user clicks on the button, scroll to the top of the document
*/
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}