# Respostas

## 1. O que você fez?

Ao iniciar o desafio, criei uma **branch para cada etapa**, o que facilitou a organização do trabalho e o controle das mudanças.

Na **primeira etapa**, o objetivo era identificar o erro na listagem de produtos. Para isso, comecei analisando o arquivo `api/produtos/route.ts` e identifiquei que a rota **GET não estava implementada**.
A solução foi implementar essa rota seguindo o padrão já existente na API: chamar o _service_, serializar a resposta e enviá-la corretamente para o front-end.

---

## Backend

Na **segunda etapa**, iniciei resolvendo as tarefas do backend.
Para isso, foi necessário criar os modelos `estoque` e `estoque_movimentacoes` no Prisma. Essa parte foi um pouco demorada pois precisei analisar o arquivo SQL que foi disponibizado para criar os modelos de acordo com a estrutura das tabelas.

Após a criação dos modelos, implementei o `estoque.repository`, responsável pelas operações de listagem e atualização.
Além disso, criei o método auxiliar `findById` que foi utilizado para validação antes de realizar as atualizações. No _service_, utilizei esse método para verificar se o produto existe no estoque. Caso não exista, um erro é lançado e tratado na rota `api/estoque/[id]/route.ts`.

Depois de testar essas operações no Insomnia e confirmar o funcionamento correto, segui para a implementação de **estoque_movimentacoes**.

O processo foi semelhante:

- Criação do `estoque_movimentacoes.repository`
- Implementação do método `findAll` para listagem
- Implementação da função de criação de movimentação

A criação de movimentações exigiu atenção extra, pois além de registrar a movimentação, era necessário **atualizar o estoque**. Para garantir consistência dos dados, utilizei o método `$transaction` do Prisma, permitindo executar múltiplas queries.

- Se o tipo fosse **entrada**, a quantidade era somada ao estoque
- Se fosse **saída**, a quantidade era subtraída

Além das operações principais, criei métodos adicionais:

1. `findMovimentacoesByProdutoId` – para buscar movimentações por produto
2. `getMovimentacaoById` – para buscar uma movimentação específica
3. `remove` – para excluir uma movimentação

No `estoque_movimentacoes.service`, todas as operações (com exceção da listagem) realizam validações antes de acessar o banco. Na criação de movimentações, verifico:

- Se o produto existe
- Se a quantidade informada é maior que zero
- Se, no caso de saída, a quantidade não é maior que estoque disponível

Isso evita a gravação de valores inválidos ou negativos no banco e reduz a chance de erro por parte do usuário, já que o cálculo final é responsabilidade da aplicação.

Foram criadas duas rotas para movimentações:

- **Rota dinâmica (`[id]`)**: responsável pela exclusão
- **Rota estática**: responsável pela listagem (`GET`) e criação (`POST`)

Antes de chamar o service na criação de movimentações a rota também valida se os campos obrigatórios (`produtoId`, `quantidade` e `tipo`) foram informados e se o tipo é válido (`entrada` ou `saida`).

Para todas as etapas do backend, segui o mesmo fluxo de desenvolvimento:

```
Repository → Service → Rotas da API → Testes no Insomnia
```

---

## Front-end

Com o backend finalizado, iniciei a análise do código do front-end.
Estudei a metodologia do projeto, a organização das pastas, a forma como as _views_ eram construídas, o uso do React Query e a estrutura do componente de tabela.

Antes de iniciar qualquer implementação, busquei ter uma visão geral do projeto.
As _views_ dependem diretamente dos hooks e de componentes reutilizáveis, seguindo o padrão de organização onde cada _view_ possui uma pasta de componentes com o mesmo nome.

Para cada etapa, comecei criando uma **versão inicial da view**, que apenas renderizava a tabela, sem botões, busca ou filtros. Isso permitiu validar rapidamente a integração antes de adicionar novas funcionalidades.

### Estoque

