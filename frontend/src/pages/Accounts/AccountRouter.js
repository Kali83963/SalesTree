import { Route, Routes } from "react-router-dom";
import { lazy } from 'react';
import NotFound from "../NotFound";
const Login = lazy(() => import("./LoginForm"));
const Register = lazy(() => import("./RegisterForm"));
const AccountsLayout = lazy(() => import("./AccountsLayout"));
const ForgotPasswordForm = lazy(() => import("./ForgotPasswordForm"));
const PasswordResetConformationForm = lazy(() => import("./PasswordResetConformationForm"));
const ResetPasswordForm = lazy(() => import("./ResetPasswordForm"));



export  function AccountRouter(){
    return(
        <>
            <Routes>
                <Route element={<AccountsLayout />}>
                    <Route index path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgot/password" element={<ForgotPasswordForm />}/>
                    <Route path="/confirmation/code" element={<PasswordResetConformationForm />}/>
                    <Route path="/reset/password/:token" element={<ResetPasswordForm />}/>
                </Route>
                <Route path="/*" element={<NotFound/>}/>
            </Routes>

        </>
    )

}