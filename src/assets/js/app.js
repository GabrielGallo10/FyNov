/**
 * ============================================================================
 * FYNOV - MÓDULO PRINCIPAL (app.js)
 * ============================================================================
 * 
 * Este é o arquivo principal de inicialização da aplicação FyNov.
 * Coordena o carregamento e inicialização de todos os outros módulos.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Ponto de entrada principal da aplicação
 * 
 * ORDEM DE CARREGAMENTO DOS MÓDULOS:
 * ===================================
 * 1. storage.js  - Funções de persistência (CRUD localStorage)
 * 2. utils.js    - Funções utilitárias (formatação, datas, cálculos)
 * 3. charts.js   - Funções de gráficos (Chart.js)
 * 4. render.js   - Funções de renderização da interface
 * 5. profile.js  - Funções de perfil do usuário
 * 6. forms.js    - Funções de formulários
 * 7. app.js      - Inicialização (este arquivo)
 * 
 * Dependências: Todos os módulos acima, Bootstrap 5
 */

// ============================================================================
// INICIALIZAÇÃO DA APLICAÇÃO
// ============================================================================

/**
 * Evento disparado quando o DOM está completamente carregado
 * Inicializa todos os componentes da aplicação
 */
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 FyNov - Iniciando aplicação...');
    
    // ========================================================================
    // INICIALIZAÇÃO DOS FORMULÁRIOS
    // ========================================================================
    
    // Formulários de adição de novos itens
    attachForm('recebimentos', 'recebimentos-form');
    attachForm('gastos', 'gastos-form');
    attachForm('metas', 'metas-form');
    
    // Formulários de edição de itens existentes
    attachEditForm('recebimentos', 'edit-recebimentos-form');
    attachEditForm('gastos', 'edit-gastos-form');
    
    // ========================================================================
    // RENDERIZAÇÃO INICIAL DAS LISTAS
    // ========================================================================
    
    renderListIfExists('recebimentos');
    renderListIfExists('gastos');
    renderListIfExists('metas');
    
    // ========================================================================
    // RENDERIZAÇÃO DOS GRÁFICOS
    // ========================================================================
    
    // Verifica se Chart.js está disponível antes de renderizar
    if (typeof Chart !== 'undefined') {
        renderChartsIfExists();
    }
    
    // ========================================================================
    // RENDERIZAÇÃO DOS COMPARATIVOS MENSAIS
    // ========================================================================
    
    renderMonthComparison('recebimentos');
    renderMonthComparison('gastos');
    
    // ========================================================================
    // RENDERIZAÇÃO DO DASHBOARD
    // ========================================================================
    
    renderDashboardSummary();
    renderComparisonCharts();
    
    // ========================================================================
    // INICIALIZAÇÃO DO PERFIL
    // ========================================================================
    
    renderProfileUI();
    initPerfilForm();
    initLogout();
    
    console.log('✅ FyNov - Aplicação iniciada com sucesso!');
});

// ============================================================================
// FUNÇÕES GLOBAIS DE UTILIDADE
// ============================================================================

/**
 * Exibe uma notificação temporária ao usuário
 * @param {string} message - Mensagem a ser exibida
 * @param {string} type - Tipo da notificação ('success', 'error', 'warning')
 */
function showNotification(message, type = 'success') {
    // TODO: Implementar sistema de notificações toast
    console.log(`[${type.toUpperCase()}] ${message}`);
}
