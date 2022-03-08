import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { getOneListing } from "../../store/listing";


const OneListing = () => {
    const dispatch = useDispatch();
    // const history = useHistory();

    const { id } = useParams();
    // console.log("this is the id!", id)
    const listing = useSelector(state => state.listings[id]);
    // console.log("this is the listing!!", listing)

    useEffect(() => {
        dispatch(getOneListing(id));
    }, [dispatch, id])

    return (
        <div>{listing.address}</div>
    )

}


export default OneListing;