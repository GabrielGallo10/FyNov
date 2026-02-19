/**
 * ============================================================================
 * FYNOV - MÓDULO DE UTILITÁRIOS (utils.js)
 * ============================================================================
 * 
 * Este módulo contém funções utilitárias usadas em todo o projeto.
 * Inclui formatação de moeda, escape de HTML, cálculos de datas e comparações.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Funções utilitárias compartilhadas
 * 
 * Dependências: Nenhuma
 * Usado por: render.js, charts.js, forms.js
 */

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================================================

/**
 * Formata um valor numérico para moeda brasileira (BRL)
 * @param {number|string} v - Valor a ser formatado
 * @returns {string} Valor formatado (ex: "R$ 1.234,56")
 */
function formatCurrency(v) { 
    return Number(v).toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    }); 
}

/**
 * Escapa caracteres especiais de HTML para prevenir XSS
 * @param {string} str - String a ser escapada
 * @returns {string} String com caracteres especiais escapados
 */
function escapeHtml(str) { 
    if (!str && str !== 0) return ''; 
    return String(str).replace(/[&<>"']/g, function (m) {
        return ({ 
            '&': '&amp;', 
            '<': '&lt;', 
            '>': '&gt;', 
            '"': '&quot;', 
            "'": '&#39;' 
        })[m];
    }); 
}

// ============================================================================
// FUNÇÕES DE CÁLCULO DE DATAS
// ============================================================================

/**
 * Retorna o ano e mês atual
 * @returns {Object} Objeto com propriedades y (ano) e m (mês 0-11)
 */
function getCurrentMonth() {
    const now = new Date();
    return { y: now.getFullYear(), m: now.getMonth() };
}

/**
 * Retorna o ano e mês anterior
 * @returns {Object} Objeto com propriedades y (ano) e m (mês 0-11)
 */
function getPreviousMonth() {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return { y: d.getFullYear(), m: d.getMonth() };
}

/**
 * Retorna os últimos N meses com labels formatados
 * @param {number} n - Número de meses a retornar
 * @returns {Array} Array de objetos com y (ano), m (mês) e label (ex: "jan. 2024")
 */
function lastNMonths(n) {
    const res = []; 
    const now = new Date();
    
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        res.push({ 
            y: d.getFullYear(), 
            m: d.getMonth(), 
            label: d.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }) 
        });
    }
    
    return res;
}

// ============================================================================
// FUNÇÕES DE CÁLCULO FINANCEIRO
// ============================================================================

/**
 * Soma os valores de itens em um mês específico
 * @param {Array} items - Array de itens com propriedades date e amount
 * @param {number} y - Ano para filtrar
 * @param {number} m - Mês para filtrar (0-11)
 * @returns {number} Soma total dos valores do mês
 */
function sumByMonth(items, y, m) {
    return items.reduce((s, it) => {
        try {
            const d = it.date ? new Date(it.date) : null;
            if (d && d.getFullYear() === y && d.getMonth() === m) {
                return s + Number(it.amount || 0);
            }
        } catch (e) { 
            console.warn('Erro ao processar data:', e);
        }
        return s;
    }, 0);
}

/**
 * Calcula a variação percentual entre dois valores
 * @param {number} current - Valor atual
 * @param {number} previous - Valor anterior
 * @returns {number|null} Percentual de variação ou null se não calculável
 */
function percentChange(current, previous) {
    if (previous === 0) return current > 0 ? 100 : null;
    return Math.round(((current - previous) / previous) * 100);
}
