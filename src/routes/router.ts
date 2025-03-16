import { Router } from 'express';
import { ListController } from '../controllers/list.controller';

export default class ApiRouter{
    public router : Router;
    private controller : ListController;
constructor(){
    this.router = Router()
    this.controller = new ListController();
    this.initRoutes();
    }
    private initRoutes(){
        this.router.get('/',(req , res) => this.controller.getContacts(req,res))
        this.router.get('/update/:id',(req,res)=>this.controller.getUpdateForm(req,res))
        this.router.patch('/updateContact/:id',(req,res)=>this.controller.updateContact(req,res))
        this.router.post('/addContact/',(req,res)=>this.controller.addContact(req,res))
        this.router.get('/getAddContactForm/',(req,res)=>this.controller.getAddContactForm(req,res))
        this.router.delete('/deleteContact/:id',(req,res)=>this.controller.deleteContact(req,res))
    }
}