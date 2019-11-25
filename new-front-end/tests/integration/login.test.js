// Dependências
import {
  mount,
  createLocalVue
} from "@vue/test-utils";
import BootstrapVue from "../../node_modules/bootstrap-vue";
import SlimDialog from "v-slim-dialog";
import "babel-polyfill";

const fs = require('fs');

// Páginas
import Login from "@/views/pages/Login.vue";

// Grupos
describe('Login.vue', () => {

  // Criando ambiente
  const localVue = createLocalVue();
  localVue.use(BootstrapVue);
  localVue.use(SlimDialog);
  const wrapper = mount(Login, {
    localVue
  });
  const cnpj = wrapper.find("#cnpj");
  const botaoEntrar = wrapper.find('#entrar');
  const usuario = wrapper.find("#usuario");
  const senha = wrapper.find("#senha");

  test("Checagem de erros iniciais", done => {
    // Erro CNPJ
    expect(wrapper.find({
      ref: 'cnpjerror'
    }).exists()).toBe(false);

    // Erro Usuário
    expect(wrapper.find({
      ref: 'usuarioerror'
    }).exists()).toBe(false);

    // Erro Senha
    expect(wrapper.find({
      ref: 'senhaerror'
    }).exists()).toBe(false);

    // Finalização
    done();
  });

  test("Tentar logar sem preencher os campos", done => {
    botaoEntrar.trigger('click');

    // Finalização
    done();
  });
  test("Checagem de erros propositais", done => {

    // Erro CNPJ
    expect(wrapper.find({
      ref: 'cnpjerror'
    }).exists()).toBe(true);

    // Erro Usuário
    expect(wrapper.find({
      ref: 'usuarioerror'
    }).exists()).toBe(true);

    // Erro Senha
    expect(wrapper.find({
      ref: 'senhaerror'
    }).exists()).toBe(true);

    // Finalização
    done();
  });
  test("Tentar inserir caracteres diferentes de número no CNPJ", done => {

    cnpj.setValue('abcdefghijklmnopqrstuvwxyz!@#$%ˆ&*()-`=/;[p"~');

    expect(cnpj.vm.$el.value).toBe('');

    // Finalização
    done();
  });

  test("Inserir CNPJ incompleto", done => {
    cnpj.setValue('123456');
    expect(cnpj.vm.$el.value).toBe('12.345.6');

    botaoEntrar.trigger('click');
    expect(wrapper.find({
      ref: 'cnpjincompleto'
    }).exists()).toBe(true);

    // Finalização
    done();
  });

  test("Inserir CNPJ completo", done => {
    cnpj.setValue('12345678901234');
    expect(cnpj.vm.$el.value).toBe('12.345.678/9012-34');

    botaoEntrar.trigger('click');
    expect(wrapper.find({
      ref: 'cnpjerror'
    }).exists()).toBe(false);

    expect(wrapper.find({
      ref: 'cnpjincompleto'
    }).exists()).toBe(false);

    // Finalização
    done();
  });

  test("Inserir usuário correto", done => {
    usuario.setValue('admin');
    expect(usuario.vm.$el.value).toBe('admin');

    botaoEntrar.trigger('click');
    expect(wrapper.find({
      ref: 'usuarioerror'
    }).exists()).toBe(false);

    // Finalização
    done();
  });

  test("Checa se não tem popup de erro", done => {

    expect(wrapper.find(".v-dialog-container").exists()).toBe(false);
    // Finalização
    done();
  });

  test("Inserir senha incorreta", done => {
    senha.setValue('admi');
    expect(senha.vm.$el.value).toBe('admi');

    botaoEntrar.trigger('click');
    expect(wrapper.find({
      ref: 'senhaerror'
    }).exists()).toBe(false);

    // Finalização
    done();
  });

  // test("Todos os campos corretos", async done => {
  //   expect(wrapper.find({
  //     ref: 'cnpjerror'
  //   }).exists()).toBe(false);

  //   expect(wrapper.find({
  //     ref: 'usuarioerror'
  //   }).exists()).toBe(false);

  //   expect(wrapper.find({
  //     ref: 'senhaerror'
  //   }).exists()).toBe(false);

  //   //Campos setados corretamente
  //   cnpj.setValue('61099008000141');
  //   expect(cnpj.vm.$el.value).toBe('61.099.008/0001-41');

  //   usuario.setValue('admin');
  //   expect(usuario.vm.$el.value).toBe('admin');

  //   senha.setValue('admin');
  //   expect(senha.vm.$el.value).toBe('admin');

  //   botaoEntrar.trigger('click');
  
  //   console.log(wrapper.vm.$route.name)

  //   expect(wrapper.vm.$route.name).toBe('Início')
  //   // Finalização após as promessas se encerrarem
  //   done();
  // });

  // test("Checa se apareceu popup de erro", done => {

  //   botaoEntrar.trigger('click');
  //   // Espera pelo encerramento das promessas
  //   wrapper.vm.$nextTick(() => {
  //     expect(wrapper.find("v-dialog").exists()).toBe(true);
  //     // Finalização após as promessas se encerrarem
  //     done();
  //   })
  // });
});
