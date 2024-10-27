import { useState } from "react";
import { Link } from "react-router-dom";


export const TreeSlides = ({ slides }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <button
                className={'mr-4 p-2 bg-white-500 text-blue-600'}
            >
                <Link to="/">Volver al inicio</Link>
            </button>
            <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-16">
                <h2 className="text-4xl font-bold mb-10 text-center">{slides[currentSlide].title}</h2>
                <p className="text-gray-700 mb-12 text-lg leading-relaxed whitespace-pre-line">{slides[currentSlide].content}</p>
                <div className="flex justify-between">
                    <button
                        onClick={handlePrev} disabled={currentSlide === 0}
                        className={`bg-blue-500 text-white px-4 md:px-8 py-2 md:py-4 rounded-md transition text-base md:text-lg ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNext} disabled={currentSlide === slides.length - 1}
                        className={`bg-blue-500 text-white px-8 py-4 rounded-md transition text-xl ${currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    )
}
