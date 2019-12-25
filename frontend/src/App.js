import React from "react";
import { Layout } from "antd";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import WrappedNormalLoginForm from "./Component/loginpage/Login";
import DrugAndFinance from "./Component/nursepage/DrugAndFinance";
import PatientPersonalData from "./Component/nursepage/PatientPersonalData";
import PurchasedResult from "./Component/nursepage/PurchasedResult";
import CreatePatient from "./Component/nursepage/CreatePatient";
import Doctor from "./Component/doctorpage/Doctor";
const { Content } = Layout;

function App() {
  return (
    <div>
      <Content>
        <Switch>
          {/* {user.role === "nurse" ? ( */}
            <Route exact path="/" component={WrappedNormalLoginForm} />
          {/* ) : null} */}
          <Route exact path="/login" component={WrappedNormalLoginForm} />
          <Route exact path="/nursedrug" component={DrugAndFinance} />
          <Route exact path="/nursepatient" component={PatientPersonalData} />
          <Route exact path="/purchased" component={PurchasedResult} />
          <Route exact path="/createpatient" component={CreatePatient} />
          <Route exact path="/doctor" component={Doctor} />
        </Switch>
      </Content>
    </div>
  );
}

export default App;
