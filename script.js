particlesJS('particles-js',
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle"
      },
      "opacity": {
        "value": 0.5,
        "random": false
      },
      "size": {
        "value": 3,
        "random": true
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      }
    },
    "retina_detect": true
  }
);

// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// GitHub username - change this to your GitHub username
const githubUsername = 'MrKnights1';

// Fetch GitHub repositories
async function fetchGitHubProjects() {
  try {
    // Show loading indicator
    document.querySelector('.loading-projects').style.display = 'flex';
    document.querySelector('.project-grid').style.display = 'none';
    
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=stars&per_page=10`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Sort by stars (most popular first)
    const sortedRepos = repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    
    // Get the top 3 repositories
    const topRepos = sortedRepos.slice(0, 3);
    
    // Hide loading indicator
    document.querySelector('.loading-projects').style.display = 'none';
    
    // Display the repositories
    displayGitHubProjects(topRepos);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    
    // Hide loading indicator
    document.querySelector('.loading-projects').style.display = 'none';
    
    // If there's an error, show the static project cards
    document.querySelector('.project-grid').style.display = 'grid';
  }
}

// Display GitHub repositories in the project grid
function displayGitHubProjects(repos) {
  const projectGrid = document.querySelector('.project-grid');
  
  // Clear existing project cards if any
  projectGrid.innerHTML = '';
  
  // Show the grid
  projectGrid.style.display = 'grid';
  
  // If no repositories found
  if (repos.length === 0) {
    projectGrid.innerHTML = '<div class="no-projects"><p>No GitHub repositories found.</p></div>';
    return;
  }
  
  // Create a card for each repository
  repos.forEach(repo => {
    // Extract topics/languages as tech stack
    let techStack = '';
    
    // If we have languages_url, we could fetch languages but that would be an additional API call per repo
    // For simplicity, we'll use the language property
    if (repo.language) {
      techStack += `<span class="tech">${repo.language}</span>`;
    }
    
    // Add topics if available
    if (repo.topics && repo.topics.length > 0) {
      repo.topics.slice(0, 3).forEach(topic => {
        techStack += `<span class="tech">${topic}</span>`;
      });
    }
    
    // Create the project card HTML
    const cardHTML = `
      <div class="project-card reveal">
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description available'}</p>
        <div class="tech-stack">
          ${techStack || '<span class="tech">No technologies specified</span>'}
        </div>
        <div class="repo-stats">
          <span class="stat"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
          <span class="stat"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank" class="button">View Project</a>
      </div>
    `;
    
    // Add the card to the grid
    projectGrid.innerHTML += cardHTML;
  });
  
  // Re-run reveal to ensure animations work
  reveal();
}

// Typing Effect
const typeText = document.querySelector('.typing-text');
const phrases = ['IT Systems Specialist', 'Software Developer', 'Full-Stack Developer'];
let phraseIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < phrases[phraseIndex].length) {
        typeText.textContent += phrases[phraseIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}

function erase() {
    if (charIndex > 0) {
        typeText.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 500);
    }
}

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 150) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
let isDarkTheme = true;

// Define theme colors
const darkTheme = {
    primaryColor: '#000000',
    secondaryColor: '#22272e',
    textColor: '#ffffff',
    accentColor: '#00ff00',
    sectionBg: 'rgba(0, 0, 0, 0.8)',
    cardBg: 'rgba(255, 255, 255, 0.1)',
    cardBorder: 'rgba(255, 255, 255, 0.1)'
};

const lightTheme = {
    primaryColor: '#f5f5f5',
    secondaryColor: '#e0e0e0',
    textColor: '#333333',
    accentColor: '#008800',
    sectionBg: 'rgba(255, 255, 255, 0.9)',
    cardBg: 'rgba(0, 0, 0, 0.05)',
    cardBorder: 'rgba(0, 0, 0, 0.1)'
};

// Function to toggle theme
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    
    // Update root variables
    const root = document.documentElement;
    const theme = isDarkTheme ? darkTheme : lightTheme;
    
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--text-color', theme.textColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--section-bg', theme.sectionBg);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--card-border', theme.cardBorder);
    
    // Toggle icon
    if (isDarkTheme) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    
    // Update particles color
    if (window.pJSDom && window.pJSDom[0]) {
        const particlesJS = window.pJSDom[0].pJS;
        const newColor = isDarkTheme ? "#ffffff" : "#333333";
        
        particlesJS.particles.color.value = newColor;
        particlesJS.particles.line_linked.color = newColor;
        
        // Update existing particles
        particlesJS.particles.array.forEach(p => {
            p.color.value = newColor;
        });
        
        // Update lines
        particlesJS.fn.particlesRefresh();
    }
}

// Add event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// Initialize
type();
reveal();
fetchGitHubProjects(); // Fetch GitHub projects when the page loads

// Navigation Menu
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });
}

// Close mobile menu when clicking a nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    
    // Set active link
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
    
    // If it's the home link, scroll to top
    if (link.getAttribute('href') === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
});

// Set active nav link based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const scrollPosition = window.scrollY + 100; // Offset for better accuracy
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}` || 
            (sectionId === undefined && link.getAttribute('href') === '#')) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Change navbar style on scroll
function styleNavbar() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
}

window.addEventListener('scroll', () => {
  setActiveNavLink();
  styleNavbar();
});

// Initialize navbar style
styleNavbar();
setActiveNavLink();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    
    // If it's the home link (just "#"), scroll to top
    if (targetId === '#') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
}

window.addEventListener('scroll', toggleBackToTopButton);

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
