# Cadastro

> ## Caso de sucesso

---

### main layer

1. ❌ Recebe uma requisição do tipo **POST** na rota **/api/signup**

---

### presentation layer

1. ❌ Valida dados obrigatórios **name**, **email**, **password** e **passwordConfirmation**
2. ❌ Valida que **password** e **passwordConfirmation** são iguais
3. ❌ Valida que o campo **email** é um e-mail válido
4. ❌ Retorna **200** com o token de acesso e o nome do usuário

---

### data layer

1. ❌ **Cria** uma conta para o usuário com os dados informados, **substituindo** a senha pela senha criptorafada
2. ❌ Gera um **token** de acesso a partir do ID do usuário
3. ❌ **Valida** se já existe um usuário com o email fornecido
4. ❌ Gera uma senha **criptografada** (essa senha não pode ser descriptografada)
5. ❌ **Atualiza** os dados do usuário com o token de acesso gerado

---

> ## Exceções

11. ❌ Retorna erro **404** se a API não existir
12. ❌ Retorna erro **400** se name, email, password ou passwordConfirmation não forem fornecidos pelo client
13. ❌ Retorna erro **400** se password e passwordConfirmation não forem iguais
14. ❌ Retorna erro **400** se o campo email for um e-mail inválido
15. ❌ Retorna erro **403** se o email fornecido já estiver em uso
16. ❌ Retorna erro **500** se der erro ao tentar gerar uma senha criptografada
17. ❌ Retorna erro **500** se der erro ao tentar criar a conta do usuário
18. ❌ Retorna erro **500** se der erro ao tentar gerar o token de acesso
19. ❌ Retorna erro **500** se der erro ao tentar atualizar o usuário com o token de acesso gerado
