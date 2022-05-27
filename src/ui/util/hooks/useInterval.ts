import React, { useEffect } from 'react';

export function useInterval(callback: (()=> void), delay: number) {
  useEffect(() => {
    function tick(){
      callback();
    }

    let id = setInterval(tick, delay);

    return () => clearInterval(id);
    
  }, []);
}