export class Asset{
    id: string;
    name: string;
    parentId: string; // id of the parent asset, optional

    constructor(id?: string, name?: string, parentId?: string){
        this.id = id;
        this.name = name;
        this.parentId = parentId;
    }
}