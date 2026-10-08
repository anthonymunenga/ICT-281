/* =====================================================
   ICT251 Web Technologies - Activity 3
   Anthony Munenga | Cyber Security | Mulungushi University

   Four interactive features:
   1. Contact form validation and preview   (compulsory)
   2. Photo gallery viewer with Previous / Next
   3. Project search / filter
   4. Study hours calculator

   All logic runs in the browser. Nothing is sent to a server.
   ===================================================== */

/* -----------------------------------------------------
   FEATURE 1: Contact form validation and preview
   ----------------------------------------------------- */

const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const previewBox = document.getElementById("form-preview");

// A simple email pattern: some text, @, some text, a dot, some text.
// Kept readable on purpose rather than using a very long strict pattern.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shows or clears an error message under one field.
 * Also adds a CSS class so the field border turns red or green.
 */
function setFieldState(input, errorElement, message) {
    if (message === "") {
        errorElement.textContent = "";
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    } else {
        errorElement.textContent = message;
        input.classList.add("is-invalid");
        input.classList.remove("is-valid");
    }
}

/**
 * Returns true only if the name is not empty after trimming spaces.
 * This is what rejects a name made of spaces only.
 */
function isNameValid(value) {
    return value.trim().length > 0;
}

/** Returns true only if the email matches the pattern above. */
function isEmailValid(value) {
    return EMAIL_PATTERN.test(value.trim());
}

/**
 * Returns true only if the message has real content after trimming.
 * A message of only spaces is rejected.
 */
function isMessageValid(value) {
    return value.trim().length > 0;
}

/**
 * Validates all three fields and shows feedback near each one.
 * Returns true when the whole form is valid.
 */
function validateForm() {
    let formIsValid = true;

    // Name
    if (!isNameValid(nameInput.value)) {
        setFieldState(nameInput, document.getElementById("name-error"),
            "Please enter your name (it cannot be only spaces).");
        formIsValid = false;
    } else {
        setFieldState(nameInput, document.getElementById("name-error"), "");
    }

    // Email
    if (!isEmailValid(emailInput.value)) {
        setFieldState(emailInput, document.getElementById("email-error"),
            "Please enter a valid email address, for example name@example.com.");
        formIsValid = false;
    } else {
        setFieldState(emailInput, document.getElementById("email-error"), "");
    }

    // Message
    if (!isMessageValid(messageInput.value)) {
        setFieldState(messageInput, document.getElementById("message-error"),
            "Please enter a message (it cannot be only spaces).");
        formIsValid = false;
    } else {
        setFieldState(messageInput, document.getElementById("message-error"), "");
    }

    return formIsValid;
}

/**
 * Builds the on-page summary shown when the form is valid.
 * Uses textContent so user-typed text is treated as plain text,
 * never as HTML.
 */
function showPreview() {
    const topic = document.getElementById("topic").value;

    // Clear anything from a previous submission.
    previewBox.textContent = "";
    previewBox.hidden = false;

    const heading = document.createElement("h3");
    heading.textContent = "Form validated successfully";

    const note = document.createElement("p");
    note.textContent =
        "This is a browser demonstration. Your details were checked locally " +
        "and no message has been sent.";

    const list = document.createElement("dl");

    // Each pair is a label and its value, added with textContent.
    const rows = [
        ["Name", nameInput.value.trim()],
        ["Email", emailInput.value.trim()],
        ["Topic", topic],
        ["Message", messageInput.value.trim()]
    ];

    rows.forEach(function (row) {
        const term = document.createElement("dt");
        term.textContent = row[0];

        const detail = document.createElement("dd");
        detail.textContent = row[1];

        list.appendChild(term);
        list.appendChild(detail);
    });

    previewBox.appendChild(heading);
    previewBox.appendChild(note);
    previewBox.appendChild(list);
}

// Stop the page reloading, then validate or show the preview.
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        showPreview();
    } else {
        previewBox.hidden = true;
        previewBox.textContent = "";
    }
});

/* -----------------------------------------------------
   FEATURE 2: Photo gallery viewer
   ----------------------------------------------------- */

// An array holds the photos, so Previous and Next just change an index.
const photos = [
    {
        src: "images/20260330_225719.jpg",
        alt: "Anthony smiling at the camera",
        caption: "My first picture"
    },
    {
        src: "images/20260919_132621.jpg",
        alt: "Anthony standing outdoors",
        caption: "My second picture"
    },
    {
        src: "images/IMG-20260714-WA0173.jpg",
        alt: "Anthony at a university event",
        caption: "My third picture"
    }
];

