import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { axiosIdol, axiosSchedules, BASE_URL } from "../../api";
import styles from "./Home.module.scss";

const Home = () => {
  const { isLoding: idolLoding, data: idolData } = useQuery("idol", axiosIdol);
  console.log(idolData);

  const slideImage = idolData?.slice(0, 4);

  const { isLoding: schedulesLoding, data: schedulesData } = useQuery(
    "schedules",
    axiosSchedules
  );

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <div className={styles.home_mainBanner}></div>
        <div className={styles.slider}>
          <div className={styles.slideBox}>
            {schedulesData?.map((data) => {
              const dateFormat = `${data.when.slice(5, 7)}월 ${data.when.slice(
                8,
                10
              )}일`;
              return (
                <div className={styles.slide} key={Math.random()}>
                  <div className={styles.slideInner}>
                    <div className={styles.slideContent}>
                      <div className={styles.slideTop}>
                        <span>{dateFormat}</span>
                      </div>
                      <div className={styles.slideMid}>
                        <span>{data.ScheduleTitle}</span>
                      </div>
                      <div className={styles.slideBot}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.artistSection}>
          <article>
            <div className={styles.artistFontWrapper}>
              <div className={styles.mainTitle}>
                <p>60팀의 아티스트를</p>
                <p>최애인에서 만나볼 수 있어요</p>
              </div>
              <div className={styles.subTitle}>
                <p>지금 인기있는 아티스트들을 선택하고</p>
                <p>스케줄을 확인해서 나만의 스케줄을 만들어보세요</p>
              </div>
            </div>
            <ul className={styles.artistImageWrapper}>
              {idolLoding
                ? "Loding.."
                : slideImage?.map((data) => (
                    <li className={styles.artistThumnail} key={data.pk}>
                      <Link to={`/${data.pk}`}>
                        <img
                          className={styles.artistImage}
                          src={data.idol_profile}
                          alt="아티스트 이미지"
                        ></img>
                        <h3 className={styles.artistName}>
                          {data.idol_name_kr}
                        </h3>
                        <p className={styles.artistFont}>{data.idol_name_en}</p>
                      </Link>
                    </li>
                  ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
};
export default Home;
