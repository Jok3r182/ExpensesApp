import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true
    },
    date: {
      value: defaultValues ?getFormattedDate(defaultValues.date) : "",
      isValid: true
    },
    description:{
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIdentifier, enteredAmount) {
    setInputs((current) => {
      return { ...current, [inputIdentifier]: {value: enteredAmount, isValid: true} };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((current) => {
        return {
          amount: {value: current.amount.value, isValid: amountIsValid},
          date: {value: current.date.value, isValid: dateIsValid},
          description: {value: current.description.value, isValid: descriptionIsValid}
        }
      })
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.description.isValid || !inputs.date.isValid

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
         invalid = {!inputs.amount.isValid}
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value, //two way binding
          }}
        />
        <Input
          invalid = {!inputs.date.isValid}
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid = {!inputs.amount.isValid}
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        
          // autoCorrect: false, default - true
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values!</Text>}
      <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  errorText:{
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
