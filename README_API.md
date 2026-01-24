# Documentação da API

## Índice

- [Categorias](#categorias)
  - [Listar categorias](#listar-categorias)
  - [Buscar categoria por ID](#buscar-categoria-por-id)
  - [Criar categoria](#criar-categoria)
  - [Atualizar categoria](#atualizar-categoria)
  - [Deletar categoria](#deletar-categoria)
- [Produtos](#produtos)
  - [Listar produtos](#listar-produtos)
  - [Buscar produto por ID](#buscar-produto-por-id)
  - [Criar produto](#criar-produto)
  - [Atualizar produto](#atualizar-produto)
  - [Deletar produto](#deletar-produto)
- [Estoque](#estoque)
  - [Listar estoques](#listar-estoques)
  - [Atualizar estoque](#atualizar-estoque)
- [Movimentação Estoque](#movimentação-estoque)
  - [Listar movimentações](#listar-movimentações)
  - [Criar movimentação](#criar-movimentação)
  - [Deletar movimentação](#deletar-movimentação)

## Categorias

### Listar categorias

**Endpoint:**
`GET /api/categorias`

**Descrição:**
Retorna a lista de todas as categorias cadastradas.

**Response – 200 OK**

```json
[
  {
    "id": "2",
    "nome": "Utensílios de Limpeza",
    "descricao": "Materiais e utensílios utilizados para limpeza",
    "criado_em": "2026-01-22T13:20:13.999Z"
  }
]
```

---

### Buscar categoria por ID

**Endpoint:**
`GET /api/categorias/:id`

**Descrição:**
Retorna uma categoria específica baseada no ID fornecido.

**Response – 200 OK**

```json
{
  "id": "2",
  "nome": "Utensílios de Limpeza",
  "descricao": "Materiais e utensílios utilizados para limpeza",
  "criado_em": "2026-01-22T13:20:13.999Z"
}
```

**Response – 404 Not Found**

```json
{
  "error": "Categoria não encontrada"
}
```

---

### Criar categoria

**Endpoint:**
`POST /api/categorias`

**Descrição:**
Cria uma nova categoria.

**Body:**

```json
{
  "nome": "Limpeza",
  "descricao": "Produtos de limpeza doméstica e indústrial"
}
```

**Validações:**

- `nome` é obrigatório

**Response – 201 Created**

```json
{
  "id": "12",
  "nome": "Limpeza",
  "descricao": "Produtos de limpeza doméstica e indústrial",
  "criado_em": "2026-01-24T02:02:43.221Z"
}
```

---

### Atualizar categoria

**Endpoint:**
`PUT /api/categorias/:id`

**Descrição:**
Atualiza uma categoria existente baseada no ID fornecido.

**Body:**

```json
{
  "nome": "Limpeza indústrial",
  "descricao": "Produtos de limpeza doméstica e indústrial"
}
```

**Response – 200 OK**

```json
{
  "id": "12",
  "nome": "Limpeza indústrial",
  "descricao": "Produtos de limpeza doméstica e indústrial",
  "criado_em": "2026-01-24T02:02:43.221Z"
}
```

**Response – 404 Not Found**

```json
{
  "error": "Categoria não encontrada para atualização"
}
```

---

### Deletar categoria

**Endpoint:**
`DELETE /api/categorias/:id`

**Descrição:**
Deleta uma categoria baseada no ID fornecido.

**Response – 204 No Content**

**Response – 404 Not Found**

```json
{
  "error": "Categoria não encontrada para exclusão"
}
```

---

## Produtos

### Listar produtos

**Endpoint:**
`GET /api/produtos`

**Descrição:**
Retorna a lista de todos os produtos cadastrados, incluindo informações da categoria associada.

**Response – 200 OK**

```json
[
  {
    "id": "1",
    "categoria_id": "1",
    "sku": "LIM-001",
    "nome": "Detergente Líquido 500ml",
    "estoque_minimo": 12,
    "marca": "Ypê",
    "criado_em": "2026-01-22T13:20:14.007Z",
    "categorias": {
      "id": "1",
      "nome": "Limpeza",
      "descricao": "Produtos de limpeza doméstica"
    }
  }
]
```

---

### Buscar produto por ID

**Endpoint:**
`GET /api/produtos/:id`

**Descrição:**
Retorna um produto específico baseado no ID fornecido incluindo estoque e estoque_movimentacoes.

**Response – 200 OK**

```json
{
  "id": "2",
  "categoria_id": "1",
  "sku": "LIM-002",
  "nome": "Água Sanitária 2L",
  "estoque_minimo": 6,
  "marca": "Candida",
  "criado_em": "2026-01-22T13:20:14.007Z",
  "categorias": {
    "id": "1",
    "nome": "Limpeza e Higienização",
    "descricao": "Produtos para limpeza e higienização de ambientes",
    "criado_em": "2026-01-22T13:20:13.999Z"
  },
  "estoque": {
    "id": "4",
    "produto_id": "2",
    "quantidade": 3,
    "atualizado_em": "2026-01-23T20:02:19.074Z"
  },
  "estoque_movimentacoes": []
}
```

**Response – 404 Not Found**

```json
{
  "error": "Produto não encontrado"
}
```

---

### Criar produto

**Endpoint:**
`POST /api/produtos`

**Descrição:**
Cria um novo produto.

**Body:**

```json
{
  "sku": "LIM-001",
  "nome": "Detergente Líquido 500ml",
  "categoria_id": "1",
  "estoque_minimo": 12,
  "marca": "Ypê"
}
```

**Validações:**

- `sku` é obrigatório
- `nome` é obrigatório
- O SKU é automaticamente convertido para maiúsculas

**Response – 201 Created**

```json
{
  "id": "16",
  "categoria_id": "1",
  "sku": "LIM-011",
  "nome": "Detergente Líquido 500ml",
  "estoque_minimo": 12,
  "marca": "Ypê",
  "criado_em": "2026-01-24T01:50:51.042Z"
}
```

---

### Atualizar produto

**Endpoint:**
`PUT /api/produtos/:id`

**Descrição:**
Atualiza um produto existente baseado no ID fornecido.

**Body:**

```json
{
  "sku": "LIM-001",
  "nome": "Detergente Líquido 1L",
  "categoria_id": "1",
  "estoque_minimo": 15,
  "marca": "Ypê"
}
```

**Validações:**

- O SKU é automaticamente convertido para maiúsculas

**Response – 200 OK**

```json
{
  "id": "16",
  "categoria_id": "1",
  "sku": "LIM-00100",
  "nome": "Detergente Líquido 1L",
  "estoque_minimo": 15,
  "marca": "Ypê",
  "criado_em": "2026-01-24T01:50:51.042Z"
}
```

**Response – 404 Not Found**

```json
{
  "error": "Produto não encontrado para atualização"
}
```

---

### Deletar produto

**Endpoint:**
`DELETE /api/produtos/:id`

**Descrição:**
Deleta um produto baseado no ID fornecido.

**Response – 204 No Content**

**Response – 404 Not Found**

```json
{
  "error": "Produto não encontrado para exclusão"
}
```

---

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
Atualiza a quantidade em estoque e retorna status 200 com o estoque associado ao ID.

**Body:**

```json
{
  "quantidade": 30
}
```

**Validações:**

- `quantidade` é obrigatória
- `quantidade` deve ser maior que zero

**Response – 200 OK**

```json
{
  "id": "3",
  "produto_id": "1",
  "quantidade": 30,
  "atualizado_em": "2026-01-24T01:01:53.921Z"
}
```

---

## Movimentação Estoque

### Listar movimentações

**Endpoint:**
`GET /api/estoque-movimentacoes`

**Descrição:**
Retorna a lista de todas as movimentações no estoque, incluindo informações do produto associado.

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

### Criar movimentação

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

- `produto_id` é obrigatório
- `quantidade` é obrigatória e deve ser maior que 0
- `tipo` é obrigatório e só aceita `entrada` ou `saida`

**Response – 201 Created**

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

### Deletar movimentação

**Endpoint:**
`DELETE /api/estoque-movimentacoes/:id`

**Descrição:**
Deleta uma movimentação baseada no ID fornecido.

**Response – 204 No Content**

**Response – 404 Not Found**

```json
{
  "error": "Movimentação com ID 17 não existe."
}
```
