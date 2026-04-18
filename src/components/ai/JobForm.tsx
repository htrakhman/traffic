import { useState } from 'react'
import { Sparkles, Loader2, Map } from 'lucide-react'
import type { JobDetails, JobType, RoadType, LaneImpact, WorkTime, PedestrianExposure, MapArea } from '../../types'
import MapAreaSelector from './MapAreaSelector'

interface Props {
  onSubmit: (details: JobDetails) => void
  isLoading: boolean
  mapArea?: MapArea
  onMapAreaChange: (area: MapArea | undefined) => void
}

const defaultDetails: JobDetails = {
  jobType: '',
  description: '',
  roadType: '',
  speedLimit: '',
  laneImpact: '',
  workTime: '',
  durationDays: '',
  startDate: '',
  pedestrianExposure: '',
  crewCount: '',
  location: '',
  equipmentOwned: '',
  deliveryNeeded: true,
}

export default function JobForm({ onSubmit, isLoading, mapArea, onMapAreaChange }: Props) {
  const [details, setDetails] = useState<JobDetails>(defaultDetails)

  const set = <K extends keyof JobDetails>(key: K, value: JobDetails[K]) =>
    setDetails((d) => ({ ...d, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...details, mapArea })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="text-center pb-2">
        <p className="text-sm text-slate-400">Fill in your job details for a precise equipment recommendation.</p>
      </div>

      {/* Job description */}
      <div>
        <label className="label">Job description (optional)</label>
        <textarea
          value={details.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Brief description of what your crew is doing..."
          className="input text-sm resize-none h-16"
        />
      </div>

      {/* Job type */}
      <div>
        <label className="label">Job type *</label>
        <select
          value={details.jobType}
          onChange={(e) => set('jobType', e.target.value as JobType)}
          className="input text-sm"
          required
        >
          <option value="">Select job type...</option>
          <option value="utility_work">Utility Work</option>
          <option value="paving">Paving / Asphalt</option>
          <option value="tree_work">Tree Work / Vegetation</option>
          <option value="excavation">Excavation / Sitework</option>
          <option value="striping">Striping / Marking</option>
          <option value="bridge_work">Bridge / Structure Work</option>
          <option value="signal_work">Signal / Electrical</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Road type + speed */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Road type *</label>
          <select
            value={details.roadType}
            onChange={(e) => set('roadType', e.target.value as RoadType)}
            className="input text-sm"
            required
          >
            <option value="">Select...</option>
            <option value="interstate">Interstate / Freeway</option>
            <option value="highway">State Highway</option>
            <option value="arterial">Arterial Road</option>
            <option value="local_street">Local Street</option>
            <option value="parking_lot">Parking Lot</option>
            <option value="private_road">Private Road</option>
          </select>
        </div>
        <div>
          <label className="label">Speed limit (mph) *</label>
          <input
            type="number"
            value={details.speedLimit}
            onChange={(e) => set('speedLimit', e.target.value ? Number(e.target.value) : '')}
            placeholder="e.g. 45"
            min={5}
            max={85}
            className="input text-sm"
            required
          />
        </div>
      </div>

      {/* Lane impact */}
      <div>
        <label className="label">Lane impact *</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'shoulder_only', label: 'Shoulder Only' },
            { value: 'one_lane_closed', label: 'One Lane Closed' },
            { value: 'two_lanes_closed', label: 'Two Lanes Closed' },
            { value: 'full_closure', label: 'Full Road Closure' },
          ].map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => set('laneImpact', opt.value as LaneImpact)}
              className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all duration-150 ${
                details.laneImpact === opt.value
                  ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Work time */}
      <div>
        <label className="label">Work hours</label>
        <div className="flex gap-2">
          {['day', 'night', 'both'].map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => set('workTime', opt as WorkTime)}
              className={`flex-1 py-2.5 rounded-lg border text-xs font-medium capitalize transition-all duration-150 ${
                details.workTime === opt
                  ? 'bg-brand-500/20 border-brand-500/50 text-brand-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Duration + date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Duration (days) *</label>
          <input
            type="number"
            value={details.durationDays}
            onChange={(e) => set('durationDays', e.target.value ? Number(e.target.value) : '')}
            placeholder="e.g. 5"
            min={1}
            className="input text-sm"
            required
          />
        </div>
        <div>
          <label className="label">Start date</label>
          <input
            type="date"
            value={details.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            className="input text-sm"
          />
        </div>
      </div>

      {/* Pedestrian + crews */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Pedestrian exposure</label>
          <select
            value={details.pedestrianExposure}
            onChange={(e) => set('pedestrianExposure', e.target.value as PedestrianExposure)}
            className="input text-sm"
          >
            <option value="">Select...</option>
            <option value="none">None</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="label">Number of crews</label>
          <input
            type="number"
            value={details.crewCount}
            onChange={(e) => set('crewCount', e.target.value ? Number(e.target.value) : '')}
            placeholder="e.g. 1"
            min={1}
            className="input text-sm"
          />
        </div>
      </div>

      {/* Map area */}
      <div>
        <label className="label flex items-center gap-1.5">
          <Map size={13} className="text-brand-400" />
          Draw your work zone on the map <span className="text-slate-600 font-normal">(optional)</span>
        </label>
        <MapAreaSelector value={mapArea} onChange={onMapAreaChange} />
      </div>

      {/* Equipment owned */}
      <div>
        <label className="label">Equipment you already own (skip these in recommendations)</label>
        <input
          type="text"
          value={details.equipmentOwned}
          onChange={(e) => set('equipmentOwned', e.target.value)}
          placeholder="e.g. 20 cones, 2 sign stands, Road Work Ahead signs"
          className="input text-sm"
        />
      </div>

      {/* Delivery */}
      <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
        <input
          type="checkbox"
          id="delivery"
          checked={details.deliveryNeeded}
          onChange={(e) => set('deliveryNeeded', e.target.checked)}
          className="w-4 h-4 accent-brand-500 rounded"
        />
        <label htmlFor="delivery" className="text-sm text-slate-300 cursor-pointer">
          I need delivery to the job site
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading || !details.jobType || !details.roadType || !details.speedLimit || !details.laneImpact || !details.durationDays}
        className="w-full btn-primary justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Generating recommendation...
          </>
        ) : (
          <>
            <Sparkles size={16} />
            Get Equipment Recommendation
          </>
        )}
      </button>

      <p className="text-xs text-slate-600 text-center">
        Recommendations are planning guidance only. Verify final requirements with your project engineer.
      </p>
    </form>
  )
}
