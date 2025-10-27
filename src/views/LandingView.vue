<template>
  <div class="landing-page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <nav class="nav">
          <div class="logo">TicketFlow</div>
          <div class="nav-links">
            <router-link to="/auth/login" class="btn btn-secondary">Login</router-link>
            <router-link to="/auth/signup" class="btn btn-primary">Get Started</router-link>
          </div>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <div class="decorative-circle circle-1"></div>
          <div class="decorative-circle circle-2"></div>
          
          <h1 class="hero-title">Streamline Your Ticket Management</h1>
          <p class="hero-description">
            Efficiently track, manage, and resolve tickets with our intuitive platform. 
            Keep your team organized and your customers happy.
          </p>
          
          <div class="hero-actions">
            <router-link to="/auth/signup" class="btn btn-primary btn-large">Get Started Free</router-link>
            <router-link to="/auth/login" class="btn btn-secondary btn-large">Login</router-link>
          </div>
        </div>
      </div>
      
      <!-- Wave Background -->
      <div class="wave-container">
        <svg class="wave" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3b82f6" fill-opacity="0.1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2 class="section-title">Why Choose TicketFlow?</h2>
        
        <div class="features-grid">
          <div class="feature-card card">
            <div class="feature-icon">🎯</div>
            <h3>Easy Tracking</h3>
            <p>Keep track of all your tickets in one centralized dashboard with real-time updates.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">⚡</div>
            <h3>Fast Resolution</h3>
            <p>Streamlined workflows help your team resolve tickets faster and more efficiently.</p>
          </div>
          
          <div class="feature-card card">
            <div class="feature-icon">📊</div>
            <h3>Detailed Analytics</h3>
            <p>Get insights into your team's performance with comprehensive reporting tools.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">TicketFlow</div>
            <p>Streamlining ticket management for teams worldwide.</p>
          </div>
          
          <div class="footer-links">
            <div class="footer-section">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Support</a>
            </div>
            
            <div class="footer-section">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy</a>
            </div>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.landing-page {
  min-height: 100vh;
}

.header {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0 8rem;
  overflow: hidden;
}

.hero-content {
  position: relative;
  text-align: center;
  z-index: 2;
}

.decorative-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -100px;
  right: -100px;
}

.circle-2 {
  width: 150px;
  height: 150px;
  bottom: -75px;
  left: -75px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.wave {
  width: 100%;
  height: auto;
  display: block;
}

.features {
  padding: 4rem 0;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2rem;
  text-align: center;
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}

.footer {
  background: #1f2937;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-brand .logo {
  color: white;
  margin-bottom: 1rem;
}

.footer-brand p {
  color: #9ca3af;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.footer-section h4 {
  font-weight: 600;
  margin-bottom: 1rem;
}

.footer-section a {
  display: block;
  color: #9ca3af;
  text-decoration: none;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}

.footer-section a:hover {
  color: white;
}

.footer-bottom {
  border-top: 1px solid #374151;
  padding-top: 1rem;
  text-align: center;
  color: #9ca3af;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>