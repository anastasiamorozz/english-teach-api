const userService = require("../services/user.service");

class AdminController{
    async changeUserRole(req, res, next){
        try{
            const {userId} = req.body;
            if(!userId){
                throw new Error('Bad request param')
            }

            const newRole = userService.changeUserRole(userId);
            if(!userId){
                console.log("something get wrong")
            }

            return res.json(newRole);
        }catch(e){
            next(e);
        }
    }
}

module.exports = new AdminController();