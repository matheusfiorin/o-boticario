<template>
  <div>
    <card>
      <span class="card-title">Editando compra de código ({{ codigo }})</span>
      <div class="break"></div>
      <span class="card-actions">
        <button class="card-button red-button" @click="goBack">Voltar</button>
      </span>
    </card>
    <card>
      <form @submit="updateSell" class="form login no-margin flex">
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
            disabled
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
          <input type="submit" :value="'Editar'" />
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
import moment from "moment";

export default {
  components: { Card, TheMask, Datepicker },
  data: () => {
    return {
      id: 0,
      sellid: "",
      codigo: "",
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
    async getSell() {
      this.$parent.$parent.showLoading(true);
      await axios
        .get(`/sells/${this.id}`)
        .then(response => {
          this.sellid = response.data.sellid;
          this.codigo = response.data.sellid;
          this.date = moment(response.data.date)
            .add(3, "hours")
            .format();
          this.price = response.data.price;
        })
        .catch(err => {
          console.error({ err });
          localStorage.setItem("logout_error", err.response.data.name);
          this.$parent.$parent.logout();
        });
      this.$parent.$parent.showLoading(false);
    },
    async updateSell(e) {
      e.preventDefault();
      this.$parent.$parent.showLoading(true);
      await axios.put(`/sells/${this.id}`, {
        userid: localStorage.getItem("user_id"),
        sellid: this.sellid,
        price: this.price,
        date: this.date
      });
      this.$router.go(-1);
      this.$parent.$parent.showLoading(false);
    }
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.getSell();
  }
};
</script>