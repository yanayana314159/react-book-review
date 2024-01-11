import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.scss";

export const BookReviewRecord = ({ bookData }) => {
  if (bookData.length === 0) {
    return (
      <>
        <div>書評はまだありません</div>
      </>
    );
  } else {
    return (
      <>
        <div className="child">
          <table border="1" className="book-review-record-table">
            <thead>
              <tr>
                <th width="20%">タイトル</th>
                <th>URL</th>
                <th width="40%">詳細</th>
                <th width="10%">レビュー</th>
                <th width="10%">リンク</th>
                <th width="10%">編集</th>
              </tr>
            </thead>

            <tbody>
              {bookData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.url}</td>
                  <td>{item.detail}</td>
                  <td>{item.review}</td>
                  <td>
                    <Link to={`/detail/${item.id}`} className="book-item-link">
                      詳細
                    </Link> 
                  </td>
                  <td>
                    {item.isMine ? (
                      <Link to={`/edit/${item.id}`} className="book-item-link">
                        編集
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
