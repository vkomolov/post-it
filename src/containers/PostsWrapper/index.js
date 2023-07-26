import React, { useMemo } from "react";
import "./PostsWrapper.scss";
import PostItem from "../../components/PostItem";
import AlertBlock from "../../components/AlertBlock";
import { nanoid } from "@reduxjs/toolkit";
import { useOpacityTransition, useSortingData, usePosts, useAlertData } from "../../hooks";
import { sortObjectsByTwoParams } from "../../api";

const PostsWrapper = () => {
  log("PostsWrapper renders...");

    const { stateAlerts } = useAlertData();
    const { stateSort } = useSortingData();

    const { posts } = usePosts();
    const starQnty = posts.length ? Math.max(...posts.map(post => post.reactions)) : 0;

    const transitionedRef = useOpacityTransition(700);

    const { sortPrimary, sortSecondary } = stateSort;

    const sortedPosts = useMemo(() => {
        log("sortedPosts useMemo: ");

        if (!posts.length) {
            return null;
        }

        const postsSorted = [...posts].sort(sortObjectsByTwoParams(sortPrimary, sortSecondary));

        return postsSorted.map(data => (
            <PostItem
                data = { data }
                starQnty = { starQnty }
                key={ nanoid() }
            />
        ));
    }, [sortPrimary, sortSecondary, posts]);

    return (
        <div
            className="posts-wrapper"
            ref={ transitionedRef }
        >
            { stateAlerts.alertType && <AlertBlock { ...{ stateAlerts } } /> }
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