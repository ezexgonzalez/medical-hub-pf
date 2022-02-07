import React from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logUser } from "./actions";
import ProtectedRoute from "./protectedRoute";
import Appointments from "./components/Home/Appointments/Appointments";
import NewAppointment from "./components/Home/Appointments/NewAppointment";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import History from "./components/History/History";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import NotFound from "./components/NotFound/NotFound";
import Admin from "./components/Admin/Admin";
import MedicAppointments from "./components/Medic/MedicAppointments/MedicAppointments";
import MedicAppointmentDetail from "./components/Medic/MedicAppointments/MedicAppointmentDetail";
import NewReviewAppointment from "./components/Medic/MedicAppointments/NewReviewAppointment";
import MedicPatientHistory from "./components/Medic/MedicPatientHistory/MedicPatientHistory";
import NewStudie from "./components/Medic/MedicAppointments/NewStudie";
import MedicProfile from "./components/Medic/MedicProfile/MedicProfile";


function App() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    const refreshToken = async function () {
      try {
        const response = await axios.post("http://localhost:3001/login/token");
        const user = {
          email: response.data.email,
          role: response.data.role,
          token: `${response.data.token_type} ${response.data.access_token}`,
          resetPass: response.data.resetPass,
        };
        dispatch(logUser(user));
      } catch (error) {
        console.log("No user logged");
      }
      setLoaded(true);
    };
    refreshToken();
  }, []);

  return (
    <div className="App">
      {loaded ? (
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/home" component={Home} />
          <ProtectedRoute
            exact
            path="/home/appointments"
            component={Appointments}
          />
          <ProtectedRoute
            exact
            path="/home/appointments/new"
            component={NewAppointment}
          />
          <ProtectedRoute
            exact
            path="/home/userProfile"
            component={UserProfile}
          />
          <ProtectedRoute exact path="/home/history" component={History} />
          <ProtectedRoute exact path="/mercadopago" component={MercadoPago} />
          <Route exact path="/home/medic/appointments" component={MedicAppointments} />
          <Route exact path="/home/medic/appointments/:id" component={MedicAppointmentDetail} />
          <Route path="/home/medic/appointments/review/:id" component={NewReviewAppointment} />
          <Route exact path="/home/medic/patientHistory" component={MedicPatientHistory} />
          <Route exact path="/home/medic/profile" component={MedicProfile} />
            <Route
            path="/home/medic/appointments/studies/:id"
            component={NewStudie}
          />
          <Route exact path="/admin" component={Admin} />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
}

export default App;
