'use client';

import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('');
  const [mock, setMock] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    // Listen for the otelReady event
    const handleOtelReady = () => {
      setSdkReady(true);
    };

    window.addEventListener('otelReady', handleOtelReady);

    return () => {
      window.removeEventListener('otelReady', handleOtelReady);
    };
  }, []);

  useEffect(() => {
    async function fetchVideo() {
      // Call identity service
      if (!sdkReady) return; // Wait until SDK is ready
      const identityRes = await fetch(`http://localhost:3001/identity?mock=${mock}`);
      const identityData = await identityRes.json();
      const userId = identityData.nuid || 0;

      // Call API service with userId
      const apiRes = await fetch(`http://localhost:3002/video?userId=${userId}`);
      const apiData = await apiRes.json();
      setVideoUrl(apiData.url);
    }
    fetchVideo();
  }, [mock, sdkReady]);

  return (
    <div>
      <h1>Simple App Client</h1>
      <button onClick={() => setMock(!mock)}>
        Toggle Logged in state (Current: {mock.toString()})
      </button>
      {videoUrl ? (
        <ReactPlayer
          url={videoUrl}
          controls
          config={{
            youtube: {
              playerVars: { origin: 'http://localhost:3000' },
            },
          }}
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}
