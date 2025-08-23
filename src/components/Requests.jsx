import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, sampleRequestsData } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      dispatch(addRequest(res.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  if (!requests) return;

  if (!requests.length)
    return <h1 className="font-bold text-xl m-4">No Requests Found</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="font-bold text-3xl mb-4">Requests</h1>
      {requests.map((request) => {
        const { firstName, lastName, profilePicture, age, gender, about } =
          request.fromUserId;
        return (
          <div
            className="card bg-base-100 w-96 shadow-sm m-4"
            key={request._id}
          >
            <figure>
              <img
                src={profilePicture}
                alt="user"
                className="h-[350px] w-full object-cover s"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Requests;
