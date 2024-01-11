import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "./Header";

export const Home = () => {
  return (
    <div>
      <Header />
      <Link to="/signin">ログイン</Link>
      <br />
      <Link to="/signup">サインアップ</Link>
    </div>
  );
};
