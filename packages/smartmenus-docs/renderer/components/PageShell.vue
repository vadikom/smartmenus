<script setup>
import Navbar from '#@/components/Navbar.vue'
import Footer from '#@/components/Footer.vue'
</script>

<template>
  <a href="#site-main" class="skip-link visually-hidden">Skip to content</a>
  <header class="site-header">
    <Navbar />
  </header>
  <main id="site-main" class="site-main">
    <div class="container">
      <slot />
    </div>
  </main>
  <footer class="site-footer">
    <div class="container">
      <Footer />
    </div>
  </footer>
</template>

<style scoped lang="scss">
@import '#@/css/variables-sass';

.site-main,
.site-footer {
  margin-left: auto;
  margin-right: auto;
  max-width: var(--site-layout-max-width);
}
@media (min-width: $vp-large-min) {
  .site-main,
  .site-footer {
    padding-left: var(--site-sidebar-width);
  }
}
.container {
  margin-left: auto;
  margin-right: auto;
  padding: 100px 24px 50px 24px;
  max-width: var(--site-content-max-width-small);
}
@media (min-width: $vp-large-min) {
  .container {
    padding: 50px 60px;
    max-width: var(--site-content-max-width-large);
  }
}
.skip-link {
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid var(--site-border);
  border-radius: var(--site-border-radius);
  padding: 1rem;
  font-size: var(--site-font-size-small);
  font-weight: bold;
  text-decoration: none;
  background: var(--site-bg-alt);
  color: var(--site-brand-em);
  box-shadow: 0 5px 30px 0 var(--site-box-shadow);
  z-index: 10000;
}
.skip-link:focus {
  width: auto;
  height: auto;
  clip: auto;
}
</style>
