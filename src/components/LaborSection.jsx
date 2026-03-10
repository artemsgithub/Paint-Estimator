import { formatCurrency, toNumber, uniqueId } from '../utils'

function createLaborRow() {
  return { id: uniqueId(), description: '', hours: '', rate: '' }
}

function laborRowTotal(row) {
  return toNumber(row.hours) * toNumber(row.rate)
}

export function calcLaborTotal(rows) {
  return rows.reduce((sum, row) => sum + laborRowTotal(row), 0)
}

export { createLaborRow }

export default function LaborSection({ rows, onChange }) {
  const addRow = () => onChange([...rows, createLaborRow()])

  const updateRow = (id, field, value) => {
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))
  }

  const deleteRow = (id) => onChange(rows.filter((r) => r.id !== id))

  const subtotal = calcLaborTotal(rows)

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Labor</h2>
      </div>
      <div className="section-body">
        {rows.length === 0 && (
          <div className="empty-state">No labor items yet</div>
        )}
        <div className="line-items">
          {rows.map((row, idx) => (
            <div className="line-item" key={row.id}>
              <div className="line-item-header">
                <span className="line-item-number">Item {idx + 1}</span>
                <span className="line-item-total">
                  {formatCurrency(laborRowTotal(row))}
                </span>
              </div>
              <div className="form-group line-item-desc">
                <input
                  type="text"
                  placeholder="Task description"
                  value={row.description}
                  onChange={(e) =>
                    updateRow(row.id, 'description', e.target.value)
                  }
                  autoComplete="off"
                />
              </div>
              <div className="line-item-fields line-item-fields-labor">
                <div className="form-group">
                  <label>Hours</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0"
                    min="0"
                    step="0.5"
                    value={row.hours}
                    onChange={(e) =>
                      updateRow(row.id, 'hours', e.target.value)
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Rate ($/hr)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={row.rate}
                    onChange={(e) =>
                      updateRow(row.id, 'rate', e.target.value)
                    }
                  />
                </div>
              </div>
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  className="delete-btn"
                  onClick={() => deleteRow(row.id)}
                  type="button"
                  aria-label="Delete labor item"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="add-btn" onClick={addRow} type="button">
          + Add Labor Item
        </button>
      </div>
      <div className="subtotal-bar">
        <span className="label">Labor Subtotal</span>
        <span className="amount">{formatCurrency(subtotal)}</span>
      </div>
    </div>
  )
}
