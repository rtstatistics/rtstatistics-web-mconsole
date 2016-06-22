import {Asset} from './asset';

export class Field extends Asset{
    path: string;
    formula: string;

    get pathOrFormula(){
        return this.path != null ? this.path : this.formula;
    }

    get datasetId(){
        return this.parentId;
    }
    
    set datasetId(datasetId: string){
        this.parentId = datasetId;
    }
} 