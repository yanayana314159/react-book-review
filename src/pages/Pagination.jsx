import React, { useState, useEffect } from "react";
import "./pagination.scss";
import { BookReviewRecord } from "./BookReviewRecord";
import axios from "axios";
const baseUrl = "https://railway.bookreview.techtrain.dev";

export const Pagination = ({ cookies }) => {
  const [loading, setLoading] = useState(true); // データ読み込み中を示すステート
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const offset = page * 10;
    const config = {
      params: { offset },
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };

    axios
      .get(`${baseUrl}/books`, config)
      .then((res) => {
        setBookData(res.data);
        const data = res.data;
        console.log(data);
        setLoading(false);
      })
      .catch((error) => console.log("エラーが発生しました:", error));
  }, [page]); // 空の配列を依存性として渡すことで、一度だけ実行
  // データ読み込み中はローディングメッセージを表示
  if (loading) {
    return <div>データを読み込んでいます...</div>;
  }

  const handlePage = (e) => {
    const type = e.target.value;
    if (type === "before") {
      setPage(page - 1);
      return;
    }
    setPage(page + 1);
    return;
  };

  return (
    <div>
      <BookReviewRecord bookData={bookData} />
      <br />
      <div className="button-class">
        {page > 0 ? (
          <button className="before-button" onClick={handlePage} value="before">
            前へ
          </button>
        ) : (
          ""
        )}
        {bookData.length < 10 ? (
          ""
        ) : (
          <button className="after-button" onClick={handlePage} value="next">
            次へ
          </button>
        )}
      </div>
    </div>
  );
};
