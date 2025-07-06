import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Input,
} from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { NumericFormat } from "react-number-format";
import getSymbolFromCurrency from "currency-symbol-map";
import { useNavigate } from "react-router-dom";

import CurrencyDropdown from "./CurrencyDropdown";

const Convertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAllCurrencies = async () => {
    try {
      const response = await axios.get("https://api.frankfurter.app/currencies");
      const data = Object.entries(response.data).map(([code, name]) => ({
        code,
        name,
      }));
      setCurrencies(data);
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Internal Server Error!");
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertCurrency = async () => {
    if (!amount || Number(amount) === 0) {
      toast.error("Amount should not be zero.");
      return;
    }
    if (amount.length > 10) {
      toast.error("Amount should not exceed 10 digits.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      setConvertedAmount({
        amount: response.data.rates[toCurrency],
        code: getSymbolFromCurrency(toCurrency) || toCurrency,
      });
    } catch (error) {
      console.error(error);
      toast.error("Unexpected Internal Server Error!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyCurrency = () => {
    navigate('/payments', { state: { data: `Converted Amount: ${convertedAmount.amount} ${convertedAmount.code}` } });
  };

  useEffect(() => {
    fetchAllCurrencies();
  }, []);

  return (
    <Card className="w-full mt-3 xl:mt-8">
      <CardHeader className="space-y-5 flex flex-col">
        <div className="w-full flex flex-col space-y-2">
          <CurrencyDropdown title="From" currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} />
          <div className="flex justify-center items-center">
            <Button color="primary" isDisabled={!fromCurrency || !toCurrency || fromCurrency === toCurrency} onClick={handleSwap} radius="full">
              <box-icon name="transfer" color="#fff" />
            </Button>
          </div>
          <CurrencyDropdown title="To" currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} />
        </div>
        <Input type="number" label="Amount" placeholder="0.00" isRequired value={amount} onChange={(e) => setAmount(e.target.value)} />
      </CardHeader>
      <Divider />
      <CardBody>
        <Button color="primary" className="text-xl" startContent={!isLoading ? <box-icon name="transfer-alt" color="#fff" /> : ""} isDisabled={!amount || !fromCurrency || !toCurrency || fromCurrency === toCurrency || isLoading} onClick={convertCurrency} isLoading={isLoading}>
          {isLoading ? "Converting..." : "Convert"}
        </Button>
      </CardBody>
      {convertedAmount && (
        <>
          <Divider />
          <CardFooter className="flex flex-col items-center">
            <p className="text-center text-xl font-bold">
              Converted Amount: <span className="text-primary text-lg xl:text-xl">{convertedAmount.code}</span> <NumericFormat className="text-primary text-lg xl:text-xl" value={convertedAmount.amount} displayType={"text"} thousandSeparator={true} />
            </p>
            <Button color="success" css={{ color: "white" }} onClick={handleBuyCurrency} className="w-1/3">
              Buy Currency
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default Convertor;
