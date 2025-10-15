# TODO: Implement Authentication System

- [x] Create AuthContext (src/contexts/AuthContext.jsx) for auth state, user data, and inactivity timer
- [ ] Create Login component (src/pages/auth/Login.jsx) with responsive form
- [ ] Create Signup component (src/pages/auth/Signup.jsx) with responsive form
- [ ] Create ProtectedRoute component (src/components/ProtectedRoute.jsx) for route protection
- [ ] Edit Routes.jsx: Add /login and /signup routes; protect booking, user-dashboard, admin-event-management
- [ ] Edit Header.jsx: Integrate AuthContext; show login/signup for unauthenticated users
- [ ] Edit App.jsx: Wrap with AuthProvider
- [ ] Test login/signup flow, inactivity logout, and access restrictions
- [ ] Update update.md with changelog entry
