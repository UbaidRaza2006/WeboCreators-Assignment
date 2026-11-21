// Main JavaScript file for GMB Business Profile Service

// 1. Floating Call Button
(function initCallButton() {
    const isPagesDir = window.location.pathname.includes('/pages/') || document.querySelector('link[href*="../style/style.css"]');
    const basePath = isPagesDir ? '../assets/images/' : 'assets/images/';

    const link1 = document.createElement('a');
    link1.setAttribute('href', 'tel:+13322910473');
    link1.setAttribute('aria-label', 'Call Now');

    const image1 = document.createElement('img');
    image1.setAttribute('class', 'aClassName1');
    image1.src = basePath + 'phone-512.png';
    image1.alt = 'Webo Creators Call HD Icon';

    link1.appendChild(image1);
    document.body.appendChild(link1);
})();

// 2. FAQ Accordion functionality
(function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;

        btn.addEventListener('click', () => {
            faqItems.forEach(faq => {
                if (faq !== item) {
                    faq.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
})();

// 3. Mobile Navigation Menu Toggle
(function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');

    if (menuToggle && menu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');

            menuToggle.innerHTML = menu.classList.contains('active')
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu when clicking outside or clicking any link
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && !menuToggle.contains(e.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });

        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
})();

// 4. Form Validation for Contact & Inquiry Forms
(function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            let firstInvalid = null;

            // Remove existing error notices
            form.querySelectorAll('.error-feedback').forEach(el => el.remove());
            form.querySelectorAll('.form-success-banner').forEach(el => el.remove());

            const nameInput = form.querySelector('input[type="text"][placeholder*="Name" i], input[placeholder*="Name" i]');
            const emailInput = form.querySelector('input[type="email"]');
            const phoneInput = form.querySelector('input[type="tel"], input[placeholder*="332" i]');

            function markError(input, msg) {
                isValid = false;
                if (!firstInvalid) firstInvalid = input;
                input.style.borderColor = '#ef4444';
                const err = document.createElement('div');
                err.className = 'error-feedback';
                err.style.color = '#ef4444';
                err.style.fontSize = '12px';
                err.style.marginTop = '4px';
                err.style.marginBottom = '8px';
                err.style.textAlign = 'left';
                err.innerText = msg;
                input.insertAdjacentElement('afterend', err);
            }

            if (nameInput) {
                nameInput.style.borderColor = '';
                if (!nameInput.value.trim()) {
                    markError(nameInput, 'Please enter your name.');
                }
            }

            if (emailInput) {
                emailInput.style.borderColor = '';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailInput.value.trim()) {
                    markError(emailInput, 'Please enter your email.');
                } else if (!emailRegex.test(emailInput.value.trim())) {
                    markError(emailInput, 'Please enter a valid email address.');
                }
            }

            if (phoneInput) {
                phoneInput.style.borderColor = '';
                if (!phoneInput.value.trim()) {
                    markError(phoneInput, 'Please enter your phone number.');
                }
            }

            if (!isValid) {
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Success feedback
            const successNotice = document.createElement('div');
            successNotice.className = 'form-success-banner';
            successNotice.style.background = '#22c55e';
            successNotice.style.color = '#ffffff';
            successNotice.style.padding = '12px 18px';
            successNotice.style.borderRadius = '8px';
            successNotice.style.marginTop = '15px';
            successNotice.style.fontWeight = '600';
            successNotice.style.textAlign = 'center';
            successNotice.innerText = 'Thank you! Your inquiry has been sent successfully. Connecting to WhatsApp...';

            form.appendChild(successNotice);

            const userMsg = encodeURIComponent(
                `Hi GMB Expert! I submitted an inquiry from the website.\nName: ${nameInput ? nameInput.value : ''}\nEmail: ${emailInput ? emailInput.value : ''}\nPhone: ${phoneInput ? phoneInput.value : ''}`
            );

            setTimeout(() => {
                window.open(`https://wa.me/13322910473?text=${userMsg}`, '_blank');
            }, 1000);
        });
    });
})();

