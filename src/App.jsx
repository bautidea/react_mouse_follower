import { useState, useEffect } from 'react';

function App() {
  const [enable, setEnable] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event;
      setPosition({ x: clientX, y: clientY });
    };

    if (enable) {
      window.addEventListener('pointermove', handleMove);
    }

    // Returning cleanup function.
    // It will execute when the component dismount or when dependencies change
    // before executing the effect again.
    return () => {
      window.removeEventListener('pointermove', handleMove);
    };
  }, [enable]);

  return (
    <main>
      {enable && (
        <div
          className="pointer-follower"
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        />
      )}

      <button onClick={() => setEnable(!enable)}>
        {enable ? 'Disable' : 'Enable'} follow cursor
      </button>
    </main>
  );
}

export default App;
