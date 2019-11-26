<template>
  <div class="center">
    <table v-if="items.length > 0">
      <caption>{{ caption }}</caption>
      <thead>
        <tr>
          <th scope="col">Código</th>
          <th scope="col">Data</th>
          <th scope="col">Valor</th>
          <th scope="col">Cashback</th>
          <th scope="col">Status</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody class="striped">
        <tr v-for="item in items">
          <td data-label="Código">{{ item.sellid }}</td>
          <td data-label="Data">{{ moment(item.date).format("DD/MM/YYYY") }}</td>
          <td data-label="Valor">R${{ (item.price || 0).toFixed(2) }}</td>
          <td
            data-label="Cashback"
          >R${{ (item.cashbackvalue || 0).toFixed(2) }} ({{ item.cashbackpercentage }}%)</td>
          <td data-label="Status">{{ item.status.description }}</td>
          <td data-label="Ações">
            <div>
              <button class="table-button blue-button-solid mr-1" @click="editSell(item.id)">Editar</button>
              <button class="table-button red-button-solid" @click="showDeleteMessage(item.id)">Deletar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h2 class="grey">Não encontramos registros para exibir</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["caption", "items"],
  methods: {
    editSell(id) {
      this.$router.push({ path: `/compras/editar/${id}` });
    },
    async showDeleteMessage(id) {
      await this.$swal
        .fire({
          title: "Você tem certeza?",
          text: "Você não poderá reverter esta ação!",
          type: "warning",
          showCancelButton: true,
          customClass: {
            confirmButton: "confirm-button-class",
            cancelButton: "cancel-button-class"
          },
          confirmButtonText: "Sim",
          cancelButtonText: "Cancelar"
        })
        .then(async result => {
          if (result.value) {
            await this.deleteSell(id);
            this.$swal
              .fire("Apagado!", "Seu registro foi apagado.", "success")
              .then(response => {
                window.location.reload();
              });
          }
        });
    },
    async deleteSell(id) {
      await axios.delete(`/sells/${id}`).catch(err => {
        console.error({ err });
        localStorage.setItem("logout_error", err.response.data.name);
        this.$parent.logout();
      });
    }
  }
};
</script>