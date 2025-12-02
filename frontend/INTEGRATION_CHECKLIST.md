# Backend-Frontend Integration Checklist

## 🎯 Overview
This checklist will help you run the ReGo Travel Management System with the .NET backend and React frontend integrated together.

---

## ✅ Pre-Run Checklist

### 1. Database Setup
- [ ] **SQL Server is running** (Check SSMS or SQL Server Management Studio)
- [ ] **Database exists**: `hackathon_2025`
- [ ] **Connection string is correct** in `TravelManagementProject/TravelManagement/appsettings.json`
  ```
  Server=172.16.20.14,1406;Database=hackathon_2025;User Id=hronboarding;Password=HR0nb0@rd!ng@ERGO;TrustServerCertificate=True;
  ```
- [ ] **Tables exist**: Run migrations if needed
  - `TMS_RollMaster`
  - `TMS_LoginMaster`
  - `TMS_EmployeeMaster`
  - `TMS_TravelMaster`

### 2. Backend Configuration
- [ ] **Navigate to backend directory**:
  ```bash
  cd frontend/TravelManagementProject/TravelManagement
  ```
- [ ] **.NET SDK is installed** (version 8.0 or higher)
  ```bash
  dotnet --version
  ```
- [ ] **Dependencies are restored**:
  ```bash
  dotnet restore
  ```

### 3. Frontend Configuration
- [ ] **Navigate to frontend directory**:
  ```bash
  cd frontend
  ```
- [ ] **Node.js is installed** (version 16 or higher)
  ```bash
  node --version
  ```
- [ ] **Dependencies are installed**:
  ```bash
  npm install
  ```
- [ ] **Create `.env` file** (copy from `.env.example`):
  ```bash
  cp .env.example .env
  ```
- [ ] **Update `.env` file** with backend URL:
  ```
  REACT_APP_API_URL=https://localhost:7133/api
  REACT_APP_ENABLE_MOCK_API=false
  ```

---

## 🚀 Running the Application

### Step 1: Start the Backend

1. **Open terminal/command prompt**
2. **Navigate to backend**:
   ```bash
   cd frontend/TravelManagementProject/TravelManagement
   ```
3. **Run the backend**:
   ```bash
   dotnet run
   ```
4. **Verify backend is running**:
   - Console should show: `Now listening on: https://localhost:7133`
   - Open browser: `https://localhost:7133/swagger`
   - You should see Swagger UI with API documentation

### Step 2: Start the Frontend

1. **Open a NEW terminal/command prompt** (keep backend running)
2. **Navigate to frontend**:
   ```bash
   cd frontend
   ```
3. **Ensure mock API is disabled** in `.env`:
   ```
   REACT_APP_ENABLE_MOCK_API=false
   ```
4. **Run the frontend**:
   ```bash
   npm start
   ```
5. **Verify frontend is running**:
   - Browser should automatically open `http://localhost:3000`
   - You should see the login page

### Step 3: Test Login

1. **Use test credentials** (from `frontend/TestAccounts` file or database)
2. **Login and verify**:
   - Check browser console for API calls
   - Look for: `🟢 Using REAL API for login`
   - Verify redirect to appropriate dashboard based on role

---

## 🐛 Troubleshooting

### Backend Issues

#### ❌ "Connection string error"
- **Check**: SQL Server is running
- **Check**: Connection string in `appsettings.json` is correct
- **Check**: Network access to database server (IP: 172.16.20.14, Port: 1406)

#### ❌ "Port already in use"
- **Solution**: Change port in `launchSettings.json`
- **Update**: Frontend `.env` file with new backend URL

#### ❌ "Database does not exist"
- **Solution**: Create database or run migrations:
  ```bash
  dotnet ef database update
  ```

#### ❌ "CORS error"
- **Check**: Backend `Program.cs` has CORS configured (should be already set to allow all origins)
- **Verify**: Line 56 in `Program.cs`: `app.UseCors("AllowFrontend");`

### Frontend Issues

#### ❌ "Network Error" or "Failed to fetch"
- **Check**: Backend is running on `https://localhost:7133`
- **Check**: `.env` file has correct `REACT_APP_API_URL`
- **Check**: `REACT_APP_ENABLE_MOCK_API=false`
- **Try**: Access `https://localhost:7133/swagger` directly in browser
- **Note**: You may need to accept the SSL certificate warning

#### ❌ "Login failed" or "Invalid credentials"
- **Check**: User exists in `TMS_LoginMaster` table
- **Check**: Password matches (backend does plain text comparison)
- **Check**: Browser console for actual error message
- **Verify**: Backend logs for request details

