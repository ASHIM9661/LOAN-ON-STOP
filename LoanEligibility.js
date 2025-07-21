import React, { useState } from "react";

export default function LoanEligibility() {
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    employment: "",
    creditScore: "",
    existingLoan: false,
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const checkEligibility = () => {
    const { age, income, employment, creditScore, existingLoan } = formData;
    const ageNum = parseInt(age);
    const incomeNum = parseInt(income);
    const credit = parseInt(creditScore);

    if (
      ageNum >= 21 &&
      ageNum <= 60 &&
      incomeNum >= 15000 &&
      employment &&
      (credit >= 650 || creditScore === "") &&
      !existingLoan
    ) {
      setResult({
        eligible: true,
        banks: ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank"],
        documents: ["Aadhaar Card", "PAN Card", "Salary Slip", "Bank Statement"],
      });
    } else {
      setResult({ eligible: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Loan Eligibility Checker</h1>
        <div className="space-y-3">
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="number"
            name="income"
            placeholder="Monthly income"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <select
            name="employment"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="">Select employment type</option>
            <option value="Salaried">Salaried</option>
            <option value="Self-employed">Self-employed</option>
          </select>
          <input
            type="number"
            name="creditScore"
            placeholder="Credit score (optional)"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="existingLoan"
              className="mr-2"
              onChange={handleChange}
            />
            Do you have an existing loan?
          </label>
          <button
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            onClick={checkEligibility}
          >
            Check Eligibility
          </button>
        </div>

        {result && (
          <div className="mt-4">
            {result.eligible ? (
              <div className="text-green-600">
                <p>You are eligible for a loan!</p>
                <p className="mt-2 font-semibold">Recommended Banks:</p>
                <ul className="list-disc ml-5">
                  {result.banks.map((bank) => (
                    <li key={bank}>{bank}</li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold">Required Documents:</p>
                <ul className="list-disc ml-5">
                  {result.documents.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-red-600">Sorry, you are not eligible for a loan.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}