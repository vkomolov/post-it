export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  LOGIN_RESET: "LOGIN_RESET",
  PUT_USER_PROFILE: "PUT_USER_PROFILE",
};

export const storageNames = {
  POSTS: "POSTS",
  USERS: "USERS",
  POSTSVIEWED: "POSTSVIEWED",
  COMMENTS_SET_ID: postId => `comments_${ postId }`,
  LOGGED_USER: "LOGGED_USER",
  LOGGED_USER_DATA: "LOGGED_USER_DATA"
};

export const BASE_URL = "https://dummyjson.com";
export const PATTERN_DATA_USERS = ["image", "firstName", "lastName"];
export const PATTERN_DATA_USER_LOGGED = [
  "id", "image", "firstName", "lastName", "maidenName", "gender", "email", "phone", "birthDate", "height",
  "weight", "eyeColor", "hair", "ip", "address", "bank", "company"
];

export const PROFILE_PARAMS = {
  firstName: {
    name: "firstName",
    label: "First Name",
    type: "text",
    title: "to edit first name",
    editable: true,
  },
  lastName: {
    name: "lastName",
    label: "Second Name",
    type: "text",
    title: "to edit second name",
    editable: true,
  },
  maidenName: {
    name: "maidenName",
    label: "Maiden Name",
    type: "text",
    title: "to edit maiden name",
    editable: true,
  },
  email: {
    name: "email",
    label: "Email",
    type: "email",
    title: "to edit email",
    editable: true,
  },
  ip: {
    name: "ip",
    label: "Your IP",
    type: "text",
    title: "Your IP",
    editable: false,
  },
  height: {
    name: "height",
    label: "Height",
    type: "number",
    title: "to edit height",
    editable: true,
  },
  weight: {
    name: "weight",
    label: "Weight",
    type: "number",
    title: "to edit weight",
    editable: true,
  },
  eyeColor: {
    name: "eyeColor",
    label: "Eye Color",
    type: "text",
    title: "to edit eye color",
    editable: true,
  },
  hair: {
    color: {
      name: "hair_color",
      label: "Hair Color",
      type: "text",
      title: "to edit hair color",
      editable: true,
    },
    type: {
      name: "hair_type",
      label: "Hair Type",
      type: "text",
      title: "to edit hair type",
      editable: true,
    }
  },
  gender: {
    male: {
      name: "gender_male",
      label: "Male",
      type: "radio",
      title: "to choose male gender",
      editable: true,
    },
    female: {
      name: "gender_female",
      label: "Female",
      type: "radio",
      title: "to choose female gender",
      editable: true,
    }
  },
  birthDate: {
    name: "birthDate",
    label: "BirthDay",
    type: "date",
    title: "to edit birth date",
    editable: true,
  },
  address: {
    address: {
      name: "address_address",
      label: "Address",
      type: "text",
      title: "to edit address",
      editable: true,
    },
    city: {
      name: "address_city",
      label: "City",
      type: "text",
      title: "to edit city",
      editable: true,
    },
    postalCode: {
      name: "address_postalCode",
      label: "Postal Code",
      type: "text",
      title: "to edit postal code",
      editable: true,
    }
  },
  company: {
    name: {
      name: "company_name",
      label: "Company Name",
      type: "text",
      title: "to edit company name",
      editable: true,
    },
    title: {
      name: "company_title",
      label: "Company Title",
      type: "text",
      title: "to edit company title",
      editable: true,
    },
    department: {
      name: "company_department",
      label: "Department",
      type: "text",
      title: "to edit department",
      editable: true,
    },
    address: {
      address: {
        name: "company_address_address",
        label: "Company Address",
        type: "text",
        title: "to edit company address",
        editable: true,
      },
      city: {
        name: "company_address_city",
        label: "Company City",
        type: "text",
        title: "to edit company city",
        editable: true,
      },
      postalCode: {
        name: "company_address_postalCode",
        label: "Postal Code",
        type: "text",
        title: "to edit company postal code",
        editable: true,
      },
    },
  },
  bank: {
    cardNumber: {
      name: "bank_cardNumber",
      label: "Card Number",
      type: "text",
      title: "to edit card number",
      editable: true,
    },
    cardExpire: {
      name: "bank_cardExpire",
      label: "Expire Date",
      type: "text",
      title: "to edit card expire date",
      editable: true,
    },
    cardType: {
      name: "bank_cardType",
      label: "Card Type",
      type: "text",
      title: "to edit card type",
      editable: true,
    },
    currency: {
      name: "bank_currency",
      label: "Card Currency",
      type: "text",
      title: "to edit card currency",
      editable: true,
    },
    iban: {
      name: "bank_iban",
      label: "Company IBAN",
      type: "text",
      title: "to edit card iban",
      editable: true,
    }
  }
};

/*
const profileSample = {
  "id": 5,
  "image": "https://robohash.org/adverovelit.png",
  "firstName": "Mavis",
  "lastName": "Schultz",
  "maidenName": "Yundt",
  "gender": "male",
  "email": "kmeus4@upenn.edu",
  "phone": "+372 285 771 1911",
  "birthDate": "1968-11-03",
  "height": 188,
  "weight": 106.3,
  "eyeColor": "Brown",
  "hair": {
    "color": "Brown",
    "type": "Curly"
  },
  "ip": "103.72.86.183",
  "address": {
    "address": "2721 Lindsay Avenue",
    "city": "Louisville",
    "coordinates": {
      "lat": 38.263793,
      "lng": -85.700243
    },
    "postalCode": "40206",
    "state": "KY"
  },
  "bank": {
    "cardExpire": "01/24",
    "cardNumber": "4917245076693618",
    "cardType": "visa-electron",
    "currency": "Euro",
    "iban": "IT41 T114 5127 716J RGYB ZRUX DSJ"
  },
  "company": {
    "address": {
      "address": "8398 West Denton Lane",
      "city": "Glendale",
      "coordinates": {
        "lat": 33.515353,
        "lng": -112.240812
      },
      "postalCode": "85305",
      "state": "AZ"
    },
    "department": "Support",
    "name": "Adams Inc",
    "title": "Web Developer I"
  }
};*/
