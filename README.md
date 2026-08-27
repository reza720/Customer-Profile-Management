# Project Name: Customer Profile Management

## Description
The project helps manage customer profiles and makes customer data easily and securely accessible in spreadsheets for analysis. It also allows administrators to securely manage user accounts.

The system consists of two types of users: **admins** and **users**.
The **admin** is responsible for managing user accounts, including:
- Signing up users
- Deleting user accounts
- Resetting user passwords
- Deactivating user accounts
- Accessing user accounts

The **user** can log in and manage customer profiles, including:
- Registering customers
- Deleting customers
- Updating customer profile data
- Reading customer data using query parameters

**Excel** is integrated with the API using Power Query to securely fetch customer data using an API key.

The project currently does **not include admin authentication**, but the system can be scaled to include admin authentication in the future.

For **user** authentication, the system uses a **JWT-based authentication system**. The admin creates user accounts, and a username and randomly generated password are provided to each user. Users can log in using these credentials.

A **refresh token** is used to maintain the user's session for a longer period and to obtain new access tokens when the current access token expires.