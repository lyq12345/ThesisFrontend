import React, { useState } from 'react';
import { Card } from 'antd';

const MyCard = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Card
      title="My Card"
      onClick={handleClick}
      style={{ backgroundColor: isClicked ? 'red' : 'white' }}
    >
      Card content
    </Card>
  );
};

export default MyCard;
