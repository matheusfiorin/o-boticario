<template>
  <div>
    <header class="header">
      <div class="header-inner container">
        <div class="logo">
          <img src="../assets/logo.png" alt="O Boticário - Logo" height="40" />
        </div>
        <div class="w100">
          <ul>
            <li>
              <router-link to="/dashboard">Relatórios</router-link>
            </li>
            <li>
              <router-link to="/compras">Compras</router-link>
            </li>
            <li>
              <router-link to="/sobre">Sobre</router-link>
            </li>
            <li>
              <a @click="logout">Sair</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("jwt");
      localStorage.removeItem("user_id");
      window.location.reload();
    }
  }
};
</script>