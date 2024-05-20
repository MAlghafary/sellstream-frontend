import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const BlogPosts = () => {
  return (
    <Fragment>
      <div className="col-lg-6 col-md-6 col-sm-12">
         

    
      <div class="container">
        <h2>Ad management</h2>
        <div class="ads-list">
            <div id="ad1" class="ad-item">
                <img src="Product picture.jpg" alt="Product picture"/>
                </div>
                <div class="button-group">
                    <button class="accept-btn" onclick="handleAccept(1)"> Approve</button>
                    <button class="reject-btn" onclick="handleReject(1)"> Reject</button>
                </div>
            </div>
        </div>
       
































       
      </div>
    </Fragment>
  );
};

export default BlogPosts;
