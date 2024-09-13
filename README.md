# Twitter-like Platform

A backend project that mimics key functionalities of Twitter, built using Node.js, Express, MongoDB, and Cloudinary for media storage.

## Features
- User registration and authentication (JWT-based)
- Tweet creation, deletion, and editing
- Commenting on tweets
- Like/Unlike tweets
- Follow/Unfollow users
- Retweet functionality
- User profile customization (bio, profile picture)

## Tech Stack
- **Node.js**: Server-side runtime environment
- **Express.js**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing user, tweet, and comment data
- **Cloudinary**: Cloud storage for images and media uploads

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AnjanaKJ/pay3-task.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory. See [Environment Variables](#environment-variables) for required keys.

4. Make sure MongoDB is installed and running locally or provide a cloud-based MongoDB URI.

5. Set up your Cloudinary account. See [Cloudinary Configuration](#cloudinary-configuration).

## Running the Project

To run the project locally:

```bash
npm server.js
