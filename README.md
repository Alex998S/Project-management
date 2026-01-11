#Wep app for managing and tracking project tasks


##Main features
- a workspace can be shared with multiple users
- each user can have multiple workspaces for different projects
- the ticket template can be modified by adding/removing fileds or updating existing fields
- search bar to quickly find specific tickets, searches for keywords in every field of the ticket


##JSON models used

For users:
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

##Screenshots

Main page
<img width="1759" height="739" alt="Screenshot 2026-01-11 151119" src="https://github.com/user-attachments/assets/2349bf9e-b74c-4aad-b6b6-b46dfe659658" />

Ticket customization page
<img width="1458" height="651" alt="Screenshot 2026-01-11 150326" src="https://github.com/user-attachments/assets/6e0205e8-4298-4798-89eb-a8916ff33cce" />

Example of adding a custom dropdown
<img width="1453" height="477" alt="Screenshot 2026-01-11 150613" src="https://github.com/user-attachments/assets/9fc7a608-fe9a-443f-b377-0f11103a32d4" />
<img width="880" height="598" alt="Screenshot 2026-01-11 150931" src="https://github.com/user-attachments/assets/a9d13503-684e-485d-a92b-cbc628878fbe" />


