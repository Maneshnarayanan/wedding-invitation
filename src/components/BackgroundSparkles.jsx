import React from 'react';

const sparkles = Array.from({ length: 18 }, (_, index) => index);

export default function BackgroundSparkles() {
  return (
    <div className="ambient-sparkle-field" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <span className="ambient-sparkle" key={sparkle} />
      ))}
    </div>
  );
}
