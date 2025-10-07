// Entrada principal da API da lanchonete
// Este arquivo configura o aplicativo Express, registra middlewares
// e monta os routers de cada departamento (cardápio, pedidos, clientes).
const express = require('express');
const app = express();

// Middleware embutido para parsear bodies JSON.
// Permite que handlers acessem `req.body` quando o cliente enviar JSON.
app.use(express.json());

// Middleware simples para logging de requisições (útil em desenvolvimento).
// Registra método e caminho para cada requisição recebida.
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`);
	next();
});

// Monta os routers responsáveis por cada área da API.
// Cada arquivo em `routes/` exporta um Router do Express.
app.use('/cardapio', require('./routes/cardapio'));
app.use('/pedidos', require('./routes/pedidos'));
app.use('/clientes', require('./routes/clientes'));

// Tratador simples para rotas não encontradas (404).
// Deve ficar após a montagem dos routers para capturar requisições
// que não corresponderam a nenhuma rota conhecida.
app.use((req, res) => {
	res.status(404).json({ error: 'Not Found' });
});

// Inicializa o servidor quando este arquivo é executado diretamente.
// A porta pode ser configurada via variável de ambiente PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Lanchonete API ouvindo na porta ${PORT}`);
});

// Exporta a instância do app para permitir testes automatizados ou
// reuso em outros módulos (por exemplo: servidores de teste).
module.exports = app;
