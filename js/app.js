$(document).ready(function () {

 const startTime = performance.now();
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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const Sections = document.querySelectorAll ("section");
const Nav = document.querySelector("#navbar__list");
const fragment = document.createDocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// creating & appending li & a elements into nav

function createNavBar (){
    for (const item of Sections){
       const title = item.getAttribute("data-nav");
       const Id = item.getAttribute("id");
       const List = document.createElement('li');
       const Link = document.createElement('a');
       Link.href = `#${Id}`;
       Link.textContent = title;
       Link.classList.add("menu__Link");
       // Adding .click on Anchor Tags

       // scrolling into view by using click listener
       Link.addEventListener("click" , e => {
       e.preventDefault();
       item.scrollIntoView({behavior: "smooth"}); 
       })

       List.appendChild(Link);
       fragment.appendChild(List);

    }
    Nav.appendChild(fragment);
}

createNavBar();

// Add class 'active' to section when near top of viewport

// setting observer options
let observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.70,
  }
  
// adding active class while scrolling using intersection observer.
const io = new IntersectionObserver((entries) => {
    const Links = Nav.querySelectorAll('a');
    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        // Adding 'active' class to anchors.
        Links.forEach(link =>
            {
                if (link.textContent === entry.target.dataset.nav){
                    link.classList.add('active');
                }
        // Removing 'active' class otherwise.
                else{
                    link.classList.remove('active');
                }
            })
        // Adding 'your-active-class' class to sections.
        entry.target.classList.add('your-active-class');
      } else {
        // Remove 'your-active-class' class otherwise.
        entry.target.classList.remove('your-active-class');
      }
    })
  },observerOptions)
  
  // Observing all the Sections in our viewport.

  // observing sections into view.
Sections.forEach((el) => {
    io.observe(el);
}) 

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


// testing performance
const endTime = performance.now();
console.log("Start Time :" + startTime);
console.log("End Time :" + endTime);
console.log("Performance Time :" + (endTime-startTime) + " milliSecond");
})