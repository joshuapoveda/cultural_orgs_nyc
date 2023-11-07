import "./App.css";
import Search from "./components/Search";
import Select from "./components/Select";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [culturalCenters, setCulturalCenters] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [boroughFilter, setBoroughFilter] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://data.cityofnewyork.us/resource/u35m-9t32.json"
        );
        const data = response.data;
        setCulturalCenters(data);
      } catch (error) {
        console.error("Error fetching darta:", error);
      }
    };
    getData();
  }, []);

  return (
    <>
      <div className="text-xl">Art Orgs NYC</div>
      <div>
        {/* Search Components */}
        <Search setSearchData={setSearchData}></Search>
        <Select setBoroughFilter={setBoroughFilter}></Select>
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {culturalCenters
          .filter((org) => {
            if (!boroughFilter && !searchData) {
              return true;
            } else if (boroughFilter && boroughFilter != "select") {
              return (
                org.borough.toLowerCase() === boroughFilter &&
                org.organization_name.toLowerCase().includes(searchData)
              );
            } else if (searchData) {
              return org.organization_name.toLowerCase().includes(searchData);
            } else if (boroughFilter === "select") {
              return true;
            }
            //edge case: when searching under select and after
            //using all borough filters
            // if (!boroughFilter && !searchData) {
            //   return true;
            // }
            // let boroughMatch = true;
            // if (boroughFilter) {
            //   boroughMatch = org.borough.toLowerCase() === boroughFilter;
            // }
            // let searchMatch = true;
            // if (searchData) {
            //   searchMatch = org.organization_name
            //     .toLowerCase()
            //     .includes(searchData);
            // }
            // return boroughMatch || searchMatch;
          })
          .map((org, index) => (
            <ul
              key={index}
              className="h-fit flex flex-col gap-4 items-center border-2 border-green-600"
            >
              <li className="border-4 border-red-800">
                {org.organization_name}
              </li>
              <li className="border-4 border-red-800">{org.address}</li>
              <li className="border-4 border-red-800">{org.main_phone}</li>
              <li className="border-4 border-red-800">
                {org.council_district}
              </li>
              <li className="border-4 border-red-800">{org.city}</li>
              <li className="border-4 border-red-800">{org.borough}</li>
            </ul>
          ))}
      </div>
    </>
  );
}

export default App;
