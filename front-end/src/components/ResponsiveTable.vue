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
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody class="striped">
        <tr v-for="item in items">
          <td data-label="Código">{{ item.id }}</td>
          <td data-label="Data">{{ item.date }}</td>
          <td data-label="Valor">R${{ item.value }}</td>
          <td data-label="Cashback">{{ item.cashback }}</td>
          <td data-label="Ações">
            <div>
              <button>Editar</button>
              <button>Deletar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <h3>teste porra</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: ["caption", "items"]
};
</script>