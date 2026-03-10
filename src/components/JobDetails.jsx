export default function JobDetails({ data, onChange }) {
  const update = (field) => (e) => {
    onChange({ ...data, [field]: e.target.value })
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Job Details</h2>
      </div>
      <div className="section-body">
        <div className="form-row form-row-2">
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              id="clientName"
              type="text"
              placeholder="e.g. John Smith"
              value={data.clientName}
              onChange={update('clientName')}
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={data.date}
              onChange={update('date')}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            id="description"
            placeholder="Brief description of the job..."
            value={data.description}
            onChange={update('description')}
            rows={2}
          />
        </div>
      </div>
    </div>
  )
}