let currentPhotoIndex = 0;

const viewerImage = document.getElementById("viewer-image");
const viewerCaption = document.getElementById("viewer-caption");
const viewerCounter = document.getElementById("viewer-counter");
const prevButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");

/**
 * Draws the photo at the given index and updates the counter.
 */
function showPhoto(index) {
    const photo = photos[index];

    viewerImage.src = photo.src;
    viewerImage.alt = photo.alt;
    viewerCaption.textContent = photo.caption;
    viewerCounter.textContent = (index + 1) + " of " + photos.length;
}

// Previous wraps from the first photo to the last one.
prevButton.addEventListener("click", function () {
    currentPhotoIndex = currentPhotoIndex - 1;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }

    showPhoto(currentPhotoIndex);
});

// Next wraps from the last photo back to the first one.
nextButton.addEventListener("click", function () {
    currentPhotoIndex = currentPhotoIndex + 1;

    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    }

    showPhoto(currentPhotoIndex);
});

// Draw the first photo as soon as the page loads.
showPhoto(currentPhotoIndex);

/* -----------------------------------------------------
   FEATURE 3: Project search / filter
   ----------------------------------------------------- */

const searchInput = document.getElementById("project-search");
const resetButton = document.getElementById("project-reset");
const filterStatus = document.getElementById("filter-status");

// Turn the project cards into a real array so we can loop over them.
const projectCards = Array.from(document.querySelectorAll(".project-card"));

/**
 * Shows only the cards whose keywords or text match the search term.
 * Writes a helpful message when nothing matches.
 */
function filterProjects() {
    const term = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
        const keywords = card.getAttribute("data-keywords").toLowerCase();
        const text = card.textContent.toLowerCase();

        const matches = term === "" ||
            keywords.includes(term) ||
            text.includes(term);

        if (matches) {
            card.classList.remove("is-hidden");
            visibleCount = visibleCount + 1;
        } else {
            card.classList.add("is-hidden");
        }
    });

    // Status message under the filter bar.
    if (term === "") {
        filterStatus.textContent =
            "Showing all " + projectCards.length + " projects.";
    } else if (visibleCount === 0) {
        filterStatus.textContent =
            'No projects match "' + term + '". Try a different word.';
    } else {
        filterStatus.textContent =
            "Showing " + visibleCount + " of " + projectCards.length +
            ' projects matching "' + term + '".';
    }
}

searchInput.addEventListener("input", filterProjects);

// Reset clears the box and shows every project again.
resetButton.addEventListener("click", function () {
    searchInput.value = "";
    filterProjects();
    searchInput.focus();
});

// Show the starting message on load.
filterProjects();

/* -----------------------------------------------------
   FEATURE 4: Study hours calculator
   ----------------------------------------------------- */

const hoursInput = document.getElementById("hours-per-day");
const daysInput = document.getElementById("days-per-week");
const calcButton = document.getElementById("calc-button");
const calcResult = document.getElementById("calc-result");

/**
 * Reads both inputs, rejects bad values, and shows weekly hours.
 * Rejected cases: blank, non-numeric, negative hours,
 * and days outside the range 1 to 7.
 */
function calculateStudyHours() {
    const hoursText = hoursInput.value.trim();
    const daysText = daysInput.value.trim();

    calcResult.classList.remove("is-error");

    // Blank check first, so we do not treat "" as the number 0.
    if (hoursText === "" || daysText === "") {
        calcResult.textContent =
            "Please fill in both boxes before calculating.";
        calcResult.classList.add("is-error");
        return;
    }

    const hours = Number(hoursText);
    const days = Number(daysText);

    // Reject anything that is not a real number.
    if (Number.isNaN(hours) || Number.isNaN(days)) {
        calcResult.textContent =
            "Please enter numbers only, for example 2 and 5.";
        calcResult.classList.add("is-error");
        return;
    }

    // Reject negative hours.
    if (hours < 0) {
        calcResult.textContent =
            "Hours per day cannot be negative.";
        calcResult.classList.add("is-error");
        return;
    }

    // Reject days outside 1 to 7.
    if (days < 1 || days > 7) {
        calcResult.textContent =
            "Days per week must be between 1 and 7.";
        calcResult.classList.add("is-error");
        return;
    }

    const total = hours * days;

    calcResult.textContent =
        "That is " + total + " hours of study per week " +
        "(" + hours + " hours a day for " + days + " days).";
}

calcButton.addEventListener("click", calculateStudyHours);
