import fs from 'fs'
import { IContact } from './model';

export class ModelService{

    private dataPath = ('./src/data/data.json');

    getAll():IContact[]{
        const data = fs.readFileSync(this.dataPath,'utf-8');
        const contacts = JSON.parse(data);
        return contacts
    }
    addOne(data:IContact):void{
        let contacts: IContact[] = [];

        if (fs.existsSync(this.dataPath)) {
            const fileContents = fs.readFileSync(this.dataPath, 'utf-8');
            contacts = JSON.parse(fileContents) || [];
        }

        contacts.push(data);

        fs.writeFileSync(this.dataPath, JSON.stringify(contacts, null, 2)); 
    }
    updateOne(phone:string,data:IContact):void{
        let contacts: IContact[] = [];

        if (fs.existsSync(this.dataPath)) {
            const fileContents = fs.readFileSync(this.dataPath, 'utf-8');
            contacts = JSON.parse(fileContents) || [];
        }

        const index = contacts.findIndex(contact => contact.phone === phone);
        contacts[index] = { ...contacts[index], ...data }; 

        fs.writeFileSync(this.dataPath, JSON.stringify(contacts, null, 2)); 
    }

    deleteOne(phone:string):void{
        let contacts: IContact[] = [];

        if (fs.existsSync(this.dataPath)) {
            const fileContents = fs.readFileSync(this.dataPath, 'utf-8');
            contacts = JSON.parse(fileContents) || [];
        }


        contacts = contacts.filter(contact => contact.name !== phone);

        fs.writeFileSync(this.dataPath, JSON.stringify(contacts, null, 2)); 
    }
}