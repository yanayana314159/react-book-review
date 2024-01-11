import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header } from "./Header";
import { Pagination } from "./Pagination.jsx";
import { PublicPagination } from "./PublicPagination";
import { BookReviewRecord } from "./PublicBookReviewRecord.jsx";
import { signIn } from "../authSlice";
import "./user.scss";
import { useCookies } from "react-cookie";

export const User = () => {
  const [cookies] = useCookies();
  console.log(cookies);
  const auth = useSelector((state) => state.auth.isSignIn);
  // コンポーネントがマウントされた後にデータを取得
  if (auth) {
    return (
      <div>
        <Header />
        <h2>ホーム</h2>
        <Link to="/profile">プロフィールの編集</Link>
        <br />
        <Link to="/new">書籍レビューの投稿</Link>
        <main className="review">
          <div className="review-record">
            <Pagination cookies={cookies} />
          </div>
        </main>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        <h2>ホーム</h2>
        <br />
        <main className="review">
          <div className="review-record">
            <PublicPagination />
          </div>
        </main>
      </div>
    );
  }
};
