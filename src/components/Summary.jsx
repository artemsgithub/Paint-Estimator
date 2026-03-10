import { useState } from 'react'
import { formatCurrency } from '../utils'

export default function Summary({
  laborTotal,
  materialsTotal,
  contingencyPct,
  onContingencyChange,
}) {
  const [expanded, setExpanded] = useState(false)

  const subtotal = laborTotal + materialsTotal
  const contingencyAmt = subtotal * (contingencyPct / 100)
  const grandTotal = subtotal + contingencyAmt

  return (
    <div className="sticky-summary">
      <button
        className="summary-toggle"
        onClick={() => setExpanded(!expanded)}
        type="button"
        aria-expanded={expanded}
        aria-label="Toggle summary details"
      >
        <div className="summary-grand-total">
          <span className="gt-label">Total</span>
          <span className="gt-amount">{formatCurrency(grandTotal)}</span>
        </div>
        <span className={`summary-chevron ${expanded ? 'open' : ''}`}>
          &#9650;
        </span>
      </button>

      {expanded && (
        <div className="summary-details">
          <div className="summary-row">
            <span className="label">Labor</span>
            <span className="amount">{formatCurrency(laborTotal)}</span>
          </div>
          <div className="summary-row">
            <span className="label">Materials</span>
            <span className="amount">{formatCurrency(materialsTotal)}</span>
          </div>
          <div className="summary-row subtotal-row">
            <span className="label">Subtotal</span>
            <span className="amount">{formatCurrency(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span className="label">
              <span className="contingency-input-row">
                Contingency
                <input
                  className="contingency-input"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="1"
                  value={contingencyPct}
                  onChange={(e) => onContingencyChange(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Contingency percentage"
                />
                <span className="contingency-pct">%</span>
              </span>
            </span>
            <span className="amount">{formatCurrency(contingencyAmt)}</span>
          </div>
          <div className="summary-row grand-total-row">
            <span className="label">Grand Total</span>
            <span className="amount">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      )}
    </div>
  )
}
