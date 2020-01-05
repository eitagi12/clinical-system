const components = {
  //////// Login Component //////////
  login: {
    component: "WrappedNormalLoginForm",
    url: "/login"
  },
  //////// Nurse Component //////////
  nursedrug: {
    component: "DrugAndFinance",
    url: "/nursedrug"
  },
  nursepatient: {
    component: "PatientPersonalData",
    url: "/nursepatient"
  },
  createpatient: {
    component: "CreatePatient",
    url: "/createpatient"
  },
  ///////// Doctor Component //////////
  doctor: {
    component: "Doctor",
    url: "/doctor"
  },
  ///////// Admin Component ////////
  manageuser: {
    component: "ManageUser",
    url: "/manageuser"
  },
  managedrug: {
    component: "ManageDrug",
    url: "/managedrug"
  }
};

export default {
  //role name as a key.
  admin: {
    routes: [...Object.values(components)],
    redirect: ['/manageuser']
  },
  nurse: {
    routes: [
      components.nursedrug,
      components.nursepatient,
      components.createpatient,
      components.login
    ],
    redirect: ['/nursepatient']
  },
  doctor: {
    routes: [
        components.doctor,
        components.login
    ],
    redirect: ['/doctor']
  },
  guest: {
    routes: [
      components.login
    ],
    redirect: ['/login']
  }
};
