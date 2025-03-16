import { IContact } from "../repository/model";
import { ModelService } from "../repository/repo.service";

export class ListService{
private repository : ModelService
constructor(){
    this.repository = new ModelService();

}

    getContacts():IContact[]{
       return this.repository.getAll();
    }


    getUpdateForm(id:string){
        const contacts = this.repository.getAll();
        const contact = contacts.find(c => c.phone === id);
        return contact
    }
    updateContact(id:string,data:IContact){
        this.repository.updateOne(id,data);
    }

    addContact(data:IContact){
        this.repository.addOne(data);
    }
    deleteContact(id:string){
        this.repository.deleteOne(id);
    }
}