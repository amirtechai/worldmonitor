import { t } from '@/services/i18n';
import { isMobileDevice } from '@/utils';
import { getDismissed, setDismissed } from '@/utils/cross-domain-storage';

const STORAGE_KEY = 'mobile-warning-dismissed';

export class MobileWarningModal {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'mobile-warning-overlay';
    this.element.innerHTML = `
      <div class="mobile-warning-modal">
        <div class="mobile-welcome-hero">
          <div class="mobile-welcome-globe">🌍</div>
          <div class="mobile-welcome-brand">WORLD MONITOR</div>
          <div class="mobile-welcome-tagline">Real-Time Global Intelligence</div>
        </div>
        <div class="mobile-welcome-tips">
          <div class="mobile-tip-item">
            <span class="mobile-tip-icon">🗺️</span>
            <span>Pan &amp; pinch the map to explore events worldwide</span>
          </div>
          <div class="mobile-tip-item">
            <span class="mobile-tip-icon">🔍</span>
            <span>Tap the search icon to find countries &amp; topics</span>
          </div>
          <div class="mobile-tip-item">
            <span class="mobile-tip-icon">☰</span>
            <span>Use the menu to switch data layers &amp; panels</span>
          </div>
          <div class="mobile-tip-item">
            <span class="mobile-tip-icon">💡</span>
            <span>Best experience on desktop — try it there too!</span>
          </div>
        </div>
        <div class="mobile-warning-footer">
          <label class="mobile-warning-remember">
            <input type="checkbox" id="mobileWarningRemember">
            <span>${t('modals.mobileWarning.dontShowAgain')}</span>
          </label>
          <button class="mobile-warning-btn">Explore the World →</button>
        </div>
      </div>
    `;

    document.body.appendChild(this.element);
    this.setupEventListeners();

    // Remove will-change after entrance animation to free GPU memory
    const modal = this.element.querySelector('.mobile-warning-modal') as HTMLElement | null;
    modal?.addEventListener('animationend', () => {
      modal.style.willChange = 'auto';
    }, { once: true });
  }

  private setupEventListeners(): void {
    this.element.querySelector('.mobile-warning-btn')?.addEventListener('click', () => {
      this.dismiss();
    });

    this.element.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).classList.contains('mobile-warning-overlay')) {
        this.dismiss();
      }
    });
  }

  private dismiss(): void {
    const checkbox = this.element.querySelector('#mobileWarningRemember') as HTMLInputElement;
    if (checkbox?.checked) {
      setDismissed(STORAGE_KEY);
    }
    this.hide();
  }

  public show(): void {
    this.element.classList.add('active');
  }

  public hide(): void {
    this.element.classList.remove('active');
  }

  public static shouldShow(): boolean {
    if (getDismissed(STORAGE_KEY)) return false;
    return isMobileDevice();
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
