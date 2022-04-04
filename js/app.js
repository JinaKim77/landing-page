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

/*
 Objective: Build menu.
 
*/
const listContainer = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
let i = 0;

function createNewElements(){
    for(i = 1; i <= sections.length; i++){
        // Create new elements - <li> and <a>
        const listitems = document.createElement('li');
        const anchor = document.createElement('a');
        
        listitems.innerHTML="Sectiion"+i;
    
        // Add href nad class attribute to <a> element
        anchor.setAttribute("class", "menu__link");
        anchor.setAttribute("href", "#section"+i);
    
        // Add id to each list element to scroll to section on link click - next part
        listitems.setAttribute("id", "s"+i);
    
        anchor.appendChild(listitems);
        listContainer.appendChild(anchor);
    }
}

/*
 Objective: Specify that the event is only handled once. 
 This is achieved by passing the property once to the object. 
 If we set once to true, the event will only be fired once.
 
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

        // Declare a variable for each section with its id.
        const sec = document.getElementById('section'+i);

        // Used event.target.id to check the current clicked item's id
        // Each list has an id.
        if(event.target.id === "s"+i){
            console.log("s" + i + " clicked.");

            // This method scrolls an element into the visible area of the browser window.
            sec.scrollIntoView();
        }
    }
});

/*
 Objective: Set sections as active - add class 'active' to section when near top of viewport.

 */
const anchors = document.querySelectorAll('a');
let num = 0;
function makeActive(){
    for(num = 0; num <= sections.length; num++){
        const box = sections[num].getBoundingClientRect();

        if(box.top <= 150 && box.bottom >= 150){
            sections[num].classList.add("active");
            anchors[num].classList.add("active_a");
        }else{
            sections[num].classList.remove("active");
            anchors[num].classList.remove("active_a");
        }
    }
}

document.addEventListener('scroll', function(){
    makeActive();
});

/*
 Objective: Hide fixed navigation bar while not scrolling (it should still be present on page load).
 
*/











/*
 Objective: Make sections collapsible.

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

var coll = document.getElementsByClassName("collapsible");
var k;

for (k = 0; k < coll.length; k++) {
  
    coll[k].addEventListener("click", function() {

        this.classList.toggle("active");

        var content = this.nextElementSibling;
        if (content.style.display === "block") {
        content.style.display = "none";
        } else {
        content.style.display = "block";
        }
  });
}