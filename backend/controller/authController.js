const service = require('../service/authService');


const registerUserContoller = async (req, res, db) => {
    try {
        const body = req.body;
        const user = await service.registerUser(body, db);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUserController = (async (req,res)=>{
    try {
        const body = req.body;
        const user = await service.loginUser(body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const currentUser = (async (req,res)=>{
    
    res.json({message:"Current User"});
});


const forgotPasswordController = (async (req,res)=>{
    try {
        const body = req.body;
        const response = await service.forgotPassword(body);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const resetPasswordConfirmationController = (async (req,res)=>{
    try {
        const response = await service.resetPasswordConfirmation(req);
        res.redirect(`${process.env.CLIENT_URL}/reset-password-page/${response.token}`);
    } catch (error) {
        res.redirect(`${process.env.CLIENT_URL}/reset-password-page-failed`);
    }
});

const resetPasswordController = (async (req,res)=>{
    try {
        const body = req.body
        const response = await service.resetPassword(body,req);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// const logoutController = (async (req,res)=>{
//     try {
//         const body = req.body;
//         const user = await service.loginUser(body);
//         res.status(201).json({ user });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });




module.exports = {
    registerUserContoller,
    loginUserController,
    currentUser,
    forgotPasswordController,
    resetPasswordConfirmationController,
    resetPasswordController,
}