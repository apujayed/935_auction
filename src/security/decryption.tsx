import CryptoJS from 'crypto-js';

function decryptData(secretKey: string, name: string): any {
  const encryptedData = localStorage.getItem(name);

  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    const decryptedDataStr = decryptedBytes.toString(CryptoJS.enc.Utf8);
    const decryptedData: any = JSON.parse(decryptedDataStr);
    return decryptedData;
  } else {
    return null;
  }
}

export default decryptData;