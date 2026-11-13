# Password Generator

# PassGen — Cryptographically Secure Password Generator

A modern, responsive web application built with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** for generating strong, high-entropy random passwords directly in the browser.

## Features

- **Cryptographically Secure Randomness:** Uses `window.crypto.getRandomValues()` with rejection sampling to eliminate modulo bias (never uses insecure `Math.random()`).
- **Guaranteed Character Diversity:** Ensures at least one character from every selected set (Uppercase, Lowercase, Numbers, Symbols) is included and securely shuffled via the Fisher-Yates algorithm.
- **Real-Time Entropy Meter:** Dynamically calculates password bit-entropy ($E = L \times \log_2(R)$) and updates strength feedback (`Weak`, `Fair`, `Medium`, `Strong!`).
- **One-Click Clipboard Copy:** Uses the asynchronous Clipboard API with legacy fallback and visual toast confirmation.
- **Fully Responsive Design:** Adapts fluidly across desktop monitors, tablets, and mobile phones (`320px` to `4K`), complete with a collapsible mobile navigation menu.
- **Zero Dependencies & Zero Tracking:** 100% client-side execution; generated passwords never leave the user's device.

## Project Structure

```text
passgen/
├── index.html      # Semantic markup, ARIA accessibility attributes, and modals
├── style.css       # CSS custom properties, glassmorphism styling, and media queries
├── script.js       # Modular IIFE script handling Web Crypto generation & UI state
└── README.md       # Project documentation