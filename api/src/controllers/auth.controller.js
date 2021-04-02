import { db } from '../models/index';
function login(req, res) {
    const user = db.user.findOne({userName:req.body.username});
}