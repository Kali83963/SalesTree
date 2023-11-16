import { Route, Routes } from "react-router-dom";
import Login from "./LoginForm";
import Register from "./RegisterForm";
import AccountsLayout from "./AccountsLayout";
import ForgotPasswordForm from "./ForgotPasswordForm";
import PasswordResetConformationForm from "./PasswordResetConformationForm";
import ResetPasswordForm from "./ResetPasswordForm";



export  function AccountRouter(){
    return(
        <>
            <Routes>
                <Route element={<AccountsLayout />}>
                    <Route index path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgot/password" element={<ForgotPasswordForm />}/>
                    <Route path="/confirmation/code" element={<PasswordResetConformationForm />}/>
                    <Route path="/reset/password" element={<ResetPasswordForm />}/>
                </Route>
                <Route path="/*" element={<h1>Not found</h1>}/>
            </Routes>

        </>
    )

}