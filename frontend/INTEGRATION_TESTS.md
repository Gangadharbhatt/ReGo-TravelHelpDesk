# ReGo Frontend Integration - Manual Test Checklist

## ⚙️ Setup & Environment

### Prerequisites
- [ ] Node.js v16+ installed
- [ ] Browser: Chrome/Edge (recommended for dev tools)
- [ ] Terminal access

### Environment Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Set `REACT_APP_ENABLE_MOCK_API=true`
- [ ] Set `REACT_APP_API_BASE_URL=https://localhost:7133/api`
- [ ] Run `npm install` or `npm ci`

### Application Startup
- [ ] Run `npm start`
- [ ] Application starts without errors
- [ ] Check console for startup message:  
  **Expected**: `🟦 MOCK API MODE ACTIVE` with blue background
- [ ] Application loads at `http://localhost:3000`

---

## 🔐 Phase 1: Authentication Flow

### Login Page
- [ ] Navigate to login page
- [ ] Page renders without errors  
- [ ] Email field present and functional
- [ ] Password field present and functional
- [ ] "Remember me" checkbox (if present)
- [ ] Sign in button visible

### Login Button Behavior
- [ ] Click sign in with valid credentials
- [ ] **CRITICAL**: Button does **NOT** shift/resize when loading spinner appears
- [ ] Button maintains fixed width during loading state
- [ ] Spinner is centered within button
- [ ] Button is disabled during loading

### Successful Login
Test accounts (mock mode):
```
employee@rego.com / password
manager@rego.com / password
traveldesk@rego.com / password
avp@rego.com / password
svp@rego.com / password
```

- [ ] Login with `employee@rego.com / password`
- [ ] Redirects to Employee Dashboard
- [ ] User info displayed in navbar (name/avatar)
- [ ] No console errors

### Failed Login
- [ ] Enter invalid credentials
- [ ] Error message displayed  
- [ ] No redirect occurs
- [ ] Button re-enables after error

