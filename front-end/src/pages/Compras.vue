<template>
  <div>
    <card>
      <span class="card-title">Você não possui nenhuma compra registrada</span>
      <div class="break"></div>
      <span class="card-actions">
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
export default {
  components: { Card, ResponsiveTable },
  data: () => {
    return {
      items: [
        { id: 1, date: "04/01/2016", value: 150, cashback: "10%" },
        { id: 2, date: "05/01/2016", value: 739, cashback: "10%" },
        { id: 3, date: "05/01/2016", value: 1099, cashback: "15%" }
      ]
    };
  }
};
</script>