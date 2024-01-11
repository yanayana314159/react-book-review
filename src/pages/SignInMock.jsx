import React, { useState } from "react";

export const SignInMock = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const baseurl = "https://railway.bookreview.techtrain.dev";

  return (
    <div>
      <main className="signin">
        <form className="signin-form">
          <h2>ログイン</h2>
          <label className="email-label" htmlFor="email">
            メールアドレス
          </label>
          <br />
          <input
            type="email"
            className="email-input"
            id="email"
            autoComplete="current-password"
            onChange={handleEmailChange}
            placeholder="email"
          />
          <br />
          <label className="password-label" htmlFor="pw">
            パスワード
          </label>
          <br />
          <input
            type="password"
            className="password-input"
            id="pw"
            autoComplete="current-password"
            onChange={handlePasswordChange}
            placeholder="password"
          />
          <br />
          <button type="button" className="signin-button">
            ログイン
          </button>
        </form>
      </main>
      <a>新規作成</a>
    </div>
  );
};
