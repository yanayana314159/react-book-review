import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./user.scss";
import { Header } from "./Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://railway.bookreview.techtrain.dev";

export const Detail = ({}) => {
  const { bookId } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true); // データ読み込み中を示すステート
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .get(`${baseUrl}/books/${bookId}`, config)
      .then((res) => {
        setBookData(res.data);
        const data = res.data;
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.log("エラーが発生しました:", error));
  }, []); // 空の配列を依存性として渡すことで、一度だけ実行
  // データ読み込み中はローディングメッセージを表示
  if (loading) {
    return <div>データを読み込んでいます...</div>;
  }
  //nullかundefinedでの条件定義
  if (bookData.length === 0) {
    return (
      <>
        <div>書評はまだありません</div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="review">
          <div className="review-record">
            <table border="1" className="book-review-record-table">
              <thead>
                <tr>
                  <th width="20%">タイトル</th>
                  <th>URL</th>
                  <th width="40%">詳細</th>
                  <th width="10%">レビュー</th>
                  <th width="10%">作成者</th>
                </tr>
              </thead>

              <tbody>
                <tr key={bookData.id}>
                  <td>{bookData.title}</td>
                  <td>{bookData.url}</td>
                  <td>{bookData.detail}</td>
                  <td>{bookData.review}</td>
                  <td>{bookData.reviewer}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <Link to="/user">戻る</Link>
        </div>
      </>
    );
  }
};
