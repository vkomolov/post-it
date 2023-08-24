export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  SUBMIT_LOGOUT: "SUBMIT_LOGOUT",
  LOGIN_RESET: "LOGIN_RESET",
  GET_USER_PROFILE: "GET_USER_PROFILE",
  USER_PROFILE_RESET: "USER_PROFILE_RESET"
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
  "image", "firstName", "lastName", "maidenName", "gender", "email", "phone", "birthDate", "height",
  "weight", "eyeColor", "hair", "ip", "address", "bank", "company"
];

export const PROFILE_PARAMS = {
  firstName: {
    label: "First Name",
    type: "text",
    title: "to edit first name",
    editable: true,
  },
  lastName: {
    label: "Second Name",
    type: "text",
    title: "to edit second name",
    editable: true,
  },
  maidenName: {
    label: "Maiden Name",
    type: "text",
    title: "to edit maiden name",
    editable: true,
  },
  email: {
    label: "Email",
    type: "email",
    title: "to edit email",
    editable: true,
  },
  ip: {
    label: "Your IP",
    type: "text",
    title: "Your IP",
    editable: false,
  },
  height: {
    label: "Height",
    type: "number",
    title: "to edit height",
    editable: true,
  },
  weight: {
    label: "Weight",
    type: "number",
    title: "to edit weight",
    editable: true,
  },
  eyeColor: {
    label: "Eye Color",
    type: "text",
    title: "to edit eye color",
    editable: true,
  },
  hair: {
    color: {
      label: "Hair Color",
      type: "text",
      title: "to edit hair color",
      editable: true,
    },
    type: {
      label: "Hair Type",
      type: "text",
      title: "to edit hair type",
      editable: true,
    }
  },
  gender: {
    male: {
      label: "Male",
      type: "radio",
      title: "to choose male gender",
      editable: true,
    },
    female: {
      label: "Female",
      type: "radio",
      title: "to choose female gender",
      editable: true,
    }
  },
  age: {
    label: "Age",
    type: "number",
    title: "Your age",
    editable: false,
  },
  birthDate: {
    label: "BirthDay",
    type: "date",
    title: "to edit birth date",
    editable: true,
  },
  address: {
    address: {
      label: "Address",
      type: "text",
      title: "to edit address",
      editable: true,
    },
    city: {
      label: "City",
      type: "text",
      title: "to edit city",
      editable: true,
    },
    postalCode: {
      label: "Postal Code",
      type: "text",
      title: "to edit postal code",
      editable: true,
    }
  },
  company: {
    name: {
      label: "Company Name",
      type: "text",
      title: "to edit company name",
      editable: true,
    },
    title: {
      label: "Company Title",
      type: "text",
      title: "to edit company title",
      editable: true,
    },
    department: {
      label: "Department",
      type: "text",
      title: "to edit department",
      editable: true,
    },
    address: {
      address: {
        label: "Company Address",
        type: "text",
        title: "to edit company address",
        editable: true,
      },
      city: {
        label: "Company City",
        type: "text",
        title: "to edit company city",
        editable: true,
      },
      postalCode: {
        label: "Postal Code",
        type: "text",
        title: "to edit company postal code",
        editable: true,
      },
    },
  },
  bank: {
    cardNumber: {
      label: "Card Number",
      type: "text",
      title: "to edit card number",
      editable: true,
    },
    cardExpire: {
      label: "Expire Date",
      type: "date",
      title: "to edit card expire date",
      editable: true,
    },
    cardType: {
      label: "Card Type",
      type: "text",
      title: "to edit card type",
      editable: true,
    },
    currency: {
      label: "Card Currency",
      type: "text",
      title: "to edit card currency",
      editable: true,
    },
    iban: {
      label: "Company IBAN",
      type: "text",
      title: "to edit card iban",
      editable: true,
    }
  }
};

