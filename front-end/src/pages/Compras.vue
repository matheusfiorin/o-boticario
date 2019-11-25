<template>
  <div>
    <card>
      <span
        class="card-title"
      >{{ items.length > 0 ? `Você possui ${items.length} compra${items.length > 1 ? 's' : ''} registrada${items.length > 1 ? 's' : ''}` : 'Você não possui nenhuma compra registrada'}}</span>
      <div class="break"></div>
      <span class="card-actions">
        <button class="card-button blue-button" @click="getSells">Atualizar lista</button>
        <button class="card-button">Cadastrar compra</button>
      </span>
    </card>
    <card>
      <responsive-table caption="Sumário do Período" :items="items" />
    </card>
  </div>
</template>

<script>
import Card from "../components/Card";
import ResponsiveTable from "../components/ResponsiveTable";
import axios from "axios";

export default {
  components: { Card, ResponsiveTable },
  data: () => {
    return {
      isLoadingBro: false,
      items: []
    };
  },
  methods: {
    async getSells() {
      this.$parent.$parent.showLoading(true);
      await axios
        .get("/sells")
        .then(response => {
          this.items = response.data || [];
        })
        .catch(err => {
          console.error({ err });
          localStorage.setItem("logout_error", err.response.data.name);
          this.$parent.$parent.logout();
        });
      this.$parent.$parent.showLoading(false);
    }
  },
  async beforeMount() {
    await this.getSells();
  }
};
</script>