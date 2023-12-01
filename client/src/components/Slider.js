import React, { useState } from 'react';

const SliderComponent = () => {
  const [sliderValue, setSliderValue] = useState(10);

  const handleSliderChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setSliderValue(newValue);
  };

  return (
    <div>
      <input
        type="range"
        id="rating"
        name="rating"
        min="1"
        max="10.0"
        step="0.10"
        value={sliderValue}
        onChange={handleSliderChange}
        style={{width:'100%'}}
      />
      <output htmlFor="numberSlider" id="sliderValue">
        {sliderValue}
      </output>
    </div>
  );
};

export default SliderComponent;