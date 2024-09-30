// Wait for the DOM to fully load before initializing functionality
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();            // Initialize smooth scrolling
    setupContactFormValidation();      // Initialize form validation
    generateSocialMediaIcons();        // Dynamically generate social media icons
    setupLoader();                     // Initialize loader functionality
    initializeDropdowns();             // Setup dropdown functionality
    initializeReadMoreButtons();       // Setup "Read More" buttons
  });
  
  // 1. Smooth Scrolling Functionality
  function setupSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const targetId = anchor.getAttribute('href'); // Get the target ID
            const targetSection = document.querySelector(anchor.getAttribute('href'));

            if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error(`Element with ID "${targetId}" not found.`);
        }
        });
    });
  }
  
  // 2. Contact Form Validation
  function setupContactFormValidation() {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', event => {
        event.preventDefault();
  
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();
  
        if (validateEmail(email) && name && message) {
            alert('Thank you for contacting us! We will get back to you shortly.');
            form.reset();  // Clear the form after successful submission
        } else {
            alert('Please fill out all fields with valid information.');
        }
    });
  }
  
  // Helper function to validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // 3. Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
  mobileMenu.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Toggle the active class
    mobileMenu.classList.toggle('active'); // Toggle active class on the mobile menu button
  });


  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
        mobileMenu.classList.remove('active');
    });
  });

} else {
    console.error('Mobile menu element not found.');
  }
  
  // 4. Generate Social Media Icons Dynamically
  function generateSocialMediaIcons() {
    const socialLinks = [
        { platform: 'Facebook', url: 'https://facebook.com', imgSrc: 'Images/facebook-icon.png' },
        { platform: 'Instagram', url: 'https://instagram.com', imgSrc: 'Images/instagram-icon.png' },
        { platform: 'Twitter', url: 'https://twitter.com', imgSrc: 'Images/twitter-icon.png' },
        { platform: 'TikTok', url: 'https://tiktok.com', imgSrc: 'Images/tiktok-icon.png' }
    ];
  
    const socialContainer = document.querySelector('.social-links');
    socialContainer.innerHTML = ''; // Clear existing content
  
    socialLinks.forEach(link => {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        const img = document.createElement('img');
  
        anchor.href = link.url;
        anchor.target = '_blank';
        img.src = link.imgSrc;
        img.alt = `${link.platform} Icon`;
  
        anchor.appendChild(img);
        listItem.appendChild(anchor);
        socialContainer.appendChild(listItem);
    });
  }
  
  // 5. Loader Functionality
  function setupLoader() {
    const loader = document.getElementById('loader');
  
    // Show loader
    function showLoader() {
        loader.style.display = 'block';
    }
  
    // Hide loader
    function hideLoader() {
        loader.style.display = 'none';
    }
  
    // Form submit loader example
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
        showLoader(); // Show loader on form submit
        setTimeout(() => {
            hideLoader(); // Hide loader after simulated delay (e.g., API call)
            alert('Form submitted!');
        }, 2000); // Simulate async operation, adjust time as needed
    });
  
    // Minimum loading time in milliseconds
    const MIN_LOADING_TIME = 2000; // 2 seconds
  
    window.addEventListener('load', function () {
        const loadingStartTime = performance.now(); // Track when loading started
  
        // Calculate how long the loading took
        const loadingDuration = performance.now() - loadingStartTime;
  
        // Ensure minimum loader visibility
        if (loadingDuration < MIN_LOADING_TIME) {
            setTimeout(() => {
                hideLoaderWithAnimation(loader);
            }, MIN_LOADING_TIME - loadingDuration);
        } else {
            hideLoaderWithAnimation(loader);
        }
    });
  
    // Function to hide the loader with animation
    function hideLoaderWithAnimation(loader) {
        loader.classList.add('hidden'); // Assuming 'hidden' class fades out the loader
        setTimeout(() => {
            loader.style.display = 'none'; // Remove from DOM after fade-out
        }, 500); // Adjust to match fade-out duration
    }
  }
  
  // 6. "Read More" Buttons Functionality
  function initializeReadMoreButtons() {
    const readMoreButtons = document.querySelectorAll('.read-more');
    const moreInfoSections = document.querySelectorAll('.more-info');
  
    readMoreButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const moreInfo = moreInfoSections[index];
            if (moreInfo.style.display === 'block') {
                moreInfo.style.display = 'none';  
                button.textContent = 'Read More';  
            } else {
                moreInfo.style.display = 'block'; 
                button.textContent = 'Read Less'; 
            }
        });
    });
  }
  
  // 7. Dropdown Functionality
  function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown'); 
    
    dropdowns.forEach(dropdown => {
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      const dropbtn = dropdown.querySelector('.dropbtn');
      
      // Attach click event to each dropdown button
      dropbtn.addEventListener('click', event => {
        event.stopPropagation();  

       // Toggle visibility for the clicked dropdown
        dropdownContent.classList.toggle('show');  

        // Close other dropdowns 
            closeOtherDropdowns(dropdownContent);
        });
    });
  
    // Close all dropdowns if clicking outside of them
    document.addEventListener('click', () => {
      closeAllDropdowns();
    });
  }
  
  // Close all dropdowns
  function closeAllDropdowns(currentDropdown) {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
      // Close dropdowns if they aren't the currently active one
      if (dropdown !== currentDropdown && dropdown.classList.contains('show')) {
        dropdown.classList.remove('show');  // Hide dropdown by removing the 'show' class
      }
    });
  }

// Close all dropdowns
function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown-content');
  dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show'); // Hide all dropdowns
  });
}

// JavaScript for dropdown functionality
function toggleDropdown(id) {
  var dropdownContent = document.getElementById(id);
  // Toggle the display of the dropdown content
  dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
}

// Close dropdown if user clicks outside
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          if (dropdowns[i].style.display === 'block') {
              dropdowns[i].style.display = 'none'; // Close dropdown if clicked outside
          }
      }
  }
}




// Initialize the dropdown functionality
initializeDropdowns();















