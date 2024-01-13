# Web-POS Application for MUNERO Global Loyalty

This repository contains the backend code for a small Responsive Web-POS (Web Point of Sale) application that interacts with MUNERO Global Loyalty APIs. The application includes the following features:

# Features:

1. Login Page:
   Connects to the MUNERO Global Loyalty API using the provided credentials to authenticate the user.

2. Main Page:
   Displays a navigation menu to access the catalogue, ordering page, or order details. The main page also shows the user's wallet balance and supports displaying multiple wallet balances.

3. Catalogue Page:
   Pulls data from the API to display the digital gift card catalogue.

4. Ordering Page:
   Allows users to place orders using the MUNERO Global Loyalty API.
   Note: For simplicity, orders are limited to one card at a time.

5. Orders and Order Details Page:
   Includes a page to view the status of orders and to view detailed information about a specific order.

## Stack

1. Node.js

## Prerequisite

1. Install node version > 16

## Instructions

1. Rename `.env.sample` to `.env`
2. Update the variables values in the .env file according to your requirements.
3. `npm install`
4. `npm start` (to start the server)
5. `npm server` (to start the server with nodemon)
6. `npm dev` (to start the server and client concurrently)

## Assumptions
