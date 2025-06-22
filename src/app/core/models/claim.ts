export interface Claim {
    id: string;
    status: string;
    submittedDate: string;
    vehicleNumber: string;
    amount?: number;
}