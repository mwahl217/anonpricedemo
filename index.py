import json
import boto3

dynamodb = boto3.resource('dynamodb')
table_name = 'AnonymizedPrices'
table = dynamodb.Table(table_name)

def anonymize_price(price):
    price_str = str(price)
    visible_part = price_str[:3]  # Extract the first 4 digits
    masked_part = '*' * (len(price_str) - 4)  # Create the mask with asterisks for the remaining digits
    anonymized_price = f"${visible_part}{masked_part}"  # Concatenate the visible and masked parts
    return anonymized_price

def lambda_handler(event, context):
    body = json.loads(event['body'])
    price = body['price']
    
    # Anonymization logic - Replace this with your own implementation
    anonymized_price = anonymize_price(price)

    # Save anonymized data to DynamoDB
    item = {
        'originalPrice': int(price),  # Store the original price as a string
        'anonymizedPrice': anonymized_price
    }

    try:
        table.put_item(Item=item)
        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Price anonymized and stored successfully'})
        }
    except Exception as e:
        print('Error saving anonymized price to DynamoDB:', str(e))
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'An error occurred while saving the price'})
        }