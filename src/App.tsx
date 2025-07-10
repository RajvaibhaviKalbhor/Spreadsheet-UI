import { useState } from "react";
import "./App.css";
import HeaderBar from "./components/HeaderBar";
import Toolbar from "./components/Toolbar";
import ColumnHeaders from "./components/ColumnHeaders";
import SpreadsheetTable from "./components/SpreadsheetTable";
import SpreadsheetContainer from './components/SpreadsheetContainer';



function App() {
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    avatarUrl: "https://i.pravatar.cc/28",
  };

  const workspaceName = "Workspace";
  const sheetName = "Spreadsheet 3";


  const [groupedHeaders, setGroupedHeaders] = useState([
    { name: "ABC", icon: "🧠", subheaders: ["Assigned"] },
    { name: "Answer a question", icon: "💬", subheaders: ["Priority", "Due Date"] },
    { name: "Extract", icon: "📤", subheaders: ["Est. Value"] },
  ]);


  return (
    <div className="w-screen h-screen flex flex-col bg-gray-100 p-0 px-0">
      {/* Header */}
      <HeaderBar
        workspaceName={workspaceName}
        sheetName={sheetName}
        user={user}
      />

      {/* Toolbar + Sheet Tabs */}
      <div className="flex-shrink-0">
        <Toolbar />


      </div >

      {/* Spreadsheet Section */}
      {/* <div className="flex-1 overflow-auto">
        <div className="w-fit min-w-[1200px]">

          <div className="pr-4"><ColumnHeaders groupedHeaders={groupedHeaders} /></div>

          <SpreadsheetTable />

        </div>
      </div> */}

      <div className="flex-1 overflow-auto">
        <div className="w-fit min-w-[1200px]">
          {/* Add padding-right above scroll for header alignment */}
          <div >
            <SpreadsheetContainer />
          </div>
        </div>
      </div>


    </div>
  );
}

export default App;
