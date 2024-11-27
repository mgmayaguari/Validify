import './App.css';
import React, { useState } from "react";

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [verifiedCards, setVerifiedCards] = useState([]);

  /**
   * Verifies if a given card number is valid using the Luhn Algorithm.
   * @param {string} number - The credit card number to verify.
   * @returns {boolean} - True if the card is valid, otherwise false.
   */
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

  /**
   * Handles the card number input, restricting it to numeric values and a maximum of 16 characters.
   * @param {object} e - The input change event.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,16}$/.test(value)) {
      setCardNumber(value);
    }
  };

  /**
   * Validates the current card number and updates the validity status.
   */
  const handleVerify = () => {
    if (cardNumber.length !== 15 && cardNumber.length !== 16) {
      alert("Credit card number must be 15 or 16 digits.");
      return
    }
    const isCardValid = verifyCardNumber(cardNumber);
    setIsValid(isCardValid);
  };

  /**
   * Adds the verified card to the list and resets the form for a new entry.
   */
  const handleRestart = () => {
    if (cardNumber && isValid !== null) {
      const newCard = {
        number: cardNumber.slice(-4), // Store only the last 4 digits
        valid: isValid ? "VALID" : "NOT VALID",
        validStatus: isValid ? "valid" : "invalid",
      };

      // Update the list to show only the last 5 cards
      setVerifiedCards([newCard, ...verifiedCards.slice(0, 4)]);
    }
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

      <div className="form-container">
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
      </div>

      {/* Display verification result */}
      {isValid !== null && (
        <p className={`result-message ${isValid ? "valid" : "invalid"}`}>
          This credit card is {isValid ? "VALID" : "NOT VALID"}.
        </p>
      )}

      {/* Restart button to add to list and clear input */}
      {isValid !== null && (
        <button onClick={handleRestart}>Verify New Credit Card</button>
      )}

      {/* List of verified cards */}
      <h2>Verified Cards</h2>
      <ul className="verified-list">
        {verifiedCards.map((card, index) => (
          <li key={index} className={card.validStatus}>
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
