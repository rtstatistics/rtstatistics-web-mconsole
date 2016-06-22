import {Asset} from './asset';

export class Dataset extends Asset{
    constructor(name?: string, id?: string){
        super(id, name);
    }
} 