// 5. GBP Help Popup Modal
(function initGbpPopup() {
    const whatsappNumber = "13322910473";
    const whatsappMessage = "Hello! I need help with my Google Business Profile. Please review my case and guide me through the official verification or recovery process.";

    if (document.getElementById("gbp-help-popup")) return;

    const popupHTML = `
    <div id="gbp-help-popup" class="gbp-popup-overlay"
         role="dialog" aria-modal="true"
         aria-labelledby="gbp-popup-title">

      <div class="gbp-popup-card">
        <button class="gbp-popup-close"
                type="button" aria-label="Close popup">
          &times;
        </button>

        <div class="gbp-popup-icon">📍</div>

        <span class="gbp-popup-tag">
          GOOGLE BUSINESS PROFILE HELP
        </span>

        <h2 id="gbp-popup-title">
          Having Trouble With Your
          <span>Google Business Profile?</span>
        </h2>

        <p class="gbp-popup-description">
          Are you stuck in Google Business Profile verification?
          Do you have no physical office address or your profile
          has been suspended? Is your profile showing on Google
          but you don't have access, or is Google asking for
          verification? We provide genuine assistance by
          communicating with Google to help resolve your profile
          issues, even if you don't have an office or documents.
          We have proof of our work and are ready to help you.
          If you're interested, click the button below now!
        </p>

        <ul class="gbp-popup-services">
          <li>
            <span class="gbp-check">✓</span>
            Google Business Profile Verification Issues
          </li>
          <li>
            <span class="gbp-check">✓</span>
            Profile Setup Without a Physical Office
          </li>
          <li>
            <span class="gbp-check">✓</span>
            Suspended Profile Recovery Assistance
          </li>
          <li>
            <span class="gbp-check">✓</span>
            Recover Access to Your Existing Profile
          </li>
          <li>
            <span class="gbp-check">✓</span>
            Verification Issues Without Documents
          </li>
        </ul>

        <a class="gbp-popup-call"
             href="tel:+13322910473" style="margin-bottom: 14px;">
            <span>📞</span> Call Now
        </a>

        <a class="gbp-popup-cta"
           href="https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}"
           target="_blank"
           rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0
            C5.5 0 .14 5.36.14 11.96c0 2.1.55 4.15
            1.6 5.96L0 24l6.25-1.64a11.9 11.9 0 0 0
            5.85 1.53h.01c6.6 0 11.96-5.36
            11.96-11.96 0-3.2-1.25-6.2-3.55-8.45ZM12.1
            21.85a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97
           .99-3.62-.24-.37a9.86 9.86 0 0 1-1.52-5.28
           c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0
            1 7.02 2.91 9.85 9.85 0 0 1 2.9 7.02
           c0 5.47-4.45 9.92-9.97 9.92Zm5.45-7.43
           c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15
           -.2.3-.78.97-.95 1.17-.17.2-.35.22-.65.07
           -.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08
           -.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52
           .15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53
           -.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51
           h-.58c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05
            2.48s1.08 2.88 1.23 3.08c.15.2 2.12 3.24
            5.14 4.55.72.31 1.28.5 1.72.64.72.23
            1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42
           .25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/>
          </svg>
          Chat With Us on WhatsApp
        </a>

        <p class="gbp-popup-note">
          Every case is different. Outcomes depend on
          Google's policies and review decisions.
        </p>

        <button class="gbp-popup-dismiss" type="button">
          Maybe Later
        </button>
      </div>
    </div>
  `;

  function showPopup() {
    if (document.getElementById("gbp-help-popup")) return;
    document.body.insertAdjacentHTML("beforeend", popupHTML);

    const popup = document.getElementById("gbp-help-popup");
    const closeButtons = popup.querySelectorAll(".gbp-popup-close, .gbp-popup-dismiss");

    closeButtons.forEach(button => {
      button.addEventListener("click", () => {
        popup.remove();
      });
    });

    popup.addEventListener("click", (event) => {
      if (event.target === popup) popup.remove();
    });

    document.addEventListener("keydown", function onKeyDown(event) {
      if (event.key === "Escape" && document.getElementById("gbp-help-popup")) {
        popup.remove();
        document.removeEventListener("keydown", onKeyDown);
      }
    });
  }

  function initPopup() {
    setTimeout(showPopup, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPopup);
  } else {
    initPopup();
  }
})();
