# PassGen — Generate a Random Password

PassGen is a simple, responsive password generator that helps users create strong and customizable passwords instantly. It allows users to choose their preferred character types, adjust password length, check password strength, and copy generated passwords with a single click.

## Description

PassGen was developed to provide a quick and convenient way to generate strong passwords without manually creating complicated combinations of characters.

The main motivation behind this project was to build a practical web application while improving my understanding of HTML, CSS, and JavaScript through a real-world project.

With PassGen, users can customize their passwords by selecting different character types and choosing a length between 6 and 64 characters. The application also includes a password strength indicator to provide immediate feedback about the generated password.

## Tech Stack

The project was built using:

- **HTML5** – For the structure and semantic markup of the application.
    
- **CSS3** – For styling, responsive layouts, animations, and visual effects.
    
- **JavaScript (ES6+)** – For password generation, user interactions, clipboard functionality, and password strength calculation.
    
- **Web Crypto API** – For generating cryptographically strong random values.
    
- **Google Fonts** – Inter and JetBrains Mono for typography.
    

No frontend frameworks or external JavaScript libraries were used.

## Design & Preview

PassGen features a modern, minimal, and dark-themed interface with emerald-green accents. The design focuses on simplicity, readability, and ease of use.

The application is designed to work across desktop, tablet, and mobile screens.

### Desktop Preview

![[desktop-preview.png]]
### Mobile Preview

![[mobile-preview.png]]

### Password Generation Demo

![[passgen-demo.gif]]
## Features

- **Random Password Generation:** Generate new passwords instantly.
    
- **Customizable Password Length:** Choose any password length between 6 and 64 characters.
    
- **Character Selection:** Customize passwords using four character categories:
    
    - Uppercase letters (A–Z)
        
    - Lowercase letters (a–z)
        
    - Numbers (0–9)
        
    - Symbols (!@#$%^&* and others)
        
- **Password Strength Indicator:** View an estimated password strength based on its length and selected character pool.
    
- **One-Click Copy:** Copy generated passwords directly to the clipboard.
    
- **Refresh Password:** Generate another password whenever you want.
    
- **Responsive Design:** Optimized for desktop and mobile devices.
    
- **Interactive Navigation:** Navigate through Features, Extension, Security, and About sections.
    
- **Information Modals:** Explore additional information through interactive modal windows.
    

## How to Use

Using PassGen is straightforward:

1. Open the PassGen website.
    
2. Select your preferred password length using the length slider (6–64 characters).
    
3. Choose the character types you want to include:
    
    - Uppercase
        
    - Lowercase
        
    - Numbers
        
    - Symbols
        
4. Click **Generate Password** to create a new password.
    
5. Check the password strength indicator.
    
6. Click **Copy** to copy the password to your clipboard.
    
7. Use **Refresh** whenever you want to generate another password.
    

You can change the length or character settings at any time to generate a different password.

## Project Structure

```
Password Generator/
│
├── index.html
├── style.css
├── script.js
│
├── screenshots/
│   ├── desktop-preview.png
│   ├── mobile-preview.png
│   └── passgen-demo.gif
│
└── README.md
```

## Development Challenges & Problem Solving

During development, I encountered a responsive design issue that affected the navigation bar on mobile screens.

### The Problem

After completing the application, I tested it on both desktop and mobile screen sizes. Everything appeared to work correctly, except for one issue: the **Log In** button was not visible in the mobile header.

### Finding the Cause

After reviewing my HTML and CSS, I discovered that the problem was caused by the placement of the login button inside the `.nav-menu` container.

On mobile screens (768px and below), the CSS media query applied `display: none` to the entire `.nav-menu` container.

Since the login button was originally a child of that container, it was hidden along with the navigation links.

### The Solution

I fixed the issue by restructuring the navigation bar:

1. Moved the login button outside the `.nav-menu` container.
    
2. Created a separate `.nav-actions` wrapper.
    
3. Placed the login button and hamburger menu button inside `.nav-actions`.
    
4. Used Flexbox to align both buttons properly.
    
5. Removed the unnecessary `width: 100%` rule from the mobile login button styling.
    

### Result

The login button now remains visible in the mobile header, positioned beside the hamburger menu, while the navigation links continue to work as a collapsible dropdown.

This experience helped me understand how HTML element hierarchy, CSS positioning, Flexbox, and responsive media queries work together.

## Security & Privacy

PassGen uses the browser's built-in **Web Crypto API** (`crypto.getRandomValues()`) to generate random values instead of relying on JavaScript's conventional `Math.random()` method.

The password generation process runs on the client side. No backend password-generation service is required.

The application does not include a remote account authentication system or cloud password storage. The Log In interface is currently a demonstration.

**Note:** The password strength indicator provides an estimate based on character-pool size and password length. It should not be treated as a complete security audit or a guarantee of password security.

## What I Learned

Building PassGen helped me strengthen my practical understanding of frontend development.

Some of the key concepts I explored include:

- Writing semantic and accessible HTML.
    
- Creating modern interfaces using CSS3.
    
- Building responsive layouts with Flexbox and CSS Grid.
    
- Working with JavaScript DOM manipulation and event listeners.
    
- Using the Web Crypto API for random value generation.
    
- Implementing clipboard functionality.
    
- Creating interactive modals and notifications.
    
- Calculating estimated password entropy.
    
- Debugging responsive design issues.
    
- Understanding how HTML structure and CSS media queries affect element visibility.
    

## Future Improvements

Some improvements I would like to explore in future versions include:

- Implementing actual user authentication.
    
- Developing a functional browser extension.
    
- Adding password history and saved password options.
    
- Introducing additional password customization options.
    
- Improving accessibility and keyboard navigation.
    

## Live Demo

[Visit PassGen](https://passwrod-gen.netlify.app/)

## Author

**Abdul Nafeh**

BS Computer Science Student | Full Stack Developer

- GitHub: [Abdul-Nafay-IT](https://github.com/Abdul-Nafay-IT)
    
- LinkedIn: [Connect with me](https://www.linkedin.com/in/abdul--nafay/)
    
- X: [Follow me](https://twitter.com/@1abdul_nafay)

---

If you find this project interesting, feel free to explore the repository and share your feedback!