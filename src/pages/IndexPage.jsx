import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";
import { AppConsts } from "../Routes/AppConsts";
import { ApiRoutes } from "../Routes/ApiRoutes";
import { PageRoutes } from "../Routes/PageRoutes.js";


axios.defaults.baseURL = AppConsts.ServerAddress;

export default function IndexPage() {

///get user id///////////





  const [places,setPlaces] = useState([]);
  useEffect(() => {
    axios.get(ApiRoutes.GetAllPlaces).then(response => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div>
   
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {places.length > 0 && places.map(place => (
        <Link to={PageRoutes.PlaceById.replace(":id",place._id)}>
          <div className="w-400 h-60 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl h-full w-full aspect-square " src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span> per night
          </div>
        </Link>
      ))}
    </div>
    </div>
  );
}
