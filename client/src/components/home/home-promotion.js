import React from 'react';

import './home.css'

const HomePromotion = (props) => {

    const promotion = {
        img:'/images/featured_home_3.jpg',
        lineOne:'Up to 50% off',
        lineTwo:'Shop now',
        linkTitle:'Shop now',
        linkTo:'/shop'
    }

    const renderPromotion = () => (
        promotion ?
        <div className="home_promotion_img"
            style={{
                background:`url(${promotion.img})`
            }}
        >
                <div className="tag title" style={{ fontFamily: "'MuseoModerno', cursive"}}>{promotion.lineOne}</div>
                <div style={{ fontFamily: "'MuseoModerno', cursive"}} className="tag low_title">{promotion.lineTwo}</div>
                <div>
            
                </div>
        </div>
        :null
    )

    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    );
};

export default HomePromotion;