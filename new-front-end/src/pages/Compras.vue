<template>
  <div>
    <card>
      <div class="card-title">
        <div class="text-center">
          Seja bem-vindo, {{ nomeCompleto }}
          <div class="break inline">|</div>
          Você já economizou R${{ credit.toFixed(2) }}
        </div>
      </div>
    </card>
    <card>
      <span
        class="card-title text-center"
      >{{ items.length > 0 ? `Você possui ${items.length} compra${items.length > 1 ? 's' : ''} registrada${items.length > 1 ? 's' : ''}` : 'Você não possui nenhuma compra registrada'}}</span>
      <div class="break"></div>
      <span class="card-actions">
        <button class="card-button blue-button" @click="getSells">Atualizar lista</button>
        <div class="card-spacing"></div>
        <button class="card-button" @click="newSell">Cadastrar compra</button>
      </span>
    </card>
    <card class="mb-3">
      <responsive-table caption="Sumário do Período" :items="items" />
    </card>
  </div>
</template>

<style>
body {
  background: white;
}
.fa-events-icons-ready {
  overflow: auto;
}
</style>

<script>
import Card from "../components/Card";
import ResponsiveTable from "../components/ResponsiveTable";
import axios from "axios";

export default {
  components: { Card, ResponsiveTable },
  data: () => {
    return {
      isLoadingBro: false,
      items: [],
      credit: 0
    };
  },
  methods: {
    newSell() {
      this.$router.push("/compras/cadastrar");
    },
    async getSells() {
      let promise = new Promise(async (resolve, reject) => {
        await axios
          .get("/sells")
          .then(response => {
            this.items = response.data || [];
            resolve();
          })
          .catch(error => {
            localStorage.setItem("logout_error", error.response.data.name);
            this.$parent.$parent.logout();
            reject(error);
          });
        this.$parent.$parent.showLoading(false);
      });

      return await promise;
    },
    async getCashback() {
      let promise = new Promise(async (resolve, reject) => {
        await axios
          .get(`/cashback/${localStorage.getItem("user_id")}`)
          .then(response => {
            this.credit = response.data.credit;
            resolve();
          })
          .catch(error => {
            localStorage.setItem("logout_error", error.response.data.name);
            this.$parent.$parent.logout();
            reject(error);
          });
        this.$parent.$parent.showLoading(false);
      });
      return await promise;
    }
  },
  beforeMount() {
    this.nomeCompleto = localStorage.getItem("full_name");
    this.$parent.$parent.showLoading(true);
    Promise.all([this.getSells(), this.getCashback()]);
    console.info({ breadcrumbs: this.$route });
  }
};
</script>