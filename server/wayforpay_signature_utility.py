import hashlib
import hmac
import json
from collections import OrderedDict

# --- CONFIGURATION (PLACEHOLDERS: REPLACE WITH YOUR ACTUAL DATA) ---\
# NOTE: In a real application, these should be loaded from environment variables.
MERCHANT_SECRET_KEY = "d0670890fa2909a1aee9751ed42def0629e63598"  # !!! REPLACE THIS !!!

def calculate_wayforpay_signature(data: dict) -> str:
    """
    Calculates the WayForPay signature based on the documentation.

    The signature is HMAC-MD5 hash of a concatenated string of specific
    field values, separated by semicolons.
    """
    # 1. Define the required fields for signing (Order matters!)
    # These fields must be present and in this specific order.
    # Note: 'productName', 'productCount', and 'productPrice' are lists.
    signature_fields = [
        "merchantAccount",
        "merchantDomainName",
        "orderReference",
        "orderDate",
        "amount",
        "currency",
        "productName",
        "productCount",
        "productPrice",
    ]

    # 2. Build the string to sign
    string_to_sign = ""
    for field in signature_fields:
        value = data.get(field, "")
        if isinstance(value, list):
            # If the value is a list (e.g., productPrice), concatenate items with ';'
            string_to_sign += ";".join(map(str, value))
        else:
            string_to_sign += str(value)
        string_to_sign += ";"
    
    # Remove the trailing semicolon
    string_to_sign = string_to_sign.rstrip(";")

    # === START DEBUG OUTPUT ===
    # Print the exact string that is being used to calculate the signature.
    print(f"DEBUG SIGNATURE STRING: {string_to_sign}")
    # === END DEBUG OUTPUT ===

    # 3. Calculate the signature (HMAC-MD5)
    signature = hmac.new(
        key=MERCHANT_SECRET_KEY.encode('utf-8'),
        msg=string_to_sign.encode('utf-8'),
        digestmod=hashlib.md5
    ).hexdigest()

    return signature

def verify_wayforpay_signature(data: dict) -> bool:
    """
    Verifies the WayForPay response signature from the payment callback.
    """
    try:
        # The fields required for verifying the response signature
        response_fields = [
            "merchantAccount",
            "orderReference",
            "amount",
            "currency",
            "authCode",
            "transactionStatus",
            "ReasonCode"
        ]
        
        # Build the string to sign
        string_to_sign = ""
        for field in response_fields:
            string_to_sign += str(data.get(field, ""))
            string_to_sign += ";"
        
        string_to_sign = string_to_sign.rstrip(";")

        # Calculate the expected signature
        calculated_signature = hmac.new(
            key=MERCHANT_SECRET_KEY.encode('utf-8'),
            msg=string_to_sign.encode('utf-8'),
            digestmod=hashlib.md5
        ).hexdigest()

        # Compare the calculated signature with the one provided in the response
        provided_signature = data.get("merchantSignature")
        
        if provided_signature == calculated_signature:
            return True
        else:
            print(f"Signature mismatch. Calculated: {calculated_signature}, Received: {provided_signature}")
            return False

    except Exception as e:
        print(f"Error verifying signature: {e}")
        return False