#### ❌ "Role not found" or "Dashboard not loading"
- **Check**: User has valid `RefRoleId` in database (1-8)
- **Check**: `TMS_RollMaster` table has role definitions
- **Verify**: Employee data exists in `TMS_EmployeeMaster`

#### ❌ "SSL Certificate Error"
- **Solution**: Accept the self-signed certificate in browser
- **Alternative**: Use HTTP instead: `http://localhost:5255/api`
- **Update**: `.env` file with HTTP URL if using HTTP

---

## 📊 API Endpoint Verification

### Test these endpoints in Swagger or Postman:

1. **Login**:
   ```
   POST https://localhost:7133/api/LoginRequest?username=test@example.com&password=password123
   ```
   Expected: `{ "Status": "Success", "Result": 2 }` (where 2 is RefRoleId)

2. **Get Employee Data**:
   ```
   POST https://localhost:7133/api/Employee/GetEmployeeData?IDorEmail=test@example.com
   ```
   Expected: `{ "Status": "Success", "Result": { "EmpId": "...", "Name": "...", ... } }`

3. **Get Travel Details** (Employee):
   ```
   POST https://localhost:7133/api/Employee/TravelDetailByEmpId?id=EMP001
   ```

4. **Get Team Travel Details** (Manager):
   ```
   POST https://localhost:7133/api/Manager/TravelDetailByRptId?id=MGR001
   ```

---

## 🔍 Debugging Tips

### Backend Debugging
- **Enable detailed logging** in `appsettings.json`:
  ```json
  "Logging": {
    "LogLevel": {
      "Default": "Debug",
      "Microsoft.AspNetCore": "Debug"
    }
  }
  ```
- **Check console output** for request/response details
- **Use Swagger UI** to test endpoints independently

### Frontend Debugging
- **Open Browser DevTools** (F12)
- **Check Console tab** for:
  - `🟢 Using REAL API for login` (confirms real API is being used)
  - API request/response logs
  - Error messages
- **Check Network tab** for:
  - API calls to `https://localhost:7133`
  - Response status codes (200, 400, 500, etc.)
  - Response payloads
- **Check Application tab** > Local Storage for:
  - `user` object
  - `accessToken`

---

## 📝 Known Limitations

1. **No JWT Authentication**: Backend doesn't use JWT tokens. Frontend stores a simple flag.
2. **No Document Upload**: Backend doesn't have document upload endpoints yet.
3. **No Booking Endpoints**: HelpDesk controller is empty in backend.
4. **No Notifications**: Backend doesn't have notification endpoints.
5. **Limited Employee Data**: Backend doesn't have department field.
6. **Plain Text Passwords**: Backend compares passwords in plain text (not secure for production).

---

## ✨ Success Indicators

You'll know everything is working when:

- ✅ Backend shows: `Now listening on: https://localhost:7133`
- ✅ Swagger UI loads at `https://localhost:7133/swagger`
- ✅ Frontend shows: `Compiled successfully!`
- ✅ Login page loads without errors
- ✅ Browser console shows: `🟢 Using REAL API for login`
- ✅ Login succeeds and redirects to dashboard
- ✅ Dashboard loads with data from backend
- ✅ No CORS errors in browser console

---

## 🆘 Emergency Fallback

If backend integration fails completely:

1. **Switch back to mock API**:
   ```
   REACT_APP_ENABLE_MOCK_API=true
   ```
2. **Restart frontend**:
   ```bash
   npm start
   ```
3. **Frontend will work with mock data** while you debug backend issues

---

## 📞 Quick Reference

### Backend URLs
- **HTTPS**: `https://localhost:7133`
- **HTTP**: `http://localhost:5255`
- **Swagger**: `https://localhost:7133/swagger`

### Frontend URLs
- **Development**: `http://localhost:3000`

### Key Files
- **Backend Config**: `frontend/TravelManagementProject/TravelManagement/appsettings.json`
- **Backend Startup**: `frontend/TravelManagementProject/TravelManagement/Program.cs`
- **Frontend Config**: `frontend/.env`
- **API Config**: `frontend/src/config/apiConfig.js`
- **Auth Service**: `frontend/src/services/authService.js`

---

## 🎉 Next Steps After Successful Run

1. **Test all user roles**: EMPLOYEE, MANAGER, AVP, SVP, CHRO, FINANCE, TRAVEL_DESK, ADMIN
2. **Test travel request creation** (Manager dashboard)
3. **Test status updates** (Approval flow)
4. **Verify data persistence** (Check database after operations)
5. **Test error scenarios** (Invalid login, network errors, etc.)

---

**Good luck! 🚀**
