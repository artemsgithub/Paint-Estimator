import { formatCurrency, toNumber, uniqueId } from '../utils'

function createMaterialRow() {
  return { id: uniqueId(), name: '', quantity: '', unitCost: '', markup: '20' }
}

function materialRowTotal(row) {
  const qty = toNumber(row.quantity)
  const cost = toNumber(row.unitCost)
  const markup = toNumber(row.markup)
  return qty * cost * (1 + markup / 100)
}

export function calcMaterialsTotal(rows) {
  return rows.reduce((sum, row) => sum + materialRowTotal(row), 0)
}

export { createMaterialRow }

export default function MaterialsSection({ rows, onChange }) {
  const addRow = () => onChange([...rows, createMaterialRow()])

  const updateRow = (id, field, value) => {
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const deleteRow = (id) => onChange(rows.filter((r) => r.id !== id))

  const subtotal = calcMaterialsTotal(rows)

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Materials</h2>
      </div>
      <div className="section-body">
        {rows.length === 0 && (
          <div className="empty-state">No material items yet</div>
        )}
        <div className="line-items">
          {rows.map((row, idx) => (
            <div className="line-item" key={row.id}>
              <div className="line-item-header">
                <span className="line-item-number">Item {idx + 1}</span>
                <span className="line-item-total">
                  {formatCurrency(materialRowTotal(row))}
                </span>
              </div>
              <div className="form-group line-item-desc">
                <label htmlFor={`mat-name-${row.id}`}>Item Name</label>
                <input
                  id={`mat-name-${row.id}`}
                  type="text"
                  placeholder="e.g. Primer, rollers, tape"
                  value={row.name}
                  onChange={(e) => updateRow(row.id, 'name', e.target.value)}
                  autoComplete="off"
                />
              </div>
              <div className="line-item-fields line-item-fields-materials">
                <div className="form-group">
                  <label htmlFor={`mat-qty-${row.id}`}>Qty</label>
                  <input
                    id={`mat-qty-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    min="0"
                    step="0.5"
                    value={row.quantity}
                    onChange={(e) =>
                      updateRow(row.id, 'quantity', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`mat-cost-${row.id}`}>Unit Cost</label>
                  <input
                    id={`mat-cost-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={row.unitCost}
                    onChange={(e) =>
                      updateRow(row.id, 'unitCost', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`mat-markup-${row.id}`}>Markup %</label>
                  <input
                    id={`mat-markup-${row.id}`}
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    min="0"
                    step="1"
                    value={row.markup}
                    onChange={(e) =>
                      updateRow(row.id, 'markup', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="line-item-actions">
                <button
                  className="delete-btn"
                  onClick={() => deleteRow(row.id)}
                  type="button"
                  aria-label={`Remove material item ${idx + 1}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-btn" onClick={addRow} type="button">
          + Add Material Item
        </button>
      </div>
      <div className="subtotal-bar">
        <span className="label">Materials Subtotal</span>
        <span className="amount">{formatCurrency(subtotal)}</span>
      </div>
    </div>
  )
}
