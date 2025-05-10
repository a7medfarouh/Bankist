# Bankist Website

A modern, minimalist banking website showcasing advanced DOM manipulation techniques and smooth user interactions. This project is part of the **"Complete JavaScript Course"** by Jonas Schmedtmann.

## Features

- **Modal Windows**: Interactive modal for account creation.
- **Smooth Scrolling**: Navigation links and buttons scroll smoothly to sections.
- **Tabbed Interface**: Dynamic tabbed content for banking operations.
- **Menu Fade Animation**: Subtle hover effects on navigation items.
- **Sticky Navigation**: Navigation bar sticks to the top on scroll.
- **Reveal on Scroll**: Sections animate into view as you scroll.
- **Lazy Loading Images**: Optimized image loading for better performance.
- **Slider Component**: Interactive slider with dot navigation and keyboard support.

---

## Technologies Used

- **HTML5**: Semantic structure of the website.
- **CSS3**: Styling and animations.
- **JavaScript (ES6+)**: DOM manipulation and interactivity.
- **Intersection Observer API**: For scroll-based animations and lazy loading.

---

## Project Structure

```
starter/
│
├── index.html         # Main HTML file
├── style.css          # CSS for styling
├── script.js          # JavaScript functionality
├── img/               # Image assets
└── README.md          # Project documentation
```

---

## How to Use

1. Clone the repository:
   ```bash
   git clone https://github.com/a7medfarouh/Bankist.git
   ```

2. Open the `index.html` file in your browser to view the project.

---

## Key Components

### 1. **Modal Window**
- Opens when clicking "Open Account".
- Closes on clicking the close button, overlay, or pressing the `Escape` key.

### 2. **Smooth Scrolling**
- Navigation links and buttons scroll smoothly to their respective sections.

### 3. **Tabbed Interface**
- Switch between tabs to view different banking operations.

### 4. **Sticky Navigation**
- Navigation bar becomes sticky when scrolling past the header.

### 5. **Reveal Sections**
- Sections are hidden initially and revealed as they enter the viewport.

### 6. **Lazy Loading Images**
- Images are loaded only when they are about to enter the viewport, improving performance.

### 7. **Slider**
- Interactive slider with:
  - Left/right navigation buttons.
  - Dot navigation.
  - Keyboard support for arrow keys.

---

## Code Highlights

### Intersection Observer API
Used for:
- Sticky navigation:
  ```javascript
  const stickyNav = function (entries) {
    const [entry] = entries;
    nav.classList.toggle('sticky', !entry.isIntersecting);
  };

  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });

  headerObserver.observe(header);
  ```
- Reveal sections:
  ```javascript
  const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
  ```


---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Acknowledgments

- Design and concept by **Jonas Schmedtmann**.
- Part of the **"Complete JavaScript Course"**.

---

## License

This project is for educational purposes only. Do not use it for commercial purposes.
