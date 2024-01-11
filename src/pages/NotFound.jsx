import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";
export const NotFound = () => {
  return (
    <div>
      <Header />
      <a>404 ページが存在しません</a>
      <br />
      <Link to="/signin">サインイン</Link>
      <br />
      <Link to="/signup">登録</Link>
    </div>
  );
};
