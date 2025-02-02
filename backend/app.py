import pickle
import numpy as np
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

model_path = os.path.join(os.path.dirname(__file__), 'backend', 'model3.pkl')
model = pickle.load(open('backend/model3.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  


FEATURES = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 'tenure', 'OnlineSecurity',  
            'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies', 
            'MonthlyCharges', 'TotalCharges', 'numAdminTickets', 'numTechTickets', 
            'InternetService_Fiber optic', 'InternetService_No', 
            'Contract_Two year', 'PaymentMethod_Electronic check', 'PaymentMethod_Mailed check', 
            'PaymentMethod_Credit card', 'PaymentMethod_Bank transfer (automatic)', 
            'PaymentMethod_Electronic check', 'Contract_One year', 'Contract_Two year']

categorical_map = {
    'gender': {'Male': 0, 'Female': 1},
    'Partner': {'No': 0, 'Yes': 1},
    'Dependents': {'No': 0, 'Yes': 1},
    'OnlineSecurity': {'No': 0, 'Yes': 1},
    'OnlineBackup': {'No': 0, 'Yes': 1},
    'DeviceProtection': {'No': 0, 'Yes': 1},
    'TechSupport': {'No': 0, 'Yes': 1},
    'StreamingTV': {'No': 0, 'Yes': 1},
    'StreamingMovies': {'No': 0, 'Yes': 1}
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()

        for feature in FEATURES:
            if feature not in input_data:
                input_data[feature] = 0  

        for feature, mapping in categorical_map.items():
            if feature in input_data:
                input_data[feature] = mapping.get(input_data[feature], 0) 

        features = np.array([[input_data[feature] for feature in FEATURES]], dtype=float)

        prediction = model.predict_proba(features)
        churn_prob = prediction[0][1]

        return jsonify({'churn_probability': churn_prob}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
