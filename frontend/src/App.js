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
import Admin from "./Component/admin/Admin";
import ManageUser from "./Component/admin/ManageUser";
import ManageDrug from "./Component/admin/ManageDrug"
const { Content } = Layout;

function App() {
  return (
    <div>
      <Content>
        <Switch>
          <Route exact path="/" component={WrappedNormalLoginForm} />
          <Route exact path="/login" component={WrappedNormalLoginForm} />
          <Route exact path="/nursedrug" component={DrugAndFinance} />
          <Route exact path="/nursepatient" component={PatientPersonalData} />
          <Route exact path="/purchased" component={PurchasedResult} />
          <Route exact path="/createpatient" component={CreatePatient} />
          <Route exact path="/doctor" component={Doctor} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/manageuser" component={ ManageUser } />
          <Route exact path="/managedrug" component={ ManageDrug } />
        </Switch>
      </Content>
    </div>
  );
}

export default App;
