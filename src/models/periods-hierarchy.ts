import {Asset} from './asset';

export class PeriodsHierarchy extends Asset{
    periods: Period[];
} 

export class Period{
    amount: number;
    configuration: PeriodConfiguration;
    timeZone: string;
    unit: string;
    upperLevelPeriods: Period[];
}

export class PeriodConfiguration{
    keepWithinMinutes: number;
}