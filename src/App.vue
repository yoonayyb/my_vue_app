<script setup>
const features = [
  {
    title: 'Visual Workflow Builder',
    text: 'Automate onboarding, billing, and support escalations through one drag-to-build workflow canvas.',
  },
  {
    title: 'Live Revenue Signals',
    text: 'See conversion shifts and retention risks in real time with team-level and account-level drilldowns.',
  },
  {
    title: 'Role-Safe Collaboration',
    text: 'Give each team controlled access with SSO, scoped permissions, and complete audit visibility.',
  },
  {
    title: 'Composable Integrations',
    text: 'Connect HubSpot, Stripe, Slack, and your internal tools with robust webhooks and typed APIs.',
  },
]

const stats = [
  { value: '31%', label: 'Average expansion uplift' },
  { value: '18min', label: 'Average setup for first flow' },
  { value: '99.98%', label: 'Infrastructure uptime' },
  { value: '2,400+', label: 'Teams running in production' },
]

const testimonials = [
  {
    quote: 'We replaced six disconnected tools and cut onboarding time by 43% in the first month.',
    name: 'Mina Park',
    role: 'Head of Ops, Beamly',
  },
  {
    quote: 'Northstar made process quality measurable. Every handoff now has ownership and traceability.',
    name: 'Dylan Reed',
    role: 'VP Product, Orbit Stack',
  },
  {
    quote: 'The implementation felt surgical. We launched core automations in less than one sprint.',
    name: 'Sora Kim',
    role: 'Growth Lead, Arcline',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/seat',
    detail: 'For early teams standardizing handoffs and reducing manual work.',
    cta: 'Start trial',
  },
  {
    name: 'Growth',
    price: '$79',
    period: '/seat',
    detail: 'For scaling teams that need advanced automation and analytics.',
    cta: 'Book demo',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    detail: 'For regulated teams requiring dedicated infra and governance.',
    cta: 'Talk sales',
  },
]
</script>

<template>
  <div class="landing-page">
    <div class="background-blur background-blur-left" aria-hidden="true"></div>
    <div class="background-blur background-blur-right" aria-hidden="true"></div>

    <header class="floating-nav reveal">
      <a class="brand" href="#top">Northstar</a>
      <nav class="nav-links" aria-label="Primary">
        <a href="#features">Features</a>
        <a href="#proof">Proof</a>
        <a href="#pricing">Pricing</a>
      </nav>
      <button class="btn btn-ghost" type="button">Sign in</button>
    </header>

    <main id="top" class="content-wrap">
      <section class="hero">
        <p class="eyebrow reveal">B2B SaaS Operating Platform</p>
        <h1 class="reveal delay-1">
          Scale operations
          <span>without scaling chaos.</span>
        </h1>
        <p class="hero-copy reveal delay-2">
          Northstar unifies automation, analytics, and collaboration so your team can ship reliable customer journeys every week.
        </p>
        <div class="hero-actions reveal delay-3">
          <button class="btn btn-primary" type="button">Start 14-day free trial</button>
          <button class="btn btn-ghost" type="button">See interactive demo</button>
        </div>
      </section>

      <section id="proof" class="stats reveal delay-2" aria-label="Key metrics">
        <article v-for="item in stats" :key="item.label" class="metric-card">
          <p class="metric-value">{{ item.value }}</p>
          <p class="metric-label">{{ item.label }}</p>
        </article>
      </section>

      <section id="features" class="features">
        <header class="section-head reveal">
          <p class="eyebrow">Solution Overview</p>
          <h2>One system for activation, retention, and expansion</h2>
        </header>
        <div class="feature-grid">
          <article
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card reveal"
            :style="{ animationDelay: `${0.08 * (index + 1)}s` }"
          >
            <div class="feature-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 12h16"></path>
                <path d="M12 4v16"></path>
              </svg>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.text }}</p>
          </article>
        </div>
      </section>

      <section class="testimonials">
        <header class="section-head reveal">
          <p class="eyebrow">Social Proof</p>
          <h2>Trusted by teams that value execution quality</h2>
        </header>
        <div class="testimonial-grid">
          <article
            v-for="(item, index) in testimonials"
            :key="item.name"
            class="testimonial-card reveal"
            :style="{ animationDelay: `${0.1 * (index + 1)}s` }"
          >
            <p class="quote">"{{ item.quote }}"</p>
            <p class="person">{{ item.name }}</p>
            <p class="role">{{ item.role }}</p>
          </article>
        </div>
      </section>

      <section id="pricing" class="pricing">
        <header class="section-head reveal">
          <p class="eyebrow">Pricing</p>
          <h2>Simple plans that grow with your team</h2>
        </header>
        <div class="pricing-grid">
          <article v-for="plan in plans" :key="plan.name" class="plan-card reveal" :class="{ featured: plan.featured }">
            <h3>{{ plan.name }}</h3>
            <p class="plan-price">
              {{ plan.price }}
              <span>{{ plan.period }}</span>
            </p>
            <p class="plan-detail">{{ plan.detail }}</p>
            <button class="btn" :class="plan.featured ? 'btn-primary' : 'btn-ghost'" type="button">{{ plan.cta }}</button>
          </article>
        </div>
      </section>

      <section class="final-cta reveal">
        <h2>Build a predictable growth engine this quarter</h2>
        <p>Get migration support, architecture guidance, and rollout checklists from day one.</p>
        <button class="btn btn-primary" type="button">Create workspace</button>
      </section>
    </main>
  </div>
