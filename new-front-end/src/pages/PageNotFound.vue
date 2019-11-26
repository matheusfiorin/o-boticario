<template>
  <div>
    <div class="page-not-found-container">
      <div class="boo-wrapper">
        <div class="boo">
          <div class="face"></div>
        </div>
        <div class="shadow"></div>
        <h1>Oops!</h1>
        <p>
          Não conseguimos achar a página
          <br />que você procura.
        </p>
        <button class="page-not-found-button" @click="goHome">Voltar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>