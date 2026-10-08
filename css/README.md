# Anthony Munenga — ICT251 Web Technologies Portfolio

A responsive, interactive personal portfolio website built with plain HTML5,
CSS and JavaScript for ICT251 Activity 3 at Mulungushi University.

Live site: (add your Render URL here after deploying)

## Sections

- Welcome / hero
- About Me
- Projects and Skills
- My Hobbies
- My Learning Plan (with weekly study table)
- My Photo Gallery
- My Media (video and audio)
- Contact

## The four JavaScript features

All logic lives in `js/script.js`.

1. **Contact form validation and preview** (compulsory) — validates name, email
   and message on submit. Rejects whitespace-only names and messages, and
   incorrectly formatted emails. Shows feedback next to each field. When the
   form is valid it displays a local summary on the page. It is a browser
   demonstration only — no message is sent.
2. **Photo gallery viewer** — Previous and Next buttons change the displayed
   photo and caption. Both ends wrap around correctly.
3. **Project search / filter** — filters the three project cards by keyword,
   with a Reset button and a message when nothing matches.
4. **Study hours calculator** — accepts hours per day and days per week, and
   shows total weekly hours. Rejects blank, non-numeric and negative hours,
   and days outside 1 to 7.

## How to test the features

1. Open the site in a browser.
2. **Form:** press Send Message with empty fields, then with spaces only,
   then with an invalid email, then with valid details. The preview should
   appear only for valid input.
3. **Gallery:** click Next repeatedly to reach the last photo and confirm it
   wraps to the first. Click Previous on the first photo to confirm it wraps
   to the last.
4. **Filter:** type `css`, then `zzz`, then press Reset.
5. **Calculator:** try `2` and `5`, then `2` and `9`, then leave a box empty.

## Sources used

- MDN Web Docs — HTML, CSS and JavaScript reference
- freeCodeCamp Responsive Web Design course
