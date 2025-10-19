from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import json
import os 
import mysql.connector
from wayforpay_signature_utility import calculate_wayforpay_signature, verify_wayforpay_signature 

# Initialize Flask App
app = Flask(__name__)
CORS(app) 

# --- MYSQL CONFIGURATION (Uses Docker Environment Variables) ---
MYSQL_CONFIG = {
    'host': os.environ.get('MYSQL_HOST', 'localhost'),
    'user': os.environ.get('MYSQL_USER', 'root'),       
    'password': os.environ.get('MYSQL_PASSWORD', 'jK56Dq$1'), 
    'database': os.environ.get('MYSQL_DATABASE', 'wayforpay_db')
}

def get_mysql_connection():
    """Establishes and returns a new MySQL database connection."""
    try:
        # Wait a few seconds for the database to be ready (important in Docker setup)
        time.sleep(5) 
        conn = mysql.connector.connect(**MYSQL_CONFIG)
        print("Successfully connected to MySQL database.")
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None

def create_payments_table():
    """Creates the payments table if it doesn't exist."""
    conn = get_mysql_connection()
    if not conn:
        print("Skipping table creation due to database connection error.")
        return

    cursor = conn.cursor()
    
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_reference VARCHAR(255) UNIQUE NOT NULL,
        transaction_status VARCHAR(50) NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        client_email VARCHAR(255),
        client_name VARCHAR(255),
        donor_comment TEXT,
        frequency VARCHAR(50),
        raw_callback_data JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """
    try:
        cursor.execute(create_table_sql)
        conn.commit()
        print("Payments table verified/created successfully.")
    except mysql.connector.Error as err:
        print(f"MySQL CREATE TABLE error: {err}")
    finally:
        cursor.close()
        conn.close()

create_payments_table() 

# --- WayForPay Configuration ---
MERCHANT_ACCOUNT = "educrisis_org" 
# ОНОВЛЕННЯ: Домен тепер містить новий порт 5078
MERCHANT_DOMAIN = "localhost:5078" 

# ====================================================================
# API Endpoint 1: Generates payment data (Called by React Frontend)
# ====================================================================
@app.route('/api/generate-payment-data', methods=['POST'])
def generate_payment_data():
    try:
        request_data = request.json
        amount = request_data.get('amount')
        client_name = request_data.get('clientName')
        client_email = request_data.get('clientEmail')
        comment = request_data.get('comment')
        frequency = request_data.get('paymentFrequency')
        
        if not amount or not client_email:
            return jsonify({'error': 'Missing amount or email'}), 400

        # 1. Generate unique order reference
        order_reference = f"EDU-{int(time.time())}-{int(float(amount) * 100)}"
        
        # 2. Build payment data object
        payment_data = {
            "merchantAccount": MERCHANT_ACCOUNT,
            "merchantDomainName": MERCHANT_DOMAIN, 
            "orderReference": order_reference,
            "orderDate": int(time.time()),
            "amount": float(amount),
            "currency": "USD", 
            "productName": [f"Donation to EduCrisis (Ref: {order_reference})"],
            "productPrice": [float(amount)],
            "productCount": [1],
            "clientEmail": client_email,
            "clientName": client_name,
            # ОНОВЛЕННЯ: Return URL тепер також вказує на порт 5078 (якщо це публічний домен/ngrok)
            # Примітка: Frontend Return URL зазвичай йде на 3000, але Service URL має бути 5078
            "returnUrl": "http://localhost:3000/help?thanks", # Assuming React runs on 3000
            "serviceUrl": "https://def38297ded8.ngrok-free.app/api/wayforpay-callback", # ОНОВЛЕННЯ: Ваш бекенд
            "custom_data": json.dumps({
                "donor_comment": comment, 
                "frequency": frequency
            })
        }

        # 3. Calculate Signature (using imported utility function)
        signature = calculate_wayforpay_signature(payment_data)

        # 4. Final Data structure for redirection
        final_data = {
            "merchantSignature": signature,
            **payment_data
        }
        
        # Prepare the flat structure for the frontend form
        response_for_frontend = {
            "merchantSignature": final_data["merchantSignature"],
            "merchantAccount": final_data["merchantAccount"],
            "merchantDomainName": final_data["merchantDomainName"],
            "orderReference": final_data["orderReference"],
            "orderDate": final_data["orderDate"],
            "amount": final_data["amount"],
            "currency": final_data["currency"],
            "clientEmail": final_data["clientEmail"],
            "clientName": final_data["clientName"],
            "returnUrl": final_data["returnUrl"],
            "serviceUrl": final_data["serviceUrl"],
            "custom_data": final_data["custom_data"],
            "productName[0]": final_data["productName"][0],
            "productCount[0]": final_data["productCount"][0],
            "productPrice[0]": final_data["productPrice"][0],
        }

        return jsonify(response_for_frontend), 200

    except Exception as e:
        print(f"Error in generating payment data: {e}")
        return jsonify({'error': 'Internal server error during payment preparation'}), 500

# ====================================================================
# API Endpoint 2: Handles Callback/Webhook from WayForPay
# ====================================================================
@app.route('/api/wayforpay-callback', methods=['POST'])
def wayforpay_callback():
    conn = None 

    data = request.json if request.is_json else request.form.to_dict()
    print("RECEIVED CALLBACK DATA:", data) 

    if not data:
        print("Received empty callback data.")
        return jsonify({"response": "failure"}), 400

    order_reference = data.get("orderReference")
    transaction_status = data.get("transactionStatus")

    print(f"Processing callback for {order_reference}, Status: {transaction_status}")

    try:
        # 1. Signature Verification
        if not verify_wayforpay_signature(data):
            print(f"Signature verification failed for order: {order_reference}")
            return jsonify({"response": "failure"}), 403

        # 2. Database Connection
        conn = get_mysql_connection()
        if not conn:
             print("Database connection failed during callback processing.")
             return jsonify({"response": "failure"}), 500

        # 3. Parse Custom Data (if available)
        custom_data_json = data.get("custom_data", "{}")
        try:
            custom_data = json.loads(custom_data_json)
        except json.JSONDecodeError:
            custom_data = {} 
        
        # 4. Process Approved Payment Status
        if transaction_status == "Approved":
            # Prepare data for DB insert/update
            payment_data = (
                order_reference,
                transaction_status,
                data.get("amount"),
                data.get("currency"),
                data.get("clientEmail"),
                data.get("clientName"),
                custom_data.get("donor_comment", ""),
                custom_data.get("frequency", "one_time"),
                json.dumps(data) 
            )

            insert_sql = """
            INSERT INTO payments (
                order_reference, transaction_status, amount, currency, 
                client_email, client_name, donor_comment, frequency, raw_callback_data
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE 
                transaction_status=VALUES(transaction_status), 
                raw_callback_data=VALUES(raw_callback_data);
            """

            cursor = conn.cursor()
            cursor.execute(insert_sql, payment_data)
            conn.commit()
            print(f"Successfully saved payment to MySQL: {order_reference}, Status: {transaction_status}")
        
            # Send the required success response back to WayForPay
            return jsonify({
                "orderReference": order_reference,
                "status": "accept" 
            }), 200
        
        else:
            # Payment failed or declined
            print(f"Payment failed/declined: {order_reference}, Status: {transaction_status}")
            return jsonify({"orderReference": order_reference, "status": "accept"}), 200

    except mysql.connector.Error as err:
        print(f"MySQL INSERT/UPDATE error: {err}")
        conn.rollback()
        return jsonify({"response": "failure"}), 500
    except Exception as e:
        print(f"Critical error in callback handler: {e}")
        return jsonify({"response": "failure"}), 500
    finally:
        if conn and conn.is_connected():
            conn.close()

if __name__ == '__main__':
    # Flask runs on port 5000 by default (internal container port)
    app.run(host='0.0.0.0', port=5000, debug=True)
