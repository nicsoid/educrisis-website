#!/bin/bash
# dev.sh - Local Development Helper Script

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GREEN}🚀 EduCrisis Local Development${NC}"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed. Please install Docker Desktop first.${NC}"
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose is not installed.${NC}"
    exit 1
fi

# Main menu
show_menu() {
    echo ""
    echo -e "${BLUE}Choose an action:${NC}"
    echo "1. Start development server (with logs)"
    echo "2. Start development server (detached)"
    echo "3. Stop development server"
    echo "4. Restart development server"
    echo "5. View logs"
    echo "6. Rebuild containers"
    echo "7. Preview production build (port 8080)"
    echo "8. Install new package"
    echo "9. Access container shell"
    echo "10. Clean up (remove containers and volumes)"
    echo "11. Exit"
    echo ""
    read -p "Enter option [1-11]: " OPTION
    
    case $OPTION in
        1)
            echo -e "${GREEN}🚀 Starting development server...${NC}"
            echo -e "${BLUE}Access your app at: http://localhost:3000${NC}"
            docker-compose -f docker-compose.dev.yml up
            ;;
        2)
            echo -e "${GREEN}🚀 Starting development server (detached)...${NC}"
            docker-compose -f docker-compose.dev.yml up -d
            echo -e "${BLUE}✅ Server running at: http://localhost:3000${NC}"
            echo -e "${YELLOW}💡 View logs with option 5${NC}"
            ;;
        3)
            echo -e "${YELLOW}⏹️  Stopping development server...${NC}"
            docker-compose -f docker-compose.dev.yml down
            echo -e "${GREEN}✅ Server stopped${NC}"
            ;;
        4)
            echo -e "${YELLOW}🔄 Restarting development server...${NC}"
            docker-compose -f docker-compose.dev.yml restart dev
            echo -e "${GREEN}✅ Server restarted${NC}"
            echo -e "${BLUE}Access at: http://localhost:3000${NC}"
            ;;
        5)
            echo -e "${BLUE}📋 Viewing logs (Ctrl+C to exit)...${NC}"
            docker-compose -f docker-compose.dev.yml logs -f dev
            ;;
        6)
            echo -e "${YELLOW}🔨 Rebuilding containers...${NC}"
            docker-compose -f docker-compose.dev.yml up --build -d
            echo -e "${GREEN}✅ Containers rebuilt${NC}"
            echo -e "${BLUE}Access at: http://localhost:3000${NC}"
            ;;
        7)
            echo -e "${YELLOW}📦 Building production preview...${NC}"
            docker-compose -f docker-compose.dev.yml --profile preview up preview -d
            echo -e "${GREEN}✅ Production preview running${NC}"
            echo -e "${BLUE}Access at: http://localhost:8080${NC}"
            echo -e "${YELLOW}💡 Stop with: docker-compose -f docker-compose.dev.yml --profile preview down${NC}"
            ;;
        8)
            read -p "Enter package name (e.g., axios): " PACKAGE
            echo -e "${YELLOW}📦 Installing $PACKAGE...${NC}"
            docker-compose -f docker-compose.dev.yml exec dev npm install $PACKAGE
            echo -e "${GREEN}✅ Package installed${NC}"
            echo -e "${YELLOW}💡 Rebuild containers if needed (option 6)${NC}"
            ;;
        9)
            echo -e "${BLUE}🐚 Accessing container shell...${NC}"
            echo -e "${YELLOW}💡 Type 'exit' to leave shell${NC}"
            docker-compose -f docker-compose.dev.yml exec dev sh
            ;;
        10)
            echo -e "${YELLOW}🧹 Cleaning up...${NC}"
            read -p "This will remove all containers and volumes. Continue? (y/n): " CONFIRM
            if [ "$CONFIRM" = "y" ]; then
                docker-compose -f docker-compose.dev.yml down -v
                echo -e "${GREEN}✅ Cleanup complete${NC}"
            else
                echo -e "${BLUE}Cancelled${NC}"
            fi
            ;;
        11)
            echo -e "${GREEN}👋 Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${YELLOW}❌ Invalid option${NC}"
            ;;
    esac
    
    # Show menu again
    show_menu
}

# Check if port 3000 is available
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo -e "${YELLOW}⚠️  Port 3000 is already in use${NC}"
    lsof -Pi :3000 -sTCP:LISTEN
    echo ""
fi

# Start menu
show_menu