import React, { useMemo } from "react";
import "./PostsWrapper.scss";
import PostItem from "../../components/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition, useSortingData, usePosts } from "../../hooks";
import { sortObjectsByTwoParams } from "../../api";

const PostsWrapper = () => {
  log("PostsWrapper renders...");

    const [ stateSort ] = useSortingData();
    //log(sortState, "sortState: ");

    const [ statePosts ] = usePosts();
    //log(postState, "postState: ");

    const transitionedRef = useOpacityTransition(700);

    const { sortPrimary, sortSecondary } = stateSort;
    const { posts } = statePosts;

    const sortedPosts = useMemo(() => {
        log("sortedPosts useMemo: ");
        if (!posts.length) {
            return null;
        }
        //log(posts, "posts");
        const postsSorted = [...posts].sort(sortObjectsByTwoParams(sortPrimary, sortSecondary));

        //log(postsSorted, "postsSorted...");


        return postsSorted.map(data => (
            <PostItem
                { ...{ data } }
                key={ nanoid() }
            />
        ));
    }, [sortPrimary, sortSecondary, posts]);

    return (
        <div
            className="posts-wrapper"
            ref={ transitionedRef }
        >
            { sortedPosts }
        </div>
    );
};

export default PostsWrapper;

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}