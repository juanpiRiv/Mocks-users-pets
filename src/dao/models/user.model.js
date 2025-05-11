const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pet'
    }]
}, { timestamps: true });

// Método para validar contraseña
userSchema.methods.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
