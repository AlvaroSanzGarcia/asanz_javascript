import { Injectable } from "@angular/core";
import { DUMMY_USERS } from "../dummy-users";

@Injectable({
    providedIn: 'root'
})

export class AccountsService {
    private userObj = DUMMY_USERS;

    users = DUMMY_USERS;
    selectedUser: any = null;
    selectedUserIndex: number = null;
    showForm: boolean = false;
    newId: string = '';
    newName: string = '';
    newDescription: string = '';


    imagePath(i: number) {
        return 'assets/' + this.users[i].image;
    }

    onSelectUser(i: number) {
        this.selectedUser = this.users[i];
        this.selectedUserIndex = i;
        this.showForm = false;
    }

    delUser(i: number) {
        this.users.splice(i, 1);
    }

    addUser() {
        const newUser = {
            id: "undefined",
            name: "New User",
            image: "5.png",
            description: "undefined"
        };

        this.users.push(newUser);
        this.selectedUser = newUser;
        this.selectedUserIndex = this.users.length - 1;      

        this.newId = newUser.id;
        this.newName = newUser.name;
        this.newDescription = newUser.description;
        this.showForm = true;

    }


    editUser(i: number): void {
        this.selectedUserIndex = i;
        this.selectedUser = this.users[i];
        
        this.newId = this.selectedUser.id;
        this.newName = this.selectedUser.name;
        this.newDescription = this.selectedUser.description;
        this.showForm = true;
    }


    saveChanges(i: number) {
        this.selectedUserIndex = i;
        this.users[i].id = this.newId;
        this.users[i].name = this.newName;
        this.users[i].description = this.newDescription;
        this.showForm = false;
    }
}