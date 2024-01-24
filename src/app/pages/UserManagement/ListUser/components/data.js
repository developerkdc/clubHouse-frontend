import { ASSET_AVATARS } from "../../../../utils/constants/paths";
import { getAssetPath } from "../../../../utils/appHelpers";

const contactsList = [
  {
    user_id: 1,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 2,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: false,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 3,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 4,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 5,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 6,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 7,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 8,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 9,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },
  {
    user_id: 10,
    first_name: "Shyam",
    last_name: "Kumar",
    email_id: "akshay.ingle@kdigitalcurry.com",
    password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
    mobile_no: "1230456789",
    status: true,
    role_id: {
      _id: "6599448e70b02b40e5fe7c69",
      role_name: "Super Admin",
      permissions: {
        user: {
          add: true,
          edit: true,
          view: true,
        },
        roles: {
          add: true,
          edit: true,
          view: true,
        },
        member: {
          add: true,
          edit: true,
          view: true,
        },
        news: {
          add: true,
          edit: true,
          view: true,
        },
        event: {
          add: true,
          edit: true,
          view: true,
        },
        gallery: {
          add: true,
          edit: true,
          view: true,
        },
        banquet: {
          add: true,
          edit: true,
          view: true,
        },
        sport: {
          add: true,
          edit: true,
          view: true,
        },
        salon: {
          add: true,
          edit: true,
          view: true,
        },
        spa: {
          add: true,
          edit: true,
          view: true,
        },
        library: {
          add: true,
          edit: true,
          view: true,
        },
        payment: {
          add: true,
          edit: true,
          view: true,
        },
        invoice: {
          add: true,
          edit: true,
          view: true,
        },
        support: {
          add: true,
          edit: true,
          view: true,
        },
        feedback: {
          add: true,
          edit: true,
          view: true,
        },
        nutritionist: {
          add: true,
          edit: true,
          view: true,
        },
        trainer: {
          add: true,
          edit: true,
          view: true,
        },
      },
      status: true,
      deleted_at: null,
      created_at: {
        $date: "2024-01-06T12:16:14.019Z",
      },
      updated_at: {
        $date: "2024-01-06T12:16:14.020Z",
      },
    },
    deleted_at: null,
    created_at: "2024-01-05T12:56:32.089Z",
    updated_at: "2024-01-06T07:20:19.000Z",
  },

  // {
  //   _id: "6597fc800bf48e7b03caad0a",
  //   user_id: 1,
  //   first_name: "Shyam",
  //   last_name: "Kumar",
  //   email_id: "akshay.ingle@kdigitalcurry.com",
  //   password: "$2b$10$0Fuuf39qDnm1H9x89TFt5u1HexHrT08sW9eB8WdVJ41YP6owhOZIC",
  //   mobile_no: "1230456789",
  //   status: true,
  //   role_id: 1,
  //   deleted_at: null,
  //   created_at: "2024-01-05T12:56:32.089Z",
  //   updated_at: "2024-01-06T07:20:19.000Z",
  // },
  // {
  //   _id: "6599448e70b02b40e5fe7c69",
  //   role_name: "Super Admin",
  //   permissions: {
  //     user: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     roles: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     member: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     news: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     event: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     gallery: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     banquet: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     sport: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     salon: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     spa: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     library: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     payment: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     invoice: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     support: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     feedback: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     nutritionist: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //     trainer: {
  //       add: true,
  //       edit: true,
  //       view: true,
  //     },
  //   },
  //   status: true,
  //   deleted_at: null,
  //   created_at: {
  //     $date: "2024-01-06T12:16:14.019Z",
  //   },
  //   updated_at: {
  //     $date: "2024-01-06T12:16:14.020Z",
  //   },
  // },
];

export default contactsList;
