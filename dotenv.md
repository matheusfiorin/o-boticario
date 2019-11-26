# Configuração .env

Pensando em upload para uma infraestrutura escalável - como o Amazon Elastic Container Service (Amazon ECS) - é necessário o vínculo com variáveis de ambiente, afim de utilizar o mesmo código em diversos ambientes (produção, QA, etc).

Portanto, será necessário criar um arquivo `.env` dentro da pasta `/backend`, sendo ele:

``` 
NODE_ENV=development
PORT=3000
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=boticario
TEST_DATABASE=boticario_test
DB_HOST=127.0.0.1
DB_PORT=8889
CASHBACK_URL=https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=
TEST_USER_ID=1
SECRET=my-very-difficult-secret
```

Sinta-se a vontade para alterar os dados do banco, tais como usuário e senha (lembre-se que se mudar o database aqui, terá que mudar no script do banco também).
