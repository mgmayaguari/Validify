import logo from './logo.svg';
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

  const handleVerify = () => {
    const isCardValid = verifyCardNumber(cardNumber);
    setIsValid(isCardValid);
  };

  const handleRestart = () => {
    setVerifiedCards([
      ...verifiedCards,
      {
        number: cardNumber.slice(-4), // Store only the last 4 digits
        valid: isValid ? "VALID" : "NOT VALID",
      },
    ]);
    setCardNumber("");
    setIsValid(null);
  };

  return (
    <div className="App">
      <h1>Credit Card Verifier</h1>

      {/* Input for credit card number */}
      <input
        type="text"
        placeholder="Enter credit card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />

      {/* Verify button */}
      <button onClick={handleVerify}>Verify CC</button>

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
