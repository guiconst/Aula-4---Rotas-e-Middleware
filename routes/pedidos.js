// Router do departamento 'Pedidos'
// Fornece rotas para consultar e criar pedidos.
// O armazenamento é em memória apenas para demonstração; implemente
// persistência em banco de dados conforme a necessidade.
const express = require('express');
const router = express.Router();

// Estrutura de um pedido: { id, clienteId, itens: [{ id, quantidade, preco? }], total }
let pedidos = [
	{ id: 1, clienteId: 1, itens: [{ id: 2, quantidade: 1 }], total: 12.0 }
];

/**
 * GET /pedidos
 * Retorna todos os pedidos em formato JSON.
 * Observação: em aplicações reais, considere paginação e filtros por cliente/estado.
 */
router.get('/', (req, res) => {
	res.json(pedidos);
});

/**
 * POST /pedidos
 * Cria um novo pedido.
 * Espera um corpo JSON com: { clienteId: number, itens: Array }
 * Cada item do pedido deve conter pelo menos { id: number, quantidade: number }.
 * Esta rota faz validação básica e calcula um total simplificado.
 * Em uma implementação completa você buscaria os preços reais no cardápio.
 */
router.post('/', (req, res) => {
	const { clienteId, itens: itensPedido } = req.body || {};

	// Validações básicas
	if (!clienteId || !Array.isArray(itensPedido) || itensPedido.length === 0) {
		return res.status(400).json({ error: 'clienteId e itens são obrigatórios' });
	}

	// Validar cada item do pedido
	for (const it of itensPedido) {
		if (!it || typeof it.id !== 'number' || typeof it.quantidade !== 'number' || it.quantidade <= 0) {
			return res.status(400).json({ error: 'Cada item precisa de `id` (número) e `quantidade` (>0)' });
		}
	}

	const novo = { id: pedidos.length + 1, clienteId, itens: itensPedido, total: 0 };

	// Calcular total de forma ingênua: usa `preco` vindo no item (se presente)
	novo.total = itensPedido.reduce((sum, it) => sum + (it.preco || 0) * it.quantidade, 0);

	pedidos.push(novo);
	res.status(201).json(novo);
});

module.exports = router;

