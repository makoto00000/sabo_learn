export function loadOpenCv() {
  const script = document.createElement("script");

  script.src = "https://docs.opencv.org/3.4.0/opencv.js"; // ビルド済みのopenCV.jsを読み込む
  script.async = true;
  document.body.appendChild(script);
}

export class MotionDetection {
  constructor(
    {
      video = document.createElement("video"),
      onMove = function () {},
      onStop = function () {},
      fps = 8,
    } = {
      video: document.createElement("video"),
      onMove: function () {},
      onStop: function () {},
      fps: 8,
    }
  ) {
    const elm = document.createElement("div");
    const imgLength = 3;
    const videoMatList = [];
    const monochromeMatList = [];
    const diffMatList = [];
    const canvasList = [];
    const canvasLength = 8;
    let cv = window.cv;

    for (let i = 0; i < canvasLength; ++i) {
      canvasList.push(document.createElement("canvas"));
    }

    const contextList = canvasList.map((canvas) => canvas.getContext("2d"));
    const diffCanvas = canvasList[canvasLength - 1];
    const diffCtx = diffCanvas.getContext("2d");
    // パフォーマンスを上げるためにcanvasを小さくしておく
    const width = video.clientWidth / 16;
    const height = video.clientHeight / 16;

    for (let i = 0; i < imgLength; ++i) {
      videoMatList.push(new cv.Mat(height, width, cv.CV_8UC4));
      monochromeMatList.push(new cv.Mat(height, width, cv.CV_8UC1));
    }

    canvasList.forEach((canvas, i) => {
      canvas.id = `c${performance.now() + i}`; // imshowに渡すために適当なID属性を振る
      canvas.width = width;
      canvas.height = height;

      elm.appendChild(canvas);
    });

    // bodyにcanvasを設置しないとimshowが動かないので見えない位置を設定
    elm.style.cssText = `
      display: none;
      position: fixed;
      top: -9999px;
    `;

    document.body.appendChild(elm);

    processVideo();

    function processVideo() {
      const begin = Date.now();

      contextList[0].drawImage(video, 0, 0, width, height);

      videoMatList[1].copyTo(videoMatList[2]);
      videoMatList[0].copyTo(videoMatList[1]);
      videoMatList[0].data.set(
        contextList[0].getImageData(0, 0, width, height).data
      );

      for (let i = 0; i < videoMatList.length; ++i) {
        cv.cvtColor(videoMatList[i], monochromeMatList[i], cv.COLOR_RGB2GRAY);
        cv.imshow(`${canvasList[i].id}`, videoMatList[i]);
        cv.imshow(`${canvasList[i + 3].id}`, monochromeMatList[i]);
      }

      for (let i = 0; i < videoMatList.length - 1; ++i) {
        diffMatList.push(new cv.Mat(height, width, cv.CV_8UC1));

        cv.absdiff(
          monochromeMatList[i],
          monochromeMatList[i + 1],
          diffMatList[i]
        );
        cv.imshow(`${canvasList[i + 6].id}`, diffMatList[i]);
      }

      const { data } = diffCtx.getImageData(
        0,
        0,
        diffCanvas.width,
        diffCanvas.height
      );
      const length = data.length;
      let sum = 0;

      for (let i = 0; i < length; i += 4) {
        if (256 / 2 < data[i] + data[i + 1] + data[i + 2]) {
          // 黒くない部分を計測
          sum += 1;
        }
      }

      const rate = 0.01; // 10%以上差分があるかを検出（のちに引数で指定できるようにしても良さそう）

      if (diffCanvas.width * diffCanvas.height * rate < sum) {
        onMove();
      } else {
        onStop();
      }

      const delay = 1000 / fps - (Date.now() - begin);

      setTimeout(processVideo, delay);
    }
  }
}
