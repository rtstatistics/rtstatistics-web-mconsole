import { Asset } from './asset';

export class User extends Asset {
    username: string;
    enabled: boolean;
    email: string;

    constructor(id?: string, username?: string, fullName?: string) {
        super(id, fullName);
        this.username = username;
    }

    set fullName(name: string){
        this.name = name;
    }

    get fullName(){
        return this.name;
    }

    logins: Login[];
}

export class Login {
    provider: string;
    id: string;
    emails: string[];
    firstLoginTime: number;
    lastLoginTime: number;

    get formattedFirstLoginTime(): string{
        return null;
    }

    get formattedLastLoginTime(): string{
        return null;
    }
}