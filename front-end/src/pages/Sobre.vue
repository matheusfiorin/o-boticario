<template>
  <div>
    <card class="green-shadow center profile-display mb-3">
      <div class="block">
        <img src="../assets/profile.png" alt="Profile Photo" class="profile-photo" />
      </div>
      <div class="block">
        <span class="profile-title text-center">Matheus Barão Fiorin</span>
      </div>
      <div class="block">
        <span class="profile-subtitle">Desenvolvedor Full Stack Sênior</span>
      </div>
      <div class="block">
        <span class="profile-info mt-3">
          <a href="mailto:matheusfiiorin@gmail.com">matheusfiiorin@gmail.com</a>
        </span>
      </div>
      <div class="block">
        <span class="profile-info mb-3">
          <a href="tel:+5516994178449">+55 (16) 99417-8449</a>
        </span>
      </div>
      <div class="block profile-icons">
        <div>
          <a href="https://www.github.com/matheusfiorin" target="_blank" class="center-grid">
            <i class="fa fa-github fa-2x"></i>
            <small>GitHub</small>
          </a>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/matheus-bar%C3%A3o-fiorin-7869b6187/"
            target="_blank"
            class="center-grid"
          >
            <i class="fa fa-linkedin-square fa-2x"></i>
            <small>LinkedIn</small>
          </a>
        </div>
        <div>
          <a href="http://matheusfiorin.github.io/" target="_blank" class="center-grid">
            <i class="fa fa-github-alt fa-2x"></i>
            <small>Portfolio</small>
          </a>
        </div>
      </div>
    </card>
  </div>
</template>

<style>
.fa-events-icons-ready {
  overflow: auto;
}
</style>

<script>
import Card from "../components/Card";

export default {
  components: { Card },
  beforeMount() {
    this.$parent.showLoading(false);
  }
};
</script>