document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Portfolio Modal Functionality using static HTML data attributes
  const portfolioModal = document.getElementById('portfolio-modal');
  const portfolioModalClose = portfolioModal.querySelector('.modal-close');
  const detailButtons = document.querySelectorAll('.portfolio-details-btn');
  const liveProjectLink = document.getElementById('live-project-link');

  function openPortfolioModal(button) {
    const card = button.closest('.portfolio-card');
    const content = card.querySelector('.portfolio-content');
    const imgEl = card.querySelector('.portfolio-image');
    // Retrieve data attributes
    const category = content.dataset.category || '';
    const title = content.dataset.title || '';
    const description = content.dataset.description || '';
    const client = content.dataset.client || '';
    const duration = content.dataset.duration || '';
    const technologies = content.dataset.technologies ? content.dataset.technologies.split(',') : [];
    const challenges = content.dataset.challenges ? content.dataset.challenges.split('|') : [];
    const solutions = content.dataset.solutions ? content.dataset.solutions.split('|') : [];
    const results = content.dataset.results ? content.dataset.results.split('|') : [];
    const liveUrl = content.dataset.liveUrl || '#';

    portfolioModal.querySelector('.modal-category').textContent = category;
    portfolioModal.querySelector('.modal-title').textContent = title;
    portfolioModal.querySelector('.modal-description').textContent = description;
    portfolioModal.querySelector('.modal-image').src = imgEl.getAttribute('src');
    portfolioModal.querySelector('.modal-image').alt = title;

    // Update the "View Live Project" button link based on portfolio card's data-live-url attribute
    liveProjectLink.setAttribute('href', liveUrl);

    // Client
    if (client) {
      portfolioModal.querySelector('.modal-client').style.display = 'block';
      portfolioModal.querySelector('.modal-client p').textContent = client;
    } else {
      portfolioModal.querySelector('.modal-client').style.display = 'none';
    }
    // Duration
    if (duration) {
      portfolioModal.querySelector('.modal-duration').style.display = 'block';
      portfolioModal.querySelector('.modal-duration p').textContent = duration;
    } else {
      portfolioModal.querySelector('.modal-duration').style.display = 'none';
    }
    // Technologies
    const techTags = portfolioModal.querySelector('.tech-tags');
    techTags.innerHTML = '';
    if (technologies.length) {
      portfolioModal.querySelector('.modal-technologies').style.display = 'block';
      technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech.trim();
        techTags.appendChild(tag);
      });
    } else {
      portfolioModal.querySelector('.modal-technologies').style.display = 'none';
    }
    // Challenges
    const challengesList = portfolioModal.querySelector('.modal-challenges ul');
    challengesList.innerHTML = '';
    if (challenges.length) {
      portfolioModal.querySelector('.modal-challenges').style.display = 'block';
      challenges.forEach(challenge => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="feature-bullet"></div><span>${challenge.trim()}</span>`;
        challengesList.appendChild(li);
      });
    } else {
      portfolioModal.querySelector('.modal-challenges').style.display = 'none';
    }
    // Solutions
    const solutionsList = portfolioModal.querySelector('.modal-solutions ul');
    solutionsList.innerHTML = '';
    if (solutions.length) {
      portfolioModal.querySelector('.modal-solutions').style.display = 'block';
      solutions.forEach(solution => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="feature-bullet"></div><span>${solution.trim()}</span>`;
        solutionsList.appendChild(li);
      });
    } else {
      portfolioModal.querySelector('.modal-solutions').style.display = 'none';
    }
    // Results
    const resultsList = portfolioModal.querySelector('.modal-results ul');
    resultsList.innerHTML = '';
    if (results.length) {
      portfolioModal.querySelector('.modal-results').style.display = 'block';
      results.forEach(result => {
        const li = document.createElement('li');
        li.innerHTML = `<div class="feature-bullet"></div><span>${result.trim()}</span>`;
        resultsList.appendChild(li);
      });
    } else {
      portfolioModal.querySelector('.modal-results').style.display = 'none';
    }
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  detailButtons.forEach(button => {
    button.addEventListener('click', function() {
      openPortfolioModal(this);
    });
  });

  function closePortfolioModal() {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  portfolioModalClose.addEventListener('click', closePortfolioModal);
  portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
      closePortfolioModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && portfolioModal.classList.contains('active')) {
      closePortfolioModal();
    }
  });

  // Team Carousel Functionality with 3 team members and infinite looping
  const prevArrow = document.querySelector('.prev-arrow');
  const nextArrow = document.querySelector('.next-arrow');
  const indicators = document.querySelectorAll('.carousel-indicator');
  const teamMembers = document.querySelectorAll('.team-member');
  let currentIndex = 0;
  let isAnimating = false;

  function goToSlide(index, forcedDirection = null) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    let direction = 'right';
    if (forcedDirection) {
      direction = forcedDirection;
    } else {
      direction = index > currentIndex ? 'right' : 'left';
    }
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    teamMembers.forEach(member => {
      member.classList.remove('active', 'prev', 'next', 'animate-slide-in-right', 'animate-slide-in-left');
    });
    teamMembers[currentIndex].classList.add(direction === 'right' ? 'prev' : 'next');
    teamMembers[index].classList.add('active');
    teamMembers[index].classList.add(direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left');
    currentIndex = index;
    setTimeout(() => {
      teamMembers.forEach(member => {
        member.classList.remove('animate-slide-in-right', 'animate-slide-in-left');
      });
      isAnimating = false;
    }, 500);
  }

  function nextSlide() {
    let newIndex = currentIndex + 1;
    let direction = 'right';
    if (newIndex >= teamMembers.length) {
      newIndex = 0;
      direction = 'right';
    }
    goToSlide(newIndex, direction);
  }

  function prevSlide() {
    let newIndex = currentIndex - 1;
    let direction = 'left';
    if (newIndex < 0) {
      newIndex = teamMembers.length - 1;
      direction = 'left';
    }
    goToSlide(newIndex, direction);
  }

  prevArrow.addEventListener('click', prevSlide);
  nextArrow.addEventListener('click', nextSlide);
  indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
      const index = parseInt(indicator.getAttribute('data-index'));
      let forcedDirection = null;
      if (currentIndex === teamMembers.length - 1 && index === 0) {
        forcedDirection = 'right';
      } else if (currentIndex === 0 && index === teamMembers.length - 1) {
        forcedDirection = 'left';
      }
      goToSlide(index, forcedDirection);
    });
  });

  // Service Modal Functionality (unchanged)
  const serviceModal = document.getElementById('service-modal');
  const serviceModalClose = serviceModal.querySelector('.modal-close');
  const serviceLinks = document.querySelectorAll('.service-link');

  const serviceDetails = {
    "Web Development": {
      extendedDescription: "Our Web Development service creates responsive, modern websites and web applications by fusing creative design with advanced technologies. We craft solutions using HTML, CSS, JavaScript, and frameworks like React or Angular to deliver fast, scalable, and SEO-friendly sites. Our process includes rigorous testing, UX optimization, and seamless backend integration to elevate your online presence.",
      features: ["Responsive", "Frameworks", "SEO", "Backend", "Ecommerce"],
      duration: "3-6 months"
    },
    "Mobile Development": {
      extendedDescription: "Leverage our Mobile Development expertise to build high-performance native and cross-platform apps. We focus on creating intuitive user interfaces, rapid performance, and smooth cross-device experiences using technologies like React Native and Flutter. Our solutions are optimized for both iOS and Android, ensuring robust performance and high user engagement.",
      features: ["Native", "CrossPlatform", "UX", "Optimized", "Support"],
      duration: "4-8 months"
    },
    "Software Solutions": {
      extendedDescription: "Our Software Solutions service delivers custom, enterprise-grade applications tailored to your business needs. We prioritize scalability, security, and seamless integration with existing systems. Using agile methodologies and the latest technologies, we provide a complete lifecycle solution from design and development to deployment and maintenance.",
      features: ["Custom", "Integration", "Security", "Scalable", "Maintenance"],
      duration: "6-12 months"
    },
    "Digital Marketing": {
      extendedDescription: "Boost your online presence with our comprehensive Digital Marketing service. We develop data-driven strategies that integrate SEO, PPC, social media, and content marketing to maximize your brand’s reach and ROI. Our expert team crafts campaigns that engage audiences, enhance brand visibility, and convert traffic into loyal customers.",
      features: ["SEO", "Social", "PPC", "Content", "Analytics"],
      duration: "3-6 months"
    },
    "Internal Tools": {
      extendedDescription: "Our Internal Tools service develops tailor-made solutions to optimize your company's internal operations. From custom dashboards and workflow automation to scalable integration platforms, we build tools that empower your team to work more efficiently and make data-driven decisions.",
      features: ["Dashboard", "Workflow Automation", "Integration", "Scalability", "Customization"],
      duration: "Varies per project"
    },
    "Business Automation": {
      extendedDescription: "Our Business Automation service focuses on streamlining and automating internal processes. We integrate systems and implement automated solutions to reduce manual tasks, improve efficiency, and drive business growth.",
      features: ["Process Automation", "System Integration", "Efficiency", "Data-Driven", "Optimization"],
      duration: "Varies per project"
    }
  };

  serviceLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const serviceCard = this.closest('.service-card');
      const serviceTitle = serviceCard.querySelector('.service-title').textContent;
      const serviceDescription = serviceCard.querySelector('.service-description').textContent;

      const extra = serviceDetails[serviceTitle] || { 
        extendedDescription: serviceDescription, 
        features: [], 
        duration: "Varies per project"
      };

      serviceModal.querySelector('.service-modal-title').innerHTML = `<span class="theme-color">${serviceTitle}</span>`;
      serviceModal.querySelector('.service-modal-description').innerHTML = `<p>${extra.extendedDescription}</p>`;

      const featuresUl = serviceModal.querySelector('.service-feature-list');
      featuresUl.innerHTML = '';
      if (extra.features && extra.features.length > 0) {
        extra.features.forEach(feature => {
          const li = document.createElement('li');
          li.innerHTML = `<div class="feature-bullet"></div><span>${feature}</span>`;
          featuresUl.appendChild(li);
        });
      }

      const techTagsDiv = serviceModal.querySelector('.service-tech-tags');
      techTagsDiv.innerHTML = '';
      if (extra.features && extra.features.length > 0) {
        extra.features.forEach(feature => {
          const span = document.createElement('span');
          span.className = 'tech-tag';
          span.textContent = feature;
          techTagsDiv.appendChild(span);
        });
      }

      serviceModal.querySelector('.service-modal-duration').textContent = extra.duration;
      serviceModal.querySelector('.service-modal-category').textContent = serviceTitle;

      serviceModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  serviceModalClose.addEventListener('click', function() {
    serviceModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  serviceModal.addEventListener('click', function(e) {
    if (e.target === serviceModal) {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      serviceModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Chart.js Integration for Revenue Stats Section
  const revenueCanvas = document.getElementById('revenueChart');
  if (revenueCanvas) {
    const ctx = revenueCanvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [{
          label: "Revenue",
          data: [2.5, 3.0, 3.8, 4.5, 4.2, 5.0],
          borderColor: '#a3e635',
          backgroundColor: 'rgba(163, 230, 53, 0.2)',
          fill: true,
          tension: 0.2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            display: true,
            beginAtZero: true,
            title: {
              display: true,
              text: 'Revenue (M)'
            }
          }
        }
      }
    });
  }
  
  // New Contact Sales Modal Functionality
  const contactSalesBtn = document.querySelector('.custom-solution-content a.btn.btn-outline');
  const contactSalesModal = document.getElementById('contact-sales-modal');
  const contactSalesModalClose = contactSalesModal.querySelector('.modal-close');

  contactSalesBtn.addEventListener('click', function(e) {
    e.preventDefault();
    contactSalesModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  contactSalesModalClose.addEventListener('click', function() {
    contactSalesModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  contactSalesModal.addEventListener('click', function(e) {
    if(e.target === contactSalesModal) {
      contactSalesModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(e) {
    if(e.key === 'Escape' && contactSalesModal.classList.contains('active')) {
      contactSalesModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});