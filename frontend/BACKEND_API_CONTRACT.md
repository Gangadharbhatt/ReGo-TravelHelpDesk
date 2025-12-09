# Backend API Contract for Frontend Integration

## Overview
This document outlines the expected API contract between the ReGo Frontend and Backend, specifically for shared integration points.

## Authentication
`POST /api/LoginRequest`
- **Payload**: `FormData`
  - `username`: string
  - `password`: string
- **Response**: `{ status: "Success", result: 101 }` (roleId)

## Manager Services

### Get Team
`POST /api/manager/GetEmployeesByRptId`
- **Payload**: `FormData`
  - `RptId`: string (Manager ID)
- **Response**: `{ status: "Success", result: [ { empId, name, email } ] }`

### Get Team Requests
`POST /api/manager/TravelDetailByRptId`
- **Payload**: `FormData`
  - `RptId`: string (Manager ID)
- **Response**: `{ status: "Success", result: [ { tId (or TID), empId, status, ... } ] }`

### Create Request (Manager on behalf of Team)
`POST /api/manager/InsertTravelDetail`
- **Payload**: `JSON Array` `[ { ... } ]`
  - `empId`: string
  - `country`: string
  - `city`: string
  - `remark`: string
  - `rptEmpId`: string
  - `status`: number (1)
- **Header**: `Content-Type: application/json`

### Update Status (Approve/Reject)
`POST /api/UpdateTravelStatus`
- **Payload**: `FormData`
  - `TID`: string/number (Travel ID)
  - `Status`: number (2=Approved, 4=Rejected)

## Employee Services

### Get Profile
`POST /api/employee/GetEmployeeData`
- **Payload**: `FormData`
  - `IDorEmail`: string
- **Response**: `{ status: "Success", result: { empId, name, ... } }`

### Get Travel
`POST /api/employee/TravelDetailByEmpId`
- **Query Param**: `?id={empId}`
- **Response**: `{ status: "Success", result: [ { ... } ] }`

### Upload Document
`POST /api/employee/AddDocument`
- **Payload**: `FormData`
  - `EmpId`: string
  - `DocumentId`: number
  - `Document`: string (Base64)

## Notes
- All `POST` requests (except `InsertTravelDetail`) use `multipart/form-data`.
- `InsertTravelDetail` uses `application/json`.
- `UpdateTravelStatus` requires `TID` (Travel ID), NOT `empId`.
