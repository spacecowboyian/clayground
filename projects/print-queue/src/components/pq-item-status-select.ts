import { css } from 'lit'
import { WkSelect } from '@wakata/ds/select'

export const ITEM_STATUS_SELECT_TAG = 'pq-item-status-select'

/** WkSelect restyled to match the Gearhead compact select (101x29 CSS px). */
export class PqItemStatusSelect extends WkSelect {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          display: inline-block;
          font-family: inherit;
          font-size: 14px;
          line-height: 20px;
          color: var(--foreground);
        }
        .form-field__label,
        .form-field__help-text,
        .form-field__feedback,
        .input-group__after {
          display: none;
        }
        .input-group__container {
          min-height: 0;
          border: 1px solid var(--border);
          border-radius: 4px;
          background: var(--input);
        }
        :host(:focus-within) .input-group__container {
          box-shadow: 0 0 0 1px var(--accent-orange);
        }
        ::slotted(select[slot='input']) {
          width: auto;
          min-height: 0;
          padding: 4px 8px;
          border: 0;
          border-radius: 3px;
          appearance: auto;
          background: var(--input);
          background-image: none;
          color: var(--foreground);
          font: inherit;
          font-size: 14px;
          line-height: 20px;
          cursor: pointer;
        }
        ::slotted(select[slot='input']:open) {
          background-image: none;
        }
      `,
    ]
  }
}

if (!customElements.get(ITEM_STATUS_SELECT_TAG)) {
  customElements.define(ITEM_STATUS_SELECT_TAG, PqItemStatusSelect)
}
