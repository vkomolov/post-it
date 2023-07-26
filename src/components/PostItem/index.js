import React, { useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";
import PropTypes from "prop-types";
import "./PostItem.scss";
import { usePostActive } from "../../hooks";
import { limitSentence } from "../../api/funcs";

const PostItem = ({ data, starQnty }) => {
    const { postActive, viewed, setPostActive } = usePostActive();
    const { id, userId, firstName, lastName, image, title, reactions, tags, body } = data;

    /**
     * creating the data to dispatch, on click event at one of the post items, to sagasSort with the following
     * dispatching the data to the activePostReducer.
     * It is necessary for the ContentBar to demonstrate the data of the post clicked (which is currently active)
     */
    const postData = {
        id,
        userId,
        image,
        firstName,
        lastName,
        title,
        body
    };

    //if the post is already viewed before then to separately style it...
    const specViewedClass = (viewed.includes(id)) ? "post-wrapper viewed" : "post-wrapper";
    //if the post is active then to separately style it, else to style as specViewedClass
    const specClass = +id === +postActive.id ? "post-wrapper active" : specViewedClass;

    //raiting stars of the post
    const stars = useMemo(() => {
        return new Array(starQnty).fill("").map((e, index) => {
            const specClass = (index + 1) <= +reactions
                ? "material-icons icon icon_raiting icon_foxy"
                : "material-icons icon icon_raiting";
            return (
                <i className={ specClass } key={ nanoid() }>star_rate</i>
            );
        });
        }, [reactions, starQnty]
    );

    const titleString = useMemo(() => {
        return limitSentence(title, 55);
    }, [title]);

    const tagsString = useMemo(() => {
        return tags.join(", ");
    }, [tags]);

    //as the element is not interactive, to use handling of keyboard events...
    const handleKeyEvent = e => {
        if (e.key === "Enter") {
            setPostActive(postData);
        }
    };

    return (
        <div
            className={ specClass }
            onClick={ () => setPostActive(postData) }
            onKeyPress={ handleKeyEvent }
            aria-label="click to open the Post content"
            role="menuitem"
            tabIndex={0}
        >
            <div className="ratings-wrapper">
                { stars }
            </div>
            <div className="post-details-wrapper">
                <span
                    className="post-details-wrapper__userName"
                >
                    Author: { `${ firstName } ${ lastName }` }
                </span>
                <p className="post-details-wrapper__title">
                    <span className="elem-info">Title: </span>{ titleString }
                </p>
                <p className="post-details-wrapper__tags">
                    <span className="elem-info">Tags: </span>{ tagsString }
                </p>
            </div>
        </div>
    );
};

export default PostItem;

PostItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        userId: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        reactions: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        body: PropTypes.string.isRequired,
    }),
    starQnty: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}