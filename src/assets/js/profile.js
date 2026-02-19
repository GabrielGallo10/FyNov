/**
 * ============================================================================
 * FYNOV - MÓDULO DE PERFIL (profile.js)
 * ============================================================================
 * 
 * Este módulo gerencia o perfil do usuário, incluindo armazenamento,
 * recuperação e exibição das informações pessoais na interface.
 * 
 * @author FyNov Team
 * @version 1.0.0
 * @description Módulo de gerenciamento do perfil do usuário
 * 
 * Dependências: Nenhuma (usa localStorage diretamente)
 * Usado por: app.js, dashboard.html, perfil.html
 */

// ============================================================================
// CONSTANTES
// ============================================================================

/** Chave usada para armazenar o perfil no localStorage */
const PROFILE_KEY = 'fynov_user';

/** Perfil padrão para novos usuários */
const DEFAULT_PROFILE = { 
    nome: 'Usuário', 
    email: 'email@exemplo.com' 
};

// ============================================================================
// FUNÇÕES DE ARMAZENAMENTO
// ============================================================================

/**
 * Recupera o perfil do usuário do localStorage
 * @returns {Object} Objeto com nome e email do usuário
 */
function getProfile() {
    try {
        const stored = localStorage.getItem(PROFILE_KEY);
        return stored ? JSON.parse(stored) : { ...DEFAULT_PROFILE };
    } catch (e) {
        console.error('Erro ao recuperar perfil:', e);
        return { ...DEFAULT_PROFILE };
    }
}

/**
 * Salva o perfil do usuário no localStorage
 * Também atualiza a interface após salvar
 * @param {Object} profile - Objeto com nome e email
 */
function saveProfile(profile) {
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        renderProfileUI();
    } catch (e) {
        console.error('Erro ao salvar perfil:', e);
    }
}

// ============================================================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================================================

/**
 * Gera as iniciais do nome para exibição no avatar
 * @param {string} name - Nome completo do usuário
 * @returns {string} Iniciais (até 2 caracteres) em maiúsculo
 */
function getInitial(name) {
    if (!name || name === 'Usuário') return 'U';
    
    const parts = name.trim().split(/\s+/);
    
    // Se tem mais de um nome, usa primeira e última inicial
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    
    // Se tem apenas um nome, usa a primeira letra
    return (name[0] || 'U').toUpperCase();
}

// ============================================================================
// FUNÇÕES DE RENDERIZAÇÃO
// ============================================================================

/**
 * Atualiza todos os elementos de perfil na interface
 * Busca elementos pelo ID e atualiza com dados do perfil
 */
function renderProfileUI() {
    const p = getProfile();
    const initial = getInitial(p.nome);
    
    // Elementos do perfil na página
    const avatarTop = document.getElementById('profile-avatar-initial');
    const avatarDrop = document.getElementById('profile-avatar-dropdown');
    const nameTop = document.getElementById('profile-name-topbar');
    const nameDrop = document.getElementById('profile-name-dropdown');
    const emailDrop = document.getElementById('profile-email-dropdown');
    
    // Atualiza cada elemento se existir
    if (avatarTop) avatarTop.textContent = initial;
    if (avatarDrop) avatarDrop.textContent = initial;
    if (nameTop) nameTop.textContent = p.nome || 'Perfil';
    if (nameDrop) nameDrop.textContent = p.nome || 'Usuário';
    if (emailDrop) emailDrop.textContent = p.email || 'email@exemplo.com';
}

// ============================================================================
// FUNÇÕES DE INICIALIZAÇÃO
// ============================================================================

/**
 * Inicializa o formulário de perfil (modal do dashboard)
 * Preenche campos e configura evento de submit
 */
function initPerfilForm() {
    const form = document.getElementById('perfil-form');
    if (!form) return;
    
    // Preenche os campos com dados atuais
    const p = getProfile();
    const nomeEl = document.getElementById('perfil-nome');
    const emailEl = document.getElementById('perfil-email');
    
    if (nomeEl) nomeEl.value = p.nome || '';
    if (emailEl) emailEl.value = p.email || '';
    
    // Configura o evento de submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const nome = (document.getElementById('perfil-nome') || {}).value?.trim() || 'Usuário';
        const email = (document.getElementById('perfil-email') || {}).value?.trim() || 'email@exemplo.com';
        
        saveProfile({ nome, email });
        
        // Fecha o modal se estiver usando Bootstrap
        const modal = document.getElementById('perfilModal');
        if (modal && typeof bootstrap !== 'undefined') {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        }
    });
}

/**
 * Inicializa o botão de logout
 * Configura evento de clique com confirmação
 */
function initLogout() {
    const btn = document.getElementById('btn-sair');
    if (!btn) return;
    
    btn.addEventListener('click', function () {
        if (confirm('Deseja realmente sair?')) {
            // Redireciona para a página de login
            window.location.href = 'login.html';
        }
    });
}
