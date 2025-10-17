# [v1.2.0] Add user authentication system

## Objective

Implement a complete user authentication system with JWT tokens, including login, logout, and session management

## Time

8-12h

## Backend Implementation

- Create authentication middleware
  - Validate JWT tokens on protected routes
  - Handle token expiration and refresh
    - Implement refresh token rotation
    - Add token blacklisting for logout
  - Add rate limiting for auth endpoints
- Create user authentication endpoints
  - POST /auth/login endpoint
  - POST /auth/logout endpoint
  - POST /auth/refresh endpoint
- Add password hashing with bcrypt
  - Use salt rounds of 10
  - Add password strength validation

## Frontend Implementation

- Create login form component
  - Add email and password fields
  - Implement form validation
  - Add loading states
- Implement authentication context
  - Store user session in React context
  - Add automatic token refresh logic
- Create protected route wrapper

## Database Schema

- Design users table
  - Add email, password_hash, created_at fields
  - Add indexes for performance
- Design refresh_tokens table

## Testing

- Write unit tests for auth middleware
- Write integration tests for auth endpoints
- Add E2E tests for login flow

# [v1.2.1] Fix login form validation

## Objective

Fix bug where login form allows submission with invalid email format

## Time

2-4h

## Frontend

- Update email validation regex
- Add real-time validation feedback
- Improve error messages
