export type BenefitType = 'per-sailing' | 'daily';

export interface Benefit {
  id: string;
  label: string;
  type: BenefitType;
  quantity?: number;
}

export type TierName = 'gold' | 'platinum' | 'emerald' | 'diamond' | 'diamond-plus' | 'pinnacle';

export interface Tier {
  id: TierName;
  name: string;
  displayName: string;
  benefits: Benefit[];
}

export interface ChecklistState {
  [benefitId: string]: boolean | number;
}
