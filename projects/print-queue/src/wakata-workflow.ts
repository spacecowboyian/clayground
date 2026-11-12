import './index.css'
import './components/pq-item-status-select'

type ItemStatus = 'queue' | 'printing' | 'complete'
type OrderStatus = 'waiting' | 'in_progress' | 'complete'

interface Item {
  id: string
  name: string
  color: string
  status: ItemStatus
}

const ORDER = {
  id: '00000000-0000-4000-8000-000000000022',
  number: 101,
  customer: 'Sample Customer',
  price: 10,
}

const OPTIONS: Array<{ id: ItemStatus; label: string }> = [
  { id: 'queue', label: 'Queue' },
  { id: 'printing', label: 'Printing' },
  { id: 'complete', label: 'Complete' },
]

const STATUS_LABEL: Record<OrderStatus, string> = {
  waiting: 'Waiting',
  in_progress: 'In Progress',
  complete: 'Complete',
}

const items: Item[] = [
  { id: 'item-a', name: 'Synthetic item A', color: 'Gray', status: 'queue' },
  { id: 'item-b', name: 'Synthetic item B', color: 'Blue', status: 'queue' },
]

let eventCount = 0

function deriveOrderStatus(list: Item[]): OrderStatus {
  const statuses = list.map(i => i.status)
  if (statuses.every(s => s === 'complete')) return 'complete'
  if (statuses.some(s => s === 'printing' || s === 'complete')) return 'in_progress'
  return 'waiting'
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classes: string,
  text?: string,
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag)
  node.className = classes
  if (text !== undefined) node.textContent = text
  return node
}

const root = document.getElementById('app') as HTMLElement
document.body.className = 'm-0 bg-[var(--background)] text-[var(--foreground)]'
root.className = 'block max-w-lg mx-auto p-4 box-border'

const card = el(
  'section',
  'border border-[var(--border)] rounded-lg bg-[var(--card)] p-4 flex flex-col gap-3',
)
card.dataset.orderId = ORDER.id

const header = el('div', 'flex justify-between items-center gap-2')
const title = el('h1', 'm-0 text-base font-semibold', `Order #${ORDER.number}`)
const badge = el(
  'span',
  'text-xs px-2 py-0.5 rounded-full bg-[var(--accent-orange-light)] text-[var(--accent-orange)]',
)
badge.setAttribute('data-testid', 'order-status')
header.append(title, badge)

const meta = el(
  'div',
  'flex justify-between text-sm text-[var(--muted-foreground)]',
)
meta.append(el('span', '', ORDER.customer), el('span', '', `$${ORDER.price}`))

const list = el('ul', 'list-none m-0 p-0 flex flex-col gap-2')
card.append(header, meta, list)
root.append(card)

function createRow(item: Item): HTMLLIElement {
  const row = document.createElement('li')
  row.dataset.itemId = item.id
  row.className = 'flex justify-between items-center gap-2 p-2 border border-[var(--border)] rounded-md'
  row.append(el('span', 'text-sm', `${item.name} ${item.color}`))

  const host = document.createElement('pq-item-status-select')
  const select = document.createElement('select')
  select.slot = 'input'
  select.setAttribute('aria-label', `Status for ${item.name} ${item.color}`)
  for (const o of OPTIONS) {
    const opt = document.createElement('option')
    opt.value = o.id
    opt.textContent = o.label
    select.append(opt)
  }
  select.value = item.status
  host.append(select)

  host.addEventListener('wk-change', e => {
    const value = (e as CustomEvent<{ value: ItemStatus }>).detail.value
    const target = items.find(i => i.id === item.id)
    if (!target) return
    eventCount += 1
    target.status = value
    render()
  })

  row.append(host)
  return row
}

const rows = new Map<string, HTMLLIElement>()
for (const item of items) rows.set(item.id, createRow(item))

function render(): void {
  const status = deriveOrderStatus(items)
  badge.textContent = STATUS_LABEL[status]
  list.replaceChildren(
    ...items.filter(i => i.status !== 'complete').map(i => rows.get(i.id) as HTMLLIElement),
  )
}

render()

Object.defineProperty(window, 'wakataEvidence', {
  enumerable: true,
  get() {
    return Object.freeze({
      eventCount,
      itemStatuses: Object.freeze(Object.fromEntries(items.map(i => [i.id, i.status]))),
      orderStatus: deriveOrderStatus(items),
    })
  },
})
