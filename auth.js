/**
 * auth.js — Shared auth helper untuk semua halaman
 * Cara pakai: <script type="module" src="auth.js"></script>
 * Lalu di navbar tambahkan: <div id="auth-nav-slot"></div>
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

let supabase = null;
let _currentUser = null;

export async function initAuth() {
  const res = await fetch('/.netlify/functions/get-supabase-config').catch(() => null);
  if (!res || !res.ok) return null;
  const data = await res.json().catch(() => null);
  if (!data?.url || !data?.anonKey) return null;
  supabase = createClient(data.url, data.anonKey);
  const { data: { session } } = await supabase.auth.getSession();
  _currentUser = session?.user || null;
  renderAuthNav();
  return _currentUser;
}

export function getUser() { return _currentUser; }
export function getSupabase() { return supabase; }

export function requireLogin(redirectTo) {
  if (!_currentUser) {
    const current = redirectTo || window.location.pathname + window.location.search;
    window.location.href = 'auth.html?redirect=' + encodeURIComponent(current);
    return false;
  }
  return true;
}

function renderAuthNav() {
  const slot = document.getElementById('auth-nav-slot');
  if (!slot) return;

  if (_currentUser) {
    const nama = _currentUser.user_metadata?.full_name || _currentUser.email?.split('@')[0] || 'User';
    const inisial = nama.charAt(0).toUpperCase();
    slot.innerHTML = `
      <div class="relative" id="user-menu-wrap">
        <button onclick="toggleUserMenu()" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div class="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm flex-shrink-0">
            ${inisial}
          </div>
          <span class="hidden sm:block text-sm font-semibold text-on-surface max-w-[100px] truncate">${nama}</span>
          <span class="material-symbols-outlined text-sm text-on-surface-variant">expand_more</span>
        </button>
        <!-- Dropdown -->
        <div id="user-dropdown" class="hidden absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
          <div class="px-4 py-2 border-b border-gray-100">
            <p class="text-xs font-bold text-on-surface truncate">${nama}</p>
            <p class="text-xs text-on-surface-variant truncate">${_currentUser.email}</p>
          </div>
          <a href="profile.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-base">person</span> Profil Saya
          </a>
          <a href="riwayat.html" class="flex items-center gap-2 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-base">history</span> Riwayat Donasi
          </a>
          <button onclick="doLogout()" class="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-error hover:bg-red-50 transition-colors">
            <span class="material-symbols-outlined text-base">logout</span> Keluar
          </button>
        </div>
      </div>`;

    // Close dropdown saat klik luar
    document.addEventListener('click', function(e) {
      const wrap = document.getElementById('user-menu-wrap');
      if (wrap && !wrap.contains(e.target)) {
        document.getElementById('user-dropdown')?.classList.add('hidden');
      }
    });

    window.toggleUserMenu = function() {
      document.getElementById('user-dropdown')?.classList.toggle('hidden');
    };

    window.doLogout = async function() {
      await supabase.auth.signOut();
      window.location.reload();
    };

  } else {
    slot.innerHTML = `
      <a href="auth.html?redirect=${encodeURIComponent(window.location.pathname)}"
        class="flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">
        <span class="material-symbols-outlined text-base">login</span>
        <span>Masuk</span>
      </a>`;
  }
}

// Auto-init saat script dimuat
initAuth();
