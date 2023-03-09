import "./Calendar.css";
import left from "../../Img/left.png";
import right from "../../Img/right.png";

import { useState } from "react";
import moment from "moment";

const Calendar = () => {
  // useState를 사용하여 달 단위로 변경
  const [getMoment, setMoment] = useState(moment());

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
              console.log("data:" + data);
              console.log("index:" + index);

              if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
                return (
                  <td key={index} className="today">
                    <div className="circle">
                      <span>{days.format("D")}</span>
                    </div>
                  </td>
                );
              } else if (days.format("MM") !== today.format("MM")) {
                return (
                  <td key={index} style={{ color: "#c2c2c2" }}>
                    <span>{days.format("D")}</span>
                  </td>
                );
              } else {
                return (
                  <td key={index}>
                    <span>{days.format("D")}</span>
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
    <div className="container">
      <div className="control">
        <button
          className="button"
          onClick={() => {
            // clone() 은 기존의 moment가 아닌 새로운 객체를 반환했다는 의미
            setMoment(getMoment.clone().subtract(1, "month"));
          }}
        >
          <img className="arrow" src={left} alt="left" />
        </button>
        <span className="title">{today.format("YYYY.MM")}</span>

        <button
          className="button"
          onClick={() => {
            setMoment(getMoment.clone().add(1, "month"));
          }}
        >
          <img className="arrow" src={right} alt="right" />
        </button>
      </div>

      <div className="buttongroup">
        <button className="categorybutton">today</button>
        <button className="categorybutton">방송</button>
        <button className="categorybutton">발매</button>
        <button className="categorybutton">구매</button>
        <button className="categorybutton">축하</button>
        <button className="categorybutton">행사</button>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="weekTitle">일</td>
            <td className="weekTitle">월</td>
            <td className="weekTitle">화</td>
            <td className="weekTitle">수</td>
            <td className="weekTitle">목</td>
            <td className="weekTitle">금</td>
            <td className="weekTitle">토</td>
          </tr>
          {calendarArr()}
        </tbody>
      </table>
    </div>
  );
};
export default Calendar;
