const bycrypt = require('bcrypt');
const User = require('../model/user');
const userRouter = require('express').Router();


userRouter.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    }catch(err){
        next(err);
    }
})

userRouter.post('/register', async (req, res, next) => {
    try {
        const { username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            res.status(400).send('Username already exists');
        }
        emailCheck = await User.findOne({email});
        if(emailCheck){
            res.status(400).send('Email already exists');
        }
        const hashedPassword = await bycrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await user.save();
        delete savedUser.password;
        return res.json({status:true, user:savedUser});
    }catch(err){
        next(err);
    }

})

userRouter.post('/login', async (req, res,next) => {
    try{
        const { username, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(!usernameCheck){
            return res.json({status:false, message:"Username or password is incorrect"});        }
    
        const passwordCheck = await bycrypt.compare(password, usernameCheck.password);
        if(!passwordCheck){
            return res.json({status:false, message:"Username or password is incorrect"});
        }
        
        delete usernameCheck.password;
        return res.json({status:true, user:usernameCheck});
    }catch(err){
        next(err);
    }

})

userRouter.post('/setAvatar:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const image = req.body.image;
        const user = await User.findByIdAndUpdate(id,{
            isAvatarImage: true,
            avatarImage: image
        });
        return res.json({status:true, user});
    }catch(err){
        next(err);
    }
})

userRouter.get('/:id', async (req, res, next) => {
    try{
        const users = await User.find({_id: { $ne: req.params.id}}).select([
            'username',
            'email',
            'avatarImage',
            '_id'
        ]);
        return res.json({status:true, users});
    }catch(err){
        next(err);
    }
})

module.exports = userRouter;
