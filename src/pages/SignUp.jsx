import "./signUp.scss";
import React, { useState } from "react";
import { Header } from "./Header";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs";
import axios from "axios";
import { signIn } from "../authSlice";

export const SignUp = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState();
  const [imgData, setImgData] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies();

  const baseurl = "https://railway.bookreview.techtrain.dev";
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]; // 選択されたファイルの一番最初のファイルを取得

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile); // 画像ファイルをURLに変換
      setImg(imageUrl); // 画像のURLを状態に設定
      const imgDataCompressed = new Compressor(selectedFile, {
        quality: 0.6,
        success(result) {
          if (result.size <= 1000000) {
            setImgData(result);
            //console.log(result.size);
          } else {
            const fileSizeMB = (result.size / 1024 / 1024).toFixed(2); // ファイルサイズをMBに変換
            alert(
              `画像サイズが1MBを超えています。別の画像を設定してください。現在のファイルサイズ ${fileSizeMB}MB`
            );
          }
        },
        error(err) {
          // エラーが発生した場合
          alert("画像の圧縮中にエラーが発生しました：" + err.message);
        },
        maxWidth: 1000,
        maxHeight: 400,
        mimeType: "image/png",
      });
    }
  };
  if (auth) return <Navigate to="/user" />;

  const onSignUp = () => {
    if (name !== "" && email !== "" && password !== "" && imgData) {
      //ニックネームとメアド，PWの登録
      axios
        .post(`${baseurl}/users`, {
          name: name,
          email: email,
          password: password,
        })
        //画像のアップロード
        .then((res) => {
          const token = res.data.token;
          const apiToken = `Bearer ${token}`;
          setCookie("token", token);
          const formData = new FormData(); //formdataを使うとうまく行った＋content-typeのところ苦労した
          formData.append("icon", imgData);
          console.log(token);
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: apiToken,
            },
          };
          return axios.post(`${baseurl}/uploads`, formData, config);
        })
        .then((res) => {
          //サインアップ成功後にユーザーページにいく
          dispatch(signIn());
          navigate("/user");
          alert("サインアップに成功しました");
        })
        .catch((e) => {
          alert(`エラーが発生しました。${e.message}`);
        });

      if (auth) return <navigate to="/user" />;
    } else {
      alert(
        "ニックネーム，メールアドレスとパスワード，アイコン画像を全て入力してください。"
      );
    }
  };
  return (
    <div>
      <Header />
      <main className="signup">
        <form className="signup-form">
          <h2>サインアップ</h2>
          <label className="name-label">ニックネーム</label>
          <br />
          <input
            type="text"
            className="name-input"
            placeholder="必須(後で変更できます。)"
            autoComplete="current-password"
            onChange={handleNameChange}
          />
          <br />
          <label className="email-label">メールアドレス</label>
          <br />
          <input
            type="email"
            className="email-input"
            placeholder="必須"
            autoComplete="current-password"
            onChange={handleEmailChange}
          />
          <br />
          <label className="password-label">パスワード</label>
          <br />
          <input
            type="password"
            placeholder="必須"
            className="password-input"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <br />
          <label className="image-label">
            アイコンに使用する画像を選択してください
          </label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <br />
          {img && (
            <button
              type="button"
              onClick={() => {
                setImgData("");
                setImg("");
              }}
            >
              画像を削除
            </button>
          )}
          <br />
          {img && <img src={img} alt="画像" width="50%" />}
          <br />
          <button type="button" className="signin-button" onClick={onSignUp}>
            登録
          </button>
          <Link to="/signin">ログイン画面に戻る</Link>
        </form>
      </main>
    </div>
  );
};

/*
  const testUpload = () => {
    const apiToken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTg0MDA4MzQsImlhdCI6MTY5ODMxNDQzNCwic3ViIjoiNTQ1NDY1NTczNTQiLCJ1c2VyX2lkIjoiNDU1NzE0NjMtZjNlZi00ZmY2LWEwMzktNDliYzFiNjI0N2E3In0.gLCMP7n8G0a0FL7dZcVXccTHeLqd1JNl3Vwdwtn_15s`;
    const formData = new FormData();
    formData.append("icon", imgData);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: apiToken,
      },
    };

    axios
      .post(`${baseurl}/uploads`, formData, config)
      .then((res) => {
        const token = res.data.token;
        dispatch(signIn());
        setCookie("token", token);
        navigate("/user");
        alert("サインアップに成功しました");
      })
      .catch((e) => alert(`エラー:${e.message}`));
  };
  */
