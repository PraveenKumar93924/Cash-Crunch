import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, Button, Divider, Radio, RadioGroup, Input } from "@nextui-org/react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import QRCode from "qrcode.react";
import Modal from "react-modal";

const Payments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [isTransactionIDValid, setIsTransactionIDValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Track if modal is open
  const [paymentChoice, setPaymentChoice] = useState(""); // Store selected payment option

  const { state } = location;
  const data = state?.data || "No data available";

  const upiID = "9392462523@ibl";  
  const amount = "1.00";  
  const qrData = `upi://pay?pa=${upiID}&pn=PhonePe&am=${amount}&cu=INR`;

  useEffect(() => {
    const storedPasskey = localStorage.getItem("passkey");
    if (!storedPasskey) {
      toast.error("No passkey found. Please sign up first.");
      navigate("/signup"); 
    }
  }, [navigate]);

  const generatePasskey = () => {
    return Math.random().toString(36).substring(2, 12); // Generate a random passkey
  };

  const handlePayment = () => {
    if (!isTransactionIDValid) {
      toast.error("Invalid transaction ID. Please try again.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Payment Successful!");
      setIsModalOpen(true); // Open the modal after payment success
      setIsLoading(false);
    }, 3000);
  };

  const handleTransactionIDChange = (e) => {
    setTransactionID(e.target.value);
  };

  const validateTransactionID = () => {
    const transactionIDPattern = /^[A-Za-z0-9]{10,12}$/; 
    if (transactionIDPattern.test(transactionID)) {
      setIsTransactionIDValid(true);
      toast.success("Transaction ID validated successfully!");
    } else {
      setIsTransactionIDValid(false);
      toast.error("Invalid Transaction ID. Please check again.");
    }
  };

  const handlePaymentChoice = (choice) => {
    setPaymentChoice(choice);
    setIsModalOpen(false); // Close modal
    
    if (choice === "physical") {
      const passkey = localStorage.getItem("passkey");
      navigate("/passkey", { state: { passkey } });  // Navigate to passkey page
    } else if (choice === "online") {
      // Navigate to the online payment page
      navigate("/online-payment");  // Update with the correct path for your online payment page
      toast.success("Redirecting to Online Payment page...");
    }
  };

  return (
    <Card className="w-full mt-3 xl:mt-8 p-4" style={{ textAlign: "center" }}>
      <CardHeader>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem" }}>Payment Page</h2>
      </CardHeader>
      <CardBody className="flex flex-col items-center space-y-4">
        <p className="text-xl font-bold" style={{ margin: "1rem 0" }}>{data}</p>
        <Divider />
        
        <div className="w-full flex flex-col items-start space-y-2" style={{ textAlign: "left", margin: "1rem 0" }}>
          <h3 className="text-lg">Choose Payment Method</h3>
          <RadioGroup
            defaultValue="card"
            aria-label="Payment Methods"
            style={{ width: "100%" }}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <Radio value="card">Card Payment</Radio>
            <Radio value="net-banking">Net Banking</Radio>
            <Radio value="upi">UPI</Radio>
            <Radio value="qr">QR Payment</Radio> 
          </RadioGroup>
        </div>

        {paymentMethod === "card" && (
          <div className="w-full flex flex-col items-start space-y-2" style={{ margin: "1rem 0" }}>
            <Input fullWidth clearable label="Card Number" placeholder="Enter your card number" />
            <Input fullWidth clearable label="Card Holder Name" placeholder="Enter the card holder name" />
            <div className="flex space-x-2 w-full">
              <Input fullWidth clearable label="Expiry Date" placeholder="MM/YY" />
              <Input fullWidth clearable label="CVV" placeholder="CVV" />
            </div>
          </div>
        )}

        {(paymentMethod === "upi" || paymentMethod === "net-banking") && (
          <div className="w-full flex flex-col items-start space-y-2" style={{ margin: "1rem 0" }}>
            <Input fullWidth clearable label={paymentMethod === "upi" ? "UPI Address" : "Account Number"} placeholder={paymentMethod === "upi" ? "Enter UPI address" : "Enter account number"} />
            <Input fullWidth clearable label="IFSC Code" placeholder="Enter IFSC code" />
          </div>
        )}

        {paymentMethod === "qr" && (
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Scan the QR code to make the payment</h3>
            <div style={{ padding: '20px', background: '#f8f8f8', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', marginTop: "20px" }}>
              <QRCode value={qrData} size={256} level={"H"} includeMargin={true} />
            </div>
          </div>
        )}

        {paymentMethod === "qr" && (
          <div className="w-full flex flex-col items-start space-y-2" style={{ margin: "1rem 0" }}>
            <Input
              fullWidth
              clearable
              label="Enter Transaction ID"
              placeholder="Enter your transaction ID"
              value={transactionID}
              onChange={handleTransactionIDChange}
            />
            <Button color="primary" onClick={validateTransactionID} style={{ width: "200px", textAlign: "center", color: "black" }}>
              Validate Transaction ID
            </Button>
          </div>
        )}

        {isLoading ? (
          <div className="w-full bg-success-500 text-black py-2 px-4 rounded-md" style={{ width: "200px", textAlign: "center" }}>
            <ClipLoader size={30} color="white" loading={isLoading} />
            <p>Processing Payment...</p>
          </div>
        ) : (
          <Button
            color="success"
            onClick={handlePayment}
            style={{ width: "200px", textAlign: "center" }}
            disabled={!isTransactionIDValid} 
          >
            Make Payment
          </Button>
        )}
      </CardBody>

      {/* Modal for Payment Choice */}
      <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  contentLabel="Payment Choice"
  style={{
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1000
    },
    content: {
      padding: '20px',
      width: '350px',  // Fixed width
      maxHeight: '400px',  // Added maxHeight to limit the height
      margin: 'auto',
      textAlign: 'center',
      borderRadius: '10px',
      backgroundColor: '#fff',
      border: '1px solid #ddd',
      boxShadow: '0px 2px 15px rgba(0, 0, 0, 0.2)',
      overflowY: 'auto',  // Ensure the content doesn't overflow
    }
  }}
>
  <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>How would you like to receive your money?</h3>
  <div>
    <Button
      color="primary"
      onClick={() => handlePaymentChoice("online")}
      style={{
        width: "250px",
        marginBottom: "15px",
        padding: "12px",
        fontSize: "1.1rem"
      }}
    >
      Online (Transfer to my bank)
    </Button>
  </div>
  <div>
    <Button
      color="secondary"
      onClick={() => handlePaymentChoice("physical")}
      style={{
        width: "250px",
        padding: "12px",
        fontSize: "1.1rem"
      }}
    >
      Physical (Collect Passkey)
    </Button>
  </div>
</Modal>

    </Card>
  );
};

export default Payments;
