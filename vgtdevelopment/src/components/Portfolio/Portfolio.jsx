import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Portfolio-Style.css"

import pizzarobot from "./imgs/pizzarobot.png"
import gbBarber from "./imgs/gbBarber.png"
import taskManager from "./imgs/taskManager.png"
import englishQuiz from "./imgs/englishtraining.png"

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
window.addEventListener("scroll", reveal);

function Portfolio() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    return (
        <>
            <h4 className="reveal fade-bottom">PORTFÓLIO</h4>
            <div className="container-portfolio reveal fade-bottom" id="portfolio">
                <>
                    <div className="navigation-wrapper">
                        <div ref={sliderRef} className="keen-slider">
                            <div className="keen-slider__slide number-slide1"><a href="https://gustavoraia.github.io/TaskManager/" target="blank_"><img src={taskManager} alt="slide1" className="slider-img"/></a></div>
                            <div className="keen-slider__slide number-slide2"><a href="https://pro-barbearia.vercel.app/" target="blank_"><img src={gbBarber} alt="slide2" className="slider-img"/></a></div>
                            <div className="keen-slider__slide number-slide3"><a href="https://pizza-robot.vercel.app/" target="blank_"><img src={pizzarobot} alt="slide3" className="slider-img"/></a></div>
                            <div className="keen-slider__slide number-slide4"><a href="https://gvfirmeza.github.io/EnglishVocabularyQuiz/" target="blank_"><img src={englishQuiz} alt="slide4" className="slider-img"/></a></div>
                            <div className="keen-slider__slide number-slide5">5</div>
                            <div className="keen-slider__slide number-slide6"><iframe className="slider-img" src="https://www.youtube.com/embed/v1mxMSHRRKw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
                        </div>
                        {loaded && instanceRef.current && (
                            <>
                                <Arrow
                                    left
                                    onClick={(e) =>
                                        e.stopPropagation() || instanceRef.current?.prev()
                                    }
                                    disabled={currentSlide === 0}
                                />

                                <Arrow
                                    onClick={(e) =>
                                        e.stopPropagation() || instanceRef.current?.next()
                                    }
                                    disabled={
                                        currentSlide ===
                                        instanceRef.current.track.details.slides.length - 1
                                    }
                                />
                            </>
                        )}
                    </div>
                    {loaded && instanceRef.current && (
                        <div className="dots">
                            {[
                                ...Array(instanceRef.current.track.details.slides.length).keys(),
                            ].map((idx) => {
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                    ></button>
                                )
                            })}
                        </div>
                    )}
                </>
            </div>

        </>
    )
}

function Arrow(props) {
    const disabeld = props.disabled ? " arrow--disabled" : ""
    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"
                } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
        </svg>
    )
}

export default Portfolio;