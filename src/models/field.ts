import { Asset } from './asset';

export class Field extends Asset {
    static TYPE_NATIVE: string = 'native';
    static TYPE_CALCULATED: string = 'calculated';

    static ALL_TYPES: string[] = [Field.TYPE_NATIVE, Field.TYPE_CALCULATED];

    type: string;
    path: string;
    formula: string;

    constructor(name?: string, type?: string, path?: string, formula?: string, datasetId?: string) {
        super(name, name, datasetId);
        this.type = type;
        this.path = path;
        this.formula = formula;
    }

    get pathOrFormula(){
        return this.path != null ? this.path : this.formula;
    }

    get datasetId(){
        return this.parentId;
    }

    set datasetId(datasetId: string){
        this.parentId = datasetId;
    }

    get isNative(){
        return Field.TYPE_NATIVE === this.type;
    }

    get isCalculated(){
        return Field.TYPE_CALCULATED === this.type;
    }

} 