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
        <h1>Paint Estimator</h1>
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
