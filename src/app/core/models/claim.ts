export interface ClaimList {
    claims: Claim[]
}

export interface Claim {
    claimId: number
    claimNumber: string
    vehicleNumber: string
    incidentDate: string
    incidentLocation: string
    incidentDescription: string
    status: string
    submittedAt: string
    estimatedAmount: any
    approvedAmount: number
    documentUrls: string[]
}  