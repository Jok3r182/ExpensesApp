import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        title: 'A pair of trousers',
        amount: 109.99,
        date: new Date('2021-12-22')
    },
    {
        id: 'e3',
        title: 'A pair of books',
        amount: 89.99,
        date: new Date('2021-12-25')
    }
]


function ExpensesOutput({ expenses, periodName }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    }
})
