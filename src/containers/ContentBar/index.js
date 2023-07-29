import React from "react";
import "./ContentBar.scss";
import PostContent from "../PostContent";
import { usePostActive } from "../../hooks";

const ContentBar = () => {
    const postData = usePostActive();
    const { postActive } = postData;

    const content = postActive.id
        ? <PostContent {...{ postData }} />
        : <div className="default-content-wrapper">
            <p className="default-text">Select Post for details</p>
        </div>;

    return (
        <div className="content-bar" >
            { content }
        </div>
    );
};

export default ContentBar;
