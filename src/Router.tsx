import LoginPage from "./pages/Authentication/LoginPage";
import ForgotPasswordPage from "./pages/Authentication/ForgotPasswordPage";
import { Routes, Route } from "react-router-dom";
import ResetPasswordPages from "./pages/Authentication/ResetPasswordPages";
import SetPasswordPage from "./pages/Authentication/SetPasswordPage";
import HomePage from "./pages/HomePage";
import ProtectedLayout from "./layout/ProtectedLayout";
import ChangePasswordPage from "./pages/Authentication/ChangePasswordPage";
import ProfileChange from "./pages/protectedpages/profile/ProfileChangePage";
import UserList from "./pages/protectedpages/Users/UsersList";
import Dashboard from "./pages/protectedpages/Dashboard/Dashboard";
import ManagerList from "./pages/protectedpages/manger/MangerList";
import IndustryList from "./pages/protectedpages/Industry/IndustryList";
import ProfessionList from "./pages/protectedpages/profession/ProfessionList";
import UserView from "./pages/protectedpages/Users/UserView";
import Setting from "./pages/protectedpages/setting/Setting";

const Router = () => {
    return (
        <Routes>
            {/* Authentication Routes  */}
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPages />} />
            <Route path="/set-password/:token" element={<SetPasswordPage />} />

            {/* Protected Routes  */}
            <Route element={<ProtectedLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/change-password" element={<ChangePasswordPage />} />
                <Route path="/profile" element={<ProfileChange />} />
                <Route path="/users">
                    <Route index element={<UserList />} />
                    <Route path="/users/details/:userId" element={<UserView />}></Route>
                </Route>

                <Route path="/profession">
                    <Route index element={<ProfessionList />} />
                </Route>

                <Route path="/setting">
                    <Route index element={<Setting />} />
                </Route>

                {/* industry  */}
                {/* <Route path="/industry" element={<IndustryList />}></Route> */}

                {/* master admin  */}
                <Route path="/master-admin">
                    <Route path="manager" element={<ManagerList />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;
