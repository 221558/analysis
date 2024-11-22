export default class RecordVideo {
  /**
   * 构造函数
   *
   * @param  {Object}   videoObj 视频对象
   */
  constructor(videoObj) {
    // 将传入的视频对象赋值给this.video
    this.video = videoObj;
    // 初始化媒体录制器为null
    this.mediaRecorder = null;
    // 初始化chunks数组为空
    this.chunks = [];
  }

  /**
   * 初始化
   *
   * @return {Object} promise
   */
  init() {
    // 返回Promise对象
    // resolve 正常处理
    // reject 处理异常情况
    return new Promise((resovle, reject) => {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: true,
          // video: {
          //     width: this.videoWidth,
          //     height: this.videoHeight
          // }
        })
        // 返回一个媒体内容的流
        .then((stream) => {
          // 检测是否支持 srcObject，该属性在新的浏览器支持
          if ('srcObject' in this.video) {
            this.video.srcObject = stream;
          } else {
            // 兼容旧的浏览器
            this.video.src = window.URL.createObjectURL(stream);
          }

          // 当视频的元数据已经加载时触发
          this.video.addEventListener('loadmetadata', () => {
            // 播放视频
            this.video.play();
          });
          // 创建媒体录制器
          this.mediaRecorder = new MediaRecorder(stream);
          // 监听数据可用事件
          this.mediaRecorder.addEventListener('dataavailable', (e) => {
            // 将数据推入数组
            this.chunks.push(e.data);
          });
          // 解析
          resovle();
        })
        // 异常抓取，包括用于禁用麦克风、摄像头
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * 视频开始录制
   */
  startRecord() {
    // 如果媒体录制器的状态为'未激活'
    if (this.mediaRecorder.state === 'inactive') {
      // 开始录制
      this.mediaRecorder.start();
    }
  }

  /**
   * 视频结束录制
   */
  stopRecord() {
    // 如果当前媒体录制器的状态是正在录制
    if (this.mediaRecorder.state === 'recording') {
      // 停止录制
      this.mediaRecorder.stop();
    }
  }

  /**
   * 检测当前浏览器对否支持
   *
   * @return {boolean} 当前浏览器是否支持
   */
  isSupport() {
    // 检查浏览器是否支持媒体设备API
    const flag = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    // 如果支持，则返回true
    if (flag) {
      return true;
    }
  }
}
