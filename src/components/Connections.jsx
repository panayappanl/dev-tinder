import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data?.data);
      dispatch(addConnections(res.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  if (!connections) return;

  if (!connections.length)
    return <h1 className="font-bold text-2xl">No Connections Found</h1>;

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <h1 className="font-bold text-3xl mb-4">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, profilePicture, age, gender, about, _id } =
          connection;
        return (
          <div className="card bg-base-100 w-96 shadow-sm m-4" key={_id}>
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
              {/* <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
