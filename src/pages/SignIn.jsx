import React, { useState } from "react";
import "./signIn.scss";
import { Header } from "./Header";
import { useNavigate, Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../authSlice";

export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const baseurl = "https://railway.bookreview.techtrain.dev";
  //ログイン済みの時はリダイレクト

  const onSignIn = () => {
    if (email !== "" && password !== "") {
      axios
        .post(`${baseurl}/signin`, { email: email, password: password })
        .then((res) => {
          setCookie("token", res.data.token);
          dispatch(signIn());
          navigate("/user");
        })
        .catch((e) => {
          alert("メールアドレスかパスワードが間違っています。");
        });
    } else {
      alert("メールアドレスとパスワードを入力してください。");
    }
  };
  if (auth) return <Navigate to="/user" />;
  return (
    <div>
      <Header />
      <main className="signin">
        <form className="signin-form">
          <h2>ログイン</h2>
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            autoComplete="current-password"
            placeholder="email"
            onChange={handleEmailChange}
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            className="password-input"
            id="pw"
            name="password" // 追加: name属性を設定
            autoComplete="current-password"
            onChange={handlePasswordChange}
            placeholder="password"
          />
          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            ログイン
          </button>
        </form>
      </main>
      <Link to="/signup">新規作成</Link>
    </div>
  );
};
