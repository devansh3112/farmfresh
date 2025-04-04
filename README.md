# Farm Fresh App

A React Native mobile application connecting local farmers with consumers, promoting direct farm-to-table commerce. The app features dual interfaces - one for farmers to manage and sell products, and another for consumers to browse and purchase fresh produce.

![Farm Fresh App Logo](https://images.unsplash.com/photo-1500076656116-558758c991c1?w=600)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

### For Farmers

- **Product Management**: Add, edit, and remove products from your inventory
- **Order Management**: View and process incoming orders
- **Dashboard**: Overview of sales, inventory, and customer ratings
- **Profile Management**: Customize farm profile visible to customers

### For Consumers

- **Product Browsing**: Browse products by category with sort and search functionality
- **Shopping Cart**: Add products to cart and proceed to checkout
- **Order Tracking**: Track order status and history
- **Farm Discovery**: Explore different local farms and their offerings

## Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 10px;">
    <img src="https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2" width="200" alt="Product Detail Screen">
    <img src="https://images.unsplash.com/photo-1608198093002-ad4e005484ec" width="200" alt="Shopping Cart Screen">
    <img src="https://images.unsplash.com/photo-1587049352851-8d4e89133924" width="200" alt="Checkout Screen">
</div>

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- React Native development environment set up according to [official documentation](https://reactnative.dev/docs/environment-setup)

### Step 1: Clone the Repository

```bash
git clone https://github.com/mmwhycode/react-native-spark-start.git farm-fresh-app
cd farm-fresh-app
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

### Step 3: Set Up Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configurations
```

### Step 4: Run the Application

#### For iOS:

```bash
# Install pods for iOS
cd ios && pod install && cd ..

# Run the iOS app
npm run ios
# or
yarn ios
```

#### For Android:

```bash
# Run the Android app
npm run android
# or
yarn android
```

## Project Structure

```
farm-fresh-app/
├── src/
│   ├── assets/           # Images, fonts, and other static assets
│   ├── components/       # Reusable UI components
│   ├── contexts/         # React Context API providers
│   ├── navigation/       # Navigation configuration
│   ├── screens/          # Application screens
│   ├── services/         # API services and data handling
│   ├── utils/            # Utility functions
│   └── App.tsx           # Application entry point
├── ios/                  # iOS-specific files
├── android/              # Android-specific files
├── .env.example          # Example environment variables
├── .gitignore            # Git ignore configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Usage

### Login Credentials for Demo

**Farmer Account:**
- Email: farmer@example.com
- Password: password123

**Consumer Account:**
- Email: consumer@example.com
- Password: password123

### User Role Switching

The app allows switching between farmer and consumer roles through the profile screen. This is particularly useful for demonstration and testing purposes.

### Key Workflows

1. **Adding Products (Farmer)**: Navigate to Products > Add Product
2. **Browsing Products (Consumer)**: Browse by category or search
3. **Making a Purchase (Consumer)**: Add to cart > View cart > Checkout
4. **Order Management (Farmer)**: View incoming orders from the dashboard

## Tech Stack

- **React Native**: Core framework for building cross-platform mobile apps
- **Expo**: Development toolchain for React Native
- **TypeScript**: Type-safe JavaScript for better developer experience
- **React Navigation**: Navigation library for React Native apps
- **Context API**: State management for shared data
- **AsyncStorage**: Persistent local storage for data caching
- **React Native Vector Icons**: Icon library for UI components

## One-Command Setup

To set up the entire project with a single command, use:

```bash
bash -c "$(curl -fsSL https://raw.githubusercontent.com/mmwhycode/react-native-spark-start/main/setup.sh)"
```

Or manually:

```bash
git clone https://github.com/mmwhycode/react-native-spark-start.git farm-fresh-app && \
cd farm-fresh-app && \
npm install && \
npm run prepare
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Developed with ❤️ by [mmwhycode team](https://github.com/mmwhycode)

For support, please contact: support@farmfreshapp.com 