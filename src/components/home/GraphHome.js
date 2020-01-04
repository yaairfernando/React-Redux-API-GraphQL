import React, { useEffect, useState} from 'react';

export default function GraphHome(){
  return(
    <Card 
      leftClick={nextCharacter} 
      rightClick={addFav} {...char}
    />
  )
}