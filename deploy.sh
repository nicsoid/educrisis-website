#!/bin/bash
# deploy.sh - EduCrisis Deployment Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 EduCrisis Deployment Script${NC}"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Function to setup SSL
setup_ssl() {
    echo -e "${YELLOW}📜 Setting up SSL certificates...${NC}"
    
    read -p "Enter your domain (e.g., educrisis.org): " DOMAIN
    read -p "Enter your email for SSL notifications: " EMAIL
    
    mkdir -p ssl certbot-webroot
    
    docker-compose run --rm certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        -d $DOMAIN \
        -d www.$DOMAIN \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --non-interactive || {
            echo -e "${RED}❌ SSL setup failed. Make sure your domain is pointed to this server.${NC}"
            return 1
        }
    
    echo -e "${GREEN}✅ SSL certificates obtained successfully${NC}"
}

# Function to deploy
deploy() {
    echo -e "${YELLOW}🔨 Building and deploying...${NC}"
    
    # Create necessary directories
    mkdir -p ssl logs mail/{data,state,logs,config}
    
    # Build and start services
    docker-compose up -d --build
    
    # Wait for services to be ready
    echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
    sleep 10
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        echo -e "${GREEN}✅ Services are running${NC}"
        docker-compose ps
    else
        echo -e "${RED}❌ Some services failed to start${NC}"
        docker-compose logs
        exit 1
    fi
}

# Function to show status
show_status() {
    echo -e "${YELLOW}📊 Service Status:${NC}"
    docker-compose ps
    echo ""
    echo -e "${YELLOW}💾 Resource Usage:${NC}"
    docker stats --no-stream
}

# Function to view logs
view_logs() {
    echo -e "${YELLOW}📋 Recent logs:${NC}"
    docker-compose logs --tail=50
}

# Function to backup
backup() {
    echo -e "${YELLOW}💾 Creating backup...${NC}"
    DATE=$(date +%Y%m%d_%H%M%S)
    BACKUP_DIR="backups"
    mkdir -p $BACKUP_DIR
    
    tar -czf $BACKUP_DIR/educrisis-backup-$DATE.tar.gz \
        ssl/ \
        mail/data/ \
        logs/ \
        docker-compose.yml \
        nginx.conf 2>/dev/null || true
    
    echo -e "${GREEN}✅ Backup created: $BACKUP_DIR/educrisis-backup-$DATE.tar.gz${NC}"
}

# Function to update
update() {
    echo -e "${YELLOW}🔄 Updating services...${NC}"
    
    # Backup before update
    backup
    
    # Pull latest images
    docker-compose pull
    
    # Rebuild and restart
    docker-compose up -d --build
    
    echo -e "${GREEN}✅ Services updated successfully${NC}"
}

# Function to setup email
setup_email() {
    echo -e "${YELLOW}📧 Email Setup${NC}"
    echo "1. Use third-party email service (Google Workspace, Microsoft 365, etc.)"
    echo "2. Self-host email server"
    read -p "Choose option (1 or 2): " EMAIL_OPTION
    
    if [ "$EMAIL_OPTION" = "1" ]; then
        echo -e "${GREEN}Recommended DNS records for third-party email:${NC}"
        echo "MX records - provided by your email service"
        echo "SPF record - TXT @ v=spf1 include:_spf.provider.com ~all"
        echo "DKIM record - provided by your email service"
        echo "DMARC record - TXT _dmarc v=DMARC1; p=quarantine;"
    else
        echo -e "${YELLOW}Enabling self-hosted email server...${NC}"
        echo "Please uncomment the mailserver section in docker-compose.yml"
        echo "Then run: docker-compose up -d mailserver"
        echo ""
        echo -e "${GREEN}After starting, create email accounts:${NC}"
        echo "docker exec -it educrisis-mail setup email add info@yourdomain.com password123"
    fi
}

# Main menu
show_menu() {
    echo ""
    echo -e "${GREEN}Choose an action:${NC}"
    echo "1. Initial deployment (first time setup)"
    echo "2. Deploy/Update website"
    echo "3. Setup SSL certificates"
    echo "4. Setup email"
    echo "5. View status"
    echo "6. View logs"
    echo "7. Create backup"
    echo "8. Stop services"
    echo "9. Restart services"
    echo "10. Exit"
    echo ""
    read -p "Enter option [1-10]: " OPTION
    
    case $OPTION in
        1)
            echo -e "${GREEN}🎉 Starting initial deployment...${NC}"
            deploy
            echo ""
            read -p "Do you want to setup SSL now? (y/n): " SETUP_SSL
            if [ "$SETUP_SSL" = "y" ]; then
                setup_ssl
                docker-compose restart web
            fi
            ;;
        2)
            update
            ;;
        3)
            setup_ssl
            docker-compose restart web
            ;;
        4)
            setup_email
            ;;
        5)
            show_status
            ;;
        6)
            view_logs
            ;;
        7)
            backup
            ;;
        8)
            echo -e "${YELLOW}Stopping services...${NC}"
            docker-compose down
            echo -e "${GREEN}✅ Services stopped${NC}"
            ;;
        9)
            echo -e "${YELLOW}Restarting services...${NC}"
            docker-compose restart
            echo -e "${GREEN}✅ Services restarted${NC}"
            ;;
        10)
            echo -e "${GREEN}👋 Goodbye!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Invalid option${NC}"
            ;;
    esac
    
    # Show menu again
    show_menu
}

# Check if running as root (recommended for Docker)
if [ "$EUID" -ne 0 ]; then 
    echo -e "${YELLOW}⚠️  Not running as root. You may need to use 'sudo' for Docker commands.${NC}"
fi

# Start menu
show_menu