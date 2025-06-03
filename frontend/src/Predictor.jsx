import { useState } from "react";

export default function Predictor() {
  const [form, setForm] = useState({
    FLAG_OWN_CAR: "",
    FLAG_OWN_REALTY: "",
    CNT_CHILDREN: "",
    AMT_INCOME_TOTAL: "",
    NAME_INCOME_TYPE: "",
    NAME_EDUCATION_TYPE: "",
    NAME_FAMILY_STATUS: "",
    NAME_HOUSING_TYPE: "",
    DAYS_EMPLOYED: "",
    FLAG_WORK_PHONE: "",
    FLAG_PHONE: "",
    FLAG_EMAIL: "",
    OCCUPATION_TYPE: "",
    CNT_FAM_MEMBERS: "",
    YEARS_BIRTH: "",
  });

  const [model, setModel] = useState("random_forest");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const features = Object.values(form).map(Number);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features, model }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.prediction);
      } else {
        setError(data.error || "Error en la predicción");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  };

  const etiquetasCampo = {
    CNT_CHILDREN: "Número de hijos",
    AMT_INCOME_TOTAL: "Ingreso total",
    DAYS_EMPLOYED: "Días empleados",
    CNT_FAM_MEMBERS: "Miembros de la familia",
    YEARS_BIRTH: "Edad (años)",
  };

 
  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-100 rounded-xl shadow-lg space-y-6">
      <h1 className="text-3xl font-bold text-center text-gray-800">Predicción de Aprobación de Crédito</h1>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Select: Tipo de ingreso */}
        <select
          name="NAME_INCOME_TYPE"
          value={form.NAME_INCOME_TYPE}
          onChange={handleChange}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          required
        >
          <option value="">-- Tipo de ingreso --</option>
          {Object.entries({
            'Empleado': 0,
            'Asociado comercial': 1,
            'Funcionario público': 3,
            'Estudiante': 4,
            'Pensionado': 5
          }).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Select: Nivel educativo */}
        <select
          name="NAME_EDUCATION_TYPE"
          value={form.NAME_EDUCATION_TYPE}
          onChange={handleChange}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          required
        >
          <option value="">-- Nivel educativo --</option>
          {Object.entries({
            'Universitario': 0,
            'Secundaria / técnica': 1,
            'Universitario incompleto': 3,
            'Secundaria básica': 4,
            'Grado académico': 5
          }).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Select: Estado civil */}
        <select
          name="NAME_FAMILY_STATUS"
          value={form.NAME_FAMILY_STATUS}
          onChange={handleChange}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          required
        >
          <option value="">-- Estado civil --</option>
          {Object.entries({
            'Unión libre': 0,
            'Casado/a': 1,
            'Soltero/a': 2,
            'Separado/a': 4,
            'Viudo/a': 5
          }).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Select: Tipo de vivienda */}
        <select
          name="NAME_HOUSING_TYPE"
          value={form.NAME_HOUSING_TYPE}
          onChange={handleChange}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          required
        >
          <option value="">-- Tipo de vivienda --</option>
          {Object.entries({
            'Apartamento alquilado': 0,
            'Casa / apartamento propio': 1,
            'Apartamento municipal': 3,
            'Con padres': 4,
            'Apartamento cooperativo': 5,
            'Apartamento de oficina': 6
          }).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Select: Ocupación */}
        <select
          name="OCCUPATION_TYPE"
          value={form.OCCUPATION_TYPE}
          onChange={handleChange}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
          required
        >
          <option value="">-- Ocupación --</option>
          {Object.entries({
            'Ninguna': 0,
            'Personal de seguridad': 1,
            'Ventas': 2,
            'Contadores': 4,
            'Obreros': 5,
            'Gerentes': 6,
            'Conductores': 7,
            'Personal básico': 8,
            'Técnicos especializados': 9,
            'Personal de limpieza': 10,
            'Servicios privados': 11,
            'Cocineros': 12,
            'Obreros sin calificación': 13,
            'Personal médico': 14,
            'Secretarias': 15,
            'Meseros': 16,
            'Recursos humanos': 17,
            'Agentes inmobiliarios': 18,
            'Personal TI': 19
          }).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Selects: Sí / No */}
        {[
          ["FLAG_OWN_CAR", "¿Tiene carro?"],
          ["FLAG_OWN_REALTY", "¿Tiene propiedad?"],
          ["FLAG_WORK_PHONE", "¿Teléfono del trabajo?"],
          ["FLAG_PHONE", "¿Teléfono personal?"],
          ["FLAG_EMAIL", "¿Correo electrónico?"]
        ].map(([key, label]) => (
          <select
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            required
          >
            <option value="">{label}</option>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
        ))}

        {/* Campos numéricos */}
        {Object.keys(form).map((key) =>
          ![
            "NAME_INCOME_TYPE",
            "NAME_EDUCATION_TYPE",
            "NAME_FAMILY_STATUS",
            "NAME_HOUSING_TYPE",
            "OCCUPATION_TYPE",
            "FLAG_OWN_CAR",
            "FLAG_OWN_REALTY",
            "FLAG_WORK_PHONE",
            "FLAG_PHONE",
            "FLAG_EMAIL",
          ].includes(key) && (
            <input
              key={key}
              type="number"
              name={key}
              placeholder={etiquetasCampo[key] || key}
              value={form[key]}
              onChange={handleChange}
              className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
              required
            />
          )
        )}

        {/* Modelo de predicción */}
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="border border-gray-300 bg-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="random_forest">Random Forest</option>
          <option value="decision_tree">Decision Tree</option>
        </select>

        <button
          type="submit"
          className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
        >
          Predecir
        </button>
      </form>

      {result !== null && (
        <div className={`p-4 rounded-lg text-center ${result === 1 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          <p className="text-lg font-semibold">
            Resultado: {result === 1 ? "Aprobado" : "No Aprobado"}
          </p>
        </div>
      )}
      
      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg text-center">
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}