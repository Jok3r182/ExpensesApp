import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
  const [inputValues, setInputValues] = useState({
    amount: defaultValues? defaultValues.amount.toString() : '',
    date: defaultValues? getFormattedDate(defaultValues.date) : '',
    description: defaultValues? defaultValues.description : '',
  });

  function inputChangeHandler(inputIdentifier, enteredAmount) {
    setInputValues((current) => {
      return { ...current, [inputIdentifier]: enteredAmount };
    });
  }

  function submitHandler(){
    const expenseData = {
        amount: +inputValues.amount,
        date: new Date(inputValues.date),
        description: inputValues.description
    }

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
        Alert.alert("Invalid input", "Please check your input values")
        return 
    }   


    onSubmit(expenseData)

  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputValues.amount, //two way binding
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          textInputConfig={{
            placeHolder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputValues.date,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputValues.description,
          // autoCorrect: false, default - true
        }}
      />
        <View style={styles.buttonContainer}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
        <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
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
  button:{
    minWidth: 120,
    marginHorizontal: 8
  },
  buttonContainer:{
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row'
  },
});
