import React from "react";
import "./ContentBar.scss";
import PostContent from "../PostContent";
import { usePostActive } from "../../hooks";

const ContentBar = () => {
    const { postActive } = usePostActive();

    const content = postActive.id
        ? <PostContent {...{ postActive }} />
        : <div className="default-content-wrapper">
            <p className="default-text">Select Post for details</p>
        </div>;

    return (
        <div className="content-bar">
            {/*{ postActive.id && <PostContent {...{ postActive }} /> }*/}
            { content }
        </div>
    );
};

export default ContentBar;
