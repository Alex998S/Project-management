# Wep app for managing and tracking project tasks

> [!NOTE]
> The project is not finished yet; more features and polishing still need to be done. Currently, the main focus is on functionality. After most of the features are completed, I will redesign the UI.

## Main features
- a workspace can be shared with multiple users
- each user can have multiple workspaces for different projects
- the ticket template can be modified by adding/removing fileds or updating existing fields
- search bar to quickly find specific tickets, searches for keywords in every field of the ticket


##Screenshots

Main page
<img width="1759" height="739" alt="Screenshot 2026-01-11 151119" src="https://github.com/user-attachments/assets/2349bf9e-b74c-4aad-b6b6-b46dfe659658" />

Ticket customization page
<img width="1458" height="651" alt="Screenshot 2026-01-11 150326" src="https://github.com/user-attachments/assets/6e0205e8-4298-4798-89eb-a8916ff33cce" />


## Objects Utilized in the Project

Users:
```
{
  "_id": {
    "$oid": "6963834906b78f99b3807c96"
  },
  "first_name": "Jane",
  "last_name": "Doe",
  "email": "janedoe@email.com",
  "password": "$2b$10$hhXhm/o0VnFmdj6j4NY3Lech4BG7R3iUGWeMZ7BZs1RH1HDxAqmDq",
  "workSpaces": [
    {
      "name": "Personal project",
      "userLevel": "owner",
      "departaments": [],
      "_id": {
        "$oid": "6963834906b78f99b3807c95"
      }
    },
    {
      "name": "First workspace",
      "userLevel": "basic",
      "departaments": [],
      "_id": {
        "$oid": "696381fd06b78f99b3807c8d"
      }
    }
  ],
  "__v": 0
}
```
Workspaces:
```
{
  "_id": {
    "$oid": "696381fd06b78f99b3807c8d"
  },
  "name": "First workspace",
  "ticketModel": [
    {
      "inputType": "textArea",
      "title": "Add title",
      "canBeRemoved": false,
      "hardcodedTitle": "title"
    },
    {
      "inputType": "textArea",
      "title": "Add description",
      "canBeRemoved": false,
      "hardcodedTitle": "description"
    },
    {
      "inputType": "dropdown",
      "title": "Type",
      "canBeRemoved": false,
      "static": true,
      "hardcodedTitle": "issue_type",
      "dynamic": false,
      "modifiableOptions": true,
      "options": [
        "Maintenance",
        "Request",
        "Bug fix",
        "Onboard",
        "Daily",
        "New script"
      ]
    },
    {
      "inputType": "dropdown",
      "title": "Status",
      "canBeRemoved": false,
      "static": false,
      "hardcodedTitle": "ticket_status",
      "dynamic": true,
      "modifiableOptions": false,
      "options": "ticketStateColumns"
    },
    {
      "inputType": "dropdown",
      "title": "Users",
      "canBeRemoved": false,
      "static": false,
      "hardcodedTitle": "users",
      "dynamic": true,
      "modifiableOptions": false,
      "options": "users"
    },
    {
      "inputType": "dropdown",
      "title": "Custom dropdown",
      "options": [
        "First option",
        "Random option",
        "Last option"
      ],
      "canBeRemoved": true,
      "static": true,
      "hardcodedTitle": "",
      "dynamic": false,
      "modifiableOptions": true
    }
  ],
  "ticketStateColumns": [
    "New",
    "In progress",
    "QA",
    "Done",
    "Suspended"
  ],
  "owner": {
    "$oid": "696381fd06b78f99b3807c8e"
  },
  "departaments": [],
  "users": [
    {
      "_id": {
        "$oid": "696381fd06b78f99b3807c8e"
      },
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@email.com",
      "userLevel": "owner",
      "departaments": []
    },
    {
      "_id": {
        "$oid": "6963834906b78f99b3807c96"
      },
      "first_name": "Jane",
      "last_name": "Doe",
      "email": "janedoe@email.com",
      "userLevel": "basic",
      "departaments": []
    }
  ],
  "__v": 0
}
```




Example of adding a custom dropdown
<img width="1453" height="477" alt="Screenshot 2026-01-11 150613" src="https://github.com/user-attachments/assets/9fc7a608-fe9a-443f-b377-0f11103a32d4" />
<img width="880" height="598" alt="Screenshot 2026-01-11 150931" src="https://github.com/user-attachments/assets/a9d13503-684e-485d-a92b-cbc628878fbe" />


