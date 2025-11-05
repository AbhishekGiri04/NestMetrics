#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}NestMetrics - Airbnb Smart Booking Insights${NC}"
echo -e "${BLUE}===========================================${NC}"

# Check prerequisites
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python3 is not installed. Please install Python3 first.${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}Error: Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Function to cleanup processes
cleanup() {
    echo -e "\n${YELLOW}Shutting down servers...${NC}"
    pkill -f "python app.py" 2>/dev/null
    pkill -f "npm run dev" 2>/dev/null
    lsof -ti:5001,5173 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}Servers stopped successfully${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Clean existing processes
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
pkill -f "python app.py" 2>/dev/null
pkill -f "npm run dev" 2>/dev/null
lsof -ti:5001,5173 | xargs kill -9 2>/dev/null

# Setup and start backend
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend
[ ! -d "venv" ] && python3 -m venv venv
source venv/bin/activate
[ ! -f ".deps_installed" ] && pip install -q -r requirements.txt && touch .deps_installed
echo -e "${GREEN}Starting backend server...${NC}"
python app.py &

# Setup and start frontend
echo -e "${YELLOW}Setting up frontend...${NC}"
cd ../frontend
[ ! -d "node_modules" ] && npm install --silent
echo -e "${GREEN}Starting frontend server...${NC}"
npm run dev &

sleep 3

echo -e "${GREEN}NestMetrics is running!${NC}"
echo -e "${BLUE}Backend API: http://localhost:5001${NC}"
echo -e "${BLUE}Frontend App: http://localhost:5173${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop servers${NC}"

# Open browser if available
command -v open &> /dev/null && open http://localhost:5173

wait