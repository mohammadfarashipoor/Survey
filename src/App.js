import "./styles.css";
import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import { data } from "./data";
import axios from "axios";
import Chart from "./Chart";
let items = [];
export default function App() {
  const [question, setQuestion] = useState(null);
  const [state, setState] = useState(true);
  const [select, setSelect] = useState(null);
  const [errselct, setErrSelct] = useState(false);
  const [recdata, setRecData] = useState();
  async function fetchData() {
    try {
      const result = await axios.get(
        "https://62c54870134fa108c24d269c.mockapi.io/Solutions"
      );
      setRecData(result.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  async function setMydata(data) {
    try {
      await axios
        .post("https://62c54870134fa108c24d269c.mockapi.io/Solutions", data)
        .then(() => {
          fetchData();
        });
    } catch (error) {
      console.log(error);
    }
  }
  const collection = (index, item) => {
    for (var i = 0; i <= items.length - 1; i++) {
      if (items.length !== 0) {
        if (items[i].index === index) {
          items.splice(i, 1);
        }
      }
    }
    items = [...items, { index, item }];
  };
  const checkquiz = () => {
    if (select === null) {
      setState(!state);
      setErrSelct(true);
    } else {
      if (question < data.length) setQuestion(question + 1);
      setSelect(null);
    }
    if (question === data.length - 1) {
      setMydata(items);
    }
  };

  return (
    <>
      <SwitchTransition mode="in-out">
        <CSSTransition
          key={state}
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
          classNames="fade"
        >
          <div className="App flex">
            <div className="box col-6 mx-auto">
              {question === null && (
                <div>
                  <p>
                    سلام خدمت شما دوست عزیز خوش آمدید<span>😍🖐</span>
                  </p>
                  <p>
                    این برنامه تنها دو دقیقه از وقت شما را میگیرد و کمک زیادی به
                    من میکند
                  </p>
                  <div className="my-4">
                    <button
                      onClick={() => {
                        setQuestion(0);
                        setState(!state);
                      }}
                      className="bottom bottombg"
                    >
                      برو بریم
                    </button>
                  </div>
                </div>
              )}
              {question !== null && (
                <div>
                  {question === data.length ? (
                    // data.length
                    <div>
                      <Chart recdata={recdata} data={data} />
                    </div>
                  ) : (
                    <div>
                      <div className="menu effect-02">
                        <h3 className="menu_title">{data[question].tittle}</h3>
                        <ul>
                          {data[question].option.map((item, index) => (
                            <li key={index}>
                              <div
                                className="m-1"
                                key={item.id}
                                onClick={() => {
                                  collection(data[question].id, item);
                                  setSelect(item);
                                  setErrSelct(false);
                                }}
                                id={select === item ? "active" : null}
                              >
                                <button>{item}</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {errselct && <div>یک انتخاب داری خرجش کن!!!!!</div>}
                      <button
                        onClick={() => {
                          checkquiz();
                          setState(!state);
                        }}
                        className="bottom bottombg m-2"
                      >
                        بعدی
                      </button>
                      <button
                        onClick={() => {
                          question === 0
                            ? setQuestion(null)
                            : setQuestion(question - 1);
                          setState(!state);
                        }}
                        className="bottom bottombg1 m-2"
                      >
                        بازگشت
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}
