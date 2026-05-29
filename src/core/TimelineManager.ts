import type { DeviceStatus, DeviceMetrics } from '@/types'

export interface TimelineFrame {
  timestamp: number    // ms epoch
  label:     string
  states:    Record<string, { status: DeviceStatus; metrics?: Partial<DeviceMetrics> }>
}

export class TimelineManager {
  private frames:  TimelineFrame[] = []
  private maxFrames  = 120     // 2 minutes at 1fps
  private recording  = false
  private _interval: ReturnType<typeof setInterval> | null = null

  get isRecording() { return this.recording }
  get frameCount()  { return this.frames.length }
  get allFrames()   { return this.frames }

  startRecording(getState: () => Record<string, { status: DeviceStatus; metrics?: Partial<DeviceMetrics> }>) {
    if (this.recording) return
    this.recording = true
    this.frames = []
    let seq = 0
    this._interval = setInterval(() => {
      seq++
      this.frames.push({
        timestamp: Date.now(),
        label:     `T+${seq}s`,
        states:    getState(),
      })
      if (this.frames.length > this.maxFrames) this.frames.shift()
    }, 1000)
  }

  stopRecording() {
    this.recording = false
    if (this._interval) { clearInterval(this._interval); this._interval = null }
  }

  getFrame(index: number): TimelineFrame | null {
    return this.frames[Math.max(0, Math.min(index, this.frames.length - 1))] ?? null
  }

  addManualSnapshot(label: string, state: Record<string, { status: DeviceStatus; metrics?: Partial<DeviceMetrics> }>) {
    this.frames.push({ timestamp: Date.now(), label, states: state })
  }

  export(): string {
    return JSON.stringify(this.frames)
  }

  import(json: string) {
    try {
      this.frames = JSON.parse(json) as TimelineFrame[]
    } catch { /* ignore */ }
  }

  dispose() {
    this.stopRecording()
    this.frames = []
  }
}
