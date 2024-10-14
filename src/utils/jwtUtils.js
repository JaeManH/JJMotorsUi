// jwtUtils.js
export const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split('.')[1]; // JWT의 페이로드 부분
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

// JWT를 로컬 스토리지에서 가져오고 디코딩하는 함수
export const getDecodedToken = () => {
  const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 가져오기
  if (!token) return null;
  return decodeToken(token); // 토큰 디코딩 후 반환
};