Para a visualização do estoque, criei o hook `use-estoque.ts`, responsável por três operações:

1. `fetchStock` – listagem completa
2. `fetchStockById` – busca por ID
3. `updateStock` – atualização

Essas operações são chamadas pelo React Query com `useQuery` para requisições `GET` e `useMutation` para operações `POST`, `PUT` e `DELETE`.

Na `estoque-view.ts`, utilizei apenas a listagem.
A operação de atualização foi encapsulada no modal `estoque-edit-modal`, criado dentro da pasta `components/estoque`, que também concentra a definição das colunas.

Cada _view_ utiliza o componente `DataTable`, recebendo as colunas e os dados a serem renderizados.

### Movimentações de Estoque

Para `estoque_movimentacoes`, o processo foi semelhante:

- Criação da pasta `estoque_movimentacao`
- Criação do hook `use-estoque-movimentacoes`
- Definição das colunas
- Implementação da view

Na interface, essa tabela é exibida como um **histórico**, permitindo criar e excluir movimentações.

Após concluir essa etapa, realizei ajustes de responsividade para melhorar a experiência em dispositivos móveis e iniciei a implementação de **busca, filtros e ordenação**.

### Correções

Ao testar as funcionalidades de edição de categorias, identifiquei que o botão Salvar não estava funcionando. Após analisar o código do `edit-categoria-modal` identifiquei uma pequena inconsistência: o updateCategoriaSchema exigia um id, porém esse valor não estava sendo informado em defaultValues.

Para corrigir o problema, foi necessário apenas adicionar o category.id aos defaultValues.

Um problema semelhante ocorreu na edição de produtos. Para que a edição funcionasse corretamente, também foi necessário incluir o id do produto em defaultValues no componente `produto-edit-modal`.

---

### Busca, Filtros e Ordenação

Para implementar essas funcionalidades, analisei o funcionamento do componente `DataTable`.

### Busca Global

- Adicionei a propriedade `searchValue`, vinculada ao `globalFilter`
- Adicionei `onSearchChange`, vinculada ao `onGlobalFilterChange`
- Configurei `globalFilterFn` como `includesString`, permitindo busca sem diferenciação de maiúsculas e minúsculas
- O Componente `DataTable` recebe o `searchValue` e `onSearchChange` das views.

### Filtros por Coluna

- Adicionei as props `columnFilters` e `onColumnFiltersChange`
- Assim como a busca global, o componente `DataTable` recebe `columnFilters` e `onColumnFiltersChange` das views essas propriedades são definidas através de um `select`.

### Ordenação

A ordenação foi a implementação mais simples:

- Adicionei `getSortedRowModel()` ao `useReactTable`
- No header das colunas, utilizei:
  - `getCanSort()` para verificar se a coluna é ordenável
  - `getIsSorted()` para identificar o estado atual

- Para melhorar a experiência do usuário, adicionei ícones indicando:
  - Ordenação ascendente
  - Ordenação descendente
  - Estado padrão, sem ordenação

## 2. O que poderia ser diferente

1. **Paginação no backend**
   Atualmente, a listagem é feita no front-end com manipulcacao do react-table. Em um cenário com muitos dados, seria interessante paginar no backend enviando as informações pela url.

2. **Tratamento de erros**
   Poderia haver códigos de erro mais específicos e mensagens padronizadas em um arquivo utilitário para enviar para o front-end.

3. **Tipagem compartilhada**
   Compartilhar tipos entre backend e frontend reduziria riscos de inconsistência.

4. **Paradigmas e Patterns**
   Uma abordagem orientada a objetos para os repositories e services poderia trazer benefícios, como a definição de interfaces para estabelecer contratos claros entre as camadas da aplicação. Isso também possibilitaria o uso de injeção de dependência, facilitando a criação de mocks e melhorando a testabilidade do código.

   Apesar disso, para o escopo do desafio, a abordagem funcional adotada foi suficiente e manteve o código mais simples e direto.
