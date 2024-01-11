import { React, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "../authSlice";
import "./header.scss";
import axios from "axios";
const baseUrl = "https://railway.bookreview.techtrain.dev";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };
  const handleSignIn = () => {
    navigate("/signin");
  };
  const [nickName, setNickName] = useState();
  //認証済みの時にユーザー名を引っ張ってくる
  useEffect(() => {
    if (auth === true) {
      const config = {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      };
      axios
        .get(`${baseUrl}/users`, config)
        .then((res) => {
          setNickName(res.data.name);
          console.log(nickName);
        })
        .catch((error) => console.log("エラーが発生しました:", error));
    }
  }, []); // 空の配列を依存性として渡すことで、一度だけ実行

  return (
    <>
      <header>
        {auth ? (
          <>
            <Link to="/user" className="link">
              BookWise
            </Link>
            <button onClick={handleSignOut} className="sign-out-button">
              サインアウト <br />
              {nickName}さん
            </button>
            <br />
          </>
        ) : (
          <>
            <Link to="" className="link">
              BookWise
            </Link>
            <button onClick={handleSignIn} className="sign-out-button">
              サインイン
            </button>
          </>
        )}
      </header>
    </>
  );
};