/*export const PROFILE_PARAMS_ver = {
  personal: {
    firstName: {
      label: "First Name",
      type: "text",
      title: "to edit first name",
      editable: true,
    },
    lastName: {
      label: "Second Name",
      type: "text",
      title: "to edit second name",
      editable: true,
    },
    maidenName: {
      label: "Maiden Name",
      type: "text",
      title: "to edit maiden name",
      editable: true,
    },
    email: {
      label: "Email",
      type: "email",
      title: "to edit email",
      editable: true,
    },
    ip: {
      label: "Your IP",
      type: "text",
      title: "Your IP",
      editable: false,
    },
  },
  appearance: {
    gender: {
      male: {
        label: "Male",
        type: "radio",
        title: "to choose male gender",
        editable: true,
      },
      female: {
        label: "Female",
        type: "radio",
        title: "to choose female gender",
        editable: true,
      }
    },
    age: {
      label: "Age",
      type: "number",
      title: "Your age",
      editable: false,
    },
    birthDate: {
      label: "BirthDay",
      type: "date",
      title: "to edit birth date",
      editable: true,
    },
    height: {
      label: "Height",
      type: "number",
      title: "to edit height",
      editable: true,
    },
    weight: {
      label: "Weight",
      type: "number",
      title: "to edit weight",
      editable: true,
    },
    eyeColor: {
      label: "Eye Color",
      type: "text",
      title: "to edit eye color",
      editable: true,
    },
    hair: {
      color: {
        label: "Hair Color",
        type: "text",
        title: "to edit hair color",
        editable: true,
      },
      type: {
        label: "Hair Type",
        type: "text",
        title: "to edit hair type",
        editable: true,
      }
    },
  },
  address: {
    address: {
      label: "Address",
      type: "text",
      title: "to edit address",
      editable: true,
    },
    city: {
      label: "City",
      type: "text",
      title: "to edit city",
      editable: true,
    },
    postalCode: {
      label: "Postal Code",
      type: "text",
      title: "to edit postal code",
      editable: true,
    }
  },
  company: {
    name: {
      label: "Company Name",
      type: "text",
      title: "to edit company name",
      editable: true,
    },
    title: {
      label: "Company Title",
      type: "text",
      title: "to edit company title",
      editable: true,
    },
    department: {
      label: "Department",
      type: "text",
      title: "to edit department",
      editable: true,
    },
    address: {
      address: {
        label: "Company Address",
        type: "text",
        title: "to edit company address",
        editable: true,
      },
      city: {
        label: "Company City",
        type: "text",
        title: "to edit company city",
        editable: true,
      },
      postalCode: {
        label: "Postal Code",
        type: "text",
        title: "to edit company postal code",
        editable: true,
      },
    },
  },
  bank: {
    cardNumber: {
      label: "Card Number",
      type: "text",
      title: "to edit card number",
      editable: true,
    },
    cardExpire: {
      label: "Expire Date",
      type: "date",
      title: "to edit card expire date",
      editable: true,
    },
    cardType: {
      label: "Card Type",
      type: "text",
      title: "to edit card type",
      editable: true,
    },
    currency: {
      label: "Card Currency",
      type: "text",
      title: "to edit card currency",
      editable: true,
    },
    iban: {
      label: "Company IBAN",
      type: "text",
      title: "to edit card iban",
      editable: true,
    }
  }
};*/

const SAMPLE = {
  "id": 1,
  "firstName": "Terry",
  "lastName": "Medhurst",
  "maidenName": "Smitham",
  "age": 50,
  "gender": "male",
  "email": "atuny0@sohu.com",
  "phone": "+63 791 675 8914",
  "birthDate": "2000-12-25",
  "image": "https://robohash.org/hicveldicta.png?size=50x50&set=set1",
  "height": 189,
  "weight": 75.4,
  "eyeColor": "Green",
  "hair": {
    "color": "Black",
    "type": "Strands"
  },
  "ip": "117.29.86.254",
  "address": {
    "address": "1745 T Street Southeast",
    "city": "Washington",
    "postalCode": "20020",
    "state": "DC"
  },
  "bank": {
    "cardExpire": "06/22",
    "cardNumber": "50380955204220685",
    "cardType": "maestro",
    "currency": "Peso",
    "iban": "NO17 0695 2754 967"
  },
  "company": {
    "address": {
      "address": "629 Debbie Drive",
      "city": "Nashville",
      "postalCode": "37076",
      "state": "TN"
    },
    "department": "Marketing",
    "name": "Blanda-O'Keefe",
    "title": "Help Desk Operator"
  }
};