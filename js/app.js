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
const allSections = document.getElementsByTagName("section");
const Nav = document.getElementById("navbar__list");
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

function buildingNav (){
    for (const item of allSections){

       const title = item.getAttribute("data-nav");
       const id = item.getAttribute("id");

       // Creating list items and anchors
       const List = document.createElement('li');
       const Link = document.createElement('a');
       Link.href = `#${id}`;
       Link.textContent = title;

       // Adding "menu__Link" class on Anchor Tags
       Link.classList.add("menu__Link");
       

       // scrolling into view by using click listener
       Link.addEventListener('click',event => {
        event.preventDefault();
        item.scrollIntoView({behavior: "smooth"}); 
        }) 

        // Appending anchors to List items

       List.appendChild(Link);

       // Appending List items to fragment
       fragment.appendChild(List);

    }

    // Appending Fragment to the nav bar
    Nav.appendChild(fragment);
}

window.addEventListener("load", buildingNav());

// Add class 'active' to section when near top of viewport

// setting observer options
let observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.70,
  }
  
// adding active class while scrolling using intersection observer.

const io = new IntersectionObserver((scrolledSections) => {
    const links = Nav.getElementsByTagName('a');

    for (const scrolledSection of scrolledSections){
      if (scrolledSection.isIntersecting) {

        // Adding 'active' class to anchors.

        for (const link of links){
          if (link.textContent === scrolledSection.target.dataset.nav){
            link.classList.add('active');
        }
// Removing 'active' class otherwise.
        else{
            link.classList.remove('active');
        }
        }
        // Adding 'your-active-class' class to sections.
        scrolledSection.target.classList.add('your-active-class');
      } else {
        // Remove 'your-active-class' class otherwise.
        scrolledSection.target.classList.remove('your-active-class');
      }
    }
  },observerOptions)
  
  // Observing all the Sections in our viewport.

  // observing sections into view.

  for (const section of allSections){
    io.observe(section);
}



// testing performance
const endTime = performance.now();
console.log("Start Time :" + startTime);
console.log("End Time :" + endTime);
console.log("Performance Time :" + (endTime-startTime) + " milliSecond");