# 📱 Interactive Quiz App

A clean, modern, and interactive quiz application built with vanilla JavaScript, HTML, and CSS. It features a mobile-first design, instant feedback, a final score screen with celebratory confetti, and a review mode.

## ✨ Features

-   **Multiple-Choice Questions:** Engages users with a classic quiz format.
-   **Instant Feedback:** A modal pops up to inform the user if their answer was correct or incorrect.
-   **Score Tracking:** Calculates and displays the final score and percentage.
-   **Review Mode:** Allows users to go back through the questions to see their answers and the correct ones.
-   **Celebratory Animations:** Uses `tsparticles` to create a fun confetti explosion on the results screen.
-   **Sound Effects:** Plays a clapping sound for a more rewarding experience.
-   **Responsive Design:** Styled within a simulated phone frame for a polished, mobile-centric look.

## 🚀 Getting Started

To run this project locally, no special setup is required. Just follow these steps:

1.  **Download the files:**
    Make sure you have `index.html`, `style.css`, `script.js`, `data.js`, and `animation.js` in the same folder.

2.  **Open in a browser:**
    Open the `index.html` file in your favorite web browser (like Chrome, Firefox, or Edge).

The quiz will start immediately.

## 📂 Project Structure

The project is organized into the following files:

```
├── index.html          # The main structure of the web page
├── style.css           # All styles for the application, including the phone frame and modal
├── script.js           # Core application logic, state management, and DOM manipulation
├── data.js             # Contains the array of quiz questions and answers
└── animation.js        # The tsparticles library for the confetti effect
```

### File Breakdown

-   **`index.html`**: Defines the HTML structure, including the quiz container, result screen, and feedback modal. It links all the necessary CSS and JavaScript files.
-   **`style.css`**: Provides the visual styling. Key aspects include:
    -   A `phone-frame` to simulate a mobile device.
    -   Flexbox for layout and alignment.
    -   Styles for answer buttons in different states (`correct`, `incorrect`).
    -   Keyframe animations for the feedback modal (`fadeIn`, `slideUp`).
-   **`script.js`**: The engine of the quiz. It handles:
    -   **State Management:** Tracks the `currentQuestion`, `score`, and `userAnswers`.
    -   **DOM Manipulation:** Dynamically loads questions and options.
    -   **Event Handling:** Manages clicks on answer buttons, the "Continue" button, and review navigation.
    -   **Core Logic:** Controls the flow between questions, the modal, the results screen, and the review mode.
    -   **Animations:** Triggers the confetti and sound effects.
-   **`data.js`**: A simple JavaScript file that exports a single constant, `quizQuestions`. This array of objects holds all the data for the quiz, making it easy to edit or expand.
-   **`animation.js`**: A minified bundle of the `tsparticles-confetti` library, which is used to create the confetti animation on the results screen.

## 🔧 How to Customize

### Changing the Questions

Modifying the quiz content is straightforward.

1.  Open the `data.js` file.
2.  Edit the `quizQuestions` array. You can:
    -   Change the text of a `question`.
    -   Modify the `options` array for any question.
    -   Update the `correctAnswer` to match one of the options.
    -   Add or remove question objects from the array.

**Example Question Object:**

```javascript
{
    id: 7, // Make sure the ID is unique
    question: "What is HTML?",
    options: ["A programming language", "A scripting language", "A markup language", "A style sheet language"],
    correctAnswer: "A markup language"
}
```

### Changing the Appearance

All visual styles can be modified in `style.css`. For example, to change the main theme color:

1.  Open `style.css`.
2.  Find the `.continue-button`, `.restart-button`, etc.
3.  Change the `background` property from `#460073` to your desired color.

```css
/* Example: in style.css */
.continue-button {
    background: #007BFF; /* New color */
    /* ... other styles */
}

.continue-button:hover {
    background: #0056b3; /* New hover color */
    /* ... other styles */
}
```

## 📄 License

This project is open-source and available under the MIT License.
