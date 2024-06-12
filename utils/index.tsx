import axios from "axios";
import { transformUri } from "./ipfs"
import { formatUnits } from 'viem';

export const convertToPercentage = (number:number) => {
  return number / 100;
};

export const convertBigNumberToString = (number:any, decimals:number) => {
  return number ? formatUnits(number, decimals) : "0";
};

export const handleIpfsLink = (link:any, useCdn: boolean = true) => {
  return link.startsWith('ipfs') ? transformUri(link, useCdn) : link;
};

export const formatUserAddress = (address: any, firstSliceLength: number = 6) => {
  if (address && address.length > firstSliceLength + 4) {
    return `${address.slice(0, firstSliceLength)}...${address.slice(-4)}`;
  }
  return address;
};

export const formatDate = (timestamp:any) => {
  const date = new Date(timestamp * 1000); // Convert to milliseconds

  const day = date.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate
};

export const formatTime = (seconds:number) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds -= days * 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds -= hours * 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;

    let formattedTime = "";
    if (days > 0) {
        formattedTime += `${days}d `;
    }
    if (hours > 0) {
        formattedTime += `${hours}h `;
    }
    if (minutes > 0) {
        formattedTime += `${minutes}m `;
    }
    formattedTime += `${seconds}s`;

    return formattedTime.trim();
};

// Check if normalized decimal integer string
export const isValidAmount = (str:string) => {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n > 0;
};

export const isValidPrice = (str: string) => {
  // Trim whitespace from the input string
  str = str.trim();
  
  // Check if the string is empty after trimming
  if (!str) {
    return false;
  }
  
  // Regular expression to match valid floating point numbers
  const validFloatRegex = /^(\d+(\.\d*)?|\.\d+)$/;
  
  // Check if the string matches the floating point number pattern
  if (!validFloatRegex.test(str)) {
    return false;
  }
  
  // Convert the string to a number and check if it is not Infinity and is non-negative
  const n = Number(str);
  return !isNaN(n) && n > 0;
};
