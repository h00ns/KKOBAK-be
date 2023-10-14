const mailerConfig = {
  transport: {
    host: 'smtp.gmail.com', // 이메일 서버 호스트
    port: 587, // 이메일 서버 포트
    secure: false, // 보안 연결 (TLS/SSL) 사용 여부
    auth: {
      user: '01052405583a@gmail.com', // 이메일 계정
      pass: 'eeqlbmkerolbvkoz', // 이메일 비밀번호 또는 액세스 토큰
    },
  },
};

export default mailerConfig;
