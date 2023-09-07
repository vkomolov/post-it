export const actionTypes = {
  SET_POST_ACTIVE: "SET_POST_ACTIVE",
  CREATE_POST: "CREATE_POST",
  DELETE_POST: "DELETE_POST",
  SET_SORTING: "SET_SORTING",
  SUBMIT_LOGIN: "SUBMIT_LOGIN",
  LOGIN_RESET: "LOGIN_RESET",
  PUT_USER_PROFILE: "PUT_USER_PROFILE",
};

export const storageNames = {
  POSTS: "POSTS",
  NEW_POST_IDS: "NEW_POST_IDS",
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