const app = new Vue({
  el: '#app',
  
  data: {
    recogButton: 'スタート！',
    recog: null,
    result: '',
    speech: null,
    message: '',
  },
  
  mounted() {
    // 音声認識の準備
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || null;
    this.recog = new SpeechRecognition();
    this.recog.lang = 'ja-JP';
    this.recog.interimResults = false;
    this.recog.continuous = false;
    
    // 音声認識が開始されたら
    this.recog.onstart = () => {
      this.result = '';
      this.recogButton = 'ききとりちゅう…';
    };
    
    // 音声を認識できたら
    this.recog.onresult = (event) => {
      // 認識されしだい、this.resultにその文字をいれる
      // Vueなので、文字をいれただけで画面表示も更新される
      this.result = event.results[0][0].transcript;

      //アクション
      if(this.result.indexOf('疲れた') > -1){
        window.location.href = 'https://www.youtube.com/watch?v=2fmucSKJXxQ&t=53s';
      };
    };
    
    // 音声認識が終了したら
    this.recog.onspeechend = () => {
      this.recog.stop();
      this.recogButton = '停止（クリックして再開）';
    };
    
    // 認識できなかったら
    this.recog.onerror = () => {
      this.result = '（認識できませんでした）';
      this.recog.stop();
      this.recogButton = '停止（クリックして再開）';
    };
    
  },
  
  methods: {
    
    // 認識（聞き取り）
    listen() {
      this.recog.start();
    },   
  },
});