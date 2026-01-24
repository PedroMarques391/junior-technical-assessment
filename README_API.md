### Documentação da API

## Estoque

### Listar estoques

**Endpoint:**
`GET /api/estoque`

**Descrição:**
Retorna a lista de todos os itens em estoque, incluindo informações do produto associado.

**Response – 200 OK**

```json
[
  {
    "id": "3",
    "produto_id": "1",
    "quantidade": 14,
    "atualizado_em": "2026-01-23T20:00:49.752Z",
    "produtos": {
      "id": "1",
      "categoria_id": "1",
      "sku": "LIM-001",
      "nome": "Detergente Líquido 500ml",
      "estoque_minimo": 12,
      "marca": "Ypê",
      "criado_em": "2026-01-22T13:20:14.007Z"
    }
  }
]
```

---

### Atualizar estoque

**Endpoint:**
`PUT /api/estoque/:id`

**Descrição:**
Atualiza a o estoque e retorna status 200 com o estoque associado ao ID.

**Body:**

```json
{
  "quantidade": 30
}
```

**Validações:**

- `quantidade` deve ser um número maior ou igual a zero

**Response – 200 OK**

```json
{
  "id": "3",
  "produto_id": "1",
  "quantidade": 10,
  "atualizado_em": "2026-01-24T01:01:53.921Z"
}
```

---

## Movimetação Estoque

### Listar Movimentações

**Endpoint:**
`GET /api/estoque-movimentacoes`

**Descrição:**
Retorna a lista de todos as movimentações no estoque, incluindo informações do produto associado.

**Response – 200 OK**

```json
[
  {
    "id": "15",
    "produto_id": "2",
    "quantidade": 10,
    "tipo": "entrada",
    "criado_em": "2026-01-22T23:02:00.369Z",
    "produtos": {
      "id": "2",
      "categoria_id": "1",
      "sku": "LIM-002",
      "nome": "Água Sanitária 2L",
      "estoque_minimo": 5,
      "marca": "Candida",
      "criado_em": "2026-01-22T13:20:14.007Z"
    }
  }
]
```

---

### Criar Movimentação

**Endpoint:**
`POST /api/estoque-movimentacoes`

**Descrição:**
Cria uma nova movimentação no estoque.

**Body:**

```json
{
  "produto_id": "2",
  "quantidade": 3,
  "tipo": "saida"
}
```

**Validações:**

- `produto_id` O ID do produto é obrigatório
- `quantidade` A quantidade é obrigatória e deve ser maior que 0
- `tipo` O tipo é obrigatório e só é aceito `saida` ou `entrada`.

**Response – 201 OK**

```json
{
  "id": "17",
  "produto_id": "2",
  "quantidade": 3,
  "tipo": "saida",
  "criado_em": "2026-01-24T01:13:50.417Z"
}
```

---

### Deletar Movimentação

**Endpoint:**
`DELETE /api/estoque-movimentacoes/:id`

**Descrição:**
Deleta uma movimentação baseado no ID passado como parâmetro.

**Response – 201 No Content**
