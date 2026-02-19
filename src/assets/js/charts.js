/**
 * ============================================================================
 * FYNOV - MÓDULO DE GRÁFICOS (charts.js)
 * ============================================================================
 * 
 * Este módulo é responsável pela renderização de todos os gráficos do sistema
 * utilizando a biblioteca Chart.js. Inclui gráficos de linha, barra e rosca.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Módulo de visualização de dados com Chart.js
 * 
 * Dependências: Chart.js (CDN), storage.js, utils.js
 * Usado por: app.js, dashboard.html, recebimentos.html, gastos.html
 */

// ============================================================================
// VARIÁVEIS GLOBAIS PARA REFERÊNCIA DOS GRÁFICOS
// ============================================================================

// As referências são armazenadas em window para permitir destruição e recriação

// ============================================================================
// FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO
// ============================================================================

/**
 * Renderiza todos os gráficos existentes na página
 * Verifica a existência de cada canvas antes de renderizar
 * Destrói gráficos anteriores para evitar memory leaks
 */
function renderChartsIfExists() {
    // Verifica se Chart.js está disponível
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js não está carregado');
        return;
    }
    
    // Obtém dados do localStorage
    const receb = getItems('recebimentos');
    const gastos = getItems('gastos');
    const months = lastNMonths(6);
    const monthLabels = months.map(m => m.label);

    // ========================================================================
    // GRÁFICO: Evolução Financeira (Linha)
    // ========================================================================
    const evCanvas = document.getElementById('evolucaoChart');
    if (evCanvas) {
        const recebData = months.map(m => sumByMonth(receb, m.y, m.m));
        const gastosData = months.map(m => sumByMonth(gastos, m.y, m.m));
        
        // Destrói gráfico anterior se existir
        if (window._evolucaoChart) window._evolucaoChart.destroy();
        
        window._evolucaoChart = new Chart(evCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: monthLabels,
                datasets: [
                    { 
                        label: 'Recebimentos', 
                        data: recebData, 
                        borderColor: '#00c853', 
                        backgroundColor: 'rgba(0,200,83,0.08)', 
                        tension: 0.3 
                    },
                    { 
                        label: 'Gastos', 
                        data: gastosData, 
                        borderColor: '#ff5252', 
                        backgroundColor: 'rgba(255,82,82,0.06)', 
                        tension: 0.3 
                    }
                ]
            },
            options: { 
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                }
            }
        });
    }

    // ========================================================================
    // GRÁFICO: Recebimentos por Mês (Barra)
    // ========================================================================
    const recebCanvas = document.getElementById('recebimentosChart');
    if (recebCanvas) {
        const recebData = months.map(m => sumByMonth(receb, m.y, m.m));
        
        if (window._recebimentosChart) window._recebimentosChart.destroy();
        
        window._recebimentosChart = new Chart(recebCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'Recebimentos',
                    data: recebData,
                    backgroundColor: 'rgba(0, 200, 83, 0.6)',
                    borderColor: '#00c853',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // ========================================================================
    // GRÁFICO: Gastos por Mês (Barra)
    // ========================================================================
    const gastosMesesCanvas = document.getElementById('gastosMesesChart');
    if (gastosMesesCanvas) {
        const gastosData = months.map(m => sumByMonth(gastos, m.y, m.m));
        
        if (window._gastosMesesChart) window._gastosMesesChart.destroy();
        
        window._gastosMesesChart = new Chart(gastosMesesCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: monthLabels,
                datasets: [{
                    label: 'Gastos',
                    data: gastosData,
                    backgroundColor: 'rgba(229, 57, 53, 0.6)',
                    borderColor: '#e53935',
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // ========================================================================
    // GRÁFICO: Distribuição de Gastos por Categoria (Rosca)
    // ========================================================================
    const distCanvas = document.getElementById('distribuicaoChart');
    if (distCanvas) {
        // Agrupa gastos por categoria
        const byCat = {};
        gastos.forEach(g => { 
            const c = g.category || 'Outros'; 
            byCat[c] = (byCat[c] || 0) + Number(g.amount || 0); 
        });
        
        const labels = Object.keys(byCat);
        const data = labels.map(l => byCat[l]);
        
        if (window._distChart) window._distChart.destroy();
        
        window._distChart = new Chart(distCanvas.getContext('2d'), {
            type: 'doughnut', 
            data: {
                labels, 
                datasets: [{
                    data, 
                    backgroundColor: [
                        '#00c853', // Verde
                        '#ffb300', // Amarelo
                        '#29b6f6', // Azul claro
                        '#8e24aa', // Roxo
                        '#ff5252', // Vermelho
                        '#9e9e9e'  // Cinza
                    ]
                }]
            }, 
            options: { 
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }

    // Renderiza gráficos comparativos das páginas individuais
    renderComparisonCharts();
}

// ============================================================================
// GRÁFICOS COMPARATIVOS (Páginas de Recebimentos e Gastos)
// ============================================================================

/**
 * Renderiza os gráficos comparativos de mês atual vs anterior
 * Usados nas páginas de recebimentos e gastos
 */
function renderComparisonCharts() {
    if (typeof Chart === 'undefined') return;
    
    const receb = getItems('recebimentos');
    const gastos = getItems('gastos');
    const cur = getCurrentMonth();
    const prev = getPreviousMonth();
    
    // Calcula valores mensais
    const recebAtual = sumByMonth(receb, cur.y, cur.m);
    const recebAnterior = sumByMonth(receb, prev.y, prev.m);
    const gastosAtual = sumByMonth(gastos, cur.y, cur.m);
    const gastosAnterior = sumByMonth(gastos, prev.y, prev.m);

    // Labels dos meses
    const prevLabel = new Date(prev.y, prev.m, 1).toLocaleString('pt-BR', { month: 'short', year: 'numeric' });
    const curLabel = new Date(cur.y, cur.m, 1).toLocaleString('pt-BR', { month: 'short', year: 'numeric' });

    // Gráfico comparativo de recebimentos
    const recebCompCanvas = document.getElementById('recebimentosComparativoChart');
    if (recebCompCanvas) {
        if (window._recebimentosComparativoChart) window._recebimentosComparativoChart.destroy();
        
        window._recebimentosComparativoChart = new Chart(recebCompCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [prevLabel, curLabel],
                datasets: [{
                    label: 'Recebimentos',
                    data: [recebAnterior, recebAtual],
                    backgroundColor: ['rgba(0, 200, 83, 0.4)', 'rgba(0, 200, 83, 0.8)'],
                    borderColor: ['#00a843', '#00c853'],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Gráfico comparativo de gastos
    const gastosCompCanvas = document.getElementById('gastosComparativoChart');
    if (gastosCompCanvas) {
        if (window._gastosComparativoChart) window._gastosComparativoChart.destroy();
        
        window._gastosComparativoChart = new Chart(gastosCompCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: [prevLabel, curLabel],
                datasets: [{
                    label: 'Gastos',
                    data: [gastosAnterior, gastosAtual],
                    backgroundColor: ['rgba(229, 57, 53, 0.4)', 'rgba(229, 57, 53, 0.8)'],
                    borderColor: ['#c62828', '#e53935'],
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}
