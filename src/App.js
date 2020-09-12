import React from 'react';
import './App.css';
import {
  Switch,
  Route,
} from "react-router-dom"
import Home from "./views/home"
import ShipmentDetail from "./views/shipment-detail"
import ParcelDetail from "./views/parcel-detail"
import Store from './store'

function App() {
  return (
    <Store>
      <div className="App">
        <Switch>
          <Route path = "/shipment/:id/parcel/:parcelId">
            <ParcelDetail />
          </Route>
          <Route path = "/shipment/:id">
            <ShipmentDetail />
          </Route>
          <Route path = "/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Store>
  );
}

export default App;
