/**
 * ============================================================================
 * FYNOV - MÓDULO DE ARMAZENAMENTO (storage.js)
 * ============================================================================
 * 
 * Este módulo é responsável por gerenciar a persistência de dados no localStorage.
 * Fornece funções para criar, ler, atualizar e deletar itens (CRUD).
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Módulo de persistência de dados usando localStorage
 * 
 * Dependências: Nenhuma
 * Usado por: render.js, forms.js, charts.js, profile.js
 */

// ============================================================================
// FUNÇÕES DE LEITURA
// ============================================================================

/**
 * Recupera todos os itens de uma chave específica do localStorage
 * @param {string} key - Chave do localStorage (ex: 'recebimentos', 'gastos', 'metas')
 * @returns {Array} Array de objetos ou array vazio se não existir/erro
 */
function getItems(key) {
    try { 
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch (e) { 
        console.error(`Erro ao recuperar itens de '${key}':`, e);
        return [];
    }
}

/**
 * Recupera um item específico pelo ID
 * @param {string} key - Chave do localStorage
 * @param {number|string} id - ID do item a ser recuperado
 * @returns {Object|undefined} Objeto encontrado ou undefined
 */
function getItemById(key, id) {
    const items = getItems(key);
    return items.find(i => i.id == id);
}

// ============================================================================
// FUNÇÕES DE ESCRITA
// ============================================================================

/**
 * Salva um array de itens no localStorage
 * @param {string} key - Chave do localStorage
 * @param {Array} items - Array de objetos a ser salvo
 */
function saveItems(key, items) { 
    try {
        localStorage.setItem(key, JSON.stringify(items));
    } catch (e) {
        console.error(`Erro ao salvar itens em '${key}':`, e);
    }
}

/**
 * Adiciona um novo item ao localStorage
 * Gera automaticamente um ID único baseado em timestamp
 * @param {string} key - Chave do localStorage
 * @param {Object} item - Objeto a ser adicionado
 * @returns {Object} Item adicionado com ID gerado
 */
function addItem(key, item) { 
    const items = getItems(key); 
    item.id = Date.now(); // Gera ID único baseado em timestamp
    items.push(item); 
    saveItems(key, items); 
    return item; 
}

/**
 * Atualiza um item existente no localStorage
 * @param {string} key - Chave do localStorage
 * @param {number|string} id - ID do item a ser atualizado
 * @param {Object} updatedData - Dados a serem mesclados com o item existente
 * @returns {Object|undefined} Item atualizado ou undefined se não encontrado
 */
function updateItem(key, id, updatedData) {
    const items = getItems(key);
    const index = items.findIndex(i => i.id == id);
    
    if (index !== -1) {
        // Mescla os dados existentes com os novos dados
        items[index] = { ...items[index], ...updatedData };
        saveItems(key, items);
        return items[index];
    }
    
    console.warn(`Item com ID ${id} não encontrado em '${key}'`);
    return undefined;
}

/**
 * Remove um item do localStorage pelo ID
 * Também atualiza a interface se a função renderListIfExists existir
 * @param {string} key - Chave do localStorage
 * @param {number|string} id - ID do item a ser removido
 */
function deleteItem(key, id) { 
    const items = getItems(key).filter(i => i.id != id); 
    saveItems(key, items); 
    
    // Atualiza a interface se a função existir
    if (typeof renderListIfExists === 'function') {
        renderListIfExists(key);
    }
}
