import { Asset } from './asset';

export class Statistics extends Asset {
    datasetId: string;
    periodsId: string;
    includeCountDistinct: boolean;
    timestampFieldFormat: string;
    timestampFieldName: string;
    timestampFieldZone: string;
    valueField: string;
    keyFields: (string|string[])[];

    copy(): Statistics {
        let keyFieldsCopy: (string|string[])[];
        if (this.keyFields == null) {
            keyFieldsCopy = this.keyFields;
        }else {
            keyFieldsCopy = this.keyFields.map(f => {
                if (f == null || typeof f === 'string') {
                    return f;
                }else {
                    return f.slice();
                }
            });
        }
        return Object.assign(new Statistics(), this, {
            keyFields: keyFieldsCopy
        });
    }
}