### Logout
- [ ] Click logout from any dashboard
- [ ] Redirects to login page
- [ ] Session cleared (refresh doesn't auto-login)
- [ ] No console errors

---

## 👤 Phase 2: Employee Dashboard

### Initial Load
- [ ] Login as `employee@rego.com`
- [ ] Dashboard loads successfully
- [ ] Metrics/stats cards visible
- [ ] "Raise Travel Request" button present
- [ ] Recent requests table visible (if any)
- [ ] No Redux `.map()` errors in console

### Raise Travel Request
- [ ] Click "Raise Travel Request" button
- [ ] Modal opens with proper width (~900px on desktop)
- [ ] Modal has header with background color
- [ ] Form fields present (destination, dates, purpose, etc.)
- [ ] Submit button visible
- [ ] Cancel/close button works
- [ ] Modal scrolls if content overflows
- [ ] Scrollbar is thin (6px) and styled
- [ ] Submit creates request (check confirmation)

### Upload Documents
- [ ] Navigate to document upload section
- [ ] Click upload button
- [ ] Modal opens with drag-and-drop zone
- [ ] Can select files via button
- [ ] Can drag and drop files
- [ ] File list shows selected files
- [ ] Can remove files before submit
- [ ] Submit button uploads files
- [ ] Backdrop dims background
- [ ] Modal closes after successful upload

### Status Display
- [ ] Status chips visible for requests
- [ ] Chip size: small
- [ ] Border radius: ~10px rounded
- [ ] Colors match status:
  - Pending: warning (orange/yellow)
  - Approved: success (green)
  - Rejected: error (red)
  - Completed: info (blue)

---

## 👔 Phase 3: Manager/AVP/SVP/CHRO Dashboards

Test with: `manager@rego.com`, `avp@rego.com`, `svp@rego.com`

### Dashboard Load
- [ ] Login as manager role
- [ ] Dashboard loads without errors
- [ ] Metrics cards visible at top
- [ ] Filter buttons visible (All/Pending/Approved/Rejected)
- [ ] "Pending Approvals" or "Recent Application Status" table visible

### Filter Functionality
- [ ] Click "All" - shows all requests
- [ ] Click "Pending" - shows only pending requests
- [ ] Click "Approved" - shows only approved requests
- [ ] Click "Rejected" - shows only rejected requests
- [ ] Active filter button highlighted/different style
- [ ] Table updates immediately on filter click

### Sticky Filters
- [ ] Scroll down the page
- [ ] **CRITICAL**: Filter container sticks to top
- [ ] Filters remain accessible while scrolling
- [ ] Subtle shadow appears when stuck
- [ ] Table scrolls underneath filters

### Table Appearance
- [ ] Table headers have background color (#F5F7FA or similar)
- [ ] Header text is bold/medium weight (500)
- [ ] Header bottom border (2px) visible
- [ ] Table rows alternate colors (white / light gray)
- [ ] Row hover effect: background darkens slightly
- [ ] No duplicate key warnings in console

### Table Scrolling
- [ ] If table has many rows:
  - Table container has max height (~600px)
  - Vertical scrollbar present
  - Scroll bar is thin (6px)
  - Scrollbar track is transparent
  - Scrollbar thumb is gray, rounded
  - Hover scrollbar thumb: darker gray

### Action Buttons
- [ ] "View Details" button visible per row
- [ ] "Approve" button visible (if pending)
- [ ] "Reject" button visible (if pending)
- [ ] Buttons have minimum width (~140-180px)
- [ ] Buttons don't wrap text awkwardly
- [ ] Hover effect present (lift/shadow)

### Approve/Reject Flow
- [ ] Click "Approve" on pending request
- [ ] Confirmation dialog or comment box appears
- [ ] Enter comment (if required)
- [ ] Submit approval
- [ ] Table updates (request status changes)
- [ ] Toast notification appears
- [ ] Click "Reject":
  - Comment box mandatory
  - Enter rejection reason
  - Submit
  - Status updates to rejected

---

## ✈️ Phase 4: Travel Desk Portal

### Dashboard Load
- [ ] Login as `traveldesk@rego.com`
- [ ] Dashboard loads with card-based layout
- [ ] Pending bookings displayed as cards (not table)
- [ ] Each card shows request details

### Card Layout
- [ ] Cards are properly sized and spaced
- [ ] Card grid is responsive
- [ ] Each card has:
  - Employee name
  - Destination
  - Dates
  - Status chip
  - Action buttons

### Booking Actions
- [ ] "Process Request" button visible on cards
- [ ] Click "Process Request"
- [ ] Modal/dialog opens for booking details
- [ ] Enter booking information (flight, hotel, etc.)
- [ ] Submit booking
- [ ] **CRITICAL**: Card status updated immediately  
- [ ] "Complete & Notify Manager" button appears

### Complete & Notify
- [ ] Click "Complete & Notify Manager"
- [ ] Confirmation dialog
- [ ] Confirm action
- [ ] Status updates to "Booking Completed"
- [ ] Notification sent (check mock notifications)
- [ ] Card moves to completed section (if separate)

---

## 🔔 Phase 5: Notifications

### Notification Icon
- [ ] Bell icon visible in navbar (all pages)
- [ ] Badge shows unread count
- [ ] Icon aligned with profile avatar
- [ ] Hover effect present

### Notification Panel
- [ ] Click bell icon
- [ ] Dropdown/panel opens
- [ ] Mock notifications displayed
- [ ] Each notification shows:
  - Message text
  - Timestamp
  - Read/unread indicator
- [ ] Click notification marks as read
- [ ] Badge count decreases
- [ ] Panel closes on outside click

---

## 🖥️ Phase 6: Global UI/UX

### Responsiveness
- [ ] Resize browser to mobile width (375px)
- [ ] Layout adapts (cards stack, table scrolls)
- [ ] No horizontal overflow
- [ ] Buttons remain functional
- [ ] Modal centers and fits screen

- [ ] Resize to tablet (768px)
- [ ] Grid layouts adjust appropriately
- [ ] Filters accessible

- [ ] Resize to large desktop (1920px)
- [ ] Content doesn't stretch awkwardly
- [ ] Max widths applied where appropriate

### Navigation
- [ ] Navbar present on all pages
- [ ] Logo/title clickable (returns to dashboard)
- [ ] User menu accessible
- [ ] Navigation links work
- [ ] Active page highlighted (if applicable)

### Animations
- [ ] Page transitions smooth
- [ ] Modal open/close animated
- [ ] Button hover effects smooth (no lag)
- [ ] No jank or frame drops
- [ ] Animations respect reduced-motion preference (if set in browser)

---

## 🐛 Phase 7: Console & Error Checking

### Console Output
- [ ] Open browser dev tools (F12)
- [ ] Check Console tab
- [ ] **Startup Message**: Mock API mode indicator present
- [ ] **Redux**: No "non-serializable value" warnings
- [ ] **React**: No "unique key prop" warnings
- [ ] **Errors**: No ".map is not a function" errors
- [ ] **Network**: Mock API endpoints called (check Network tab)

### Redux DevTools (if installed)
- [ ] Install Redux DevTools extension
- [ ] Refresh page
- [ ] Check state tree:
  - `auth.user` populated after login
  - `dashboard.stats` is an array
  - `dashboard.pendingApprovals` is an array
  - `dashboard.notifications` is an array
  - No non-serializable values (JSX, functions)

### Network Tab
- [ ] Filter by XHR/Fetch
- [ ] **Mock Mode**: No actual HTTP requests to backend
- [ ] Mock responses logged in console
- [ ] Response formats match backend swagger

---

## 🔄 Phase 8: State Management

### Data Persistence
- [ ] Login and perform actions (raise request, approve, etc.)
- [ ] Refresh page (F5)
- [ ] **Session**: Remains logged in
- [ ] **Dashboard**: Data reloads correctly
- [ ] No errors on refresh

### Local State Updates
- [ ] Approve a request from manager dashboard
- [ ] **CRITICAL**: Table updates immediately (no page refresh needed)
- [ ] Redux state updated
- [ ] UI reflects new status
- [ ] Notification appears

### Clear Session
- [ ] Logout
- [ ] Open dev tools > Application > Local Storage
- [ ] Verify:
  - `user` key removed
  - `accessToken` removed
  - `refreshToken` removed

---

## ✅ Phase 9: Mock API Parity

### Response Formats
Check in console logs that mock responses match:
```javascript
{
  success: boolean,
  data: { ... },
  message: string,
  error: { message: string } // on failure
}
```

- [ ] Login response format correct
- [ ] Dashboard stats response correct
- [ ] Travel requests response correct
- [ ] Document upload response correct
- [ ] Notification response correct

### Data Consistency
- [ ] Mock user IDs match across services
- [ ] Request IDs consistent
- [ ] Status codes match backend enum (PENDING_MANAGER, etc.)
- [ ] Role IDs match (101=EMPLOYEE, 102=MANAGER, etc.)

---

## 🚀 Phase 10: Build & Production Readiness

### Development Build
- [ ] `npm start` runs without errors
- [ ] Hot reload works (make a code change, saves, page updates)

### Linting (if configured)
- [ ] Run `npm run lint` (if available)
- [ ] No blocking errors
- [ ] Warnings documented (if any)

### Environment Switching
- [ ] Set `REACT_APP_ENABLE_MOCK_API=false` in `.env`
- [ ] Restart app
- [ ] Console shows: `🟢 REAL API MODE ACTIVE`
- [ ] App attempts real API calls (will fail if backend offline - expected)

---

## 📝 Test Results Summary

**Tester**: _________________  
**Date**: _________________  
**Environment**: Mock API Mode  
**Browser**: _________________  
**Node Version**: _________ 

**Tests Passed**: ____ / ____  
**Tests Failed**: ____  
**Blockers**: _________________  

### Critical Issues Found
1. 
2. 
3. 

### Minor Issues Found
1. 
2. 
3. 

### Recommendations
1. 
2. 
3. 

---

**END OF CHECKLIST**
