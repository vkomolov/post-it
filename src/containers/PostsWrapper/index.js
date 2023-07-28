import React, { useMemo } from "react";
import "./PostsWrapper.scss";
import PostItem from "../../components/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition, usePosts } from "../../hooks";

const PostsWrapper = () => {
    const { postsSorted } = usePosts();

    //checking out the maximum number of reactions (raitings):
    const starQnty = useMemo(() => {
        return postsSorted.length ? Math.max(...postsSorted.map(post => post.reactions)) : 0;
    }, [ postsSorted ]);

    //for animation of the element with the transition opacity...
    const transitionedRef = useOpacityTransition(700);

    const postsList = useMemo(() => {
        if (!postsSorted.length) {
            return null;
        }

        return postsSorted.map(data => (
            <PostItem
                data = { data }
                starQnty = { starQnty }
                key={ nanoid() }
            />
        ));
    }, [ postsSorted, starQnty ]);

    return (
        <div
            className="posts-wrapper"
            role="menu"
            ref={ transitionedRef }
        >
            { postsList }
        </div>
    );
};

export default PostsWrapper;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}