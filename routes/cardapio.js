// Router do departamento 'Cardápio'
// Este arquivo exporta um router Express que fornece operações simples
// para listar e adicionar itens do cardápio. O armazenamento usado aqui
// é apenas em memória para fins didáticos; em produção use um banco de dados.
const express = require('express');
const router = express.Router();

// Armazenamento em memória dos itens do cardápio.
// Cada item: { id: number, nome: string, preco: number }
let itens = [
	{ id: 1, nome: 'Cachorro-quente', preco: 8.5 },
	{ id: 2, nome: 'Hambúrguer', preco: 12.0 }
];

/**
 * GET /cardapio
 * Retorna a lista completa de itens do cardápio em formato JSON.
 * Uso: GET /cardapio
 * Resposta: 200 OK, body: [{ id, nome, preco }, ...]
 */
router.get('/', (req, res) => {
	res.json(itens);
});

/**
 * POST /cardapio
 * Cria um novo item no cardápio.
 * Espera um corpo JSON com { nome: string, preco: number }.
 * Validações simples:
 *  - `nome` deve existir e ser uma string não vazia
 *  - `preco` deve ser um número (pode ser 0)
 * Respostas:
 *  - 201 Created com o item criado
 *  - 400 Bad Request quando faltar campo obrigatório
 */
router.post('/', (req, res) => {
	const { nome, preco } = req.body || {};

	// Validação básica de entrada
	if (!nome || typeof nome !== 'string' || nome.trim() === '') {
		return res.status(400).json({ error: 'Campo `nome` é obrigatório e deve ser uma string' });
	}
	if (preco == null || typeof preco !== 'number') {
		return res.status(400).json({ error: 'Campo `preco` é obrigatório e deve ser um número' });
	}

	const novo = { id: itens.length + 1, nome: nome.trim(), preco };
	itens.push(novo);

	// Retorna 201 com o recurso criado
	res.status(201).json(novo);
});

module.exports = router;

