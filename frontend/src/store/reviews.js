import { csrfFetch } from "./csrf";

const LOAD_REVIEWS = "reviews/LOAD"
const CREATE_REVIEWS = "reviews/CREATE"
const REMOVE_REVIEWS = "reviews/REMOVE"

const load = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const create = (review) => {
    return {
        type: CREATE_REVIEWS,
        review
    }
}

const remove = (id) => {
    return {
        type: REMOVE_REVIEWS,
        id
    }
}

export const loadReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(load(reviews));
        return reviews;
    }
};


export const createReview = (review) => async (dispatch) => {
    console.log(review, "this is the review in the create thunk")
    const response = await csrfFetch("/api/reviews", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(review)
    })
    if (response.ok) {
        const addReview = await response.json();
        dispatch(create(addReview));
        return addReview;

    }

}

export const removeReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ id })
    });
    const review = await response.json();
    dispatch(remove(id))
    return review;
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case LOAD_REVIEWS: {
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            })

            return newState;
        }
        case CREATE_REVIEWS: {
            const newState = {...state};
            newState[action.review.id] = action.review;
            return newState;
        }
        case REMOVE_REVIEWS: {
            const newState = {...state};
            delete newState[action.id];
            return newState;
        }
        default:
            return state;
    }
}

export default reviewReducer;
