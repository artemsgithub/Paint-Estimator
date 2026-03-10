import { useState } from 'react'
import './App.css'
import { VERSION, PHASE } from './version'
import { getTodayString, toNumber } from './utils'
import JobDetails from './components/JobDetails'
import LaborSection, {
  calcLaborTotal,
  createLaborRow,
} from './components/LaborSection'
import MaterialsSection, {
  calcMaterialsTotal,
  createMaterialRow,
} from './components/MaterialsSection'
import Summary from './components/Summary'

function App() {
  const [jobDetails, setJobDetails] = useState({
    clientName: '',
    description: '',
    date: getTodayString(),
  })

  const [laborRows, setLaborRows] = useState([createLaborRow()])
  const [materialRows, setMaterialRows] = useState([createMaterialRow()])
  const [contingencyPct, setContingencyPct] = useState('10')

  const laborTotal = calcLaborTotal(laborRows)
  const materialsTotal = calcMaterialsTotal(materialRows)

  return (
    <>
      <header className="app-header">
        <div className="app-header-left">
          <svg
            className="app-logo"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="20" height="12" rx="2" fill="currentColor" opacity="0.85" />
            <rect x="6" y="7" width="14" height="6" rx="1" fill="white" opacity="0.4" />
            <rect x="21" y="8" width="5" height="3" rx="1" fill="currentColor" opacity="0.7" />
            <rect x="13" y="16" width="3" height="13" rx="1.5" fill="currentColor" opacity="0.6" />
          </svg>
          <h1>Paint Estimator</h1>
        </div>
        <span className="version-badge" title={PHASE}>
          v{VERSION}
        </span>
      </header>

      <main className="app-container">
        <JobDetails data={jobDetails} onChange={setJobDetails} />
        <LaborSection rows={laborRows} onChange={setLaborRows} />
        <MaterialsSection rows={materialRows} onChange={setMaterialRows} />
      </main>

      <Summary
        laborTotal={laborTotal}
        materialsTotal={materialsTotal}
        contingencyPct={toNumber(contingencyPct)}
        onContingencyChange={setContingencyPct}
      />
    </>
  )
}

export default App
