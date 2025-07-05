export interface DashboardData {
    totalClaims: number;
    claimsSummary: ClaimsSummary;
    pendingApprovals: PendingApprovals;
    quickStats: QuickStats;
    recentAssignments: RecentAssignment[];
  }
  interface RecentAssignment {
    inspectorName: string;
    inspectorAvatar?: any;
    claimId: string;
    assignedDate: string;
    status?: any;
  }
  interface QuickStats {
    averageProcessingTime: string;
    approvalRate: string;
    delayedClaims: number;
    activeInspectors: number;
  }
  interface PendingApprovals {
    total: number;
    new: number;
    escalated: number;
    delayed: number;
  }
  interface ClaimsSummary {
    inInspection:number;
    approved: number;
    inReview: number;
    rejected: number;
  }