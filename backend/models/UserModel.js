import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fuxwing.com%2Fwp-content%2Fthemes%2Fuxwing%2Fdownload%2Fpeoples-avatars%2Fdefault-profile-picture-male-icon.svg&tbnid=HKH80KjEYoYrMM&vet=12ahUKEwiO-NT9-LOCAxU-uScCHT2GDb8QMygVegUIARCgAQ..i&imgrefurl=https%3A%2F%2Fuxwing.com%2Fdefault-profile-picture-male-icon%2F&docid=4dYJsNXJ3jLinM&w=800&h=800&q=profile%20image&ved=2ahUKEwiO-NT9-LOCAxU-uScCHT2GDb8QMygVegUIARCgAQ'
    }

}, {
    timestamps: true
})

const UserModel = mongoose.model('User',UserSchema)

export default UserModel;