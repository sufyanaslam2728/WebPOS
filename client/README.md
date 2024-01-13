# Web-POS Application for MUNERO Global Loyalty

This repository contains the frontend code for a small Web-POS (Web Point of Sale) application that interacts with MUNERO Global Loyalty APIs. The application provides functionalities for user authentication, catalog browsing, order placement, and order management.

# Features

1. Login Page:
   Connects to the MUNERO Global Loyalty API using provided credentials for user authentication.
2. Main Page:
   Displays a navigation menu for easy access to the catalog, ordering page, and order details.
   Shows the user's wallet balance and supports the display of multiple wallet balances.
3. Catalogue Page:
   Pulls data from the MUNERO Global Loyalty API to display the digital gift card catalogue.
4. Ordering Page:
   Allows users to place orders using the MUNERO Global Loyalty API.
5. Orders and Order Details Page:
   Provides a page to view the status of placed orders.
   Implements a detailed information for a specific order.

## Stack

1. react
2. bootstrap
3. react-bootstrap

## Prerequisite

1. Install node version > 16
2. Install react version > 18

## Instructions

1. Rename `.env.sample` to `.env`
2. Update the variable, you just need to give your base URL.
3. `npm install`
4. `npm start` (to start the app)

## Assumptions
