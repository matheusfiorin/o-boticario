<template>
  <div>
    <div class="loading" v-if="isLoading">
      <div class="uil-ring-css" style="transform:scale(0.79);">
        <div></div>
      </div>
    </div>
    <div class="align">
      <div class="grid">
        <div>
          <img src="@/assets/logo.png" alt="Logotipo O Boticário" class="form-image login-image" />
        </div>
        <form @submit="handleSubmit" class="form login">
          <div v-if="newUser">
            <div class="form-field login-form">
              <label for="login-cpf">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
                </svg>
                <span class="hidden">CPF</span>
              </label>
              <the-mask
                :mask="['###.###.###-##']"
                v-model="cpf"
                id="login-cpf"
                type="text"
                name="cpf"
                class="form-input"
                placeholder="CPF"
                :masked="true"
                required
                autofocus
              />
            </div>

            <div class="form-field login-form">
              <label for="login-fullname">
                <svg class="icon">
                  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
                </svg>
                <span class="hidden">Nome Completo</span>
              </label>
              <input
                v-model="fullname"
                id="login-fullname"
                type="text"
                name="fullname"
                class="form-input"
                placeholder="Nome Completo"
                required
                autofocus
              />
            </div>
          </div>

          <div class="form-field login-form">
            <label for="login-email">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user" />
              </svg>
              <span class="hidden">Email</span>
            </label>
            <input
              v-model="email"
              id="login-email"
              ref="email"
              type="email"
              name="email"
              class="form-input"
              placeholder="Email"
              required
              autofocus
            />
          </div>

          <div class="form-field login-form">
            <label for="login-password">
              <svg class="icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock" />
              </svg>
              <span class="hidden">Senha</span>
            </label>
            <input
              v-model="password"
              id="login-password"
              type="password"
              name="password"
              class="form-input"
              placeholder="Senha"
              required
            />
          </div>

          <div class="form-field login-form">
            <input type="submit" :value="newUser ? 'Registrar' : 'Entrar'" />
          </div>
        </form>

        <p class="text-center">
          {{ newUser ? "Já é cadastrado?" : "Não tem cadastro?" }}
          <a @click="toggleRegister">
            Clique aqui
            <svg class="icon white-icon">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right" />
            </svg>
          </a>
        </p>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" class="icons">
        <symbol id="arrow-right" viewBox="0 0 1792 1792">
          <path
            d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"
          />
        </symbol>
        <symbol id="lock" viewBox="0 0 1792 1792">
          <path
            d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"
          />
        </symbol>
        <symbol id="user" viewBox="0 0 1792 1792">
          <path
            d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"
          />
        </symbol>
      </svg>
    </div>
  </div>
</template>

<style>
body {
  background-color: #2c3338;
  color: #606468;
}
</style>

<script>
import regex from "@/shared/regex";
import axios from "axios";
import { TheMask } from "vue-the-mask";

export default {
  components: { TheMask },
  data: () => {
    return {
      cpf: null,
      fullname: null,
      email: null,
      password: null,
      isLoading: false,
      newUser: false
    };
  },
  methods: {
    signIn() {
      this.$router.push("/login");
    },
    async handleSubmit(e) {
      e.preventDefault();

      if (!this.email || !this.password) {
        this.$refs.email.focus();
        this.$nextTick(() => this.$refs.email.focus());
        return this.$swal.fire({
          title: "Oops...",
          text: "Algum dos campos está inválido.",
          type: "error",
          customClass: {
            confirmButton: "confirm-button-class"
          }
        });
      }

      if (!this.email.match(regex.email)) {
        return this.$swal.fire({
          title: "Oops...",
          text: "Verifique seu email.",
          type: "error",
          customClass: {
            confirmButton: "confirm-button-class"
          }
        });
      }

      this.isLoading = true;

      const url = `/auth/${this.newUser ? "register" : "login"}`;

      await axios
        .post(url, {
          fullname: this.fullname,
          cpf: this.cpf,
          email: this.email,
          password: this.password
        })
        .then(response => {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("full_name", response.data.full_name);
          if (localStorage.getItem("jwt") != null) {
            axios.defaults.headers.common[
              "x-access-token"
            ] = localStorage.getItem("jwt");
            this.$emit("loggedIn");
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              this.$router.push("compras");
            }
          }
        })
        .catch(_ => (this.isLoading = false));

      this.isLoading = false;
    },
    toggleRegister() {
      this.newUser = !this.newUser;
      this.cpf = null;
      this.email = null;
      this.fullname = null;
      this.password = null;
    }
  },
  beforeMount() {
    var logout_error = localStorage.getItem("logout_error");
    if (logout_error) {
      this.$swal.fire({
        title: "Oops...",
        text: logout_error,
        type: "error",
        customClass: {
          confirmButton: "confirm-button-class"
        }
      });
    }
    localStorage.removeItem("logout_error");
  }
};
</script>