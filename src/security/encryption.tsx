import CryptoJS from 'crypto-js';

function encryptData(data: any, secretKey: string, name: string): void {
  const dataStr: string = JSON.stringify(data);
  const encryptedData: string = CryptoJS.AES.encrypt(dataStr, secretKey).toString();
  localStorage.setItem(name, encryptedData);
}

export default encryptData;