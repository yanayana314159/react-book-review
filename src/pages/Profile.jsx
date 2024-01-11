import "./signUp.scss";
import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import Compressor from "compressorjs";
import axios from "axios";
import { signIn } from "../authSlice";
const baseurl = "https://railway.bookreview.techtrain.dev";

export const Profile = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [img, setImg] = useState();
  const [imgData, setImgData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [explain, setExplain] = useState("設定中の画像を表示しています。");
  const handleNameChange = (e) => setName(e.target.value);
  const handleImageChange = (e) => {
    setExplain("選択された画像を表示中です。");
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

  //認証済みの時にユーザー名と画像を引っ張ってくる
  useEffect(() => {
    if (auth === true) {
      const config = {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      };
      axios
        .get(`${baseurl}/users`, config)
        .then((res) => {
          setName(res.data.name);
          setImg(res.data.iconUrl);
        })
        .catch((error) => console.log("エラーが発生しました:", error));
    }
  }, []); // 空の配列を依存性として渡すことで、一度だけ実行
  //サインアップ用のポスト
  const putProfile = () => {
    if (name !== "") {
      //ニックネームの変更
      const config = {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      };
      axios
        .put(
          `${baseurl}/users`,
          {
            name: name,
          },
          config
        )
        //画像のアップロード
        .then((res) => {
          if (imgData == null) {
            return;
          }
          const formData = new FormData(); //formdataを使うとうまく行った＋content-typeのところ苦労した
          formData.append("icon", imgData);
          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${cookies.token}`,
            },
          };
          return axios.post(`${baseurl}/uploads`, formData, config);
        })
        .then((res) => {
          //サインアップ成功後にユーザーページにいく
          navigate("/user");
          alert("プロフィールの変更に成功しました");
        })
        .catch((e) => {
          alert(`エラーが発生しました。${e.message}`);
        });
    } else {
      alert("ニックネームを入力してください");
    }
  };
  //valueに入れてあげた方が親切
  //画像圧縮やアップロードを共通化してあげた方が良い
  return (
    <div>
      <Header />
      <main className="signup">
        <form className="signup-form">
          <h2>プロフィール変更</h2>
          <label className="name-label">ニックネーム</label>
          <br />
          <input
            type="text"
            className="name-input"
            placeholder={name}
            autoComplete="current-password"
            onChange={handleNameChange}
          />

          <label className="image-label">
            アイコンに使用する画像を選択してください
          </label>
          <br />
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
          {img && <a>{explain}</a>}
          <br />
          <button type="button" className="signin-button" onClick={putProfile}>
            登録
          </button>
          <Link to="/signin">ログイン画面に戻る</Link>
        </form>
      </main>
    </div>
  );
};
