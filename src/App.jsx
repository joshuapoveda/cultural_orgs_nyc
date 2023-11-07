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
        <Search setSearchData={setSearchData}></Search>
        <Select setBoroughFilter={setBoroughFilter}></Select>
      </div>
      <div className="flex flex-col gap-3 justify-center m-10">
        {culturalCenters
          .filter((org) => {
            if (!boroughFilter && !searchData) {
              return true;
            }

            let searchMatch = true;
            if (searchData) {
              searchMatch = org.organization_name
                .toLowerCase()
                .includes(searchData);
            }
            let boroughMatch = true;
            if (boroughFilter && boroughFilter != "all") {
              boroughMatch = org.borough.toLowerCase() === boroughFilter;
            }
            let mixedSearch = true;
            if (searchData && boroughFilter) {
              mixedSearch =
                org.borough.toLowerCase() === boroughFilter &&
                org.organization_name.toLowerCase().includes(searchData);
            }

            if (boroughFilter === "all" && searchData) {
              return org.organization_name.toLowerCase().includes(searchData);
            } else if (boroughFilter === "all") {
              return true;
            }

            return searchMatch && boroughMatch && mixedSearch;
          })
          .map((org, index) => (
            <ul
              key={index}
              className="h-fit w-fit flex flex-row gap-4 items-center border-2 border-green-600"
            >
              <li className="border-4 border-red-800">
                <a href={`https://www.google.com/search?q=${org.organization_name}`} target="_blank">{org.organization_name}</a>
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
