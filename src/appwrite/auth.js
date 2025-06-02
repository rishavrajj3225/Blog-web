import { use } from "react";
import conf from "../conf/config.js"

import { Client, Account ,ID} from "appwrite";


export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
          .setEndpoint(conf.appwriteUrl) 
          .setProject(conf.appwriteProjectId); 
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(!userAccount) {
                return userAccount;
            }
            else{
                return this.login({email, password});
            }
           
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            const session = await this.account.createEmailSession(email, password);
            if(!session) {
                throw new Error("Failed to login");
            }
            else{
                return session;
            }
        } catch (error) {
            throw error;
        }
    }


    async getCurrentUser() {
        try {
            const user = await this.account.get();
            if(!user) {
                throw new Error("No user found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async logout() {
        try {
            const session = await this.account.deleteSession("current");
            if(!session) {
                throw new Error("Failed to logout");
            }
            return session;
        } catch (error) {
            throw error;
        }
    }
}

const authService= new AuthService();
export default authService;
