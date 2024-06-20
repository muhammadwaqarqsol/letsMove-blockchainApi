import { verifyJWT } from './jwt';

export function generateOTP(otp_length = 0) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export function formatTrpcError(trpcError = 'Something went wrong!' as string) {
  if (trpcError?.includes('[\n  {\n  ')) {
    const formattedError = JSON.parse(trpcError);
    const msgError =
      formattedError?.length > 0
        ? formattedError[0].message
        : 'Internal server error';
    return msgError;
  } else {
    return trpcError;
  }
}
export function renderImage(data: any) {
  console.log({ data });
  return data?.media_type === 'audio/mp3' ||
    data?.thumb === '' ||
    data?.profile_pic === '' ||
    !data?.profile_pic
    ? 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png'
    : `${data?.profile_pic}`;
}

export function isValidImageType(type: any) {
  const isImage = type?.includes('image/') && type !== 'image/gif';
  return isImage;
}

export async function compressImage(fileImage: File, fileType = 'image/webp') {
  const bitmap = await createImageBitmap(fileImage);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  ctx?.drawImage(bitmap, 0, 0);
  // Convert canvas content to a new Blob with reduced quality
  const reducedBlob: Blob = await new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob as Blob), fileType, 0.5);
  });

  // Create a new File object from the reduced Blob
  const reducedFile = new File([reducedBlob], fileImage.name, {
    type: fileType, // Adjust the type if needed
    lastModified: fileImage.lastModified,
  });

  return reducedFile;
}

export function customTruncateHandler(str = '', n = 15) {
  return str?.length > n ? str?.slice(0, n) + '...' : str;
}

export function customEmailTruncateHandler(str = '', n = 15) {
  const myArray: any = str.split('@');
  return myArray[0]?.length > n
    ? myArray[0]?.slice(0, n) + '***@' + myArray[1]
    : str;
}

export const displayDate = (payload = '' as any) => {
  if (!payload) return 'N/A';
  const date = new Date(payload);
  return date?.toDateString();
  // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' })?.format(date);
  // const mo = new Intl.DateTimeFormat('en', { month: 'short' })?.format(date);
  // const da = new Intl.DateTimeFormat('en', { day: '2-digit' })?.format(date);
  // const formattedDate = `${da}-${mo}-${ye}`;
  // return formattedDate;
};
export function isValidEmail(email: any) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}

export async function createSlug(input: any) {
  const lowercaseInput = input?.toLowerCase();
  const cleanedInput = lowercaseInput.replace(/[^\w\s-]/g, '');
  const slug = cleanedInput.replace(/\s+/g, '-');
  return slug.replace(/^-+|-+$/g, '');
}

export function URIGenerator(title = '' as string, id = 0 as number) {
  const url = `${title?.replace(new RegExp(' ', 'g'), '-')}-${id}`;

  return encodeURI(url);
}

export function URIDecoder(url = '' as any) {
  const decodedURI = decodeURI(url ?? '') ?? '';
  const splittedUrl = decodedURI?.split('-');

  const id = splittedUrl[splittedUrl.length - 1] ?? '';
  const title = decodedURI?.substring(0, decodedURI?.length - (id?.length + 2));
  return { id, title };
}

export const EMAIL_TEMPLATE_IDS = {
  REGISTRATION_OTP: 2,
  CONTACT_MAIN: 4,
  FORGET_PASSWORD: 5,
  SELECT_WINNER: 7,
  ORDER_SUCCESS: 30,
  ORDER_FAILED: 9,
  NEW_REGISTERED_USER: 10,
};

export const priceTranslator = (price: number, lang = 'en') => {
  return price.toLocaleString(`${lang}-EG`);
};

export const EMAILS = {
  contact: 'contact@app.winnar.com',
};
export const validateEmail = (email: string): boolean => {
  const emailParts = email.split('@');
  if (emailParts.length !== 2) {
    // Ensure there's exactly one "@" symbol in the email address
    return false;
  }

  const domain = emailParts[1];
  const domainParts = domain?.split('.');
  if (
    domainParts &&
    ['google'].find((item) => domainParts.includes(item))
    // ['google', 'yahoo', 'outlook'].find((item) => domainParts.includes(item))
  ) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  if (domainParts && domainParts.length < 2) {
    // Ensure there's at least one subdomain and a top-level domain
    return false;
  }

  // Check for duplicates in the domainParts array
  const uniqueDomainParts = new Set(domainParts);
  if (domainParts && uniqueDomainParts.size !== domainParts.length) {
    // If there are duplicates, return false
    return false;
  }

  return true;
};
export const validateRegixEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export function getQueryParameter(name: any) {
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  } else {
    return '';
  }
}
export function stringToBoolean(str: string) {
  // Convert string to lowercase and check if it's 'true'
  return str.toLowerCase() === 'true';
}
