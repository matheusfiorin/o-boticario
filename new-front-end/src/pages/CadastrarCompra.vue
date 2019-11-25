<template>
  <div>
    <card>
      <span class="card-title">Cadastrar nova compra</span>
      <div class="break"></div>
      <span class="card-actions">
        <button class="card-button red-button" @click="goBack">Voltar</button>
      </span>
    </card>
    <card>
      <form @submit="registerSell" class="form login no-margin flex">
        <div class="form-field mr-3 w100">
          <label for="codigo" class="light-label">
            <i class="fa fa-list-ol"></i>
            <span class="hidden">Código</span>
          </label>
          <input
            v-model="sellid"
            id="codigo"
            ref="codigo"
            type="text"
            name="codigo"
            class="form-input light-input"
            placeholder="Código"
            required
          />
        </div>
        <div class="form-field mr-3 w100">
          <label for="data" class="light-label">
            <i class="fa fa-calendar"></i>
            <span class="hidden">Data</span>
          </label>
          <datepicker
            v-model="date"
            :language="ptBR"
            :disabled-dates="disabledDates"
            id="data"
            ref="data"
            type="text"
            name="data"
            class="form-input light-input"
            placeholder="Data"
            required
          />
        </div>
        <div class="form-field mr-3 w100">
          <label for="valor" class="light-label">
            <i class="fa fa-money"></i>
            <span class="hidden">Valor</span>
          </label>
          <money
            v-model="price"
            v-bind="{
              decimal: ',',
              thousands: '.',
              prefix: 'R$ ',
              suffix: '',
              precision: 2,
              masked: false
            }"
            id="valor"
            ref="valor"
            type="text"
            name="valor"
            class="form-input light-input"
            placeholder="Valor"
            required
          />
        </div>
        <div class="form-field no-margin">
          <input type="submit" :value="'Cadastrar'" />
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import Card from "../components/Card";
import { TheMask } from "vue-the-mask";
import axios from "axios";
import Datepicker from "vuejs-datepicker";
import { ptBR } from "vuejs-datepicker/dist/locale";

export default {
  components: { Card, TheMask, Datepicker },
  data: () => {
    return {
      sellid: "",
      price: "",
      date: new Date(),
      ptBR: ptBR,
      disabledDates: {
        from: new Date()
      }
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async registerSell(e) {
      e.preventDefault();
      this.$parent.$parent.showLoading(true);
      await axios
        .post("/sells", {
          userid: localStorage.getItem("user_id"),
          sellid: this.sellid,
          price: this.price,
          date: this.date
        })
        .then(_ => {
          this.$router.go(-1);
        })
        .catch(err => {
          this.$swal.fire({
            title: "Oops...",
            text: err.response.data.name,
            type: "error",
            customClass: {
              confirmButton: "confirm-button-class"
            }
          });
        });
      this.$parent.$parent.showLoading(false);
    }
  },
  beforeMount() {
    console.info({breadcrumbs: this.$route});
    this.$parent.$parent.showLoading(false);
  }
};
</script>