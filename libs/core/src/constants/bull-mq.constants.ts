
export interface UpdateRiskDecisionJob {
  applicationId: number;
  actorUserId: number;
  decision: 'APPROVE' | 'REJECT';
}

export const Queues = {
  RISK_DECISION_QUEUE: 'risk-decision',
  UPDATE_RISK_DECISION_JOB: 'update-risk-decision'
}
