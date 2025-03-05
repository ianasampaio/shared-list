# 🛒 Shared List - Lista de Compras Compartilhada

## 📌 Sobre o Projeto

O **Shared List** é uma API para gerenciamento de listas de compras compartilhadas em tempo real. Permite que múltiplos usuários colaborem em uma mesma lista, adicionando, editando e removendo itens de forma dinâmica.

## ✨ Funcionalidades

🔹 Autenticação segura para os usuários

🔹 Criar e gerenciar listas de compras

🔹 Convidar colaboradores para uma lista

🔹 Adicionar, editar e remover itens em tempo real

## 🚀 Tecnologias Utilizadas

- **NestJS** - Framework para construção de APIs
- **TypeScript** - Tipagem estática para JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Prisma** - ORM para gerenciamento do banco
- **Docker** - Containerização para facilitar a execução
- **WebSocket** - Comunicação em tempo real

## 🔌 WebSockets

O projeto utiliza WebSockets para permitir atualizações em tempo real na lista de compras compartilhada. A comunicação é baseada no protocolo Socket.IO, garantindo que os usuários recebam notificações instantâneas sobre mudanças na lista. Abaixo estão os eventos implementados e suas funcionalidades:

| Evento             | Descrição                                                        | Envio                                                                                                                 | Resposta                                       |
| ------------------ | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `joinShoppingList` | Adiciona o usuário a uma lista de compras e sincroniza os dados. | `{ "shoppingListId": "12345" }`                                                                                       | `syncList` com a lista atualizada.             |
| `addItem`          | Adiciona um item à lista de compras.                             | `{ "shoppingListId": "12345", "createItemDto": { "description": "item" }`                                             | `itemAdded` com a lista de itens atualizada.   |
| `updateItem`       | Atualiza um item na lista de compras.                            | `{ "shoppingListId": "12345", "itemId": "67890", "updateItemDto": { "description": "item", "status": "PURCHASED" } }` | `itemUpdated` com o item atualizado.           |
| `deleteItem`       | Remove um item da lista de compras.                              | `{ "shoppingListId": "12345", "itemId": "67890" }`                                                                    | `itemDeleted` com a lista de itens atualizada. |

## 🛠 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Passos para rodar o projeto

1. Clone este repositório:
   ```sh
   git clone https://github.com/ianasampaio/shared-list.git
   cd shared-list
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente:
   ```sh
   cp .env.example .env
   ```
4. Suba o banco de dados com Docker:
   ```sh
   docker compose up -d
   ```
5. Execute as migrações do banco:
   ```sh
   npx prisma migrate dev --name init
   ```
6. Inicie o servidor:
   ```sh
   npm run start
   ```

💡 **Dúvidas ou sugestões?** Sinta-se à vontade para abrir uma _issue_ ou contribuir com _pull requests_! 😊
