import React from "react";
import { Router, Route } from "expo-router";
import Workouts from "@/src/app/Home/Workouts";
import Session from "@/src/app/session";
import History from "@/src/app/Home/History";

export default function AppRouter() {
  return (
    <Router>
      <Route path="/Workouts" component={Workouts} />
      <Route path="/session" component={Session} />
      <Route path="/History" component={History} />
    </Router>
  );
}
