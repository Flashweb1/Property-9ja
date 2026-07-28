"use client"

import { useState } from "react"
import { X, Calendar, Clock, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScheduleViewingProps {
  propertyTitle: string
  agentName: string
  onClose: () => void
}

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
]

export function ScheduleViewing({ propertyTitle, agentName, onClose }: ScheduleViewingProps) {
  const [step, setStep] = useState<"date" | "time" | "confirm">("date")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const today = new Date()
  const dates = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    return d
  })

  const handleConfirm = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Viewing Requested!</h2>
          <p className="text-gray-500 mb-2">
            Your viewing for <strong>{propertyTitle}</strong> has been sent to {agentName}.
          </p>
          <p className="text-sm text-gray-400 mb-6">
            {selectedDate} at {selectedTime}
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left text-sm text-blue-700">
            <p className="font-semibold mb-1">What happens next?</p>
            <p>The agent will confirm your requested time via message. You can also call them directly.</p>
          </div>
          <Button onClick={onClose} className="w-full">Done</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Schedule Viewing</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-auto">
          <p className="text-sm text-gray-500 mb-4">
            <strong className="text-gray-900">{propertyTitle}</strong> — Agent: {agentName}
          </p>

          {step === "date" && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-brand-green" />
                <h3 className="font-semibold text-gray-900">Select a Date</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {dates.map((d) => {
                  const formatted = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
                  const val = d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
                  return (
                    <button
                      key={formatted}
                      onClick={() => { setSelectedDate(val); setStep("time") }}
                      className={`rounded-lg border p-3 text-left text-sm transition-colors ${
                        selectedDate === val
                          ? "border-brand-green bg-brand-green/5 text-brand-green"
                          : "border-gray-200 hover:border-brand-green text-gray-700"
                      }`}
                    >
                      {formatted}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {step === "time" && (
            <div>
              <button onClick={() => setStep("date")} className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1">
                ← Back to dates
              </button>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-brand-green" />
                <h3 className="font-semibold text-gray-900">Select a Time — {selectedDate}</h3>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTime(t); setStep("confirm") }}
                    className={`rounded-lg border py-3 text-sm transition-colors ${
                      selectedTime === t
                        ? "border-brand-green bg-brand-green/5 text-brand-green"
                        : "border-gray-200 hover:border-brand-green text-gray-700"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "confirm" && (
            <div>
              <button onClick={() => setStep("time")} className="text-sm text-gray-500 hover:text-gray-700 mb-4 flex items-center gap-1">
                ← Back to times
              </button>
              <div className="space-y-4">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">Your viewing request:</p>
                  <p className="font-semibold text-gray-900 mt-1">{selectedDate}</p>
                  <p className="font-semibold text-gray-900">{selectedTime}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input type="text" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label>
                  <textarea rows={3} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green" placeholder="Anything you'd like the agent to know..." />
                </div>

                <Button className="w-full h-11" onClick={handleConfirm}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Confirm Viewing
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
