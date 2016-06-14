import {IdAndName} from './id-and-name';

export class User extends IdAndName{
    username: string;
    enabled: boolean;
    fullName: string;
    email: string;
    get name(){
        return this.fullName;
    }
} 