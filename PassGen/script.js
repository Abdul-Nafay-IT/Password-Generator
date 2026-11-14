(() => {
  'use strict';

  const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  const elements = {
    passwordOutput: document.getElementById('passwordOutput'),
    copyBtn: document.getElementById('copyBtn'),
    copyLabel: document.getElementById('copyLabel'),
    refreshBtn: document.getElementById('refreshBtn'),
    generateBtn: document.getElementById('generateBtn'),
    lengthSlider: document.getElementById('lengthSlider'),
    lengthValue: document.getElementById('lengthValue'),
    includeUppercase: document.getElementById('includeUppercase'),
    includeLowercase: document.getElementById('includeLowercase'),
    includeNumbers: document.getElementById('includeNumbers'),
    includeSymbols: document.getElementById('includeSymbols'),
    strengthText: document.getElementById('strengthText'),
    strengthFill: document.getElementById('strengthFill'),
    strengthBarContainer: document.getElementById('strengthBarContainer'),
    toast: document.getElementById('toast'),
    navToggle: document.getElementById('navToggle'),
    navMenu: document.getElementById('navMenu'),
    loginBtn: document.getElementById('loginBtn'),
    infoModal: document.getElementById('infoModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    closeModalBtn: document.getElementById('closeModalBtn')
  };

  let toastTimeout;

  function getSecureRandomInt(max) {
    const randomBuffer = new Uint32Array(1);
    const limit = Math.floor(0xffffffff / max) * max;
    let randomValue;

    do {
      window.crypto.getRandomValues(randomBuffer);
      randomValue = randomBuffer[0];
    } while (randomValue >= limit);

    return randomValue % max;
  }

  function secureShuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = getSecureRandomInt(i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getSelectedPools() {
    const pools = [];
    if (elements.includeUppercase.checked) pools.push(CHAR_SETS.uppercase);
    if (elements.includeLowercase.checked) pools.push(CHAR_SETS.lowercase);
    if (elements.includeNumbers.checked) pools.push(CHAR_SETS.numbers);
    if (elements.includeSymbols.checked) pools.push(CHAR_SETS.symbols);
    return pools;
  }

  function generatePassword() {
    const length = parseInt(elements.lengthSlider.value, 10);
    const pools = getSelectedPools();

    if (pools.length === 0) {
      elements.includeLowercase.checked = true;
      pools.push(CHAR_SETS.lowercase);
      showToast('At least one character type must be selected.');
    }

    const combinedPool = pools.join('');
    const passwordChars = [];

    pools.forEach((pool) => {
      passwordChars.push(pool[getSecureRandomInt(pool.length)]);
    });

    for (let i = passwordChars.length; i < length; i++) {
      passwordChars.push(combinedPool[getSecureRandomInt(combinedPool.length)]);
    }

    const finalPassword = secureShuffle(passwordChars).join('');
    elements.passwordOutput.value = finalPassword;
    updateStrengthMeter(finalPassword, pools);
  }

  function updateStrengthMeter(password, pools) {
    const poolSize = pools.reduce((acc, set) => acc + set.length, 0);
    const entropy = password.length * Math.log2(poolSize || 1);

    let label = 'Weak';
    let color = 'var(--status-weak)';
    let percentage = 25;

    if (entropy >= 80 && pools.length >= 3) {
      label = 'Strong!';
      color = 'var(--status-strong)';
      percentage = 100;
    } else if (entropy >= 55) {
      label = 'Medium';
      color = 'var(--status-medium)';
      percentage = 65;
    } else if (entropy >= 36) {
      label = 'Fair';
      color = 'var(--status-medium)';
      percentage = 45;
    }

    elements.strengthText.textContent = label;
    elements.strengthText.style.color = color;
    elements.strengthFill.style.width = `${percentage}%`;
    elements.strengthFill.style.backgroundColor = color;
    elements.strengthBarContainer.setAttribute('aria-valuenow', percentage);
  }

  async function copyPassword() {
    const password = elements.passwordOutput.value;
    if (!password) return;

    try {
      await navigator.clipboard.writeText(password);
    } catch {
      elements.passwordOutput.select();
      document.execCommand('copy');
    }

    elements.copyBtn.classList.add('is-copied');
    elements.copyLabel.textContent = 'Copied';
    showToast('Password copied to clipboard!');

    setTimeout(() => {
      elements.copyBtn.classList.remove('is-copied');
      elements.copyLabel.textContent = 'Copy';
    }, 1800);
  }

  function showToast(message) {
    clearTimeout(toastTimeout);
    elements.toast.textContent = message;
    elements.toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      elements.toast.classList.remove('show');
    }, 2400);
  }

  function updateSliderBackground() {
    const min = parseInt(elements.lengthSlider.min, 10);
    const max = parseInt(elements.lengthSlider.max, 10);
    const val = parseInt(elements.lengthSlider.value, 10);
    const percent = ((val - min) / (max - min)) * 100;

    elements.lengthSlider.style.background = `linear-gradient(to right, var(--accent-emerald) ${percent}%, rgba(255, 255, 255, 0.16) ${percent}%)`;
    elements.lengthValue.textContent = val;
  }

  const MODAL_CONTENT = {
    featuresModal: {
      title: 'Key Features',
      html: `<p><strong>PassGen</strong> generates high-entropy passwords completely client-side:</p>
             <ul style="margin: 0.75rem 0 0 1.25rem; display: grid; gap: 0.4rem;">
               <li>Cryptographically secure randomness via <code>window.crypto</code></li>
               <li>Customizable lengths from 6 to 64 characters</li>
               <li>Real-time Shannon entropy strength calculation</li>
               <li>Zero network requests — nothing ever leaves your browser</li>
             </ul>`
    },
    extensionModal: {
      title: 'Browser Extension',
      html: `<p>Auto-fill and generate strong credentials directly inside Chrome, Firefox, Edge, and Brave.</p>
             <p style="margin-top: 0.75rem;">Keyboard shortcut: <strong>Ctrl + Shift + G</strong> (or <strong>Cmd + Shift + G</strong> on macOS) to insert a 20-character password into any signup field.</p>`
    },
    securityModal: {
      title: 'Zero-Knowledge Security',
      html: `<p>Unlike pseudo-random generators that rely on <code>Math.random()</code>, PassGen uses your device's hardware entropy pool via the <strong>Web Crypto API</strong> with rejection sampling to prevent modulo bias.</p>`
    },
    aboutModal: {
      title: 'About PassGen',
      html: `<p>Built with pure semantic HTML5, modern CSS3, and vanilla ES6+ JavaScript. Designed for speed, accessibility, and uncompromising security across mobile and desktop screens.</p>`
    }
  };

  function openModal(title, htmlContent) {
    elements.modalTitle.textContent = title;
    elements.modalBody.innerHTML = htmlContent;
    elements.infoModal.showModal();
  }

  function bindEvents() {
    elements.generateBtn.addEventListener('click', generatePassword);
    elements.refreshBtn.addEventListener('click', generatePassword);
    elements.copyBtn.addEventListener('click', copyPassword);

    elements.lengthSlider.addEventListener('input', () => {
      updateSliderBackground();
      generatePassword();
    });

    [
      elements.includeUppercase,
      elements.includeLowercase,
      elements.includeNumbers,
      elements.includeSymbols
    ].forEach((checkbox) => {
      checkbox.addEventListener('change', generatePassword);
    });

    elements.navToggle.addEventListener('click', () => {
      const isOpen = elements.navMenu.classList.toggle('is-open');
      elements.navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('[data-modal-trigger]').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const key = link.getAttribute('data-modal-trigger');
        const content = MODAL_CONTENT[key];
        if (content) {
          openModal(content.title, content.html);
          elements.navMenu.classList.remove('is-open');
          elements.navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    elements.loginBtn.addEventListener('click', () => {
      openModal(
        'Log In to PassGen Vault',
        `<form class="modal__form" id="loginForm">
          <input type="email" class="modal__input" placeholder="Email address" required />
          <input type="password" class="modal__input" placeholder="Master password" required />
          <button type="submit" class="btn-generate" style="width: 100%; margin-top: 0.25rem;">Sign In</button>
        </form>`
      );

      document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        elements.infoModal.close();
        showToast('Signed in successfully (Demo Mode)');
      });
    });

    elements.closeModalBtn.addEventListener('click', () => elements.infoModal.close());
    elements.infoModal.addEventListener('click', (e) => {
      if (e.target === elements.infoModal) elements.infoModal.close();
    });
  }

  function init() {
    updateSliderBackground();
    generatePassword();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
})();