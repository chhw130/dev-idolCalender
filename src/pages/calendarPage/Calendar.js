import "./Calendar.css";
import test_data from "./data.json";

import { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faRotateRight,
  faChevronRight,
  faChevronLeft,
  faBroadcastTower,
  faCompactDisc,
  faStore,
  faGift,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  let [clicked, setClicked] = useState("");

  const toggleActive = (e) => {
    setClicked((prev) => {
      return e.target.value;
    });
  };

  // const toggleActive = (e) => {
  //   setBtnActive((prev) => {
  //     return e.target.value;
  //   });
  // };

  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());
  //   console.log(getMoment);

  const today = getMoment;

  // 그 달의 시작하는 week() 주
  const firstWeek = today.clone().startOf("month").week();

  //  1년은 52주가 존재하고 며칠이 더 있는데 이 부분을 달력은 53주로써 표현해야 함
  // 하지만 moment()는 내년의 첫 주인 1로 표시하기 때문에 마지막 주가 1이라면 53으로 표시
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  // 반복문을 사용하여 해당 달의 총주의 수만큼 반복문을 실행하고 테이블의 내용을 배열에 추가
  // 길이가 7인 arr를 생성 후 index를 기반으로 day을 표기
  const calendarArr = () => {
    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf("year")
                .week(week)
                .startOf("week")
                .add(index, "day");

              //   console.log("data:" + data);
              //   console.log("index:" + index);
              //   console.log(moment().format("YYYY.MM"));

              // 오늘 날짜 원으로 표시
              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td
                    key={index}
                    className="today"
                    onClick={() =>
                      console.log(
                        days.format("M") + "월" + " " + days.format("D") + "일"
                      )
                    }
                  >
                    {/* <div className="today"> */}
                    <span>{days.format("D")}</span>
                    <div className="event-content">
                      <Show_event days={days} />
                    </div>
                    {/* </div> */}
                  </td>
                );
                // 다른 달은 글씨 색 연하게
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} style={{ color: "#c2c2c2" }}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td
                    key={index}
                    onClick={() =>
                      console.log(
                        days.format("M") + "월" + " " + days.format("D") + "일"
                      )
                    }
                  >
                    <span
                      value={index}
                      className={"click" + (index == clicked ? "active" : "")}
                      onClick={toggleActive}
                    >
                      {days.format("D")}
                    </span>
                    <div className="event-content">
                      <Show_event days={days} />
                    </div>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <div className="calendar-container">
      <div className="control-container">
        <button
          className="prev-btn"
          onClick={() => {
            // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </button>
        <span className="title">{today.format("YYYY.MM")}</span>
        <button
          className="next-btn"
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} size="lg" />
        </button>
        <button
          className="today-btn"
          onClick={() => {
            setMoment(moment());
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} />
        </button>
      </div>

      <div className="category-container">
        <button className="category-btn">
          <FontAwesomeIcon icon={faBroadcastTower} size="sm" /> 방송
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faCompactDisc} size="sm" /> 발매
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faStore} size="sm" /> 구매
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faGift} size="sm" /> 축하
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faCalendarCheck} size="sm" /> 행사
        </button>
        <button className="category-btn">
          <FontAwesomeIcon icon={faUser} size="sm" /> my
        </button>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="week">일</td>
            <td className="week">월</td>
            <td className="week">화</td>
            <td className="week">수</td>
            <td className="week">목</td>
            <td className="week">금</td>
            <td className="week">토</td>
          </tr>
          {calendarArr()}
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;

function Show_event({ days }) {
  return (
    <>
      {test_data.event.map((data, i) => {
        // console.log(data, i);
        if (days.format("YYYYMMDD") == moment(data.date).format("YYYYMMDD")) {
          return (
            <div key={i} onClick={() => console.log(data)} className="event">
              {data.content}
            </div>
          );
        }
      })}
    </>
  );
}
