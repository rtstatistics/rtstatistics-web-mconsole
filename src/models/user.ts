import {Asset} from './asset';

export class User extends Asset{
    username: string;
    enabled: boolean;
    fullName: string;
    email: string;
    get name(){
        return this.fullName;
    }
} 