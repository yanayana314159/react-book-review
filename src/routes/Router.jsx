import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { SignInMock } from "../pages/SignInMock";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { User } from "../pages/User";
import { Profile } from "../pages/Profile";
import { BookReviewPost } from "../pages/BookReviewPost";
import { Detail } from "../pages/Detail";
import { Edit } from "../pages/Edit";
export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signinmock" element={<SignInMock />} />
        <Route path="" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<User />} />
        {auth ? (
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/new" element={<BookReviewPost />} />
            <Route path="/detail/:bookId" element={<Detail />} />
            <Route path="/edit/:bookId" element={<Edit />} />
          </>
        ) : (
          <Route path="/signin" element={<Navigate to="/signin" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
