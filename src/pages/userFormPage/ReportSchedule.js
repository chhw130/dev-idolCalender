import React, { useState } from "react";
import { Cookies, CookiesProvider } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./ReportSchedule.module.scss";
import { getCookie } from "../../cookie/cookie";

let category = ["방송", "발매", "구매", "축하", "행사"];

const ReportSchedule = () => {
  const [btnActive, setBtnActive] = useState("0");
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /**뒤로가기 */
  const goBackHandler = () => {
    navigate(-1);
  };

  /**카테고리에 따라 값 세팅 */
  const toggleActiveHandler = ({ target }) => {
    return setBtnActive(target.value);
  };

  const onSubmit = (data) => {
    let eventType = "";
    if (btnActive === "0") {
      eventType = "broadcast";
    } else if (btnActive === "1") {
      eventType = "발매";
    } else if (btnActive === "2") {
      eventType = "buy";
    } else if (btnActive === "3") {
      eventType = "축하";
    } else if (btnActive === "4") {
      eventType = "행사";
    }

    /**백에 보낼 데이터 */
    const reportData = {
      title: data.title,
      type: eventType,
      location: data.location,
      time: data.startDate,
      content: data.content,
    };
    const cookieData = getCookie("crsftoken");
    console.log("cookie", cookieData);

    const BASE_URL = "http://127.0.0.1:8000/api/v1/users/reports/";
    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"), //
      },
      body: JSON.stringify(reportData),
    }).then((res) => console.log(res));

    console.log(reportData);
  };

  return (
    <>
      <div className={styles.reportContainer}>
        <h4>X</h4>
        <h1>제보하기</h1>
        <h4>완료</h4>
      </div>
      <div className={styles.signUp}>
        <hr />
      </div>
      <form className={styles.reportForm} onSubmit={handleSubmit(onSubmit)}>
        <label>일정의 카테고리를 등록해주세요.</label>
        <div className={styles.scheduleBtnContainer}>
          {category.map((cate, index) => {
            return (
              <button
                key={index}
                value={index}
                type="button"
                className={
                  // eslint-disable-next-line
                  index == btnActive
                    ? `${styles.categoryBtn} ${styles.active}`
                    : `${styles.categoryBtn} `
                }
                onClick={toggleActiveHandler}
              >
                {cate}
              </button>
            );
          })}
        </div>

        <label>일정 이름을 입력해주세요.</label>
        <input
          name="title"
          {...register("title", {
            required: {
              value: true,
              message: "일정을 입력해주세요.",
            },
            maxLength: {
              value: 50,
              message: "50자까지 입력",
            },
          })}
        />
        <div className={styles.errorMessage}>
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        <label>장소를 입력해주세요.</label>
        <input
          name="location"
          {...register("location", {
            required: {
              value: true,
              message: "장소를 입력해주세요.",
            },
            maxLength: {
              value: 20,
              message: "20자까지 입력가능합니다.",
            },
          })}
        />

        <div className={styles.errorMessage}>
          {errors.location && <p>{errors.location.message}</p>}
        </div>

        <label>스케줄 일정을 입력해주세요.</label>
        <div className={styles.scheduleDiv}>
          <input
            className={styles.dateInput}
            name="startDate"
            type="datetime-local"
            data-placeholder="날짜 선택"
            {...register("startDate", {
              required: {
                value: true,
                message: "시작일을 입력하세요",
              },
            })}
          />
          <div className={styles.errorMessage}>
            {errors.startDate && <p>{errors.startDate.message}</p>}
          </div>

          {/* <div>
            <input
              className={styles.dateInput}
              name="endDate"
              type="datetime-local"
              {...register("endDate", {
                required: {
                  value: true,
                  message: "종료일을 입력하세요",
                },
                validate: {
                  check: (val) => {
                    if (getValues("startDate") > val) {
                      return "종료일은 시작일 이후로 설정하세요.";
                    }
                  },
                },
              })}
            />
            <div className={styles.errorMessage}>
              {errors.endDate && <p>{errors.endDate.message}</p>}
            </div>
          </div> */}
        </div>

        <label>내용을 입력해주세요.</label>
        <input
          name="content"
          {...register("content", {
            required: {
              value: true,
              message: "내용을 입력하세요.",
            },
            maxLength: {
              value: 15,
              message: "내용은 15자까지 가능합니다.",
            },
            minLength: {
              value: 2,
              message: "내용은 최소 2자 이상 입력하시오.",
            },
          })}
        />
        <div className={styles.errorMessage}>
          {errors.content && <p>{errors.content.message}</p>}
        </div>

        <div className={styles.buttonDiv}>
          <button onClick={goBackHandler} type="button">
            이전
          </button>
          <button>제보하기</button>
        </div>
      </form>
    </>
  );
};

export default ReportSchedule;
