

namespace User {
    interface IUser {
        name: string;
        age: number;
    }

    export class UserModel implements IUser {
        _name: string;
        _age: number;

        constructor() {
            this._name = "zhangsan";
            this._age = 25;
        }

        public get name(): string {
            return this._name;
        }

        public set name(v: string) {
            this._name = v;
        }


        public get age(): number {
            return this._age;
        }

        public set(v: number) {
            this._age = v;
        }
    }

    interface IUserService {
        create(): void;
        detail(): IUser;
        delete(): boolean;
        update(): boolean;
    }

    export class UserService implements IUserService {
        create(): void {
            throw new Error("Method not implemented.");
        }
        detail(): IUser {
            throw new Error("Method not implemented.");
        }
        delete(): boolean {
            throw new Error("Method not implemented.");
        }
        update(): boolean {
            throw new Error("Method not implemented.");
        }

    }
}