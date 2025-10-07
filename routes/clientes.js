// Router do departamento 'Clientes'
// Oferece rotas para consultar e criar clientes. O armazenamento é
// em memória para fins de exemplo; substitua por persistência real
// em aplicações de produção.
const express = require('express');
const router = express.Router();

// Armazenamento em memória de clientes: { id, nome, telefone }
let clientes = [
	{ id: 1, nome: 'João Silva', telefone: '99999-0000' }
];

/**
 * GET /clientes
 * Retorna a lista de clientes cadastrados.
 */
router.get('/', (req, res) => {
	res.json(clientes);
});

/**
 * POST /clientes
 * Adiciona um novo cliente. Espera JSON com { nome: string, telefone: string }.
 * Faz validação simples para garantir que os campos existam.
 */
router.post('/', (req, res) => {
	const { nome, telefone } = req.body || {};

	if (!nome || typeof nome !== 'string' || nome.trim() === '') {
		return res.status(400).json({ error: 'Campo `nome` é obrigatório' });
	}
	if (!telefone || typeof telefone !== 'string' || telefone.trim() === '') {
		return res.status(400).json({ error: 'Campo `telefone` é obrigatório' });
	}

	const novo = { id: clientes.length + 1, nome: nome.trim(), telefone: telefone.trim() };
	clientes.push(novo);
	res.status(201).json(novo);
});

module.exports = router;

