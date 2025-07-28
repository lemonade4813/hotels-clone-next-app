export const getNaverLoginUrl = () => {
    const CLIENT_ID = 'pcrw9F2DCyeh4TULFSLK';
    const REDIRECT_URI = encodeURIComponent('http://localhost:3000/naver/callback');
    const STATE = Math.random().toString(36).substring(2, 15);
  
    return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
  };