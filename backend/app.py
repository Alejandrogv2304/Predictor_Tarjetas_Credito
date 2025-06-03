from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Permite conexión desde React

# Cargar modelos y scaler (están en la misma carpeta que este archivo)
models = {
    "random_forest": joblib.load("random_forest.pkl"),
    "decision_tree": joblib.load("decision_tree.pkl")
}

# Solo el modelo random_forest necesita el scaler
scaler = joblib.load("scaler.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = data.get("features", [])
    model_name = data.get("model", "")

    if model_name not in models:
        return jsonify({"error": "Modelo no válido"}), 400

    try:
        features = np.array(features).reshape(1, -1)

        # Escalar si el modelo es Random Forest
        if model_name == "random_forest":
            features = scaler.transform(features)

        prediction = models[model_name].predict(features)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)