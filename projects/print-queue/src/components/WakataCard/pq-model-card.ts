import { css } from 'lit'
import { WkCard } from '@wakata/ds/card'

/** Local layout extension for catalog cards whose actions align at the bottom. */
export class PqModelCard extends WkCard {
  static override styles = css`
    ${WkCard.styles}
    :host { height: 100%; font-family: inherit; }
    .sections { display: flex; flex-direction: column; height: 100%; }
    .section[hidden] { display: none; }
    .section:has(> slot:not([name])) { flex: 1; }
  `
}

if (!customElements.get('pq-model-card')) customElements.define('pq-model-card', PqModelCard)
