import { useEffect, useState, useMemo } from "react";

const AndiList = [
  { name: "Tom Tencent", status: "Active", type: "Employee", BU: "Tenzing" },
  { name: "Fred Foting", status: "Leaver", type: "Employee", BU: "Tenzing" },
  {
    name: "Susan Sammol",
    status: "Onboarding",
    type: "Employee",
    BU: "Tenzing"
  },
  { name: "Cheer Samson", status: "Active", type: "Employee", BU: "Tenzing" },
  {
    name: "Bob Hope",
    status: "Alumni",
    type: "Non-employee",
    BU: "Central HUB"
  },
  {
    name: "Richard Krajicek",
    status: "Active",
    type: "Employee",
    BU: "Central HUB"
  },
  {
    name: "Nemar Budonwski",
    status: "Leaver",
    type: "Employee",
    BU: "Central HUB"
  },
  {
    name: "Margerette Beck",
    status: "Onboarding",
    type: "Employee",
    BU: "Central HUB"
  },
  { name: "John Bess", status: "Active", type: "Employee", BU: "Central HUB" },
  { name: "Steve Nash", status: "Alumni", type: "Non-employee", BU: "Aletta" },
  { name: "Desawh jordan", status: "Active", type: "Employee", BU: "Aletta" },
  { name: "Anette G.", status: "Leaver", type: "Employee", BU: "Aletta" },
  { name: "Poga Pogbar", status: "Onboarding", type: "Employee", BU: "Aletta" },
  { name: "Nina Hrzic", status: "Active", type: "Employee", BU: "Aletta" },
  { name: "George S.", status: "Alumni", type: "Non-employee", BU: "Aletta" },
  { name: "Hanna P.", status: "Leaver", type: "Employee", BU: "Aletta" }
];

export default function App() {
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedBU, setSelectedBU] = useState();

  // render the full List on page load
  useEffect(() => {
    setEmployeeList(AndiList);
  }, []);

  // useMemo to memoize the result of the function
  const filteredList = useMemo(() => {
    if (!selectedStatus && !selectedBU) {
      return AndiList;
    } else if (!selectedStatus && selectedBU) {
      return AndiList.filter((person) => person.BU === selectedBU);
    } else if (selectedStatus && !selectedBU) {
      return AndiList.filter((person) => person.status === selectedStatus);
    } else {
      return AndiList.filter(
        (person) => person.status === selectedStatus && person.BU === selectedBU
      );
    }
  }, [selectedStatus, selectedBU]);

  //get all statuses from andIList
  function getDropdownItems(andiList) {
    return ["All", ...andiList.map(({ status }) => status)];
  }

  const statuses = getDropdownItems(employeeList);

  //get unique values with new Set from the statuses
  //use those to display options in code
  const uniqueStatuses = [...new Set(statuses)];
  console.log("unique:", uniqueStatuses);

  //deal with clicking on different status in dropdown
  const handleChangeCategory = (event) => {
    const selected = event.target.value === "All" ? null : event.target.value;
    setSelectedStatus(selected);
  };

  // handle change in
  const handleChangeBU = (event) => {
    const selected = event.target.value === "All" ? null : event.target.value;
    setSelectedBU(selected);
  };

  //Below gets all unique BU's from ANDIList

  function getBUDropdownItems(andiList) {
    const uniqueBUs = ["All", ...new Set(andiList.map(({ BU }) => BU))];
    return uniqueBUs;
  }

  const uniqueBUs = getBUDropdownItems(employeeList);

  console.log("BUDROPDOWNITEMS:", getBUDropdownItems(employeeList)); // checking if they are here

  return (
    <div className="App">
      <h1>Employees</h1>
      <div style={{ display: "flex" }}>
        <div style={{ marginBottom: "15px", marginRight: "15px" }}>
          <p>Employee Status</p>
          <select
            name="category-list"
            id="category-list"
            onChange={handleChangeCategory}
          >
            {uniqueStatuses.map((option) => (
              <option key={option} value={option}>
                {option}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Business Unit</p>
          <select name="bu-list" id="bu-list" onChange={handleChangeBU}>
            {uniqueBUs.map((option) => (
              <option key={option} value={option}>
                {option}{" "}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h2>
        {selectedStatus ? selectedStatus : "All"} results{" "}
        {selectedBU ? `- ${selectedBU}` : ""}
      </h2>
      {filteredList.map((element, index) => (
        <p {...element} key={index}>
          {element.name}
        </p>
      ))}
    </div>
  );
}
