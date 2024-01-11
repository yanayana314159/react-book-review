import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, Link, Navigate, useParams } from "react-router-dom";
import { Header } from "./Header";
import { Pagination } from "./Pagination.jsx";
import { BookReviewRecord } from "./PublicBookReviewRecord.jsx";
import "./bookReviewPost.scss";

import { signIn } from "../authSlice";
import "./user.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
const baseUrl = "https://railway.bookreview.techtrain.dev";

export const Edit = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true); // データ読み込み中を示すステート

  const [cookies] = useCookies();
  const navigate = useNavigate();
  const { bookId } = useParams();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const [inputValue, setInputValue] = useState("");

  const config = {
    headers: {
      authorization: `Bearer ${cookies.token}`,
    },
  };
  //本の詳細をget
  //objectでsetした方が綺麗になる
  //isMineでのfalsenの時に404にリダイレクト
  useEffect(() => {
    axios
      .get(`${baseUrl}/books/${bookId}`, config)
      .then((res) => {
        const data = res.data;
        setBookData(data);
        setLoading(false);
        setTitle(data.title);
        setUrl(data.url);
        setDetail(data.detail);
        setReview(data.review);
      })
      .catch((error) => console.log("エラーが発生しました:", error));
  }, []); // 空の配列を依存性として渡すことで、一度だけ実行

  const postReview = () => {
    console.log(`Bearer ${cookies.token}`);
    if (title !== "" && url !== "" && detail !== "" && review !== "") {
      axios
        .put(
          `${baseUrl}/books/${bookId}`,
          {
            title: title,
            url: url,
            detail: detail,
            review: review,
          },
          config
        )
        .then((res) => {
          setMessage(`${title}の評価を編集しました。`);
          setTitle("");
          setUrl("");
          setDetail("");
          setReview("");
        })
        .catch((e) => {
          console.log(e);
          setMessage(`エラーが発生しました。${e.message}`);
        });
    } else {
      alert("全て記載してください");
      console.log("抜けあり");
    }
  };

  return (
    <>
      <Header />
      <div className="review-post">
        <h2>本の評価を編集</h2>
        <form className="review-form">
          <label>タイトル</label>
          <input
            type="text"
            className="review-form-title"
            value={title}
            onChange={handleTitleChange}
          ></input>
          <br />
          <label>URL</label>
          <input
            type="text"
            className="review-form-url"
            value={url}
            onChange={handleUrlChange}
          ></input>
          <br />
          <label>詳細</label>
          <textarea
            type="text"
            className="review-form-detail"
            value={detail}
            onChange={handleDetailChange}
          ></textarea>
          <br />
          <label>レビュー</label>
          <select
            className="review-form-review"
            value={review}
            onChange={handleReviewChange}
          >
            <option disabled value="">
              選択してください
            </option>
            <option value="星1">★</option>
            <option value="星2">★★</option>
            <option value="星3">★★★</option>
            <option value="星4">★★★★</option>
            <option value="星5">★★★★★</option>
          </select>
          <br />
          <button
            type="button"
            className="review-form-button"
            onClick={postReview}
          >
            編集
          </button>
          <br />
        </form>
        <div>{message}</div>
        <Link to="/user">戻る</Link>
      </div>
    </>
  );
};
