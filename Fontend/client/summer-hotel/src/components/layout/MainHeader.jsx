import React from 'react'

const MainHeader = () => {
    return (
        <header className='header-banner'>
            <div className='overlay'></div>
            <div className='animated-texts overlay-content'>
                <h1>
                    Chào mừng bạn đến <span className='hotel-color'> Summer Hotel</span>
                </h1>
                <h4>
                    Trải nghiệm sự hiếu khách tốt nhất trong thị trấn
                </h4>
            </div>
        </header>
    )
}

export default MainHeader