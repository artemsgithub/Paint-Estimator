export function formatCurrency(value) {
  const num = typeof value === 'number' ? value : parseFloat(value) || 0
  return num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function toNumber(value) {
  const num = parseFloat(value)
  return isNaN(num) ? 0 : num
}

export function getTodayString() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

let _id = 0
export function uniqueId() {
  return ++_id
}
