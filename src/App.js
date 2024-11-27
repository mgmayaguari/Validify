import './App.css';
import React, { useState } from "react";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [verifiedCards, setVerifiedCards] = useState([]);

  // Luhn algorithm to check credit card validity
  const verifyCardNumber = (number) => {
    let sum = 0;
    let shouldDouble = false;

    // Start from the end and process every digit
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  // Handle changes in input and validate only numbers with 15-16 digits
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
    }
  };

  // Check if the card number is valid
  const handleVerify = () => {
    if (cardNumber.length !== 15 && cardNumber.length !== 16) {
      alert("Credit card number must be 15 or 16 digits.");
      return
    }
    const isCardValid = verifyCardNumber(cardNumber);
    setIsValid(isCardValid);
  };

  const handleRestart = () => {
    setVerifiedCards([
      ...verifiedCards,
      {
        number: cardNumber.slice(-4), // Store only the last 4 digits
        valid: isValid ? "VALID" : "NOT VALID",
        validStatus: isValid ? "valid" : "invalid",
      },
    ]);
    setCardNumber("");
    setIsValid(null);
  };

  return (
    <div className="App">
      {/* Title Section */}
      <header className="App-header">
        <h1 className="App-title">Validify</h1>
        <p className="App-subtitle">Credit Card Validator</p>
      </header>

      {/* Input for credit card number */}
      <input
        type="text"
        placeholder="Enter credit card number"
        value={cardNumber}
        onChange={handleInputChange}
        maxLength="16"
      />

      {/* Verify button */}
      <button onClick={handleVerify}>Verify</button>

      {/* Display verification result */}
      {isValid !== null && (
        <p>
          This credit card is {isValid ? "VALID" : "NOT VALID"}.
        </p>
      )}

      {/* Restart button to add to list and clear input */}
      {isValid !== null && (
        <button onClick={handleRestart}>Verify New Credit Card</button>
      )}

      {/* List of verified cards */}
      <h2>Verified Cards</h2>
      <ul>
        {verifiedCards.map((card, index) => (
          <li key={index}>
            **** **** **** {card.number} - {card.valid}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <footer className="Footer">
        Created by
        <a href="https://mgmayaguari.github.io/" target="_blank" rel="noopener noreferrer"> MGML</a>
      </footer>
    </div>
  );
}

export default App;
