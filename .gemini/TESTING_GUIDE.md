# 🎯 Testing Provider Service Creation → Customer Booking Flow

## Overview
This document walks you through testing the complete flow where:
1. A **Provider** creates a service
2. The service appears in the **Customer's** BookService page
3. A **Customer** books that service
4. The booking appears in both **Customer** and **Provider** dashboards

---

## 🧪 Test Scenario 1: Provider Creates a Service

### Step 1: Login as Provider
1. Go to: http://localhost:5173/login
2. Login with a provider account (or create one at http://localhost:5173/signup)
   - Select "I provide services"
   - Example: provider@test.com / password123

### Step 2: Navigate to Service Management
1. After login, you'll be at the Provider Dashboard
2. Click on "Services" in the sidebar OR
3. Go directly to: http://localhost:5173/provider/services

### Step 3: Create a New Service
1. Click the **"Add Service"** button (top right)
2. A modal will appear with a form
3. Fill in the details:
   ```
   Service Title: Professional Home Cleaning
   Description: Complete deep cleaning service for your home including all rooms, kitchen, and bathrooms
   Price: 1500
   Category: Cleaning
   Image URL: (leave blank or use: https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400)
   ```
4. Click **"Create Service"**
5. ✅ You should see:
   - Success alert: "Service created successfully!"s c
   - The service appears in your services list
   - Service card shows: title, category badge, description, price, and image

### Step 4: Verify in Database (Optional)
Open your PostgreSQL client and run:
```sql
SELECT * FROM services ORDER BY created_at DESC LIMIT 1;
```
You should see your newly created service with your provider_id.

---

## 🧪 Test Scenario 2: Customer Books the Service

### Step 1: Logout and Login as Customer
1. Logout from provider account
2. Go to: http://localhost:5173/login
3. Login with a customer account
   - Example: customer@test.com / password123
   - Or create a new customer account

### Step 2: Navigate to Book Service Page
1. From Customer Dashboard, click "Book Service" OR
2. Go directly to: http://localhost:5173/customer/book-service

### Step 3: Find the Service
1. You should see ALL services including the one you just created
2. Use the search bar to find "Professional Home Cleaning"
3. ✅ The service should appear in the list with:
   - Title: "Professional Home Cleaning"
   - Category: "Cleaning"
   - Description
   - Price: ₹1500
   - Image

### Step 4: Book the Service
1. Click on the service card to select it
2. ✅ The card should highlight with a green "✓ Selected" badge
3. A date picker section appears below
4. Select a future date (today or later)
5. A booking summary appears showing:
   - Service name
   - Category
   - Date
   - Total amount
6. Click **"Confirm Booking"**
7. ✅ You should see:
   - Success alert
   - Redirect to /customer/bookings

### Step 5: Verify Booking in Customer Dashboard
1. Go to: http://localhost:5173/customer
2. ✅ You should see:
   - Updated statistics (Total Bookings count increased)
   - Your new booking in the "Upcoming Bookings" section
   - Booking shows: service name, date, status badge

---

## 🧪 Test Scenario 3: Provider Sees the Booking

### Step 1: Logout and Login as Provider
1. Logout from customer account
2. Login with the same provider account that created the service

### Step 2: Check Provider Dashboard
1. Go to: http://localhost:5173/provider
2. ✅ You should see:
   - Updated "Active Jobs" count
   - The booking appears in "Recent Jobs" section
   - Shows: customer name, service name, booking date, status

---

## 🎯 Complete Flow Verification

### What Should Work:
1. ✅ Provider creates service → Service saved to database
2. ✅ Service appears in provider's service list
3. ✅ Service appears in customer's BookService page
4. ✅ Customer can search and find the service
5. ✅ Customer can book the service
6. ✅ Booking appears in customer's dashboard
7. ✅ Booking appears in provider's dashboard
8. ✅ All data persists (refresh page and data remains)

---

## 🔍 Additional Tests

### Test Multiple Services
1. As provider, create 3-5 different services
2. As customer, verify all appear in BookService page
3. Book multiple services
4. Verify all bookings appear in dashboards

### Test Search Functionality
1. As customer, go to BookService page
2. Type "Cleaning" in search box
3. ✅ Only cleaning services should appear
4. Type "Plumbing"
5. ✅ Only plumbing services should appear

### Test Empty States
1. Create a new provider account
2. Go to Service Management
3. ✅ Should see empty state: "No services yet"
4. ✅ Should have "Create Service" button

### Test Form Validation
1. Try to create a service without filling required fields
2. ✅ Form should prevent submission
3. Try to enter negative price
4. ✅ Should not allow negative values

---

## 📊 Database Verification

### Check Services Table
```sql
SELECT s.id, s.title, s.price, s.category, u.name as provider_name
FROM services s
JOIN users u ON s.provider_id = u.id
ORDER BY s.created_at DESC;
```

### Check Bookings Table
```sql
SELECT 
    b.id,
    u.name as customer_name,
    s.title as service_name,
    b.booking_date,
    b.status
FROM bookings b
JOIN users u ON b.user_id = u.id
JOIN services s ON b.service_id = s.id
ORDER BY b.created_at DESC;
```

### Check Complete Flow
```sql
-- This query shows the complete relationship
SELECT 
    provider.name as provider_name,
    s.title as service_name,
    s.price,
    customer.name as customer_name,
    b.booking_date,
    b.status
FROM services s
LEFT JOIN users provider ON s.provider_id = provider.id
LEFT JOIN bookings b ON s.id = b.service_id
LEFT JOIN users customer ON b.user_id = customer.id
ORDER BY s.created_at DESC;
```

---

## 🐛 Troubleshooting

### Service Not Appearing in Customer View
- Check if backend is running (http://localhost:5000)
- Check browser console for errors
- Verify service was created (check database)
- Refresh the BookService page

### Booking Not Creating
- Ensure you're logged in as a customer
- Check that you selected both service AND date
- Verify backend is running
- Check browser console for errors

### Data Not Persisting
- Check PostgreSQL connection
- Verify .env file has correct database credentials
- Check backend console for database errors

---

## ✅ Success Criteria

You've successfully tested the feature if:
1. ✅ Provider can create services
2. ✅ Services appear in provider's list immediately
3. ✅ Services appear in customer's BookService page
4. ✅ Customer can search and filter services
5. ✅ Customer can book services
6. ✅ Bookings appear in both customer and provider dashboards
7. ✅ All data persists after page refresh
8. ✅ No console errors

---

**Last Updated:** January 30, 2026  
**Feature Status:** ✅ FULLY WORKING  
**Integration Level:** Complete End-to-End