</template>

<style scoped>
.landing-page {
  --primary: #0f172a;
  --secondary: #334155;
  --cta: #0369a1;
  --bg: #f8fafc;
  --text: #020617;
  --border: #e2e8f0;
  --muted: #475569;
  min-height: 100vh;
  background: linear-gradient(150deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%);
  color: var(--text);
  position: relative;
  overflow-x: clip;
  padding: 20px 16px 56px;
}

.background-blur {
  position: absolute;
  width: 460px;
  height: 460px;
  border-radius: 999px;
  filter: blur(80px);
  opacity: 0.18;
  pointer-events: none;
}

.background-blur-left {
  background: #3b82f6;
  top: -100px;
  left: -120px;
}

.background-blur-right {
  background: #f97316;
  top: 220px;
  right: -140px;
}

.content-wrap {
  width: min(1120px, 100%);
  margin: 0 auto;
}

.floating-nav {
  width: min(1120px, 100%);
  margin: 0 auto 38px;
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  position: sticky;
  top: 16px;
  z-index: 20;
}

.brand {
  color: var(--primary);
  text-decoration: none;
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.nav-links a {
  color: var(--secondary);
  text-decoration: none;
  font-family: 'Rubik', sans-serif;
  font-size: 0.92rem;
  font-weight: 500;
}

.hero {
  padding: 26px 0 22px;
}

.eyebrow {
  margin: 0 0 10px;
  color: #1d4ed8;
  text-transform: uppercase;
  letter-spacing: 0.11em;
  font-family: 'Rubik', sans-serif;
  font-size: 0.74rem;
  font-weight: 600;
}

h1 {
  margin: 0;
  max-width: 11ch;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2.1rem, 9vw, 5.2rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  font-weight: 700;
  color: var(--primary);
}

h1 span {
  color: var(--cta);
}

.hero-copy {
  margin: 20px 0 0;
  max-width: 62ch;
  color: var(--muted);
  font-family: 'Rubik', sans-serif;
  font-size: 1.02rem;
  line-height: 1.7;
}

.hero-actions {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.stats {
  margin: 34px 0 64px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.metric-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.82);
  padding: 16px;
}

.metric-value {
  margin: 0;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
  font-size: 1.65rem;
  font-weight: 700;
}

.metric-label {
  margin: 6px 0 0;
  color: var(--muted);
  font-family: 'Rubik', sans-serif;
  font-size: 0.9rem;
}

.section-head h2 {
  margin: 0;
  max-width: 22ch;
  font-family: 'Outfit', sans-serif;
  color: var(--primary);
  font-size: clamp(1.55rem, 4vw, 2.7rem);
  line-height: 1.04;
}

.features {
  margin-bottom: 56px;
}

.feature-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.feature-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  background: #ffffff;
}

