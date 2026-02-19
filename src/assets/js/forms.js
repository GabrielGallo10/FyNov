/**
 * ============================================================================
 * FYNOV - MÓDULO DE FORMULÁRIOS (forms.js)
 * ============================================================================
 * 
 * Este módulo gerencia todos os formulários de entrada de dados do sistema.
 * Inclui formulários de adição e edição de recebimentos, gastos e metas.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Módulo de gerenciamento de formulários
 * 
 * Dependências: storage.js, render.js, charts.js
 * Usado por: app.js
 */

// ============================================================================
// FORMULÁRIOS DE ADIÇÃO
// ============================================================================

/**
 * Anexa event listener a um formulário de adição
 * @param {string} key - Chave do localStorage ('recebimentos', 'gastos', 'metas')
 * @param {string} formId - ID do elemento form no DOM
 */
function attachForm(key, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fd = new FormData(form);
        
        // ====================================================================
        // PROCESSAMENTO DE METAS
        // ====================================================================
        if (key === 'metas') {
            const title = fd.get('title');
            const target = parseFloat(fd.get('target') || 0);
            const deadline = fd.get('deadline');
            
            // Validação
            if (!title || !target) {
                alert('Preencha título e valor alvo.');
                return;
            }
            
            // Adiciona nova meta com current = 0
            addItem('metas', { 
                title, 
                target, 
                current: 0, 
                deadline 
            });
            
        } else {
            // ================================================================
            // PROCESSAMENTO DE RECEBIMENTOS/GASTOS
            // ================================================================
            const date = fd.get('date') || '';
            const description = fd.get('description') || '';
            // Converte vírgula para ponto (formato brasileiro para numérico)
            const amount = parseFloat((fd.get('amount') || '0').toString().replace(',', '.') || 0);
            const category = fd.get('category') || '';
            
            // Validação
            if (!description || !amount) {
                alert('Preencha descrição e valor.');
                return;
            }
            
            // Adiciona novo item
            addItem(key, { date, description, amount, category });
        }
        
        // Limpa o formulário
        form.reset();
        
        // Atualiza a interface
        renderListIfExists(key);
        renderChartsIfExists();
        renderMonthComparison('recebimentos');
        renderMonthComparison('gastos');
        renderDashboardSummary();
        
        // Fecha o modal correspondente
        closeModalAfterSubmit(key);
    });
}

/**
 * Fecha o modal após submit bem-sucedido
 * @param {string} key - Chave que determina qual modal fechar
 */
function closeModalAfterSubmit(key) {
    const modalId = key === 'metas' 
        ? 'metaModal' 
        : (key === 'recebimentos' ? 'recebimentoModal' : 'gastoModal');
    
    const modal = document.getElementById(modalId);
    if (modal && typeof bootstrap !== 'undefined') {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) bootstrapModal.hide();
    }
}

// ============================================================================
// FORMULÁRIOS DE EDIÇÃO
// ============================================================================

/**
 * Anexa event listener a um formulário de edição
 * @param {string} key - Chave do localStorage ('recebimentos', 'gastos')
 * @param {string} formId - ID do elemento form no DOM
 */
function attachEditForm(key, formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fd = new FormData(form);
        
        // Obtém o ID do item sendo editado
        const id = fd.get('edit-id');
        if (!id) {
            alert('Erro ao identificar o item.');
            return;
        }
        
        // Extrai dados do formulário
        const date = fd.get('date') || '';
        const description = fd.get('description') || '';
        const amount = parseFloat((fd.get('amount') || '0').toString().replace(',', '.') || 0);
        const category = fd.get('category') || '';
        
        // Validação
        if (!description || !amount) {
            alert('Preencha descrição e valor.');
            return;
        }
        
        // Atualiza o item no localStorage
        updateItem(key, id, { date, description, amount, category });
        
        // Limpa o formulário
        form.reset();
        
        // Atualiza a interface
        renderListIfExists(key);
        renderChartsIfExists();
        renderMonthComparison('recebimentos');
        renderMonthComparison('gastos');
        renderDashboardSummary();
        
        // Fecha o modal de edição
        closeEditModal(key);
    });
}

/**
 * Fecha o modal de edição
 * @param {string} key - Chave que determina qual modal fechar
 */
function closeEditModal(key) {
    const modalId = key === 'recebimentos' ? 'editRecebimentoModal' : 'editGastoModal';
    const modal = document.getElementById(modalId);
    
    if (modal && typeof bootstrap !== 'undefined') {
        const bootstrapModal = bootstrap.Modal.getInstance(modal);
        if (bootstrapModal) bootstrapModal.hide();
    }
}
