import { Fragment, ReactElement } from "react";
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from "./routes"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "./redux/hook";
import { inforUser, isLogin, logging } from "./redux/slices/authSlice";
import NullLayout from "./layouts/NullLayout";


function App() {
  const isLoginUser = useAppSelector(isLogin);
  const userData = useAppSelector(inforUser);
  console.log(userData);
  // const isLogining = useAppSelector(logging);
  // console.log(isLoginUser)
  // if (isLogining) {
  //   return <>Loading....</>
  // }
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTER.map((item, index) => {
            const Page = item.page;

            let Layout = NullLayout;
            if (item.layout) {
              Layout = item.layout;
            } else if (item.layout === null) {
              Layout = NullLayout;
            }

            return <Route
              key={index}
              path={item.path}
              element={
                isLoginUser ?
                  <Navigate to="/" />
                  :
                  <Layout>
                    <Page />
                  </Layout>
              }
            />
          })}

          {PRIVATE_ROUTER.map((item, index) => {
            const Page = item.page;
            const Layout = item.layout || NullLayout;
            return <Route
              key={index}
              path={item.path}
              element={
                isLoginUser ?
                  <Layout>
                    <Page />
                  </Layout>
                  :
                  <Navigate to="/login" />
              }
            />
          })}
          <Route path="*" element={<>NotFound</>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
