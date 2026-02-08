'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress indicator
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      setScrollProgress(progress * 100);
    };

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
    animateElements.forEach((el) => observer.observe(el));

    // Add scroll listeners
    window.addEventListener('scroll', updateScrollProgress);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const handleNavbarScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleNavbarScroll);

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const startCountAnimation = () => {
      counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target') || '0');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toString();
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toString();
          }
        };

        updateCounter();
      });
    };

    // Start counter animation when stats section is visible
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCountAnimation();
            statsObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      statsObserver.observe(statsSection);
    }

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('scroll', handleNavbarScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Scroll Progress Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Navigation */}
      <nav className="navbar fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.png"
                alt="BKB Logo"
                className="w-16 h-16 object-contain"
              />
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="text-gradient">BKB</span> Builders
              </h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="nav-link">Home</a>
              <a href="#vision-mission" className="nav-link">Vision & Mission</a>
              <a href="#why-us" className="nav-link">Why Us?</a>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#company-structure" className="nav-link">Structure</a>
              <a href="#commitment" className="nav-link">Commitment</a>
              <a href="#about" className="nav-link">About</a>
            </div>
            <a href="#contact" className="btn-primary">Contact us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 min-h-screen" style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/home.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="fade-in-up text-5xl lg:text-7xl font-black text-white leading-tight">
                  Building Excellence with
                  <span className="text-white block mt-2"> BKB</span>
                </h1>
                <p className="fade-in-up delay-200 text-xl lg:text-2xl text-gray-100 leading-relaxed font-medium">
                  Professional construction and building services you can trust. From residential projects to commercial developments, we bring your vision to life with precision and quality.
                </p>
              </div>

              <div className="fade-in-up delay-300 flex flex-col sm:flex-row gap-6">
                <a href="#contact" className="btn-primary">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                  </svg>
                  Start Your Project
                </a>
                <a href="#vision-mission" className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                  Our Vision
                </a>
              </div>
            </div>

            <div className="fade-in-right relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-green-600 rounded-3xl transform rotate-3 opacity-20"></div>
                <div className="card-elevated p-8 transform -rotate-1">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                      <div className="h-40 bg-gradient-to-br from-amber-50 to-green-50 rounded-xl flex items-center justify-center border-2 border-dashed border-amber-300">
                        <div className="text-center space-y-2">
                          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a1 1 0 011-1h1v-2H4a1 1 0 01-1-1V9a1 1 0 011-1h1V7a1 1 0 011-1v2h8V7a1 1 0 011 1v1h1a1 1 0 011 1v3a1 1 0 01-1 1h-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="text-sm font-medium text-amber-700">Project Blueprint</p>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div id="stats" className="fade-in-up delay-400 grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-gray-200">
            <div className="stats-item">
              <div className="counter text-4xl lg:text-5xl font-black text-white mb-2" data-target="15">0</div>
              <div className="text-lg font-medium text-white">Years Experience</div>
              <div className="text-sm text-gray-100 mt-1">Proven track record</div>
            </div>
            <div className="stats-item">
              <div className="counter text-4xl lg:text-5xl font-black text-white mb-2" data-target="500">0</div>
              <div className="text-lg font-medium text-white">Projects Completed</div>
              <div className="text-sm text-gray-100 mt-1">Satisfied customers</div>
            </div>
            <div className="stats-item">
              <div className="counter text-4xl lg:text-5xl font-black text-white mb-2" data-target="100">0</div>
              <div className="text-lg font-medium text-white">Client Satisfaction</div>
              <div className="text-sm text-gray-100 mt-1">Quality guaranteed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision-mission" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Vision & <span className="text-gradient">Mission</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="fade-in-left">
              <div className="card-elevated h-full">
                <div className="p-8">
                  <div className="icon-container bg-blue-100 mb-6">
                    <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">OUR VISION</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To be a professional, trusted general contractor company that is oriented toward quality, safety, and timeliness in every project, and to become the partner of choice for high-quality standards and excellent project management.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="fade-in-right">
              <div className="card-elevated h-full">
                <div className="p-8">
                  <div className="icon-container bg-amber-100 mb-6">
                    <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">OUR MISSION</h3>
                  <ul className="space-y-3 text-lg text-gray-600">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To provide quality construction services with technical standards that comply with national regulations (SNI & K3).</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To complete projects on time and within budget.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To prioritize occupational safety and risk management at every stage of the project.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To build a professional team that is competent and acts with integrity.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To establish long-term relationships with clients, partners, and vendors.</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>To utilize technology and modern management systems to increase efficiency and transparency.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Why Choose <span className="text-gradient">Us?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Integrated */}
            <div className="fade-in-up">
              <div className="service-card h-full">
                <div className="icon-container bg-blue-100 mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Integrated: Design & Construction in One System</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We offer integrated services ranging from architectural planning and interior design to construction execution. An integrated process makes projects more efficient, controlled, and minimizes the risk of coordination errors.
                </p>
              </div>
            </div>

            {/* Card 2: Quality & Timeliness */}
            <div className="fade-in-up delay-100">
              <div className="service-card h-full">
                <div className="icon-container bg-green-100 mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality & Timeliness</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We are committed to completing every project according to technical specifications, quality standards, and the agreed-upon schedule.
                </p>
              </div>
            </div>

            {/* Card 3: Cost Transparency */}
            <div className="fade-in-up delay-200">
              <div className="service-card h-full">
                <div className="icon-container bg-amber-100 mb-6">
                  <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Cost Transparency</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We implement a clear and measurable budgeting system, ensuring clients have cost certainty without unexpected expenses.
                </p>
              </div>
            </div>

            {/* Card 4: Professional Team */}
            <div className="fade-in-up delay-300">
              <div className="service-card h-full">
                <div className="icon-container bg-purple-100 mb-6">
                  <svg className="w-10 h-10 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional & Experienced Team</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Supported by experts in architecture, structure, and project management who have experience in various types of development.
                </p>
              </div>
            </div>

            {/* Card 5: Safety Standards */}
            <div className="fade-in-up delay-400">
              <div className="service-card h-full">
                <div className="icon-container bg-red-100 mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Occupational Safety Standards (K3)</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Workplace safety is our top priority in every project we undertake.
                </p>
              </div>
            </div>

            {/* Card 6: Effective Solutions */}
            <div className="fade-in-up delay-500">
              <div className="service-card h-full">
                <div className="icon-container bg-indigo-100 mb-6">
                  <svg className="w-10 h-10 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Effective Solutions</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every project has a unique character. We provide design and technical solutions tailored to the client's needs, function, and budget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Our <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="fade-in-up delay-200 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              Explore our completed projects showcasing quality construction and innovative design solutions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Portfolio Item 1 */}
            <div className="fade-in-up group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio1.jpg"
                  alt="Portfolio Project 1"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Portfolio Item 2 */}
            <div className="fade-in-up delay-100 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio2.jpg"
                  alt="Portfolio Project 2"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Portfolio Item 3 */}
            <div className="fade-in-up delay-200 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio3.jpg"
                  alt="Portfolio Project 3"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Portfolio Item 4 */}
            <div className="fade-in-up delay-300 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio4.jpg"
                  alt="Portfolio Project 4"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Portfolio Item 5 */}
            <div className="fade-in-up delay-400 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio5.jpg"
                  alt="Portfolio Project 5"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Portfolio Item 6 */}
            <div className="fade-in-up delay-500 group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
                <img
                  src="/portfolio6.jpg"
                  alt="Portfolio Project 6"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Company Structure Section */}
      <section id="company-structure" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Company <span className="text-gradient">Structure</span>
            </h2>
            <p className="fade-in-up delay-200 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              Our organizational structure ensures efficient project management and clear communication at every level
            </p>
          </div>

          <div className="fade-in-up delay-300">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white p-8">
              <img
                src="/structure.png"
                alt="BKB Builders Company Structure"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section id="commitment" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Our <span className="text-gradient">Commitment</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Commitment Item 1 */}
            <div className="fade-in-up">
              <div className="service-card h-full">
                <div className="icon-container bg-blue-100 mb-6">
                  <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Without Compromise</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We are committed to delivering work results with the best quality standards, in accordance with applicable technical specifications and regulations.
                </p>
              </div>
            </div>

            {/* Commitment Item 2 */}
            <div className="fade-in-up delay-100">
              <div className="service-card h-full">
                <div className="icon-container bg-red-100 mb-6">
                  <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 1L3 5v6c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V5l-7-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Workplace Safety</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  The safety of our workforce and the project environment is a top priority in every stage of development.
                </p>
              </div>
            </div>

            {/* Commitment Item 3 */}
            <div className="fade-in-up delay-200">
              <div className="service-card h-full">
                <div className="icon-container bg-green-100 mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Client Satisfaction, Innovation & Efficiency</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We build long-term relationships through open, responsive, and professional communication. We continuously develop work methods and technology to create effective and value-added solutions.
                </p>
              </div>
            </div>

            {/* Commitment Item 4 */}
            <div className="fade-in-up delay-300">
              <div className="service-card h-full">
                <div className="icon-container bg-amber-100 mb-6">
                  <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Timeliness, Transparency & Integrity</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Every project we run includes structured planning and supervision to ensure on-time completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-left space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-6xl font-black text-gray-900">
                  About us
                </h2>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed">
                  Basileia Koinonnia Builders is a company engaged in the fields of Architecture, Interior Design, Building Construction, Renovation and Structural Strengthening, MEP (Mechanical, Electrical, and Plumbing), and Project Management. Our expertise spans various sectors, ranging from private residences and public spaces to high-rise buildings.
                </p>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed">
                  We do not only deliver aesthetic and functional design concepts but also provide comprehensive construction services. Through an integrated approach between planning and execution, we ensure that every project is realized with the highest quality, on time, and in accordance with the client's needs.
                </p>
              </div>

              <div className="space-y-6">

              </div>
            </div>

            <div className="fade-in-right relative">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-600 rounded-3xl transform -rotate-2 opacity-90"></div>
                <div className="card-elevated p-10 transform rotate-2 bg-white">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
                      <p className="text-gray-600 text-lg">Every project backed by our comprehensive satisfaction guarantee</p>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4">
                      <p className="text-amber-800 font-semibold">"BKB delivered beyond our expectations"</p>
                      <p className="text-amber-600 text-sm mt-1">- Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-white mb-6">
              Ready to Start Your <span className="text-amber-400">Project</span>?
            </h2>
            <p className="fade-in-up delay-200 text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-medium">
              Get in touch with us today for a free consultation and personalized quote
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="fade-in-left space-y-10">
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">Contact Information</h3>
                <div className="space-y-6">
                  <div className="contact-info-item">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">Phone</p>
                        <p className="text-white font-bold text-xl">(+62) 888 8888 678 </p>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">Email</p>
                        <p className="text-white font-bold text-xl">contact@bkbbuilders.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-300 text-sm font-medium">Location</p>
                        <div className="text-white font-bold">
                          <p>Ruko Golf Lake Venice Blok B24-B25</p>
                          <p>Jl. Outer Ring Road Raya Kel. Cengkareng Timur, Kec. Cengkareng</p>
                          <p>Jakarta Barat</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-white mb-6">Business Hours</h4>
                <div className="bg-gray-800 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between text-gray-300">
                    <span className="font-medium">Monday - Friday:</span>
                    <span className="text-white font-semibold">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="font-medium">Saturday - Sunday:</span>
                    <span className="text-white font-semibold">Emergency Calls Only</span>
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="fade-in-right">
              <div className="card-elevated bg-white p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Location</h3>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.3844!2d106.7558!3d-6.1666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4e5e2e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sRuko%20Golf%20Lake%20Venice%2C%20Jl.%20Outer%20Ring%20Road%20Raya%2C%20Cengkareng%20Timur%2C%20Cengkareng%2C%20Jakarta%20Barat!5e0!3m2!1sen!2sid!4v1635959517654!5m2!1sen!2sid"
                    width="100%"
                    height="400"
                    style={{border: 0}}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BKB Builders Location"
                  />
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Our Address</h4>
                  <p className="text-gray-700 font-medium mb-1">Ruko Golf Lake Venice Blok B24-B25</p>
                  <p className="text-gray-600 mb-2">Jl. Outer Ring Road Raya Kel. Cengkareng Timur, Kec. Cengkareng</p>
                  <p className="text-gray-600 mb-3">Jakarta Barat, Indonesia</p>
                  <p className="text-gray-700 font-medium">Visit our office for consultations and project discussions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer section-padding-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="flex items-center mb-6 lg:mb-0">
              <h3 className="text-2xl font-bold text-white">
                <span className="text-amber-400">PT</span>  Basileia Koinonia Builders 
              </h3>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-gray-400">
                © 2026 Basileia Koinonia Builders. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Building excellence, one project at a time.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}