import React, { useState, useRef } from "react";
import axios from "axios";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Tooltip
} from '@mui/material';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';
import "../styles/PredictionForm.css";
import ExportPDF from './ExportPDF';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    gender: "Female",
    SeniorCitizen: 1,
    Partner: "No",
    Dependents: "Yes",
    tenure: 12,
    OnlineSecurity: "Yes",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "Yes",
    StreamingTV: "No",
    StreamingMovies: "Yes",
    MonthlyCharges: 69,
    TotalCharges: 699,
    numAdminTickets: 1,
    numTechTickets: 2,
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const predictionResultRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data.churn_probability);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Error communicating with the API");
      setPrediction(null);
    }
  };

  const toggleOptionalFields = () => {
    setShowOptionalFields(!showOptionalFields);
  };

  const pieData = [
    { name: 'Churn Probability', value: prediction ? prediction * 100 : 0 },
    { name: 'Retention Probability', value: prediction ? (1 - prediction) * 100 : 100 },
  ];

  const COLORS = ['#00FF00', '#FF0000'];

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-6">
      <div 
        className="max-w-5xl w-full h-auto overflow-y-auto scrollbar" 
        style={{ maxHeight: "90vh" }}  
      >
        <div className="grid grid-cols-2 gap-8 p-6 rounded-xl shadow-xl bg-white bg-opacity-80 backdrop-blur-lg">

          <div className="p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">Customer Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {showOptionalFields && (
                  <>
                    {[ 
                      { label: "Gender", name: "gender", options: ["Female", "Male"], tooltip: "Customer's gender" },
                      { label: "Senior Citizen", name: "SeniorCitizen", options: ["1", "0"], tooltip: "Is the customer a senior citizen?" },
                      { label: "Partner", name: "Partner", options: ["Yes", "No"], tooltip: "Does the customer have a partner?" },
                      { label: "Dependents", name: "Dependents", options: ["Yes", "No"], tooltip: "Does the customer have dependents?" },
                      { label: "Monthly Charges", name: "MonthlyCharges", tooltip: "Customer's monthly charges in USD" },
                    ].map(({ label, name, options, tooltip }) => (
                      options ? (
                        <Tooltip title={tooltip} key={name}>
                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel>{label}</InputLabel>
                            <Select
                              name={name}
                              value={formData[name]}
                              onChange={handleChange}
                              label={label}
                            >
                              {options.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Tooltip>
                      ) : (
                        <Tooltip title={tooltip} key={name}>
                          <TextField
                            label={label}
                            name={name}
                            value={formData[name]}
                            onChange={handleChange}
                            fullWidth
                            type="number"
                            sx={{ mb: 3 }}
                          />
                        </Tooltip>
                      )
                    ))}
                  </>
                )}

                {/* Compulsory Fields (Always visible) */}
                {[ 
                  { label: "Tenure (Months)", name: "tenure", tooltip: "Number of months the customer has been with the company" },
                  { label: "Tech Tickets", name: "numTechTickets", tooltip: "Number of tech support tickets created by the customer" },
                  { label: "Total Charges", name: "TotalCharges", tooltip: "Total charges paid by the customer" },
                  { label: "Online Security", name: "OnlineSecurity", options: ["Yes", "No"], tooltip: "Does the customer have online security?" },
                  { label: "Online Backup", name: "OnlineBackup", options: ["Yes", "No"], tooltip: "Does the customer have online backup?" },
                ].map(({ label, name, options, tooltip }) => (
                  options ? (
                    <Tooltip title={tooltip} key={name}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          label={label}
                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  ) : (
                    <Tooltip title={tooltip} key={name}>
                      <TextField
                        label={label}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        fullWidth
                        type="number"
                        sx={{ mb: 3 }}
                      />
                    </Tooltip>
                  )
                ))}
              </div>

              {/* Optional Fields Toggle */}
              {showOptionalFields && (
                <div className="grid grid-cols-2 gap-4">
                  {[ 
                    { label: "Device Protection", name: "DeviceProtection", options: ["Yes", "No"], tooltip: "Does the customer have device protection?" },
                    { label: "Tech Support", name: "TechSupport", options: ["Yes", "No"], tooltip: "Does the customer have tech support?" },
                    { label: "Streaming TV", name: "StreamingTV", options: ["Yes", "No"], tooltip: "Does the customer have streaming TV?" },
                    { label: "Streaming Movies", name: "StreamingMovies", options: ["Yes", "No"], tooltip: "Does the customer have streaming movies?" },
                  ].map(({ label, name, options, tooltip }) => (
                    <Tooltip title={tooltip} key={name}>
                      <FormControl fullWidth sx={{ mb: 3 }}>
                        <InputLabel>{label}</InputLabel>
                        <Select
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          label={label}
                        >
                          {options.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Tooltip>
                  ))}
                </div>
              )}
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleOptionalFields}
                  sx={{ flex: 1, py: 2 }}
                >
                  {showOptionalFields ? "Hide Features" : "Add Features"}
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  sx={{ flex: 1, py: 2 }}
                >
                  Predict
                </Button>
              </Box>
            </form>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-xl" ref={predictionResultRef}>
            <h2 className="text-3xl font-extrabold text-indigo-700 mb-6">Churn Prediction Result</h2>
            {prediction !== null ? (
              <>  
                <p className="text-lg text-gray-800">
                  The likelihood of this customer churning is{" "}
                  <span className="text-green-500 font-bold">{((1 - prediction) * 100).toFixed(2)}%</span>.
                </p>

                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </>
            ) : (
              <p className="text-gray-500">Submit the form to get a prediction.</p>
            )}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>

      {prediction !== null && <ExportPDF elementRef={predictionResultRef} />}
    </div>
  );
};

export default PredictionForm;
