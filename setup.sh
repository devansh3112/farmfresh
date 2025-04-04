#!/bin/bash

# FARM FRESH APP - AUTOMATED SETUP SCRIPT
# This script automates the setup of the Farm Fresh App environment

# Text styling
BOLD='\033[1m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${BOLD}${GREEN}"
echo "  _____                     _____              _        _              "
echo " |  ___| __ _ _ __ _ __ ___|  ___| __ ___  ___| |__    / \   _ __  ___ "
echo " | |_ | '__| '__| '_ \_  / |_ | '__/ _ \/ __| '_ \  / _ \ | '_ \/ __|"
echo " |  _|| |  | |  | | | / /|  _|| | |  __/\__ \ | | |/ ___ \| |_) \__ \\"
echo " |_|  |_|  |_|  |_| |_/___\_|  |_|  \___||___/_| |_/_/   \_\ .__/|___/"
echo "                                                           |_|         "
echo -e "${NC}"
echo -e "${BOLD}AUTOMATED SETUP SCRIPT${NC}"
echo -e "This script will set up the Farm Fresh App development environment\n"

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Node.js version
check_node_version() {
    if command_exists node; then
        NODE_VERSION=$(node -v | cut -d 'v' -f 2)
        MAJOR_VERSION=$(echo $NODE_VERSION | cut -d '.' -f 1)
        
        if [ "$MAJOR_VERSION" -lt 14 ]; then
            echo -e "${YELLOW}Warning: Node.js version $NODE_VERSION detected.${NC}"
            echo -e "${YELLOW}Farm Fresh App requires Node.js v14.0.0 or higher.${NC}"
            echo -e "Please update Node.js before continuing."
            
            if command_exists nvm; then
                echo -e "\nYou can use NVM to install a newer version:"
                echo -e "${BLUE}nvm install 16${NC}"
                echo -e "${BLUE}nvm use 16${NC}"
            else
                echo -e "\nVisit https://nodejs.org to download and install the latest version."
            fi
            
            exit 1
        else
            echo -e "✅ ${GREEN}Node.js v$NODE_VERSION detected.${NC}"
        fi
    else
        echo -e "${RED}Error: Node.js is not installed.${NC}"
        echo -e "Please install Node.js v14.0.0 or higher before continuing."
        echo -e "Visit https://nodejs.org to download and install the latest version."
        exit 1
    fi
}

# Function to check if npm is installed
check_npm() {
    if command_exists npm; then
        NPM_VERSION=$(npm -v)
        echo -e "✅ ${GREEN}npm v$NPM_VERSION detected.${NC}"
    else
        echo -e "${RED}Error: npm is not installed.${NC}"
        echo -e "Please install npm before continuing."
        exit 1
    fi
}

# Function to check if git is installed
check_git() {
    if command_exists git; then
        GIT_VERSION=$(git --version | cut -d ' ' -f 3)
        echo -e "✅ ${GREEN}Git v$GIT_VERSION detected.${NC}"
    else
        echo -e "${RED}Error: Git is not installed.${NC}"
        echo -e "Please install Git before continuing."
        echo -e "Visit https://git-scm.com/downloads to download and install Git."
        exit 1
    fi
}

# Check for required tools
echo -e "${BOLD}Checking prerequisites...${NC}"
check_node_version
check_npm
check_git
echo -e "All prerequisites met!\n"

# Clone the repository if not already in project directory
CURRENT_DIR=$(basename "$PWD")
if [ "$CURRENT_DIR" != "farm-fresh-app" ]; then
    echo -e "${BOLD}Cloning the repository...${NC}"
    if git clone https://github.com/mmwhycode/react-native-spark-start.git farm-fresh-app; then
        echo -e "✅ ${GREEN}Repository cloned successfully!${NC}"
        cd farm-fresh-app
    else
        echo -e "${RED}Error: Failed to clone the repository.${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}Already in project directory, skipping clone step.${NC}"
fi

# Install dependencies
echo -e "\n${BOLD}Installing dependencies...${NC}"
echo -e "This may take a few minutes..."
if npm install; then
    echo -e "✅ ${GREEN}Dependencies installed successfully!${NC}"
else
    echo -e "${RED}Error: Failed to install dependencies.${NC}"
    exit 1
fi

# Create environment file if needed
if [ ! -f .env ]; then
    echo -e "\n${BOLD}Creating environment file...${NC}"
    echo "# Farm Fresh App Environment Variables" > .env
    echo "API_URL=https://api.farmfreshapp.example" >> .env
    echo "DEBUG_MODE=true" >> .env
    echo -e "✅ ${GREEN}Environment file created successfully!${NC}"
fi

# Additional setup steps
echo -e "\n${BOLD}Running additional setup steps...${NC}"

# Check if iOS setup is possible (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "\n${BOLD}Setting up iOS environment...${NC}"
    if command_exists pod; then
        cd ios && pod install && cd ..
        echo -e "✅ ${GREEN}iOS dependencies installed successfully!${NC}"
    else
        echo -e "${YELLOW}Warning: CocoaPods not installed. iOS build will not work.${NC}"
        echo -e "Install CocoaPods using: ${BLUE}sudo gem install cocoapods${NC}"
    fi
fi

# Setup complete
echo -e "\n${BOLD}${GREEN}✅ Setup complete!${NC}"
echo -e "\nYou can now run the app using:"
echo -e "  ${BLUE}npm run android${NC} - For Android"
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "  ${BLUE}npm run ios${NC}     - For iOS (macOS only)"
fi
echo -e "\nHappy coding! 🚀" 