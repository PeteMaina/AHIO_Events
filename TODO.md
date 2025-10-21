# TODO: Implement Authentication System

- [x] Create AuthContext (src/contexts/AuthContext.jsx) for auth state, user data, and inactivity timer
- [x] Create Login component (src/pages/auth/Login.jsx) with responsive form
- [x] Create Signup component (src/pages/auth/Signup.jsx) with responsive form
- [x] Create ProtectedRoute component (src/components/ProtectedRoute.jsx) for route protection
- [x] Edit Routes.jsx: Add /login and /signup routes; protect booking, user-dashboard, admin-event-management
- [x] Edit Header.jsx: Integrate AuthContext; show login/signup for unauthenticated users
- [x] Edit App.jsx: Wrap with AuthProvider
- [ ] Test login/signup flow, inactivity logout, and access restrictions
- [ ] Update update.md with changelog entry
