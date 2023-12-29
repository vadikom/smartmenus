<template>
  <div class="footer-content">
    Copyright &copy; since 2001
    <a href="https://vadikom.com/about/#vasil-dinkov" target="_blank">Vasil Dinkov</a>, Vadikom Web
    Ltd.
  </div>
</template>

<style scoped>
.footer-content {
  margin-bottom: 1rem;
  border-top: 1px solid var(--site-separator);
  padding-top: 1.5rem;
  color: var(--site-text-muted);
  font-size: var(--site-font-size-small);
}
.footer-content a {
  color: var(--site-brand);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.footer-content a:hover,
.footer-content a:focus {
  opacity: 0.9;
}
</style>
