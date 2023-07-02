import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Portfolio-Style.css"

function Portfolio() {
    const [sliderRef] = useKeenSlider({
        loop: true,
    })

    return (
        <>
            <h4>PORTFÓLIO</h4>
            <div className="container-portfolio" id="portfolio">
                <div ref={sliderRef} className="keen-slider custom-slider">
                    <div className="keen-slider__slide number-slide1">1</div>
                    <div className="keen-slider__slide number-slide2">2</div>
                    <div className="keen-slider__slide number-slide3">3</div>
                    <div className="keen-slider__slide number-slide4">4</div>
                    <div className="keen-slider__slide number-slide5">5</div>
                    <div className="keen-slider__slide number-slide6">6</div>
                </div>
            </div>
            <hr className="quebra" />
        </>
    )
}

export default Portfolio;