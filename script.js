/**
 * Portfolio Interactive Logic
 * Minimal, ultra-responsive, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSkillFiltering();
  initOpportunitySelector();
  initRecruitmentForm();
  initActiveNavOnScroll();
});

/* -------------------------------------------------------------
 * 1. Mobile Menu Handling
 * ----------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
    } else {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  });

  const links = mobileMenu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
      if (window.lucide) {
        lucide.createIcons();
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Full Stack Capability Matrix Filtering
 * ----------------------------------------------------------- */
function initSkillFiltering() {
  const tabs = document.querySelectorAll('.skill-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab styling
      tabs.forEach(t => {
        t.classList.remove('active-skill-tab');
        t.classList.add('text-slate-600');
      });
      tab.classList.add('active-skill-tab');
      tab.classList.remove('text-slate-600');

      const category = tab.getAttribute('data-category');

      cards.forEach(card => {
        const domain = card.getAttribute('data-domain');
        if (category === 'all' || domain === category) {
          card.classList.remove('hidden');
          card.classList.add('animate-fade-in');
        } else {
          card.classList.add('hidden');
          card.classList.remove('animate-fade-in');
        }
      });
    });
  });
}

/* -------------------------------------------------------------
 * 3. Contact Form Opportunity Selector
 * ----------------------------------------------------------- */
function initOpportunitySelector() {
  const pills = document.querySelectorAll('.opp-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('active-opp');
        p.classList.add('border-slate-200', 'text-slate-600');
      });
      pill.classList.add('active-opp');
      pill.classList.remove('border-slate-200', 'text-slate-600');
    });
  });
}

/* -------------------------------------------------------------
 * 4. Clipboard & Toast Notifications
 * ----------------------------------------------------------- */
const EMAIL_ADDRESS = 'alex.vance.dev@gmail.com';

function copyEmail() {
  navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
    showToast(`Copied to clipboard: ${EMAIL_ADDRESS}`);
  }).catch(() => {
    const tempInput = document.createElement('input');
    tempInput.value = EMAIL_ADDRESS;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied to clipboard: ${EMAIL_ADDRESS}`);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}

/* -------------------------------------------------------------
 * 5. Resume Download Simulation
 * ----------------------------------------------------------- */
function downloadResume() {
  showToast('Preparing verified resume PDF download...');

  const resumeContent = `ALEX VANCE — SYSTEMS & FULL-STACK SOFTWARE ENGINEER
Email: alex.vance.dev@gmail.com | Location: Seattle, WA / San Francisco, CA
GitHub: github.com/alexvance | LinkedIn: linkedin.com/in/alex-vance

EDUCATION:
University of Washington, Seattle — B.S. in Computer Science (Expected June 2025)
Cumulative Major GPA: 3.91 / 4.00 (Dean's List)
Coursework: Distributed Systems, Operating Systems, Database Internals, Algorithms

TECHNICAL CAPABILITIES:
Languages: TypeScript, Go, JavaScript, Python, C++, SQL, HTML/CSS
Frameworks: React 19, Next.js, Node.js, Express, Tailwind CSS, Jest/Vitest
Databases & Infra: PostgreSQL, Redis, Apache Kafka, Docker, Linux, AWS (S3, ECS)

EXPERIENCE:
Software Engineering Intern (Contract) — DataLoop Technologies (May 2024 – Aug 2024)
- Redesigned asynchronous webhook pipeline, cutting latency from 420ms to 68ms.
- Built automated test suites in Go, lifting pipeline test coverage from 64% to 91%.
`;

  const blob = new Blob([resumeContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Alex_Vance_Software_Engineer_Resume.txt';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/* -------------------------------------------------------------
 * 6. Recruitment Form Handler
 * ----------------------------------------------------------- */
function initRecruitmentForm() {
  const form = document.getElementById('recruitment-form');
  const submitBtn = document.getElementById('submit-btn');
  const submitBtnText = document.getElementById('submit-btn-text');
  const successBanner = document.getElementById('form-success-banner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtnText.textContent = 'Transmitting inquiry...';

    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtnText.textContent = 'Send Direct Recruitment Inquiry';

      if (successBanner) {
        successBanner.classList.remove('hidden');
        setTimeout(() => {
          successBanner.classList.add('hidden');
        }, 6000);
      }
      showToast('Inquiry sent successfully to Alex Vance!');
    }, 1000);
  });
}

/* -------------------------------------------------------------
 * 7. Active Navigation Link on Scroll
 * ----------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}
