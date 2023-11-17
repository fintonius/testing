

// FORM SUBMISSION

const contactSubmit = document.getElementById('contact-submit');
const form = document.querySelector('form');
const messageSent = document.getElementById('message-sent');

// SUBMIT EVENT LISTENER FUNCTION, REFRESH PAGE BLOCK, FORM RESETS, TRIGGERS MESSAGE SENT FUNCTION

contactSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    form.reset();
    messageSentMessage();
})

// DISPLAYS MESSAGE SENT CONFIRMATION AND REMOVES IT AFTER 5 SECONDS

function messageSentMessage() {
    messageSent.classList.remove('hide');
    setTimeout(() => {
        messageSent.classList.add('hide');
    }, 5000)
}


// VALIDATES FORM AND DISPLAYS COLOURS / ICONS WHILST USER IS TYPING TO SIGNAL WHETHER INPUTS ARE VALID

function validateForm() {
    const name = document.getElementById("name").value;
    const company = document.getElementById("company").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;


    if (name !== "") {
        document.getElementById("nameTick").innerHTML = "✔";
        document.getElementById("name").classList.add('validate__input')
    } else {
        document.getElementById("nameTick").innerHTML = "";
        document.getElementById("name").classList.remove('validate__input')
    }

    if (company !== "") {
        document.getElementById("companyTick").innerHTML = "✔";
        document.getElementById("company").classList.add('validate__input')
    } else {
        document.getElementById("companyTick").innerHTML = "";
        document.getElementById("company").classList.remove('validate__input')
    }

    const emailTick = document.getElementById("emailTick");
    const emailError = document.getElementById("emailError");
    const emailErrorMessage = document.getElementById("emailErrorMessage");
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    ;

    if (email !== "") {
        if (emailRegex.test(email)) {
            emailTick.innerHTML = "✔";
            emailTick.classList.remove("hide")
            emailError.innerHTML = "";
            emailErrorMessage.innerHTML = "";
            document.getElementById("email").classList.add('validate__input')
        } else {
            emailTick.innerHTML = "";
            emailTick.classList.add("hide")
            emailError.innerHTML = "✖";
            emailErrorMessage.innerHTML = "Please enter a valid email address.";
            document.getElementById("email").classList.remove('validate__input')
        }
    } else {
        emailTick.innerHTML = "";
        emailError.innerHTML = "";
        emailErrorMessage.innerHTML = "";
        emailTick.classList.remove("hide")
        document.getElementById("email").classList.remove('validate__input');
    }

    if (message !== "") {
        document.getElementById("messageTick").innerHTML = "✔";
        document.getElementById("message").classList.add('validate__input')
    } else {
        document.getElementById("messageTick").innerHTML = "";
        document.getElementById("message").classList.remove('validate__input')
    }

    if (name !== "" && company !== "" && email !== "" && emailRegex.test(email) && email !== "") {
        form.classList.add('form__border_validate')
    } else {
        form.classList.remove('form__border_validate')
    }
}

// VALIDATE FORM EVENT LISTENERS, FUNCTIONS ON KEYUP AND FORM INPUT

contactSubmit.addEventListener('keyup', validateForm);
contactSubmit.addEventListener('input', validateForm);

// TESTIMONIALS
// Scrolling animation loop from Kevin Powell tut https://www.youtube.com/watch?v=iLmBy-HKIAw

const testimonials = document.querySelectorAll(".testimonials");

//CHECKS IF USER HAS 'PREFERS REDUCED MOTION' ENABLED
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addScrolling();
}

function addScrolling() {
    testimonials.forEach(testimonial => {
        testimonial.setAttribute("data-animated", true)

        const testimonialsScroll = testimonial.querySelector('.testimonials__scroll');
        const testimonialContent = Array.from(testimonialsScroll.children);

        testimonialContent.forEach(item => {
            let duplicatedCard = item.cloneNode(true);
            // ensures duplicated content is not read out twice by screen readers
            duplicatedCard.setAttribute('aria-hidden', true);
            testimonialsScroll.appendChild(duplicatedCard);
        })
    });
}

// ACCESSIBILITY MENU

const accessibilityMenu = document.querySelector(".accessibility__menu");

// checks the menu data-attribute 'open' to determine current state of menu
function openMenu() {
    (accessibilityMenu.dataset.open === "true") ? accessibilityMenu.dataset.open="false" : accessibilityMenu.dataset.open="true";
}

// use local storage to save the dark-mode state user has chosen
let colorMode = localStorage.getItem('colorMode');
console.log(colorMode);

// retrieves the relevant elements from the HTML that will have their styles changed
const colorModeBody = Array.from(document.getElementsByTagName("body"));
const colorModeTeamRole = Array.from(document.getElementsByClassName("team__role"));
const colorModeTestimonials = Array.from(document.getElementsByClassName("testimonials__card"));
// collects all the elements into 1 array for ease of use
const colorModeElements = colorModeBody.concat(colorModeTeamRole, colorModeTestimonials);

// Checks local storage to determine if user has selected an option previously and switches to that automatically
switch(colorMode) {
    case "darkMode":
        enableDarkmode()
        break;
    case "monochromeMode":
        enableMonochrome()
        break;
    case "barney":
        console.log('barnacles')
        break;
}

function enableDarkmode() {
    colorModeElements.forEach((item) => {item.classList.remove("monochromemode")});   
    colorModeElements.forEach((item) => {item.classList.add("darkmode")});
    //update current color mode in local storage
    localStorage.setItem('colorMode', 'darkMode');
}

function enableOriginal() {
    colorModeElements.forEach((item) => {item.classList.remove("darkmode", "monochromemode")});
    // clears local storage so old choice not being kept
    localStorage.setItem('colorMode', null);
}

function enableMonochrome() {
    colorModeElements.forEach((item) => {item.classList.remove("darkmode")});
    colorModeElements.forEach((item) => {item.classList.add("monochromemode")});  
    localStorage.setItem('colorMode', 'monochromeMode');      
}

