import React from "react";
import { Router, Route } from "expo-router";
import Workouts from "@/src/app/Home/Workouts";
import Summary from "@/src/app/Home/summaryInfo";
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

// import { createBrowserRouter, RouterProvider } from "expo-router";
// import React from "react";
// import Workouts from "@/src/app/Home/Workouts";
// import Session from "@/src/app/session";
// import History from "@/src/app/Home/History";

// // Define your routes
// const router = createBrowserRouter([
//   {
//     path: "/Workouts",
//     element: <Workouts />,
//   },
//   {
//     path: "/session",
//     element: <Session />,
//   },
//   {
//     path: "/History",
//     element: <History />,
//   },
// ]);

// export default function AppRouter() {
//   return <RouterProvider router={router} />;
// }