.feature-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #bfdbfe;
  color: #1d4ed8;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
}

.feature-icon svg {
  width: 18px;
  height: 18px;
}

.feature-card h3 {
  margin: 0 0 8px;
  font-family: 'Outfit', sans-serif;
  color: var(--primary);
  font-size: 1.18rem;
  font-weight: 700;
}

.feature-card p {
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--muted);
}

.testimonials {
  margin-bottom: 56px;
}

.testimonial-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.testimonial-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 18px;
  background: #ffffff;
}

.quote {
  margin: 0;
  color: #334155;
  font-family: 'Rubik', sans-serif;
  font-size: 0.95rem;
  line-height: 1.65;
  font-style: italic;
}

.person {
  margin: 14px 0 0;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.role {
  margin: 4px 0 0;
  color: var(--muted);
  font-family: 'Rubik', sans-serif;
  font-size: 0.84rem;
}

.pricing {
  margin-bottom: 56px;
}

.pricing-grid {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.plan-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  background: #ffffff;
}

.plan-card.featured {
  border-color: #7dd3fc;
  box-shadow: 0 12px 24px rgba(14, 116, 144, 0.14);
}

.plan-card h3 {
  margin: 0;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
  font-size: 1.05rem;
}

.plan-price {
  margin: 10px 0 8px;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.plan-price span {
  font-size: 0.9rem;
  font-family: 'Rubik', sans-serif;
  color: var(--muted);
  font-weight: 500;
}

.plan-detail {
  margin: 0 0 14px;
  color: var(--muted);
  font-family: 'Rubik', sans-serif;
  font-size: 0.92rem;
  line-height: 1.6;
  min-height: 48px;
}

.final-cta {
  border: 1px solid #bae6fd;
  border-radius: 14px;
  padding: clamp(18px, 4vw, 32px);
  background: linear-gradient(135deg, #eff6ff, #fff7ed);
}

.final-cta h2 {
  margin: 0;
  max-width: 18ch;
  color: var(--primary);
  font-family: 'Outfit', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.4rem);
  line-height: 1.05;
}

.final-cta p {
  margin: 10px 0 16px;
  color: var(--muted);
  font-family: 'Rubik', sans-serif;
  font-size: 0.96rem;
  line-height: 1.6;
  max-width: 62ch;
}

.btn {
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 10px 14px;
  font-family: 'Rubik', sans-serif;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 200ms ease-out, background-color 200ms ease-out, border-color 200ms ease-out, box-shadow 200ms ease-out;
}

.btn:focus-visible,
.nav-links a:focus-visible,
.brand:focus-visible {
  outline: 2px solid #0369a1;
  outline-offset: 2px;
}

.btn-primary {
  background: var(--cta);
  color: #ffffff;
  border-color: var(--cta);
}

.btn-primary:hover {
  background: #075985;
  border-color: #075985;
}

.btn-ghost {
  background: #ffffff;
  color: var(--secondary);
  border-color: var(--border);
}

.btn-ghost:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.reveal {
  opacity: 0;
  transform: translateY(12px);
  animation: reveal-in 650ms ease-out forwards;
}

.delay-1 {
  animation-delay: 90ms;
}

.delay-2 {
  animation-delay: 180ms;
}

.delay-3 {
  animation-delay: 270ms;
}

@keyframes reveal-in {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .testimonial-grid,
  .pricing-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .landing-page {
    padding: 14px 12px 44px;
  }

  .floating-nav {
    top: 10px;
    margin-bottom: 24px;
  }

  .nav-links {
    display: none;
  }

  .feature-grid,
  .testimonial-grid,
  .pricing-grid,
  .stats {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    width: 100%;
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }

  .btn {
    transition: none;
  }
}
</style>
