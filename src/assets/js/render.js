/**
 * ============================================================================
 * FYNOV - MÓDULO DE RENDERIZAÇÃO (render.js)
 * ============================================================================
 * 
 * Este módulo é responsável pela renderização dinâmica de elementos na interface.
 * Inclui listas de transações, metas, comparativos mensais e resumos do dashboard.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Módulo de renderização de interface do usuário
 * 
 * Dependências: storage.js, utils.js
 * Usado por: app.js, todas as páginas HTML
 */

// ============================================================================
// RENDERIZAÇÃO DE LISTAS (Recebimentos, Gastos, Metas)
// ============================================================================

/**
 * Renderiza uma lista de itens na interface
 * Adapta a renderização baseada no tipo de dados (metas vs transações)
 * @param {string} key - Chave do localStorage ('recebimentos', 'gastos', 'metas')
 */
function renderListIfExists(key) {
    const el = document.getElementById(key + "-list");
    if (!el) return;
    
    // Obtém itens em ordem reversa (mais recentes primeiro)
    const items = getItems(key).slice().reverse();
    
    // ========================================================================
    // RENDERIZAÇÃO DE METAS (Cards com progresso)
    // ========================================================================
    if (key === 'metas') {
        // Estado vazio
        if (items.length === 0) { 
            el.innerHTML = `
                <div class="metas-empty">
                    <i class="fas fa-bullseye metas-empty-icon"></i>
                    <p class="metas-empty-title">Nenhuma meta ainda</p>
                    <p class="metas-empty-text">Crie sua primeira meta e comece a transformar seus sonhos em realidade!</p>
                </div>
            `; 
            return; 
        }

        /**
         * Retorna mensagem motivacional baseada no progresso
         * @param {number} pct - Percentual de progresso
         * @returns {Object} Objeto com msg, cls e icon
         */
        function motivacionalMsg(pct) {
            if (pct >= 100) return { msg: 'Meta conquistada!', cls: 'meta-message--done', icon: 'fa-trophy' };
            if (pct >= 80) return { msg: 'Quase lá! Última reta!', cls: 'meta-message--quase', icon: 'fa-fire' };
            if (pct >= 50) return { msg: 'Bom ritmo! Continue assim.', cls: 'meta-message--bom', icon: 'fa-star' };
            if (pct >= 25) return { msg: 'Bom começo!', cls: 'meta-message--inicio', icon: 'fa-seedling' };
            return { msg: 'Você consegue!', cls: 'meta-message--vamos', icon: 'fa-hand-point-right' };
        }
        
        // Gera HTML dos cards de metas
        let html = '<div class="row g-4">';
        items.forEach(it => {
            const pct = it.current && it.target ? Math.min(100, Math.round((it.current / it.target) * 100)) : 0;
            const mot = motivacionalMsg(pct);
            
            html += `
                <div class="col-md-6 col-lg-4">
                    <div class="meta-card meta-card--pct-${pct >= 100 ? 'done' : pct >= 50 ? 'quase' : 'inicio'}" 
                         onclick="window.location.href='meta-detalhe.html?id=${it.id}'" 
                         style="cursor: pointer;">
                        <div class="meta-card-header">
                            <h6 class="meta-card-title">${escapeHtml(it.title)}</h6>
                            <button class="btn-meta-delete" onclick="event.stopPropagation(); confirmDelete('metas',${it.id})" title="Remover meta">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="meta-card-body">
                            <div class="meta-info">
                                <span class="meta-label">Alvo</span>
                                <span class="meta-value">${formatCurrency(it.target)}</span>
                            </div>
                            <div class="meta-info">
                                <span class="meta-label">Progresso</span>
                                <span class="meta-percentage">${pct}%</span>
                            </div>
                            <div class="progress-container">
                                <div class="progress-bar-meta" style="width: ${pct}%"></div>
                            </div>
                            <div class="meta-message ${mot.cls}">
                                <i class="fas ${mot.icon}"></i> ${mot.msg}
                            </div>
                            <div class="meta-info">
                                <span class="meta-label">Prazo</span>
                                <span class="meta-deadline">${escapeHtml(it.deadline || '-')}</span>
                            </div>
                            <div class="meta-card-footer">
                                <span class="meta-view-details">Ver detalhes <i class="fas fa-chevron-right"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        el.innerHTML = html;
        
    } else {
        // ====================================================================
        // RENDERIZAÇÃO DE TRANSAÇÕES (Tabela com ações)
        // ====================================================================
        
        // Estado vazio
        if (items.length === 0) { 
            el.innerHTML = '<div class="p-3 text-muted text-center">Nenhum registro encontrado.</div>'; 
            return; 
        }

        // Gera HTML da tabela
        let html = `
            <div class="table-responsive">
                <table class="table table-hover table-clickable">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th class="text-end">Valor</th>
                            <th class="text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        items.forEach(it => {
            const dateFormatted = it.date ? new Date(it.date).toLocaleDateString('pt-BR') : '';
            
            html += `
                <tr>
                    <td>
                        <div class="item-name">${escapeHtml(it.description)}</div>
                        ${dateFormatted ? `<small class="text-muted">${dateFormatted}</small>` : ''}
                    </td>
                    <td>
                        <span class="badge bg-primary">${escapeHtml(it.category || 'Sem categoria')}</span>
                    </td>
                    <td class="text-end">
                        <strong>${formatCurrency(it.amount || 0)}</strong>
                    </td>
                    <td class="text-center">
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditModal('${key}',${it.id})" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="confirmDelete('${key}',${it.id})" title="Remover">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;
        el.innerHTML = html;
    }
}

// ============================================================================
// FUNÇÕES DE EDIÇÃO E EXCLUSÃO
// ============================================================================

/**
 * Abre o modal de edição com dados do item preenchidos
 * @param {string} key - Chave do localStorage
 * @param {number|string} id - ID do item
 */
function openEditModal(key, id) {
    const item = getItemById(key, id);
    if (!item) return;
    
    const modalId = key === 'recebimentos' ? 'editRecebimentoModal' : 'editGastoModal';
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Preenche o formulário com os dados do item
    const form = modal.querySelector('form');
    if (form) {
        form.querySelector('[name="edit-id"]').value = item.id;
        form.querySelector('[name="date"]').value = item.date || '';
        form.querySelector('[name="description"]').value = item.description || '';
        form.querySelector('[name="amount"]').value = item.amount || '';
        form.querySelector('[name="category"]').value = item.category || '';
    }
    
    // Abre o modal usando Bootstrap
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

/**
 * Solicita confirmação antes de excluir um item
 * @param {string} key - Chave do localStorage
 * @param {number|string} id - ID do item
 */
function confirmDelete(key, id) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
        deleteItem(key, id);
        
        // Atualiza a interface
        if (typeof renderChartsIfExists === 'function') renderChartsIfExists();
        if (typeof renderMonthComparison === 'function') renderMonthComparison(key);
        if (typeof renderDashboardSummary === 'function') renderDashboardSummary();
    }
}

// ============================================================================
// COMPARATIVOS MENSAIS
// ============================================================================

/**
 * Renderiza a comparação entre mês atual e anterior
 * @param {string} key - Chave do localStorage ('recebimentos' ou 'gastos')
 */
function renderMonthComparison(key) {
    const cur = getCurrentMonth();
    const prev = getPreviousMonth();
    const items = getItems(key);
    const currentSum = sumByMonth(items, cur.y, cur.m);
    const previousSum = sumByMonth(items, prev.y, prev.m);
    const pct = percentChange(currentSum, previousSum);

    // Atualiza elementos do DOM
    const elCurrent = document.getElementById(key + '-mes-atual');
    const elPrevious = document.getElementById(key + '-mes-anterior');
    const elVariacao = document.getElementById(key + '-variacao');
    
    if (elCurrent) elCurrent.textContent = formatCurrency(currentSum);
    if (elPrevious) elPrevious.textContent = formatCurrency(previousSum);
    
    if (elVariacao) {
        if (pct === null || previousSum === 0) {
            elVariacao.textContent = previousSum === 0 && currentSum === 0 ? '—' : (previousSum === 0 ? '+100%' : '—');
            elVariacao.className = 'stat-variation stat-variation--neutral';
        } else {
            // Para recebimentos, aumento é bom. Para gastos, diminuição é bom.
            const isGood = key === 'recebimentos' ? pct >= 0 : pct <= 0;
            elVariacao.textContent = (pct >= 0 ? '+' : '') + pct + '%';
            elVariacao.className = 'stat-variation ' + (isGood ? 'stat-variation--positive' : 'stat-variation--negative');
        }
    }
}

// ============================================================================
// METAS NO DASHBOARD
// ============================================================================

/**
 * Retorna as metas com progresso >= 50% (quase concluídas)
 * @param {number} limit - Número máximo de metas a retornar
 * @returns {Array} Array de metas ordenadas por progresso
 */
function getAlmostDoneMetas(limit) {
    const metas = getItems('metas');
    const withPct = metas.map(m => {
        const pct = m.current && m.target ? Math.min(100, Math.round((m.current / m.target) * 100)) : 0;
        return { ...m, pct };
    });
    return withPct.filter(m => m.pct >= 50).sort((a, b) => b.pct - a.pct).slice(0, limit);
}

/**
 * Renderiza as metas quase concluídas no dashboard
 */
function renderAlmostDoneMetas() {
    const container = document.getElementById('metas-quase-la');
    const parent = document.getElementById('metas-quase-la-container');
    if (!container || !parent) return;
    
    const metas = getAlmostDoneMetas(3);
    
    if (metas.length === 0) {
        parent.style.display = 'none';
        return;
    }
    
    parent.style.display = 'block';
    container.innerHTML = metas.map(m => `
        <div class="col-md-4">
            <div class="meta-quase-card">
                <div class="meta-quase-header">
                    <span class="meta-quase-title">${escapeHtml(m.title)}</span>
                    <span class="meta-quase-pct">${m.pct}%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar-meta" style="width: ${m.pct}%"></div>
                </div>
                <div class="meta-quase-value">${formatCurrency(m.current)} / ${formatCurrency(m.target)}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Retorna as principais metas para exibição no dashboard
 * @param {number} limit - Número máximo de metas
 * @returns {Array} Array de metas com percentual calculado
 */
function getTopMetas(limit) {
    const metas = getItems('metas');
    const withPct = metas.map(m => {
        const pct = m.current && m.target ? Math.min(100, Math.round((m.current / m.target) * 100)) : 0;
        return { ...m, pct };
    });
    return withPct.slice(0, limit);
}

/**
 * Renderiza as principais metas no dashboard
 */
function renderPrincipaisMetas() {
    const container = document.getElementById('principais-metas');
    const parent = document.getElementById('principais-metas-container');
    if (!container || !parent) return;
    
    const metas = getTopMetas(3);
    
    // Estado vazio
    if (metas.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="principais-metas-empty">
                    <i class="fas fa-bullseye"></i>
                    <p>Você ainda não tem metas. <a href="metas.html">Criar primeira meta</a></p>
                </div>
            </div>
        `;
        return;
    }
    
    // Gera cards das metas
    container.innerHTML = metas.map(m => {
        const deadlineText = m.deadline ? new Date(m.deadline).toLocaleDateString('pt-BR') : 'Sem prazo';
        return `
            <div class="col-md-4">
                <div class="meta-card-dashboard" onclick="window.location.href='meta-detalhe.html?id=${m.id}'">
                    <div class="meta-card-dashboard-header">
                        <h6 class="meta-card-dashboard-title">${escapeHtml(m.title)}</h6>
                        <span class="meta-card-dashboard-pct">${m.pct}%</span>
                    </div>
                    <div class="meta-card-dashboard-values">
                        <span class="meta-card-dashboard-current">${formatCurrency(m.current || 0)}</span>
                        <span class="meta-card-dashboard-target">de ${formatCurrency(m.target)}</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar-meta" style="width: ${m.pct}%"></div>
                    </div>
                    <div class="meta-card-dashboard-footer">
                        <span class="meta-card-dashboard-deadline">
                            <i class="fas fa-calendar-alt"></i> ${deadlineText}
                        </span>
                        <span class="meta-card-dashboard-action">Ver detalhes <i class="fas fa-chevron-right"></i></span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================================================
// RESUMO DO DASHBOARD
// ============================================================================

/**
 * Renderiza o resumo financeiro no dashboard
 * Atualiza saldo, recebimentos, gastos e comparações mensais
 */
function renderDashboardSummary() {
    const receb = getItems('recebimentos');
    const gastos = getItems('gastos');
    const cur = getCurrentMonth();
    const prev = getPreviousMonth();
    
    // Calcula valores
    const recebAtual = sumByMonth(receb, cur.y, cur.m);
    const recebAnterior = sumByMonth(receb, prev.y, prev.m);
    const gastosAtual = sumByMonth(gastos, cur.y, cur.m);
    const gastosAnterior = sumByMonth(gastos, prev.y, prev.m);
    const saldo = recebAtual - gastosAtual;

    // Obtém elementos do DOM
    const elSaldo = document.getElementById('dashboard-saldo');
    const elReceb = document.getElementById('dashboard-recebimentos');
    const elRecebBadge = document.getElementById('dashboard-recebimentos-badge');
    const elRecebComp = document.getElementById('dashboard-recebimentos-comparison');
    const elGastos = document.getElementById('dashboard-gastos');
    const elGastosBadge = document.getElementById('dashboard-gastos-badge');
    const elGastosComp = document.getElementById('dashboard-gastos-comparison');

    // Atualiza valores principais
    if (elSaldo) elSaldo.textContent = formatCurrency(saldo);
    if (elReceb) elReceb.textContent = formatCurrency(recebAtual);
    if (elGastos) elGastos.textContent = formatCurrency(gastosAtual);

    // Atualiza badge e comparação de recebimentos
    const pctReceb = percentChange(recebAtual, recebAnterior);
    if (elRecebBadge) {
        if (pctReceb !== null && recebAnterior > 0) {
            elRecebBadge.textContent = (pctReceb >= 0 ? '+' : '') + pctReceb + '%';
            elRecebBadge.className = 'summary-badge ' + (pctReceb >= 0 ? 'summary-badge--positive' : 'summary-badge--negative');
        } else {
            elRecebBadge.textContent = '';
        }
    }
    if (elRecebComp) {
        if (pctReceb !== null && recebAnterior > 0) {
            elRecebComp.textContent = (pctReceb >= 0 ? 'Melhor que o mês passado' : 'Menor que o mês passado') + ' (' + (pctReceb >= 0 ? '+' : '') + pctReceb + '%)';
            elRecebComp.className = 'summary-comparison ' + (pctReceb >= 0 ? 'summary-comparison--positive' : 'summary-comparison--negative');
        } else {
            elRecebComp.textContent = '';
        }
    }

    // Atualiza badge e comparação de gastos
    const pctGastos = percentChange(gastosAtual, gastosAnterior);
    if (elGastosBadge) {
        if (pctGastos !== null && gastosAnterior > 0) {
            elGastosBadge.textContent = (pctGastos >= 0 ? '+' : '') + pctGastos + '%';
            // Para gastos, diminuição é positivo
            elGastosBadge.className = 'summary-badge ' + (pctGastos <= 0 ? 'summary-badge--positive' : 'summary-badge--negative');
        } else {
            elGastosBadge.textContent = '';
        }
    }
    if (elGastosComp) {
        if (pctGastos !== null && gastosAnterior > 0) {
            elGastosComp.textContent = (pctGastos <= 0 ? 'Melhor que o mês passado' : 'Maior que o mês passado') + ' (' + (pctGastos >= 0 ? '+' : '') + pctGastos + '%)';
            elGastosComp.className = 'summary-comparison ' + (pctGastos <= 0 ? 'summary-comparison--positive' : 'summary-comparison--negative');
        } else {
            elGastosComp.textContent = '';
        }
    }

    // Renderiza seções de metas
    renderAlmostDoneMetas();
    renderPrincipaisMetas();
}
