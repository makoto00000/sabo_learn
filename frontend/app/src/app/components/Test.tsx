import React from 'react';

type MyVideoProps = {
  videoFrameRef: React.RefObject<HTMLDivElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  statusRef: React.RefObject<HTMLParagraphElement>;
  isStudyingRef: React.RefObject<boolean>;
};

// eslint-disable-next-line react/display-name
const MultiVideo = React.memo(({ videoFrameRef, videoRef, canvasRef, statusRef, isStudyingRef }: MyVideoProps) => {
  // コンポーネントのロジックや表示
  return (
    <div>
      {/* コンポーネントの内容 */}
    </div>
  );
}, (prevProps, nextProps) => {
  // isStudyingRefのみを比較
  return prevProps.isStudyingRef.current === nextProps.isStudyingRef.current;
});

export default MultiVideo;
