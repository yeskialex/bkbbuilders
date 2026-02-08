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
            <div className="hidden md:flex space-x-12">
              <a href="#home" className="nav-link">Home</a>
              <a href="#services" className="nav-link">Services</a>
              <a href="#about" className="nav-link">About</a>
              <a href="#contact" className="nav-link">Contact</a>
            </div>
            <a href="#contact" className="btn-primary">Get Free Quote</a>
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
                <a href="#services" className="btn-secondary text-white border-white hover:bg-white hover:text-gray-900">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Explore Services
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

      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="fade-in-up text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="fade-in-up delay-200 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium">
              Comprehensive construction solutions for all your building needs, delivered with excellence and precision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Service Card 1 */}
            <div className="fade-in-up service-card">
              <div className="icon-container bg-amber-100 mb-8">
                <svg className="w-10 h-10 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Residential Construction</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Custom homes, renovations, and residential projects built to your exact specifications with attention to every detail.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Custom home design
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Home renovations
                </li>
              </ul>
            </div>

            {/* Service Card 2 */}
            <div className="fade-in-up delay-200 service-card">
              <div className="icon-container bg-green-100 mb-8">
                <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a1 1 0 011-1h1v-2H4a1 1 0 01-1-1V9a1 1 0 011-1h1V7a1 1 0 011-1v2h8V7a1 1 0 011 1v1h1a1 1 0 011 1v3a1 1 0 01-1 1h-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Commercial Buildings</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Office buildings, retail spaces, and commercial developments with superior craftsmanship and modern design.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Office complexes
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Retail developments
                </li>
              </ul>
            </div>

            {/* Service Card 3 */}
            <div className="fade-in-up delay-400 service-card">
              <div className="icon-container bg-blue-100 mb-8">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Renovation & Remodeling</h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Transform your existing space with our expert renovation and remodeling services that exceed expectations.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Kitchen remodeling
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bathroom upgrades
                </li>
              </ul>
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
                  Why Choose <span className="text-gradient">BKB</span>?
                </h2>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium leading-relaxed">
                  With over 15 years of experience in the construction industry, BKB Builders has established itself as a trusted name in quality construction and exceptional service.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Licensed & Insured</h4>
                    <p className="text-gray-600 text-lg">Fully licensed and insured for your complete peace of mind and protection.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Premium Materials</h4>
                    <p className="text-gray-600 text-lg">We use only the highest quality materials for lasting, durable results.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">On-Time Delivery</h4>
                    <p className="text-gray-600 text-lg">We respect your time and consistently deliver projects on schedule.</p>
                  </div>
                </div>
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
                      <p className="text-amber-600 text-sm mt-1">- Sarah Johnson, Homeowner</p>
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
                        <p className="text-white font-bold text-xl">(555) 123-4567</p>
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
                        <p className="text-white font-bold text-xl">Your City, State</p>
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
                    <span className="text-white font-semibold">7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="font-medium">Saturday:</span>
                    <span className="text-white font-semibold">8:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span className="font-medium">Sunday:</span>
                    <span className="text-white font-semibold">Emergency calls only</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="fade-in-right">
              <div className="card-elevated bg-white p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Get a Free Quote</h3>
                <form className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        placeholder="First Name"
                        className="form-input w-full"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        className="form-input w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="form-input w-full"
                    />
                  </div>
                  <div>
                    <select className="form-input w-full">
                      <option>Select Service Type</option>
                      <option>Residential Construction</option>
                      <option>Commercial Building</option>
                      <option>Renovation & Remodeling</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="form-input w-full resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary text-lg py-4"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                    Send Message
                  </button>
                </form>
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
                <span className="text-amber-400">BKB</span> Builders
              </h3>
            </div>
            <div className="text-center lg:text-right">
              <p className="text-gray-400">
                © 2024 BKB Builders. All rights reserved.
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