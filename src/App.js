import Modal from "./UI/Modal";
import EditUser from "./pages/userFormPage/EditUser";
import LogIn from "./pages/userFormPage/Login";
import ReportSchedule from "./pages/userFormPage/ReportSchedule";
import SignUp from "./pages/userFormPage/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage/MainPage";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import { useEffect } from "react";
import Calendar from "./pages/calendarPage/Calendar";

function App() {
  const dispatch = useDispatch();
  const reduxUserToken = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    const userToken = sessionStorage.getItem("userToken");
    console.log("APP", userToken);
    console.log(reduxUserToken);
    if (userToken) {
      dispatch(authActions.logIn(userToken));
    }
  }, [dispatch, reduxUserToken]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<MainPage />} />

          {/* 회원가입페이지 */}
          <Route path="/signup" element={<SignUp />} />

          {/* render={() => (isLogin ? <Redirect to="/" /> : <Login />) */}
          {/* 로그인페이지 */}
          <Route path="/login" element={<LogIn />} />
          {/* 개인정보수정 */}
          <Route path="/edituser" element={<EditUser />} />

          <Route
            path="/report"
            element={
              <Modal>
                <ReportSchedule />
              </Modal>
            }
          />
          {/* 스케줄제보하기 */}
          {/* <Modal>
          <ReportSchedule />
          </Modal> */}
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
