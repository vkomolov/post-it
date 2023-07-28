import React from "react";
import "./ContentBar.scss";
import PostContent from "../PostContent";
import { usePostActive, useOpacityTransition } from "../../hooks";

const ContentBar = () => {
    const { postActive } = usePostActive();
    //for animation of the element with the transition opacity...
    const transitionedRef = useOpacityTransition(700);

    //TODO: при появлении дефолтного текста дергается контейнер
    const content = postActive.id
        ? <PostContent {...{ postActive }} />
        : <div className="default-content-wrapper">
            <p className="default-text">Select Post for details</p>
        </div>;
/*        ? <PostContent {...{ postActive }} />
        : null;*/

    return (
        <div
            className="content-bar"
            ref={ transitionedRef }
        >
            {/*{ postActive.id && <PostContent {...{ postActive }} /> }*/}
            { content }
        </div>
    );
};

export default ContentBar;
