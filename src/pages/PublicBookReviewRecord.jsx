import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./user.scss";

export const PublicBookReviewRecord = ({ bookData }) => {
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
          <table border={1} className="book-review-record-table">
            <thead>
              <tr>
                <th width="20%">タイトル</th>
                <th>URL</th>
                <th width="40%">詳細</th>
                <th width="10%">レビュー</th>
              </tr>
            </thead>

            <tbody>
              {bookData.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.url}</td>
                  <td>{item.detail}</td>
                  <td>{item.review}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
