module.exports = class UserDto {
    firstName;
    lastname;
    photo;
    email;
    id;
    isActivated;

    constructor(model){
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.photo = model.photo;
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}