import { Vehicle } from "./vehicle"

export interface Policy {
  id: number
  policyNumber: string
  userId: number
  vehicleId: number
  insurerName: string
  policyType: string
  coverageAmount: number
  deductibleAmount: number
  effectiveDate: string
  expiryDate: string
  status: string
  createdAt: string
  vehicles: Vehicle[]
}