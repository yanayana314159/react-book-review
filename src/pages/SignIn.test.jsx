import React from "react";
import { render, screen } from "@testing-library/react";
import { SignInMock } from "./SignInMock.jsx";

test("コンポーネントの確認", () => {
  const screen = render(<SignInMock />);
  //ボタンの確認
  const buttonElement = screen.getByRole("button", { name: "ログイン" });
  expect(buttonElement).toBeInTheDocument();
  //ラベルの確認
  expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
  expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
  //入力フォームの確認
  expect(screen.getByPlaceholderText("email"));
  expect(screen.getByPlaceholderText("password"));
});

/*
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/
