import {Asset} from './asset';

export class PeriodsHierarchy extends Asset{
    periods: Period[];
    get upperLevelPeriods(): Period[]{
        return this.periods;
    }

    constructor(id?: string, name?: string, periods?: Period[]){
        super(id, name, null);
        this.periods = periods;
    }

    copy(): PeriodsHierarchy{
        return new PeriodsHierarchy(this.id, this.name, this.periods == null ? null : this.periods.map(p=>{
                if (p == null || typeof p === 'Period'){
                    return p;
                }else{
                    return Object.assign(new Period(), p).copy();
                }
            }))
    }
} 

export class Period{
    amount: number;
    unit: string;
    timeZone: string;
    configuration: PeriodConfiguration;
    upperLevelPeriods: Period[];

    constructor(){
        this.configuration = new PeriodConfiguration();
    }

    copy(): Period{
        return Object.assign(new Period(), {
            amount: this.amount,
            unit: this.unit,
            timeZone: this.timeZone,
            configuration: this.configuration == null || typeof this.configuration === 'PeriodConfiguration' ?
                this.configuration : Object.assign(new PeriodConfiguration(), this.configuration).copy(),
            upperLevelPeriods: this.upperLevelPeriods == null ? null : this.upperLevelPeriods.map(p=>{
                if (p == null || typeof p === 'Period'){
                    return p;
                }else{
                    return Object.assign(new Period(), p).copy();
                }
            })
        });
    }
}

export class PeriodConfiguration{
    keepWithinMinutes: number;

    copy(): PeriodConfiguration{
        let c = new PeriodConfiguration();
        c.keepWithinMinutes = this.keepWithinMinutes;
        return c;
    }
}