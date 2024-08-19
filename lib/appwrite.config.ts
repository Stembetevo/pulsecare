import * as sdk from 'node-appwrite'

const{APPWRITE_ID,API_SECRET_KEY,DATABASE_ID,PATIENT_COLLECTION_ID,DOCTOR_COLLECTION_ID,
APPOINTMENT_cOLLECTION_ID,
NEXT_PUBLIC_BUCKET_ID:BUCKET_ID,
NEXT_PUBLIC_ENDPOINT:ENDPOINT
} = process.env;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(APPWRITE_ID!)
    .setKey(API_SECRET_KEY!)

export const databases = new sdk.Databases(client);    
export const storage = new sdk.Storage(client);    
export const messaging = new sdk.Messaging(client);    
export const users = new sdk.Users(client);    