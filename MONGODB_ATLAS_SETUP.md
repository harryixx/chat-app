# MongoDB Atlas Setup Guide

## Step-by-Step Instructions

### 1. Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account (or log in if you already have one)

### 2. Create a Free Cluster
1. After logging in, click **"Build a Database"** or **"Create"** → **"Database"**
2. Choose the **FREE (M0) tier** - this is perfect for development
3. Select a cloud provider (AWS, Google Cloud, or Azure) and a region closest to you
4. Give your cluster a name (e.g., "ChatifyCluster") or use the default
5. Click **"Create Cluster"** (this takes 3-5 minutes)

### 3. Create Database User
1. While the cluster is being created, you'll see a security setup screen
2. Create a database username and password:
   - **Username**: Choose something memorable (e.g., "chatifyuser")
   - **Password**: Create a strong password (save it securely!)
   - Click **"Create Database User"**
3. For **"Where would you like to connect from?"**, select:
   - **"My Local Environment"** (for development)
   - Or add your IP address (0.0.0.0/0 allows from anywhere - use only for development)

### 4. Get Your Connection String
1. Once your cluster is ready, click **"Connect"** button
2. Select **"Drivers"** or **"Connect your application"**
3. Choose **"Node.js"** as your driver and **"4.1 or later"** as the version
4. You'll see a connection string that looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Copy this connection string**

### 5. Update Your Connection String
1. Replace `<username>` with your database username
2. Replace `<password>` with your database password
3. Add your database name at the end (before the `?`):
   ```
   mongodb+srv://chatifyuser:yourpassword@cluster0.xxxxx.mongodb.net/chatify?retryWrites=true&w=majority
   ```

### 6. Update .env File
1. Open `backend/.env` file
2. Replace the `MONGO_URI` line with your complete connection string:
   ```
   MONGO_URI=mongodb+srv://chatifyuser:yourpassword@cluster0.xxxxx.mongodb.net/chatify?retryWrites=true&w=majority
   ```
3. **Important**: Make sure to URL-encode your password if it contains special characters:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - etc.

### 7. Test the Connection
1. Restart your backend server
2. You should see "MONGODB CONNECTED" in the console if successful

## Troubleshooting

- **Connection timeout**: Make sure your IP address is whitelisted in Atlas Network Access
- **Authentication failed**: Double-check your username and password (remember to URL-encode special characters)
- **Database not found**: The database will be created automatically when you first save data

## Security Note
Never commit your `.env` file to version control! It contains sensitive credentials.

