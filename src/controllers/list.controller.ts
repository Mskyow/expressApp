import { Request, Response } from "express";
import { IContact } from "../repository/model";
import { ListService } from "../services/list.service";

export class ListController {
    private listService: ListService;

    constructor(){
        this.listService =new ListService();
    }

    getContacts(req: Request, res: Response): void {
        const contacts: IContact[] = this.listService.getContacts();
        res.render('index', {items : contacts});
    }

    getUpdateForm(req: Request, res: Response): void {
        const id = req.params.id;
        const contacts: IContact[] = this.listService.getContacts();
        const selectedContact = contacts.find(c => c.phone === id);
        res.render('update', {
            items : contacts,
            selectedContact
        });
    }
    updateContact(req: Request, res: Response): void {
        const id = req.params.id;
        console.log(req.body)
        this.listService.updateContact(id,req.body);
        res.status(200).json({ message: 'Контакт успешно изменен' });
    }
    getAddContactForm(req: Request, res: Response): void {
        const contacts: IContact[] = this.listService.getContacts();
        res.render('add',{ items : contacts})
    }
    addContact(req: Request, res: Response): void {
        this.listService.addContact(req.body);
        res.redirect('/api');
    }
    async deleteContact(req: Request, res: Response){
        const id = req.params.id;
        this.listService.deleteContact(id);
        res.status(200).json({ message: 'Контакт успешно удален' });
    }
}