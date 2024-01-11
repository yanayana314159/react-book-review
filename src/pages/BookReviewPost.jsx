import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { Header } from "./Header";
import { Pagination } from "./Pagination.jsx";
import { BookReviewRecord } from "./PublicBookReviewRecord.jsx";
import "./bookReviewPost.scss";
import { signIn } from "../authSlice";
import "./user.scss";
import { useCookies } from "react-cookie";
import axios from "axios";
const baseUrl = "https://railway.bookreview.techtrain.dev";

export const BookReviewPost = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleUrlChange = (e) => setUrl(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleReviewChange = (e) => setReview(e.target.value);
  const [inputValue, setInputValue] = useState("");
  const postReview = () => {
    console.log(`Bearer ${cookies.token}`);
    const config = {
      headers: {
        authorization: `Bearer ${cookies.token}`,
      },
    };
    if (title !== "" && url !== "" && detail !== "" && review !== "") {
      axios
        .post(
          `${baseUrl}/books`,
          {
            title: title,
            url: url,
            detail: detail,
            review: review,
          },
          config
        )
        .then((res) => {
          setMessage(`${title}の評価を投稿しました。`);
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
        <h2>本の評価を投稿</h2>
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
            投稿
          </button>
          <br />
        </form>
        <div>{message}</div>
        <Link to="/user">戻る</Link>
      </div>
    </>
  );
};
